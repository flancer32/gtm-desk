/**
 * Container to access UI widget as singleton.
 */
export default class Gtm_Desk_Front_Wg_Home {
    constructor() {
        // VARS
        /** @type {Gtm_Desk_Front_Ui_Home.IUiComp} */
        let _store;

        // INSTANCE METHODS
        /**
         * @param {Gtm_Desk_Front_Ui_Home.IUiComp} data
         */
        this.set = function (data) {
            _store = data;
        }

        /**
         * @return {Gtm_Desk_Front_Ui_Home.IUiComp}
         */
        this.get = function () {
            return _store;
        }
    }
}
