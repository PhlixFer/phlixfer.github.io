// functions for setting theme-color according to

function activateLightMode() {
  document.querySelector('meta[name="theme-color"]').setAttribute("content", "#f6f6f6");
}
function activateDarkMode() {
  document.querySelector('meta[name="theme-color"]').setAttribute("content", "#212121");
}

// check if color scheme is light and set conditional to execute the proper function accordingly

const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: light)");
const setColorScheme = e => {
  if (e.matches) {activateLightMode()} else {activateDarkMode()}
}

// initialize and calls the conditional with addEventListener

setColorScheme(colorSchemeQueryList);
colorSchemeQueryList.addEventListener("change", setColorScheme);

// old code

// window.matchMedia("(prefers-color-scheme: light)").addEventListener(
//   "change",
//   // e => e.matches && activateLightMode()
//   function(e) {
//     if (e.matches) {
//       activateLightMode()
//     } else {
//       activateDarkMode()
//     }
//   }
// );
