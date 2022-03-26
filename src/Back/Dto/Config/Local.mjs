/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Gtm_Desk_Back_Dto_Config_Local';

// MODULE'S CLASSES
export default class Gtm_Desk_Back_Dto_Config_Local {
 // TODO: use it or remove it
}

/**
 * Factory to create new DTO instances.
 * @memberOf Gtm_Desk_Back_Dto_Config_Local
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        /** @type {TeqFw_Db_Back_Dto_Config_Local.Factory} */
        const fDb = spec['TeqFw_Db_Back_Dto_Config_Local.Factory$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        /**
         * @param {Gtm_Desk_Back_Dto_Config_Local|null} [data]
         * @return {Gtm_Desk_Back_Dto_Config_Local}
         */
        this.create = function (data) {
            const res = new Gtm_Desk_Back_Dto_Config_Local();
            return res;
        }
    }
}
