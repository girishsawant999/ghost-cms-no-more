/*!
 * Themeix Gulp Package (https://themeix.com/)
 * Copyright 2016-2020 themeix team
 * Licensed under MIT
 * Available Main Task Command : production, gulp, zip
 */

(function () {
    'use strict';
    /*
    =============================
        Configure Options & Files 
    =============================
    */
    var File_Name = 'ghost-newsfeed.zip';
    
    var CSS_Files = [
        './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        './node_modules/slick-carousel/slick/slick.css',
        './node_modules/prismjs/themes/prism.css',
        './node_modules/szmigiel-meanmenu/meanmenu.min.css',
        './node_modules/aos/dist/aos.css',     
    ];
    var JS_Files = [
        './node_modules/jquery/dist/jquery.min.js',       
        './node_modules/@popperjs/core/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery.easing/jquery.easing.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        './node_modules/lazysizes/lazysizes.min.js',
        './node_modules/prismjs/prism.js',
        './node_modules/aos/dist/aos.js',
        './node_modules/jquery-ticker/jquery.ticker.min.js',
        './assets/js/jquery.ghosthunter.js',
        './assets/js/ghost-dropdown.js',  
         './assets/js/zoom.js',       
        './assets/js/app.js'
    ];

    /*
=============================
    Include Gulp & Plugins
=============================
*/
    var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
        cleanCSS = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        terser = require('gulp-terser'),
        jshint = require('gulp-jshint'),
        plumber = require('gulp-plumber'),
        c = require('ansi-colors'),
        replace = require('gulp-replace'),
        size = require('gulp-size'),
        zip = require('gulp-zip'),
        del = require('del'),
        gulpCopy = require('gulp-copy'),
        runSequence = require('run-sequence'),
        inject = require('gulp-inject')
    //		fs 				= require('fs');

    sass.compiler = require('node-sass');



    gulp.task('clean-production', function () {
        return del('dist/**/**', {
            force: true
        });
    });
    gulp.task('copy_css_files', function (done) {
        return gulp.src(CSS_Files)
            .pipe(gulp.dest('./dist/production/assets/css'))
            .pipe(size())

        done();
    });
    gulp.task('copy_js_files', function (done) {
        return gulp.src(JS_Files)
            .pipe(gulp.dest('./dist/production/assets/js'))
            .pipe(size())

        done();
    });

    gulp.task('copy_all_files', function (done) {
        return gulp.src([
            './**/*',

            '!.jshintignore',
            '!.jshintrc',
            '!bower.json',
            '!gulpfile.js',
            '!package.json',
            '!package-lock.json',
            '!.gitattributes',
            '!gitignore',
            '!README.md',
            '!.gitignore',
            '!./node_modules/**',
            '!./bower_components/**',
            '!./dist/**',
            '!./git/**'
        ])
            .pipe(gulp.dest('./dist/production'))
            .pipe(size())
        done();
    });

    gulp.task('inject_code_html', function (cb) {
        return gulp.src('./dist/production/*.html') //file with tags for injection
            .pipe(inject(gulp.src(Production_JS_Files), {
                starttag: '<!-- gulp:{{ext}} -->',
                endtag: '<!-- endgulp -->',
                relative: true
            }))
            .pipe(gulp.dest('./dist/production')); //where index.html will be saved. Same dir for overwrite old one
    })
    gulp.task('inject_code_html_2', function (cb) {
        return gulp.src('./dist/production/*.html') //file with tags for injection
            .pipe(inject(gulp.src(Production_CSS_Files), {
                starttag: '<!-- gulp:{{ext}} -->',
                endtag: '<!-- endgulp -->',
                relative: true
            }))
            .pipe(gulp.dest('./dist/production')); //where index.html will be saved. Same dir for overwrite old one
    })

    gulp.task('remove_extra_code', function () {
        return gulp.src('./dist/production/*.html')
            .pipe(replace('<link rel="stylesheet" href="assets/css/app.min.css">', ''))
            .pipe(replace('<script src="assets/js/build.min.js"></script>', ''))
            .pipe(gulp.dest('./dist/production'))
    });



    gulp.task('production-zip', function (done) {
        gulp.src([
            './dist/production/**/*',
        ])
            .pipe(zip('production-' + File_Name))
            .pipe(gulp.dest('./dist/'))
            .pipe(size())
        done();
    });

    gulp.task('sass', function (done) {
        return gulp.src('./assets/scss/*.scss')
            .pipe(plumber({
                // errorHandler: onError
            }))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest('./assets/css'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });


    gulp.task('vendor_css', function (done) {
        return gulp.src(CSS_Files)
            .pipe(concat('vendors.css'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });

    gulp.task('js', function (done) {
        return gulp.src(JS_Files)

            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(concat('build.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(terser())
            .pipe(gulp.dest('./assets/js'))
            .pipe(size())
        done();
    });


    gulp.task('app_css', function (done) {
        return gulp.src(['./assets/css/vendors.min.css', './assets/css/style.min.css'])
            .pipe(concat('app.css'))
            .pipe(cleanCSS())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });
    gulp.task('zip', function (done) {
        gulp.src([
            './**/*',

            '.jshintignore',
            '.jshintrc',
            '!.gitattributes',
            '!README.md',
            '!.gitignore',
            '!./node_modules/**',
            '!./bower_components/**',
            '!./dist/**',
            '!./git/**'
        ])
            .pipe(zip('dev-' + File_Name))
            .pipe(gulp.dest('dist'))
            .pipe(size())
        done();
    });

    gulp.task('watch', function () {
        gulp.watch('assets/scss/**/*.scss', gulp.series('build_css'));
        gulp.watch(['./assets/js/app.js'], gulp.series('js'));
    });

    gulp.task(
        'build_css',
        gulp.series('sass', 'vendor_css', 'app_css')
    );

    gulp.task(
        'build',
        gulp.series('build_css', 'js')
    );

    gulp.task(
        'production',
        gulp.series('clean-production', 'copy_all_files', 'copy_css_files', 'copy_js_files', 'inject_code_html', 'inject_code_html_2', 'remove_extra_code', 'production-zip', 'zip')
    );

    gulp.task(
        'default',
        gulp.series('build', 'watch')
    );

})();