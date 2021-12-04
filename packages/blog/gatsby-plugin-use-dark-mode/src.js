(function () {
  window.__currentTheme = (function () {
    var e;
    try {
      e = window.localStorage.getItem('theme');
    } catch (e) {}
    if ('dark' == e || 'light' == e) return e;
    var t = window.matchMedia('(prefers-color-scheme: dark)');
    return 'boolean' == typeof t.matches && t.matches ? 'dark' : 'light';
  })();
  if ('dark' == window.__currentTheme) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
  var m = document.getElementsByName('theme-color');
  if (undefined != typeof m[0])
    m[0].setAttribute(
      'content',
      'dark' == window.__currentTheme ? '#1c1c1e' : '#ffffff'
    );
})();
