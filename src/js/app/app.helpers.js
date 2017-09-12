/**
 * Generate an Application URL for the path.
 *
 * @param  string path
 * @return string
 */
var url = function (path)
{
    return env.APP_URL + path;
};

/**
 * Generate an API URL for the path.
 *
 * @param  string path
 * @return string
 */
var api_url = function (path)
{
    return env.API_URL + path;
};

/**
 * Generate the full view path for the view name.
 *
 * @param  string viewName
 * @return string
 */
var view = function (viewName)
{
    return 'views/' + viewName;
};

/**
 * Shows an toast to notify an message the user.
 *
 * @param  string message
 * @param  string state
 * @param  number timeout
 * @return void
 */
var notify = function (message, state, timeout)
{
    var title, states, timeout;
    states = ['success', 'error', 'info', 'warning'];
    state = (state && states.indexOf(state) > -1) ? state : 'success';
    timeout = timeout ? parseInt(timeout) : 5000;

    switch (state) {
        case 'success': title = 'OK!'; break;
        case 'error': title = 'Falha!'; break;
        case 'info': title = 'Atenção!'; break;
        case 'warning': title = 'Aviso!'; break;
    }

    toastr[state](message, title, {
        escapeHtml: true,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: timeout,
    });
};

/**
 * Display server (API) messages to the user,
 * with the help of the "notify()" helper.
 *
 * @param  object data
 * @param  string state
 * @param  number timeout
 * @return void
 */
var show_messages = function (data, state, timeout) {
    if ( data instanceof Object ) {
        var i, key, msgs = '';

        for (key in data) {
            if ( data[key] instanceof Array ) {
                for (i = 0; i < data[key].length; i++) {
                    msgs += data[key][i] + '<br>';
                }
            } else {
                msgs = data[key];
            }
        }

        notify(msgs, state, timeout);
    }
};

/**
 * Alias for "console.log()".
 *
 * @param  mixed args
 * @return void
 */
var log = function (args) {
    var argsLength = arguments.length;
    for (var i = 0; i < argsLength; i++) {
        console.log(arguments[i]);
    }
};
