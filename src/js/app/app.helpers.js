'use strict';

var view = function (viewName)
{
    return 'views/' + viewName;
}

var url = function (path)
{
    return env.APP_URL + path;
}

var api_url = function (path)
{
    return env.API_URL + path;
}

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
}
