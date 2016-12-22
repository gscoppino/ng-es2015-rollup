import stripIndent from 'common-tags/lib/stripIndent';

/**
 * Taken from src/jqLite.js
 */
function fnCamelCaseReplace(all, letter) {
    return letter.toUpperCase();
}

var PREFIX_REGEXP = /^((?:x|data)[:\-_])/i;
var SPECIAL_CHARS_REGEXP = /[:\-_]+(.)/g;

/**
 * Taken from src/ng/compile.js
 * Converts all accepted directives format into proper directive name.
 * @param name Name to normalize
 */
function directiveNormalize(name) {
    return name
        .replace(PREFIX_REGEXP, '')
        .replace(SPECIAL_CHARS_REGEXP, fnCamelCaseReplace);
}

function providerProxy(moduleName, providersObj) {
    if (!window.Proxy || window.disableProviderProxy) {
        return providersObj;
    }

    return new Proxy(providersObj, {
        get: function (obj, prop) {
            if (obj[prop] !== undefined) {
                return obj[prop];
            }

            throw new Error(stripIndent`
                Tried to access non-existent provider "${prop}" from module "${moduleName}".
                Available providers are: [${Object.keys(obj)}].
                Consider checking the source code of the module to ensure the provider
                in question has been defined as expected.`);
        }
    });
}

export { directiveNormalize };
export { providerProxy };