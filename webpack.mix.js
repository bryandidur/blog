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
], 'dist/assets/js/vendor.js');

mix.scripts([
    // Application JavaScript
    'src/js/layout/app.js',
    'src/js/app/app.env.js',
    'src/js/app/app.helpers.js',
    'src/js/app/app.module.js',
    'src/js/app/app.config.js',

    // Validation module
    'src/js/app/validation/validation.module.js',
    'src/js/app/validation/directives/validateEmail.js',
    'src/js/app/validation/directives/validatePasswordConfirmation.js',

    // Auth module
    'src/js/app/auth/auth.module.js',
    'src/js/app/auth/auth.config.js',
    'src/js/app/auth/services/RefreshAuthorizationHeaderService.js',
    'src/js/app/auth/services/AuthService.js',
    'src/js/app/auth/services/ForgotPasswordService.js',
    'src/js/app/auth/services/ResetPasswordService.js',
    'src/js/app/auth/controllers/LoginController.js',
    'src/js/app/auth/controllers/ForgotPasswordController.js',
    'src/js/app/auth/controllers/ResetPasswordController.js',

    // Root Dashboard module
    'src/js/app/root-dashboard/root-dashboard.module.js',
    'src/js/app/root-dashboard/root-dashboard.config.js',
    'src/js/app/root-dashboard/controllers/RootDashboardController.js',
    'src/js/app/root-dashboard/services/AuthorizationHttpInterceptorService.js',

    // Dashboard module
    'src/js/app/dashboard/dashboard.module.js',
    'src/js/app/dashboard/controllers/DashboardController.js',

    // Users module
    'src/js/app/users/users.module.js',
    'src/js/app/users/controllers/UsersListController.js',
    'src/js/app/users/controllers/UsersRegisterController.js',
    'src/js/app/users/controllers/UsersProfileController.js',

    // Tags module
    'src/js/app/tags/tags.module.js',
    'src/js/app/tags/controllers/TagsListController.js',
    'src/js/app/tags/controllers/TagsCreateController.js',
    'src/js/app/tags/controllers/TagsUpdateController.js',
], 'dist/assets/js/app.js');

mix.copy([
    // All Application Views
    'src/js/app/*/views/*.html',
], 'dist/views');

mix.sass(
    // Application Sass
    'src/sass/app.scss',
'assets/css/app.css');


mix.copy([
    // Application Images
    'src/img/*.jpg'
], 'dist/assets/img');
