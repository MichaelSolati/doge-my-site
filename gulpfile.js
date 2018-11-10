const gulp = require('gulp');
const bro = require('gulp-bro');
const ts = require('gulp-typescript');
const zip = require('gulp-zip');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('browserify', ['ts'], () => gulp.src('./dist/**/*.js').pipe(bro()).pipe(gulp.dest('./dist')));
gulp.task('ts', () => gulp.src('./src/**/*.ts').pipe(tsProject()).js.pipe(gulp.dest('dist')));

gulp.task('default', ['browserify'], () => gulp.src('dist/*').pipe(zip('dist.zip')).pipe(gulp.dest('')));