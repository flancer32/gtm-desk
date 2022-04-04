/**
 * Back response to the front request for task status change.
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response';

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response
 */
class Dto {
    static namespace = NS;
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castBoolean|function} */
        const castBoolean = spec['TeqFw_Core_Shared_Util_Cast.castBoolean'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response.Dto} [data]
         * @return {Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.success = castBoolean(data?.success);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
         */
        this.createDto = function (data) {
            const res = dtoBase.createDto({[ATTR.META]: data?.[ATTR.META]});
            res.meta.name = NS;
            res.data = createData(data?.[ATTR.DATA]);
            // noinspection JSValidateTypes
            return res;
        }

        this.getEventName = () => NS;
    }
}
