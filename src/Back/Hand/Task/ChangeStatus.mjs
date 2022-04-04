/**
 * Handler to process front requests to change status of a task.
 *
 * @namespace Gtm_Desk_Back_Hand_Task_ChangeStatus
 */
export default class Gtm_Desk_Back_Hand_Task_ChangeStatus {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request} */
        const esfReq = spec['Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request$'];
        /** @type {Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response} */
        const esbRes = spec['Gtm_Desk_Shared_Event_Back_Task_ChangeStatus_Response$'];
        /** @type {Gtm_Base_Back_RDb_Schema_Task} */
        const rdbTask = spec['Gtm_Base_Back_RDb_Schema_Task$'];

        // VARS

        // MAIN
        logger.setNamespace(this.constructor.namespace);
        eventsBack.subscribe(esfReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {Gtm_Desk_Shared_Event_Front_Task_ChangeStatus_Request.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         * @return {Promise<void>}
         */
        async function onRequest({data, meta}) {
            const trx = await rdb.startTransaction();
            try {
                const dto = rdbTask.createDto();
                dto.id = data.bid;
                dto.status = data.statusNew;
                await crud.updateOne(trx, rdbTask, dto);
                await trx.commit();
                // send contact card to recipient
                const event = esbRes.createDto();
                event.meta.frontUUID = meta.frontUUID;
                event.data.success = true;
                // noinspection ES6MissingAwait
                portalFront.publish(event);
            } catch (error) {
                await trx.rollback();
                logger.error(error);
            }
        }
    }
}
