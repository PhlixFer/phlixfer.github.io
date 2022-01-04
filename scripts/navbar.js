function borgorMenu() {

    // idk how to javascript so here's some yanderedev-level looping

  var x = document.getElementById('navbar');

  if (x.className == "navbar") {
    x.className += " smol";
  } else {
    x.className = "navbar";
  }

  var x = document.getElementById('borgor-icon');

  if (x.className == "borgor-container") {
    x.className += " smol";
  } else {
    x.className = "borgor-container";
  }

}
