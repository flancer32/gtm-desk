/**
 * 'Tasks' route.
 *
 * @namespace Gtm_Desk_Front_Ui_Tasks
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Ui_Tasks';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Desk_Front_Ui_Tasks
 */
class IUiComp {
    loadTasks() {}
}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Desk_Front_Ui_Tasks.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];
    /** @type {Gtm_Desk_Front_Ui_Tasks_Card.vueCompTmpl} */
    const uiTask = spec['Gtm_Desk_Front_Ui_Tasks_Card$'];
    /** @type {Gtm_Desk_Front_Mod_Task_Loader} */
    const modTaskLoader = spec['Gtm_Desk_Front_Mod_Task_Loader$'];
    /** @type {typeof Gtm_Base_Shared_Enum_Task_Status} */
    const STATUS = spec['Gtm_Base_Shared_Enum_Task_Status$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="" style="width: 100%">
        <div class="q-gutter-y-xs" style="">
            <q-tabs v-model="tab"
                    :breakpoint="0"
                    align="center"
                    class="text-primary shadow-2"
                    color="primary"
                    dense
            >
                <q-tab name="all" icon="done_all" title="All tasks" />
                <q-tab name="new" icon="add" title="New tasks" />
                <q-tab name="pending" icon="cached" title="Pending tasks" />
                <q-tab name="pending_complete" icon="pending_actions" title="Tasks pending completion" />
                <q-tab name="completed" icon="check_circle_outline" title="Completed tasks" />
                <q-tab name="disabled" icon="not_interested" title="Disabled tasks" />
            </q-tabs>
        </div>
        <div>
            <q-expansion-item v-model="expNew"
                class="q-mt-xs deep-purple-6"
                header-class="bg-deep-purple-6 text-white"
                icon="add"
                label="New tasks"
            >
                 <div class="row">
                    <ui-task v-for="(one) in tasksNew" :item="one" class="q-ma-sm"/>
                 </div>
            </q-expansion-item>
            
            <q-expansion-item v-model="expPend"
                class="q-mt-xs"
                header-class="bg-orange-5 text-white"
                icon="cached"
                label="Pending tasks"
            >
                Pending tasks
            </q-expansion-item>
            
            <q-expansion-item v-model="expPendComp"
                class="q-mt-xs"
                header-class="bg-info text-white"
                icon="pending_actions"
                label="Tasks pending completion"
            >
                Tasks pending completion
            </q-expansion-item>
            
            <q-expansion-item v-model="expComp"
                class="q-mt-xs"
                header-class="bg-light-green-8 text-white"
                icon="check_circle_outline"
                label="Completed tasks"
            >
                Completed tasks
            </q-expansion-item>
            
            <q-expansion-item v-model="expDis"
                class="q-mt-xs"
                header-class="bg-blue-grey-6 text-white"
                icon="not_interested"
                label="Disabled tasks"
            >
                Disabled tasks
            </q-expansion-item>
        </div>
    </div>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Ui_Tasks
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiTask},
        data() {
            return {
                expComp: true,
                expDis: true,
                expNew: true,
                expPend: true,
                expPendComp: true,
                tab: 'all',
                tasksComp: [],
                tasksDis: [],
                tasksNew: [],
                tasksPend: [],
                tasksPendComp: [],
            };
        },
        methods: {
            async loadTasks() {
                const tasks = await modTaskLoader.load();
                this.tasksComp = [];
                this.tasksDis = [];
                this.tasksNew = [];
                this.tasksPend = [];
                this.tasksPendComp = [];
                for (const task of tasks) {
                    if (task.status === STATUS.NEW) this.tasksNew.push(task);
                }
            }
        },
        async mounted() {
            this.loadTasks();
        }
    };
}
