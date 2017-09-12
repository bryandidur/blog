/*
|--------------------------------------------------------------------------
| Main Root Dashboard Configuration Setup
|--------------------------------------------------------------------------
|
| Set up the HTTP interceptors and other main configurations.
|
*/

rootDashboardModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('AuthorizationHttpInterceptorService');
    }
]);

rootDashboardModule.run([
    '$transitions', '$injector',
    function ($transitions, $injector)
    {
        /*
        | Policie for checking if user is authenticated
        | to access the root dashboard and its child states.
         */
        $transitions.onStart({}, function (trans)
        {
            var toState = trans.to();
            var toStateBelongsToRootDashboardState = toState.parent == 'root-dashboard';
            var AuthService = $injector.get('AuthService');

            if ( ! AuthService.isAuthenticated() && toStateBelongsToRootDashboardState ) {
                // User isn't authenticated. Redirect to a new Target State
                return trans.router.stateService.target('login');
            }
        });
    }
]);
