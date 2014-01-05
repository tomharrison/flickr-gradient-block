(function () {
    var fadeCache = {},
        hasFadeClass = 'hasFlickrFade',
        fadeRemovedClass = 'fadeRemoved';

    function cacheFade(fadeEl, avatarEl) {
        var id = avatarEl.getAttribute('id');
        if (id !== null && id !== '') {
            fadeCache[id] = fadeEl;
        }
    }

    function getCachedFade(avatarEl) {
        var id = avatarEl.getAttribute('id');
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

    function findFade(avatarEl) {
        var fade, p;
        fade = getCachedFade(avatarEl);
        if (typeof fade !== 'undefined' && fade !== null) {
            return fade;
        }

        p = parentsQuerySelector('.imgWrapper', avatarEl);
        if (p !== null) {
            fade = p.querySelector('.fade-big,.fade-small');
            if (fade !== null) {
                cacheFade(fade, avatarEl);
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

    function bindEvents() {
        var nodes = document.querySelectorAll('.imgWrapper .buddyicon:not(.'+fadeRemovedClass+')'),
            i = nodes.length;
        while (i--) {
            var el = nodes[i];
            el.addEventListener('mouseover', handleMouseOver, false);
            el.addEventListener('mouseout', handleMouseOut, false);
            el.classList.add(fadeRemovedClass);
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
