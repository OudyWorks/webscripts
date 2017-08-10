var id = 'webscripts-tw',
    calls = [],
    initialized = false,
    loaded = false,
    initialize = function() {

        window.twttr = {};
        window.twttr._e = [];
        window.twttr.ready = function(call) {
            window.twttr._e.push(call);
        };


        window.twttr.ready(
            function() {
                loaded = true;
                tw.__proto__ = window.twttr;
                calls.forEach(call => {
                    call(tw)
                });
                delete window.twttr;
            }
        );

        var script = document.createElement('script'),
            firstScript = document.getElementsByTagName('script')[0];

        script.async = 1;
        script.src = 'https://platform.twitter.com/widgets.js';

        firstScript.parentNode.insertBefore(script, firstScript);
        
        initialized = true;

    },
    tw = function(call) {
        if(!initialized)
            initialize();
        return loaded ? call(tw) : calls.push(call);
    };

module.exports = tw;