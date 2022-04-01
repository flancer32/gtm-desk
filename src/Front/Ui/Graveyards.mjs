/**
 * 'Graveyards' route.
 *
 * @namespace Gtm_Desk_Front_Ui_Graveyards
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Ui_Graveyards';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Desk_Front_Ui_Graveyards
 */
class IUiComp {}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Desk_Front_Ui_Graveyards.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="q-ma-sm">
        GRAVEYARDS
    </div>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Ui_Graveyards
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
