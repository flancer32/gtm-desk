/**
 * 'Home' route.
 *
 * @namespace Gtm_Desk_Front_Ui_Home
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Ui_Home';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Desk_Front_Ui_Home
 */
class IUiComp {
    loadTasks() {}
}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Desk_Front_Ui_Home.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];
    /** @type {Gtm_Desk_Front_Wg_Home} */
    const wgHome = spec['Gtm_Desk_Front_Wg_Home$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="q-ma-sm">
        HOME
    </div>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Ui_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                tasks: [],
            };
        },
        methods: {

            async loadTasks() {

            }
        },
        async mounted() {
            wgHome.set(this);
            await this.loadTasks();
        }
    };
}
