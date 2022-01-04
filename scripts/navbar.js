function borgorMenu() {

    // idk how to javascript so here's some yanderedev-level looping

  var x = document.getElementById('navbar');

  if (x.className == "navbar") {
    x.className += " smol";
  } else {
    x.className = "navbar";
  }

  var x = document.getElementById('navbar-item');

  if (x.className == "navbar-item") {
    x.className += " smol";
  } else {
    x.className = "navbar-item";
  }

  var x = document.getElementById('navbar-text');

  if (x.className == "navbar-text") {
    x.className += " smol";
  } else {
    x.className = "navbar-text";
  }

}
