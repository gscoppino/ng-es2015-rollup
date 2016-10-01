import { getPathConfig } from '../../util/pathconfig.js';

const INPUT_DIR = 'src';
const INPUT_FILE = 'main.css';

const OUTPUT_DIR = 'dist';
const DEV_OUTPUT_FILE = 'main.css';
const PROD_OUTPUT_FILE = 'main.css';

export default getPathConfig(INPUT_DIR, INPUT_FILE, OUTPUT_DIR, DEV_OUTPUT_FILE, PROD_OUTPUT_FILE);