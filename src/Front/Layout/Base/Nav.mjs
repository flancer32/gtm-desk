/**
 * Top bar navigator for base layout widget.
 *
 * @namespace Gtm_Desk_Front_Layout_Base_Nav
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Layout_Base_Nav';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Gtm_Desk_Front_Layout_Base_Nav
 * @returns {Gtm_Desk_Front_Layout_Base_Nav.vueCompTmpl}
 */
export default function Factory(spec) {
    // DEPS
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];

    // DEFINE WORKING VARS & PROPS
    const template = `
<div class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
    <q-btn flat dense :label="$t('nav.tasks')" to="${DEF.ROUTE_TASKS}"/>
    <q-btn flat dense :label="$t('nav.reports')" to="${DEF.ROUTE_REPORTS}"/>
    <q-btn flat dense :label="$t('nav.graveyards')" to="${DEF.ROUTE_GRAVEYARDS}"/>
    <q-btn flat dense :label="$t('nav.users')" to="${DEF.ROUTE_USERS}"/>
</div>

<q-space/>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Layout_Base_Nav
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'namespace', {value: NS});
