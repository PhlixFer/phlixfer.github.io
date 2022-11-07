const commsDone = [
	{
		clientName: "starting funds",
		totalPaid: 99,
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
progressFraction.innerHTML = "$" + total.toLocaleString('en') + " / $" + totalToRaise.toLocaleString('en');