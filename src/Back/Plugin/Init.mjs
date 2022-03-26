/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Back_Plugin_Init';

export default function Factory(spec) {
    // DEPS
    /** @type {Gtm_Desk_Back_Defaults} */
    const DEF = spec['Gtm_Desk_Back_Defaults$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Db_Back_RDb_Connect} */ // use interface as implementation
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {TeqFw_Web_Back_Store_RDb_Schema_Front} */
    const rdbFront = spec['TeqFw_Web_Back_Store_RDb_Schema_Front$'];
    /** @type {Gtm_Desk_Back_Proc_RDb_Init.process|function} */
    const procDbInit = spec['Gtm_Desk_Back_Proc_RDb_Init$'];

    // FUNCS
    async function init() {
        /**
         * Get local configuration and initialize DB connection.
         * Place connection object as 'TeqFw_Db_Back_RDb_IConnect' singleton to DI-container.
         *
         * @return {Promise<void>}
         */
        async function initDb() {
            // FUNCS
            async function schemaExists() {
                let res = false;
                const trx = await conn.startTransaction();
                try {
                    // read one record from 'front' table
                    await crud.readSet(trx, rdbFront, null, null, null, 1);
                    res = true; // if exception is not thrown
                    await trx.commit();
                } catch (error) {
                    await trx.rollback();
                }
                return res;
            }

            // MAIN
            /** @type {Gtm_Desk_Back_Dto_Config_Local} */
            const cfg = config.getLocal(DEF.SHARED.NAME);
            await conn.init(cfg.db);
            if (!await schemaExists() || true) { // TODO: remove 'true'
                logger.info(`There is no tables in RDB. Creating new RDB schema.`);
                await procDbInit();
            }
        }

        // MAIN
        await initDb();
    }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(init, 'namespace', {value: NS});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
