import BaseController from "{{UI5_PATH}}/controller/BaseController";

/**
 * @namespace {{NAMESPACE}}.controller
 */
export default class App extends BaseController {
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Properties
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Lifecycle Methods
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    public override onInit() {
        /**
         * If the onInit method is overridden in any Controller class, it is mandatory to call the super class (BaseController) onInit method. Otherwise,
         * the ODataService and Fragment classes will not be instantiated.
         * 
         * Note: Including onInit method in a Controller class IS NOT REQUIRED. The description above is only valid once the onInit method is included in a
         * Controller class.
         */
        super.onInit();
        this.attachPatternMatched("Route{{VIEW}}", this.onRoutePatternMatched.bind(this));
    }

    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Event Handlers
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Internal Methods
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    private onRoutePatternMatched() {

    }
}