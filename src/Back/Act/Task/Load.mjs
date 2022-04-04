/**
 * Load tasks from RDB.
 *
 * @namespace Gtm_Desk_Back_Act_Task_Load
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'Gtm_Desk_Back_Act_Task_Load';

// MODULE'S FUNCS
/**
 * Default export is a factory to create result function in working environment (with deps).
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 */
export default function (spec) {
    // DEPS
    /** @type {Gtm_Base_Back_RDb_Schema_Task} */
    const rdbTask = spec['Gtm_Base_Back_RDb_Schema_Task$'];
    /** @type {Gtm_Base_Back_RDb_Schema_Graveyard} */
    const rdbGraveyard = spec['Gtm_Base_Back_RDb_Schema_Graveyard$'];
    /** @type {Gtm_Base_Back_RDb_Schema_Upload} */
    const rdbUpload = spec['Gtm_Base_Back_RDb_Schema_Upload$'];
    /** @type {Gtm_Base_Shared_Dto_Task} */
    const dtoTask = spec['Gtm_Base_Shared_Dto_Task$'];
    /** @type {Gtm_Base_Shared_Dto_Graveyard} */
    const dtoGraveyard = spec['Gtm_Base_Shared_Dto_Graveyard$'];

    // VARS
    const A_DTO = dtoTask.getAttributes();
    const A_GRAVEYARD = rdbGraveyard.getAttributes();
    const A_TASK = rdbTask.getAttributes();
    const A_UPLOAD = rdbUpload.getAttributes();

    // FUNCS

    /**
     * Result function.
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @memberOf Gtm_Desk_Back_Act_Task_Load
     */
    async function act({trx}) {
        /** @type {Gtm_Base_Shared_Dto_Task[]} */
        const items = [];
        // aliases for tables
        const asGy = 'gy';
        const asT = 't';
        const asU = 'u';
        // aliases for columns
        const aGyBid = 'gyBid';
        const aGyTitle = 'gyTitle';
        const aGyUuid = 'gyUuid';
        const aImgExt = 'imgExt';
        const aImgUuid = 'imgUuid';
        // compose SQL
        const tblGy = {[asGy]: trx.getTableName(rdbGraveyard)};
        const tblT = {[asT]: trx.getTableName(rdbTask)};
        const tblU = {[asU]: trx.getTableName(rdbUpload)};
        // select data from the main table
        /** @type {Knex.QueryBuilder} */
        const query = trx.createQuery();
        query.table(tblT);
        query.select([
            {[A_DTO.BID]: `${asT}.${A_TASK.ID}`},
            {[A_DTO.DATE_CREATED]: `${asT}.${A_TASK.DATE_CREATED}`},
            {[A_DTO.DATE_DUE]: `${asT}.${A_TASK.DATE_DUE}`},
            {[A_DTO.DESC]: `${asT}.${A_TASK.DESC}`},
            {[A_DTO.STATUS]: `${asT}.${A_TASK.STATUS}`},
            {[A_DTO.TITLE]: `${asT}.${A_TASK.TITLE}`},
            {[A_DTO.UUID]: `${asT}.${A_TASK.UUID}`},
        ]);
        // join graveyard table
        query.leftOuterJoin(tblGy, `${asGy}.${A_GRAVEYARD.ID}`, `${asT}.${A_TASK.GRAVEYARD_REF}`);
        query.select([
            {[aGyBid]: `${asGy}.${A_GRAVEYARD.ID}`},
            {[aGyTitle]: `${asGy}.${A_GRAVEYARD.TITLE}`},
            {[aGyUuid]: `${asGy}.${A_GRAVEYARD.UUID}`},
        ]);
        // join upload table
        query.leftOuterJoin(tblU, `${asU}.${A_UPLOAD.ID}`, `${asT}.${A_TASK.IMAGE_REF}`);
        query.select([
            {[aImgUuid]: `${asU}.${A_UPLOAD.UUID}`},
            {[aImgExt]: `${asU}.${A_UPLOAD.EXT}`},
        ]);
        // const sql = query.toString();
        const rs = await query;
        for (const one of rs) {
            const gy = dtoGraveyard.createDto();
            gy.bid = one[aGyBid];
            gy.title = one[aGyTitle];
            gy.uuid = one[aGyUuid];
            const task = dtoTask.createDto(one);
            task.graveyard = gy;
            if (one[aImgUuid] && one[aImgExt])
                task.imageName = `${one[aImgUuid]}.${one[aImgExt]}`;
            items.push(task);
        }
        return {items};
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}

// MODULE'S MAIN
