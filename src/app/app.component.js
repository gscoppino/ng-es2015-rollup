/**
 * @description Controller for the application root component.
 */
class AppController {

    static get $inject() { return ['$rootScope', '$log']; }
    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });

        /**
         * Is a state change in progress?
         * @member {Boolean}
         */
        this.isLoading = false;

        this._listeners = [];

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
        let update = this._update.bind(this);

        this._listeners.push(
            this.$rootScope.$on('$routeChangeStart', update),
            this.$rootScope.$on('$routeChangeSuccess', update)
        );
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param event - the state change event
     */
    _update(event) {
        this.isLoading = (event.name === '$routeChangeStart') ? true : false;
    }

    /**
     * Deregisters all event listeners attached during the lifetime of this instance.
     */
    $onDestroy() {
        this._listeners.forEach(deregister => deregister());
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
