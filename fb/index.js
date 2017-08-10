var calls = [],
    initialized = false,
    loaded = false,
    initialize = function() {

        window.fbAsyncInit = function() {
            loaded = true;
            delete fb.init;
            fb.__proto__ = FB;
            delete window.FB;
            fb.init(fb.config);
            calls.forEach(function(call) {
                call(fb);
            });
        };

        var script = document.createElement('script'),
                firstScript = document.getElementsByTagName('script')[0];

        script.async = 1;
        script.src = 'https://connect.facebook.net/en_US/sdk.js';

        firstScript.parentNode.insertBefore(script, firstScript);
        
        initialized = true;

    },
    fb = function(call) {
        if(!initialized && fb.config)
            initialize();
        return loaded ? call(fb) : calls.push(call);
    };
    fb.config = null;
    fb.init = function(config) {
        fb.config = config;
        initialize();
    };

module.exports = fb;