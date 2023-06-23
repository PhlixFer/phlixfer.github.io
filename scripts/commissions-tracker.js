const totalToRaise = 8000;
var total = 0;

var progressed = ( 100 * total ) / totalToRaise;

let progressBar = document.getElementById('progress-bar');
progressBar.style.width = progressed + '%';

let progressFraction = document.getElementById('progress-fraction');
progressFraction.innerHTML =  Math.round(progressed) + "% of $" + totalToRaise.toLocaleString('en');