import { getPathConfig } from '../util/pathconfig.js';

const INPUT_DIR = 'src';
const INPUT_FILE = 'main.js';

const OUTPUT_DIR = 'dist';
const DEV_OUTPUT_FILE = 'main.js';
const PROD_OUTPUT_FILE = 'main.js';

export default getPathConfig(INPUT_DIR, INPUT_FILE, OUTPUT_DIR, DEV_OUTPUT_FILE, PROD_OUTPUT_FILE);