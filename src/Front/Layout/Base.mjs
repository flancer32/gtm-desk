/**
 * Base layout widget.
 *
 * @namespace Gtm_Desk_Front_Layout_Base
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Front_Layout_Base';
// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Gtm_Desk_Front_Layout_Base
 * @returns {Gtm_Desk_Front_Layout_Base.vueCompTmpl}
 */
export default function Factory(spec) {
    // DEPS
    /** @type {Gtm_Desk_Front_Defaults} */
    const DEF = spec['Gtm_Desk_Front_Defaults$'];
    /** @type {Gtm_Desk_Front_Layout_Base_Nav.vueCompTmpl} */
    const uiBaseNav = spec['Gtm_Desk_Front_Layout_Base_Nav$'];

    // VARS
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Desk_Front_Layout_Base
     */
    const template = `
<q-layout view="lHr lpR lFr">

    <q-header reveal>
        <q-toolbar>
            <q-btn dense glossy round icon="home" to="${DEF.ROUTE_HOME}"/>
            <q-toolbar-title>{{ title }}</q-toolbar-title>
            <q-btn dense round icon="add" color="primary" to="${DEF.ROUTE_HOME}"/>
            <ui-base-nav />
            <q-space></q-space>
            <q-btn dense glossy round icon="settings" to="${DEF.ROUTE_CFG}"/>
        </q-toolbar>
    </q-header>
    <q-page-container style="height: 100%">
        <div style="display: grid; height: 100%; align-items: center; justify-items: center;">
            <slot/>
        </div>
    </q-page-container>

    <q-footer class="bg-primary text-white"></q-footer>

</q-layout>
`;

    // MAIN
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiBaseNav},
        data() {
            return {
                title: this.$t('ui.home.title'),
            };
        },
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'namespace', {value: NS});
