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
    'node_modules/toastr/package/build/toastr.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-ui-router/release/stateEvents.min.js',
    'node_modules/angular-modal-service/dst/angular-modal-service.min.js'
], 'dist/assets/js/vendor.js');

mix.scripts([
    // Layout scripts
    'src/js/layout/app.js',

    // Main application module
    'src/js/app/app.env.js',
    'src/js/app/app.helpers.js',
    'src/js/app/app.module.js',
    'src/js/app/app.config.js',

    // Validation module
    'src/js/app/validation/validation.module.js',
    'src/js/app/validation/directives/*.js',

    // Auth module
    'src/js/app/auth/auth.module.js',
    'src/js/app/auth/auth.config.js',
    'src/js/app/auth/services/*.js',
    'src/js/app/auth/controllers/*.js',

    // Root Dashboard module
    'src/js/app/root-dashboard/root-dashboard.module.js',
    'src/js/app/root-dashboard/root-dashboard.config.js',
    'src/js/app/root-dashboard/controllers/*.js',
    'src/js/app/root-dashboard/services/*.js',

    // Dashboard module
    'src/js/app/dashboard/dashboard.module.js',
    'src/js/app/dashboard/services/*.js',
    'src/js/app/dashboard/controllers/*.js',

    // Users module
    'src/js/app/users/users.module.js',
    'src/js/app/users/services/*.js',
    'src/js/app/users/controllers/*.js',

    // Tags module
    'src/js/app/tags/tags.module.js',
    'src/js/app/tags/services/*.js',
    'src/js/app/tags/controllers/*.js',

    // Categories module
    'src/js/app/categories/categories.module.js',
    'src/js/app/categories/services/*.js',
    'src/js/app/categories/controllers/*.js',

    // Articles module
    'src/js/app/articles/articles.module.js',
    'src/js/app/articles/services/*.js',
    'src/js/app/articles/controllers/*.js',

    // Files module
    'src/js/app/files/files.module.js',
    'src/js/app/files/services/*.js',
    'src/js/app/files/controllers/*.js',
    'src/js/app/files/directives/*.js'
], 'dist/assets/js/app.js');

// Notifications
mix.js('src/js/notifications.js', 'dist/assets/js');

mix.sass(
    // Application Sass
    'src/sass/app.scss',
'assets/css/app.css');

mix.copy([
    // All Application Views
    'src/js/app/*/views/*.html',
], 'dist/views');

mix.copy([
    // Application Images
    'src/img/*.jpg'
], 'dist/assets/img');
