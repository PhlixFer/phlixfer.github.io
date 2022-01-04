function borgorMenu() {

  var x = document.getElementById('navbar');

  // idk how to javascript so here's some yanderedev-level looping

  if (x.className == "navbar") {
    x.className += " smol";
  } else {
    x.className = "navbar";
  }

  if (x.className == "navbar-item") {
    x.className += " smol";
  } else {
    x.className = "navbar-item";
  }

  if (x.className == "navbar-text") {
    x.className += " smol";
  } else {
    x.className = "navbar-text";
  }

}
