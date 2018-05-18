import gulp from 'gulp';
import template from 'gulp-template';
import rename from 'gulp-rename';
import yargs from 'yargs';

let NAME_REGEX = /^(([a-z]+$|[a-z]+-)+)$/;

// Get the name of the new provider, as passed
/* gulp generate:<thing> -n name */
let name = yargs.argv.n;

gulp.task('generate:component', ()=> {
    if (!name) { throw new Error('Must use -n switch to specify name'); }
    if (name.search(NAME_REGEX) === -1) {
        throw new Error(`Component name should be kebab cased e.g. sample,
            sample-component, sample-component-two`);
    }

    return gulp.src('tasks/generate/templates/component/*')
        .pipe(template({
            name: name,
            lowerCamelCaseName: name.split('-').map((part, i) => i === 0 ? part : part.substring(0, 1).toUpperCase() + part.substring(1)).join(''),
            UpperCamelCaseName: name.split('-').map(part => part.substring(0, 1).toUpperCase() + part.substring(1)).join('')
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('template', name);
        }))
        .pipe(gulp.dest(`src/app/common/components/${name}`));
});

gulp.task('generate:directive', ()=> {
    if (!name) { throw new Error('Must use -n switch to specify name'); }
    if (name.search(NAME_REGEX) === -1) {
        throw new Error(`Directive name should be kebab cased e.g. sample,
            sample-directive, sample-directive-two`);
    }

    return gulp.src('tasks/generate/templates/directive/*')
        .pipe(template({
            name: name,
            lowerCamelCaseName: name.split('-').map((part, i) => i === 0 ? part : part.substring(0, 1).toUpperCase() + part.substring(1)).join(''),
            UpperCamelCaseName: name.split('-').map(part => part.substring(0, 1).toUpperCase() + part.substring(1)).join('')
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('template', name);
        }))
        .pipe(gulp.dest(`src/app/common/directives/${name}`));
});

gulp.task('generate:service', ()=> {
    if (!name) { throw new Error('Must use -n switch to specify name'); }
    if (name.search(NAME_REGEX) === -1) {
        throw new Error(`Service name should be kebab cased e.g. sample,
            sample-service`);
    }

    return gulp.src('tasks/generate/templates/service/*')
        .pipe(template({
            name: name,
            lowerCamelCaseName: name.split('-').map((part, i) => i === 0 ? part : part.substring(0, 1).toUpperCase() + part.substring(1)).join(''),
            UpperCamelCaseName: name.split('-').map(part => part.substring(0, 1).toUpperCase() + part.substring(1)).join('')
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('template', name);
        }))
        .pipe(gulp.dest(`src/app/common/services/${name}`));
});
