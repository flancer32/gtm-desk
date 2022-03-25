/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Gtm_Desk_Front_Defaults {
    /** @type {Gtm_Desk_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Gtm_Desk_Shared_Defaults$'];
        Object.freeze(this);
    }
}
