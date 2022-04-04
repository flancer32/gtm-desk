/**
 * UI component for task card on the '/tasks' route.
 *
 * @namespace Gtm_Desk_Front_Ui_Tasks_Card
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Ui_Tasks_Card';

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Gtm_Desk_Front_Ui_Tasks_Card.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
    const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
    /** @type {TeqFw_Web_Front_App_Event_Bus} */
    const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
    /** @type {Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request} */
    const esfReq = spec['Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request$'];
    /** @type {Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response} */
    const esbRes = spec['Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response$'];
    /** @type {Gtm_Desk_Front_Wg_Tasks} */
    const wgTasks = spec['Gtm_Desk_Front_Wg_Tasks$'];
    /** @type {typeof Gtm_Base_Shared_Enum_Task_Status} */
    const STATUS = spec['Gtm_Base_Shared_Enum_Task_Status$'];

    // VARS
    const template = `
<q-card class="shadow-1 col" bordered style="min-width: 300px;max-width: 450px;" >
    <q-card-section :class="classTitle">
        <div class="text-h6">{{item.title}}</div>
    </q-card-section>
    
    <q-card-section class="row">
        <div class="col">
            <q-img
                :src="url"
                class="q-pa-xs"
                spinner-color="white"
                style="max-height: 140px; max-width: 100%"
            />
        </div>
        <div class="col q-pa-xs">
            {{item.desc}}
        </div>
        <div class="col text-right">
            <div v-if="btnEnabled">
                <q-btn :class="classTitle" icon="send" v-on:click="btnMove" />
            </div>
        </div>
        
    </q-card-section>
</q-card>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Ui_Tasks_Card
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Gtm_Base_Shared_Dto_Task.Dto} */
            item: null,
        },
        computed: {
            btnEnabled() {
                return (this?.item?.status !== STATUS.DISABLED);
            },
            classTitle() {
                /** @type {Gtm_Base_Shared_Dto_Task.Dto} */
                const task = this.item;
                const bg = (task.status === STATUS.NEW) ? 'bg-deep-purple-6' :
                    (task.status === STATUS.PENDING) ? 'bg-orange-5' :
                        (task.status === STATUS.PROGRESS) ? 'bg-info' :
                            (task.status === STATUS.COMPLETED) ? 'bg-light-green-8' : 'bg-blue-grey-6';
                return `${bg} text-white`;
            },
            url() {
                /** @type {Gtm_Base_Shared_Dto_Task.Dto} */
                const task = this.item;
                if (task?.imageName) {
                    return `./img/upload/${task.imageName}`;
                } else {
                    return './img/placeholder.png';
                }
            },
        },
        methods: {
            async btnMove() {
                // FUNC
                /**
                 * Change status on the server.
                 *
                 * @param {number} bid
                 * @param {typeof Gtm_Base_Shared_Enum_Task_Status} status
                 * @return {Promise<unknown>}
                 */
                function changeStatusOnServer(bid, status) {
                    return new Promise((resolve) => {
                        // VARS
                        let idFail, subs;

                        // FUNCS
                        /**
                         * @param {Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response.Dto} data
                         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
                         */
                        function onResponse({data, meta}) {
                            clearTimeout(idFail);
                            resolve(data.success);
                            eventsFront.unsubscribe(subs);
                        }

                        // MAIN
                        subs = eventsFront.subscribe(esbRes.getEventName(), onResponse);
                        idFail = setTimeout(() => {
                            eventsFront.unsubscribe(subs);
                            resolve(false);
                        }, DEF.TIMEOUT_EVENT_RESPONSE); // return empty array after timeout
                        // create event message and publish it to back
                        const event = esfReq.createDto();
                        event.data.bid = bid;
                        event.data.statusNew = status;
                        portalBack.publish(event);
                    });
                }

                // MAIN
                /** @type {Gtm_Base_Shared_Dto_Task.Dto} */
                const item = this.item;
                const statusNew = (item.status === STATUS.NEW) ? STATUS.PENDING
                    : (item.status === STATUS.PENDING) ? STATUS.PROGRESS
                        : (item.status === STATUS.PROGRESS) ? STATUS.COMPLETED
                            : (item.status === STATUS.COMPLETED) ? STATUS.DISABLED : null;
                if (statusNew) {
                    const res = await changeStatusOnServer(item.bid, statusNew);
                    if (res) wgTasks.get().loadTasks();
                }
            }
        },
        async mounted() {
        },
    };
}
