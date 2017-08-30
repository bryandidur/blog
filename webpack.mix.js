let mix = require('laravel-mix');

// Mix Config
mix.setPublicPath('dist/');
mix.options({
    processCssUrls: false,
    uglify: {},
});

mix.combine([
    // Vendor JavaScript
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    // 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
], 'dist/assets/js/vendor.js');

mix.scripts([
    // Application JavaScript
    'src/js/layout/app.js',
    // 'src/js/layout/*.js',
    // 'src/js/angular/app.helpers.js',
    // 'src/js/angular/app.module.js',
    // 'src/js/angular/app.config.js',
], 'dist/assets/js/app.js');

mix.sass(
    // Application Sass
    'src/sass/app.scss',
'assets/css/app.css');

mix.copy([
    // Application Images
    'src/img/*.jpg'
], 'dist/assets/img');
