/**
 * 'Reports' route.
 *
 * @namespace Gtm_Desk_Front_Ui_Reports
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Ui_Reports';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Desk_Front_Ui_Reports
 */
class IUiComp {}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Desk_Front_Ui_Reports.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="q-ma-sm">
        REPORTS
    </div>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Ui_Reports
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
        methods: {},
        async mounted() { }
    };
}
