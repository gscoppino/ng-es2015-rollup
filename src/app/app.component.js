/**
 * @description Controller for the application root component.
 */
class AppController {

    static get $inject() { return ['$log', '$transitions']; }
    constructor($log, $transitions) {
        Object.assign(this, { $transitions });

        /**
         * Is a state change in progress?
         * @member {Boolean}
         */
        this.isLoading = false;

        $log.log('Loaded!');
    }

    /**
     * @property {Object} bindings - The inputs/outputs for this controller.
     */
    static get bindings() {
        return {};
    }

    /**
     * Schedules a UI update to to be called whenever a
     * route change event occurs, passing it the parameters from
     * the event.
     */
    $onInit() {
        this.$transitions.onStart({}, this._update.bind(this));
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param {Object} transition - the state transition event
     * @param {Promise} transition.promise - the promise indicating the state of the transition
     */
    _update(transition) {
        this.isLoading = true;
        transition.promise.finally(() => {
            this.isLoading = false;
        });
    }
}

/**
 * @memberof module:AppModule
 * @description The root component of the application.
 * @property controller {function} - [AppController]{@link AppController}
 * @property bindings {object} - [AppController.bindings]{@link AppController.bindings}
 */
const AppComponent = {
    controller: AppController,
    bindings: AppController.bindings
};

export default AppComponent;
