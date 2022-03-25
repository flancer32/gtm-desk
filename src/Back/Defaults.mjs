/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Gtm_Desk_Back_Defaults {
    CLI_PREFIX = 'app';

    /** @type {TeqFw_Core_Back_Defaults} */
    MOD_CORE;

    /** @type {Gtm_Desk_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.MOD_CORE = spec['TeqFw_Core_Back_Defaults$'];
        this.SHARED = spec['Gtm_Desk_Shared_Defaults$'];
        Object.freeze(this);
    }
}
