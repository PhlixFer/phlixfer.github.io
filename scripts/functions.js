export function setCookie(name, value, daysToExpiration) {
	const date = new Date();
	date.setTime(date.getTime() + (daysToExpiration*24*60*60*1000)); // sets the expiration date by adding the amount of time until expiration, converted to milliseconds, to the current date
	let expiryDate = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expiryDate + ";path=/";
}

export function readCookie(name) {
	let cookies = document.cookie;
	let formattedName = name + "=";
	let regex = new RegExp(\${formattedName}(.*?)\;);
	let value = cookies.match(regex);
	
	console.log(value[0]);
	
	return value[0];
}