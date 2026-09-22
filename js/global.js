const canonical = document.querySelector('link[rel="canonical"]');

if (canonical) {
    canonical.href = window.location.href.split('#')[0];
}
