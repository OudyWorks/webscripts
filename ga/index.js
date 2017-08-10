var id = 'webscripts-ga',
    initialized = false,
    initialize = function() {
        window['GoogleAnalyticsObject'] = id;
        window[id] = window[id] || function() {
            if(!window[id].q) {

                var script = document.createElement('script'),
                    firstScript = document.getElementsByTagName('script')[0];

                window[id].l = 1 * new Date();

                script.async = 1;
                script.src = 'https://www.google-analytics.com/analytics.js';

                firstScript.parentNode.insertBefore(script, firstScript);
                
                initialized = true

            }
            (window[id].q = window[id].q || []).push(arguments);
        };
    },
    ga = function () {
        if(!initialized)
            initialize();
        return window[id].apply(window[id], arguments);
    };

module.exports = ga;