import SampleComponentTemplate from './sample-component.component.html';

class SampleComponentController {

    static get $inject() { return ['$log']; }
    constructor($log) {
        Object.assign(this, { $log });
    }

    $onInit() {
        this.$log.log('component initialized.');
    }

    $onChanges(changes) {
        Object.keys(changes).forEach((change) => {
            if (!changes[change].isFirstChange())
                this.$log.log(`binding ${change} has been updated.`);
        });
    }

    $doCheck() {
        this.$log.log('component has finished a digest cycle');
    }

    $onDestroy() {
        this.$log.log('component destroyed.');
    }

    $postLink() {
        this.$log.log('component linking phase completed.');
    }
}

export const SampleComponent = {
    template: SampleComponentTemplate,
    controller: SampleComponentController,
    bindings: {
        input1: '<',
        input2: '@',
        output1: '&'
    }
};

export { SampleComponentTemplate };
export { SampleComponentController };
