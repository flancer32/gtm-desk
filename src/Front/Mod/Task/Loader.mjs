/**
 * Load tasks data from backend.
 *
 * @namespace Gtm_Desk_Front_Mod_Task_Loader
 */
export default class Gtm_Desk_Front_Mod_Task_Loader {
    constructor(spec) {
        // DEPS
        /** @type {Gtm_Desk_Front_Defaults} */
        const DEF = spec['Gtm_Desk_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
        const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {Gtm_Desk_Shared_Event_Front_Task_List_Request} */
        const esfReq = spec['Gtm_Desk_Shared_Event_Front_Task_List_Request$'];
        /** @type {Gtm_Desk_Shared_Event_Back_Task_List_Response} */
        const esbRes = spec['Gtm_Desk_Shared_Event_Back_Task_List_Response$'];

        // INSTANCE METHODS

        /**
         * @return {Promise<Gtm_Base_Shared_Dto_Task.Dto[]>}
         */
        this.load = async function () {
            return new Promise((resolve) => {
                // VARS
                let idFail, subs;

                // FUNCS
                /**
                 * @param {Gtm_Desk_Shared_Event_Back_Task_List_Response.Dto} data
                 * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
                 */
                function onResponse({data, meta}) {
                    clearTimeout(idFail);
                    resolve(data.items);
                    eventsFront.unsubscribe(subs);
                }

                // MAIN
                subs = eventsFront.subscribe(esbRes.getEventName(), onResponse);
                idFail = setTimeout(() => {
                    eventsFront.unsubscribe(subs);
                    resolve([]);
                }, DEF.TIMEOUT_EVENT_RESPONSE); // return empty array after timeout
                // create event message and publish it to back
                const event = esfReq.createDto();
                portalBack.publish(event);
            });
        }
    }
}
