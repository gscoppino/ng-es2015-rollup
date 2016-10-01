import path from 'path';

export function getPathConfig(inputDir, inputFilename, outputDir, outputDevFilename, outputProdFilename) {
    return {
        in: {
            directory: path.resolve(process.cwd(), inputDir),
            filename: inputFilename,
            get path() {
                return path.join(this.directory, this.filename);
            }
        },
        out: {
            directory: path.resolve(process.cwd(), outputDir),
            devFilename: outputDevFilename,
            prodFilename: outputProdFilename,
            get devPath() {
                return path.join(this.directory, this.devFilename);
            },
            get prodPath() {
                return path.join(this.directory, this.prodFilename);
            }
        },
        map: {
            directory: path.resolve(process.cwd(), outputDir),
            filename: outputDevFilename + '.map',
            get path() {
                return path.join(this.directory, this.filename);
            }
        }
    };
}