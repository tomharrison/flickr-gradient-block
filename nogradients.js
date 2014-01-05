(function () {
    var fadeCache = {},
        hasFadeClass = 'hasFlickrFade',
        markerClass = 'fadeRemoved',
        randUpperLimit = 100000;

    function cacheFade(fadeEl, triggerEl) {
        var id = triggerEl.getAttribute('id');
        if (id !== null && id !== '') {
            fadeCache[id] = fadeEl;
        }
    }

    function getCachedFade(triggerEl) {
        var id = triggerEl.getAttribute('id');
        if (id !== null && id !== '' && id in fadeCache) {
            return fadeCache[id];
        }
        return null;
    }

    function parentsQuerySelector(sel, el) {
        var p = el.parentNode;
        while (p !== null) {
            if (p.webkitMatchesSelector(sel)) {
                return p;
            }
            p = p.parentNode;
        }
        return null;
    }

    function findFade(triggerEl) {
        var fade, p;
        fade = getCachedFade(triggerEl);
        if (typeof fade !== 'undefined' && fade !== null) {
            return fade;
        }

        p = parentsQuerySelector('.imgWrapper', triggerEl);
        if (p !== null) {
            fade = p.querySelector('.fade-big,.fade-small');
            if (fade !== null) {
                cacheFade(fade, triggerEl);
                return fade;
            }
        }
        return null;
    }

    function handleMouseOver() {
        var fadeEl = findFade(this);
        if (fadeEl !== null && typeof fadeEl !== 'undefined' && !fadeEl.classList.contains(hasFadeClass)) {
            fadeEl.classList.add(hasFadeClass);
        }
    }

    function handleMouseOut() {
        var fadeEl = findFade(this);
        if (fadeEl != null && typeof fadeEl !== 'undefined') {
            fadeEl.classList.remove(hasFadeClass);
        }
    }

    function generateId() {
        return 'nogradients' + (Math.floor(Math.random() * randUpperLimit) + 1);
    }

    function bindEvents() {
        var nodes = document.querySelectorAll('.imgWrapper .buddyicon:not(.'+markerClass+'),.imgWrapper .usernameLink:not(.'+markerClass+'),.imgWrapper .activity-item-date:not('+markerClass+')'),
            i = nodes.length;
        while (i--) {
            var el = nodes[i],
                id = el.getAttribute('id');
            el.addEventListener('mouseover', handleMouseOver, false);
            el.addEventListener('mouseout', handleMouseOut, false);
            el.classList.add(markerClass);

            if (id === null) {
                el.setAttribute('id', generateId());
            }
        }
    }

    /* Source: http://stackoverflow.com/a/5706881/435084 */
    var tid = setInterval(function () {
        if (document.readyState !== 'complete') {
            return;
        }
        clearInterval(tid);
        bindEvents();
    }, 100);
})();
