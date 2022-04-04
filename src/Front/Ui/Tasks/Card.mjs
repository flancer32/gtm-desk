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
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
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
        <div class="col">
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
                return (this?.item?.status !== STATUS.DISABLED) && (this?.item?.status !== STATUS.COMPLETED);
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
                return this?.item?.image ?? './img/placeholder.png';
            },
        },
        methods: {
            btnDelete() {
            },
            async btnPost() {

            }
        },
        async mounted() {
        },
    };
}
