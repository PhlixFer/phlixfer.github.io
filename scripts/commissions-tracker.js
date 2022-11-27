const totalToRaise = 1437;
var total = 50;

var progressed = ( 100 * total ) / totalToRaise;

let progressBar = document.getElementById('progress-bar');
progressBar.style.width = progressed + '%';

let progressFraction = document.getElementById('progress-fraction');
progressFraction.innerHTML =  Math.round(progressed) + "% of $" + totalToRaise.toLocaleString('en');