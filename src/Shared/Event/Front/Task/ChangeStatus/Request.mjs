/**
 * Front request to change status of a task.
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request';

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    bid;
    /** @type {typeof Gtm_Base_Shared_Enum_Task_Status} */
    statusNew;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castEnum|function} */
        const castEnum = spec['TeqFw_Core_Shared_Util_Cast.castEnum'];
        /** @type {typeof Gtm_Base_Shared_Enum_Task_Status} */
        const STATUS = spec['Gtm_Base_Shared_Enum_Task_Status$'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request.Dto} [data]
         * @return {Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.bid = castInt(data?.bid);
            res.statusNew = castEnum(data?.statusNew, STATUS);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
