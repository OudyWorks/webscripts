var ids = [],
    fbq = function() {
        if(arguments[0] == 'init')
            ids.push(arguments[1]);
        return fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    },
    initialized = false,
    initialize = function() {
        window.fbq = fbq;
        if (!window._fbq)
            window._fbq = fbq;
        fbq.push = fbq;
        fbq.loaded = false;
        fbq.version = '2.0';
        fbq.queue = [];

        var script = document.createElement('script'),
            firstScript = document.getElementsByTagName('script')[0];

        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';

        script.onload = function() {
            let a = setInterval(() => {
                var done = ids.reduce(
                    function(a, b) {
                        return a && fbq.instance.configsLoaded[b];
                    },
                    true
                );
                if(done) {
                    clearInterval(a);
                    delete window.fbq;
                    delete window._fbq;
                }
            }, 10);
        }

        firstScript.parentNode.insertBefore(script, firstScript);
                
        initialized = true;
        
    };

module.exports = function () {
    if(!initialized)
        initialize();
    return fbq.apply(fbq, arguments);
}