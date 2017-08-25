let mix = require('laravel-mix');

// Mix Config
mix.setPublicPath('dist/');
mix.options({
    processCssUrls: false,
    uglify: {},
});

mix.scripts([
    // Vendor JavaScript
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
], 'dist/assets/js/vendor.js');

mix.scripts([
    // Application JavaScript
    'src/js/layout/*.js',
    // 'src/js/angular/[file].js',
], 'dist/assets/js/app.js');

mix.sass(
    // Application Sass
    'src/sass/app.scss',
'assets/css/app.css');

mix.copy([
    // Application Images
    'src/img/*.jpg'
], 'dist/assets/img');
