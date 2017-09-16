
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');

/*
|--------------------------------------------------------------------------
| Laravel Echo Setup
|--------------------------------------------------------------------------
|
*/
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'efc0c357233452db718a',
    cluster: 'us2',
    encrypted: true
});

/*
|--------------------------------------------------------------------------
| Channels Definitions
|--------------------------------------------------------------------------
|
*/
var filesChannel = window.Echo.channel('filesChannel');

/*
|--------------------------------------------------------------------------
| Channels Listeners
|--------------------------------------------------------------------------
|
*/
filesChannel.listen('ProcessFileEvent', function (data) {
    notify(data.message, data.status);
});
