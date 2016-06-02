class SampleComponentController {
    static $inject = [];

    static bindings = {
        input1: '<',
        input2: '@',
        output1: '&'
    };

    constructor() {}
    $onInit() {}
    $onChanges() {}
    $onDestroy() {}
    $postLink() {}
}

export default SampleComponentController;
