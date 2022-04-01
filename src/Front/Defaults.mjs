/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Gtm_Desk_Front_Defaults {

    ROUTE_CFG = '/cfg';
    ROUTE_GRAVEYARDS = '/graveyards';
    ROUTE_HOME = '/';
    ROUTE_REPORTS = '/reports';
    ROUTE_TASKS = '/tasks';
    ROUTE_USERS = '/users';

    /** @type {Gtm_Desk_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Gtm_Desk_Shared_Defaults$'];
        Object.freeze(this);
    }
}
