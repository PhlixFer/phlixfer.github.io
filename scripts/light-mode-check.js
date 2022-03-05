function activateLightMode() {
  document.querySelector('meta[name="theme-color"]').setAttribute("content", "#e5e5e5");
}

function activateDarkMode() {
  document.querySelector('meta[name="theme-color"]').setAttribute("content", "#222222");
}

window.matchMedia("(prefers-color-scheme: light)").addListener(
  // e => e.matches && activateDarkMode()
  function(e) {
    if (e.matches) {
      activateLightMode()
    } else {
      activateDarkMode()
    }
  }
);
