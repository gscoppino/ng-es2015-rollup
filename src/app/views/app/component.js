import angular from 'angular';

const AppTemplate = `
    <span>{{ ::$ctrl.welcomeMessage }}</span>
`;

class AppController {
    static $inject = ["$log"];
    
    constructor($log) {
        angular.extend(this, { $log });
        this.welcomeMessage = 'Loaded!';
    }
    
    login() {
        this.$log.info("Awaiting your implementation...");
    }
}

const AppComponent = {
    template: AppTemplate,
    controller: AppController  
};

export { AppTemplate, AppController };
export default AppComponent;