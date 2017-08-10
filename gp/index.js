var id = 'webscripts-gp',
    calls = [],
    initialized = false,
    loaded = false,
    initialize = function() {

        window[id] = function() {
            loaded = true;
            gp.__proto__ = window.gapi;
            calls.forEach(call => {
                call(gp)
            });
            delete window.gapi;
        };

        window.___gcfg = {
            parsetags: 'explicit'
        }

        var script = document.createElement('script'),
            firstScript = document.getElementsByTagName('script')[0];

        script.async = 1;
        script.src = 'https://apis.google.com/js/platform.js?onload='+id;

        firstScript.parentNode.insertBefore(script, firstScript);
        
        initialized = true;

    },
    gp = function(call) {
        if(!initialized)
            initialize();
        return loaded ? call(gp) : calls.push(call);
    };

module.exports = gp;