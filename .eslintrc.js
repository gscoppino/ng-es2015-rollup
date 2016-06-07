module.exports = {
    extends: "eslint:recommended",
    env: {
        browser: true,
        node: true,
        jasmine: true
    },
    parser: "babel-eslint", // Can be removed once class properties are mainlined into ECMAScript.
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    globals: {
        // Angular Mocks
        inject: true,
        module: true
    },
    rules: {
        "require-jsdoc": [
            "error",
            {
                require: {
                    ClassDeclaration: true,
                    MethodDefinition: true,
                    FunctionDeclaration: true
                }
            }
        ],
        indent: [
            "error",
            4
        ],
        quotes: [
            "error",
            "single"
        ],
        semi: [
            "error",
            "always"
        ]
    }
};
