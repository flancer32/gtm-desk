/**
 * Back response to the front request for list of tasks.
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Shared_Event_Back_Task_List_Response';

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Desk_Shared_Event_Back_Task_List_Response
 */
class Dto {
    static namespace = NS;
    /** @type {Gtm_Base_Shared_Dto_Task.Dto[]} */
    items;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Gtm_Desk_Shared_Event_Back_Task_List_Response {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfObj'];
        /** @type {Gtm_Base_Shared_Dto_Task} */
        const dtoTask = spec['Gtm_Base_Shared_Dto_Task$'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Gtm_Desk_Shared_Event_Back_Task_List_Response.Dto} [data]
         * @return {Gtm_Desk_Shared_Event_Back_Task_List_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.items = castArrayOfObj(data?.items, dtoTask.createDto);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Gtm_Desk_Shared_Event_Back_Task_List_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Gtm_Desk_Shared_Event_Back_Task_List_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
