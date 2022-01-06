// check if platform is mobile
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ||
   (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.platform))) {
    var check = true;
}

// add mobile class for styling if platform is mobile
function mobilify() {
  var x = document.getElementById('navbar');
  if (x.className == 'navbar') {
    x.className += ' mobile';
  } else {
    x.className = "navbar";
  }
}

if (check == true) {
  mobilify();
}

// add active class for active mobile navbar styling
function borgorMenu() {
  x = document.getElementById('navbar');

  if (x.className == 'navbar mobile') {
    x.className += ' active';
  } else {
    x.className = 'navbar mobile';
  }
}
