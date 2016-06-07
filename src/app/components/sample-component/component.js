/** @module SampleComponent */

/** Class to demonstrate typical boilerplate for a component controller. */
class SampleComponentController {
    static $inject = [];

    static bindings = {
        input1: '<',
        input2: '@',
        output1: '&'
    };

    /** Brief summary of what happens at instantiation. */
    constructor() {}

    /** Brief summary of what happens when bindings are initialized. */
    $onInit() {}

    /** Brief summary of what happens when one way bound values are changed */
    $onChanges() {}

    /** Brief summary of what happens when the component is destroyed */
    $onDestroy() {}

    /** Brief summary of what happens when template has finished compilation. */
    $postLink() {}
}

export default SampleComponentController;
