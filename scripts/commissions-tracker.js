const commsDone = [
	{
		clientName: "dummy",
		totalPaid: 0,
	},
]

const totalToRaise = 1388;
var total = 0;

commsDone.forEach((item) => {
	total += item.totalPaid;
})

var progressed = ( 100 * total ) / totalToRaise;

let progressBar = document.getElementById('progress-bar');
progressBar.style.width = progressed + '%';

let progressFraction = document.getElementById('progress-fraction');
progressFraction.innerHTML =  Math.round(progressed) + "% of $" + totalToRaise.toLocaleString('en');