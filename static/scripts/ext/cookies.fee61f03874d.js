document.addEventListener("DOMContentLoaded", function(event) {
  const setCookie = function(name, value, expiration) {
    const date = new Date();
    date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }

  const getCookie = function(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleConsentCookie = function() {
    const cookieHandler = document.querySelector('.cookie-banner__handler');
    const cookieBanner = document.querySelector('.cookie-banner');

    const consentCookie = getCookie('cookieConsent');
    if (consentCookie) {
      cookieBanner.style.display = 'none';
    } else {
      cookieBanner.style.display = 'flex';
      cookieHandler.addEventListener('click', () => {
        setCookie('cookieConsent', '1', 365);
        cookieBanner.style.display = 'none';
      });
    }
  }

  handleConsentCookie();
});
