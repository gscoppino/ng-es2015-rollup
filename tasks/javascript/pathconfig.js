import path from 'path';

const INPUT_DIR = 'src';
const ENTRY_FILENAME = 'main.js';

const OUTPUT_DIR = 'dist';
const DEV_BUNDLE_FILENAME = 'main.js';
const PROD_BUNDLE_FILENAME = 'main.js';
const OTHER_OUTPUTS = [
    'sw.js'
];

export default {
    entry: path.resolve(process.cwd(), INPUT_DIR, ENTRY_FILENAME),
    devBundle: path.resolve(process.cwd(), OUTPUT_DIR, DEV_BUNDLE_FILENAME),
    productionBundle: path.resolve(process.cwd(), OUTPUT_DIR, PROD_BUNDLE_FILENAME),
    otherOutputs: OTHER_OUTPUTS.map(output => path.resolve(process.cwd(), OUTPUT_DIR, output))
}