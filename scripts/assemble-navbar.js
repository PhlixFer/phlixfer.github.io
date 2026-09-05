import pagesList from '/scripts/pages.json' with {type: 'json'};

// navbar assembly
let navbar = document.getElementById("navbar");
let isHomepage = document.title == pagesList.pages_en[0].displayTitle;

// creates mobile navbar toggle
let navbarToggle = document.createElement("div");
navbarToggle.id = "navbar-toggle";
navbar.appendChild(navbarToggle);

navbarToggle = document.getElementById("navbar-toggle");

let burgerMenu = lottie.loadAnimation({
	container: navbarToggle,
	renderer: 'svg',
	loop: false,
	autoplay: false,
	path: '/media/icons/burger-menu.json'
});

// adds navbar items
for (const page of pagesList.pages_en) {
	let navbarButton = document.createElement("div");
	navbarButton.innerHTML = `${page.title}`;
	let navbarItem = document.createElement("a");
	navbarItem.href = `${page.url}`;
	if (isHomepage) {
		navbarItem.setAttribute("class", "navbar-item translucent-box-medium");
	} else if (page.displayTitle == document.title) {
		navbarItem.setAttribute("class", "navbar-item navbar-item-selected");
	} else {
		navbarItem.setAttribute("class", "navbar-item");
	}
	navbarItem.appendChild(navbarButton);
	navbar.appendChild(navbarItem);
}

// plays mobile navbar toggle's animation based on whether it is open or not
let showNavbar = true;
document.getElementById("navbar-toggle").addEventListener("mousedown", (event) => {
	if (showNavbar) {
		navbar.setAttribute("class", "translucent-box-medium");
		burgerMenu.playSegments([1, 31], true);
	} else {
		navbar.setAttribute("class", "navbar-closed translucent-box-medium");
		burgerMenu.playSegments([31, 61], true);
	}
	showNavbar = !showNavbar;
});

// footer assembly
let footer = document.createElement("footer");
let footerBackground = document.createElement("div");
footerBackground.id = "footer-background";
footer.appendChild(footerBackground);

footer.appendChild(assembleFooter(pagesList.pages_en));

function assembleFooter(sitemapPagesList) {
	
	let footerPartOneContainer = document.createElement("div");
	footerPartOneContainer.innerHTML = `
	<h2>sitemap</h2>
	<ul id="sitemap-list"></ul>`;
	let sitemapList = footerPartOneContainer.querySelector('#sitemap-list');
	for (const item of sitemapPagesList) {
		let listItem = document.createElement("li");
		let pageLink = document.createElement("a");
		pageLink.href = item.url;
		pageLink.textContent = item.title;
		listItem.appendChild(pageLink);
		sitemapList.appendChild(listItem);
	}
	
	let footerPartTwoContainer = document.createElement("div");
	footerPartTwoContainer.innerHTML = `
	<h2>links</h2>
	<ul id="misc-link-list"></ul>`;
	let miscellaneousLinks = footerPartTwoContainer.querySelector('#misc-link-list');
	let miscellaneousLinksList = [
		{
			"title": "twitter",
			"url": "https://x.com/phlixfer"
		},
		{
			"title": "bluesky",
			"url": "https://bsky.app/profile/phlixfer.bsky.social"
		},
		{
			"title": "youtube",
			"url": "https://youtube.com/@phlixfer"
		},
		{
			"title": "patreon",
			"url": "https://patreon.com/phlixfer"
		},
		{
			"title": "twitch",
			"url": "https://twitch.com/phlixfer"
		},
		{
			"title": "tumblr",
			"url": "https://tumblr.com/phlixfer"
		},
		{
			"title": "discord",
			"url": "https://discord.gg/gp5SS6hv"
		}
	];
	for (const item of miscellaneousLinksList) {
		let listItem = document.createElement("li");
		let pageLink = document.createElement("a");
		pageLink.href = item.url;
		pageLink.setAttribute("target", "_blank");
		pageLink.textContent = item.title;
		listItem.appendChild(pageLink);
		miscellaneousLinks.appendChild(listItem);
	}
	
	let footerTextContentContainer = document.createElement("div");
	footerTextContentContainer.id = "footer-text-content-container";
	footerTextContentContainer.appendChild(footerPartOneContainer);
	footerTextContentContainer.appendChild(footerPartTwoContainer);
	
	let footerPostscriptContainer = document.createElement("div");
	footerPostscriptContainer.id = "footer-postscript-container";
	let footerPostscriptList = [
		{"element": "p", "content": "written and designed by chloé from phlixfer <3"},
		{"element": "a", "content": "phlixfermusic@gmail.com", "url": "mailto:phlixfermusic@gmail.com"},
		{"element": "p", "content": "schaff schöne dinge, bitte"}
	];
	let footerPostscriptText = document.createElement("div");
	for (const item of footerPostscriptList) {
		let element = document.createElement(item.element);
		element.textContent = item.content;
		if (item.element == "a") {element.href = item.url}
		footerPostscriptText.appendChild(element);
	}
	footerPostscriptContainer.appendChild(footerPostscriptText);
	footerPostscriptContainer.innerHTML += `
	<svg width="100%" height="100%" viewBox="0 0 626 685" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
	    <g transform="matrix(1,0,0,1,-1556,-3677)">
	        <g id="Artboard2" transform="matrix(1,0,0,1,-0.243291,-0.126733)">
	            <rect x="1556.24" y="3677.13" width="625.112" height="684.922" style="fill:none;"/>
	            <clipPath id="_clip1">
	                <rect x="1556.24" y="3677.13" width="625.112" height="684.922"/>
	            </clipPath>
	            <g clip-path="url(#_clip1)">
	                <g transform="matrix(1.71693,0,0,1.71693,1222.87,3135.89)">
	                    <path d="M438.414,539.188C440.286,534.645 442.269,527.29 440.686,518.611C426.022,438.19 429.542,401.061 462.861,365.971C495.132,331.984 508.804,363.485 527.272,363.233C545.741,362.98 577.853,393.262 542.559,416.122C507.265,438.982 476.698,478.912 484.025,529.011C486.719,547.427 485.366,556.32 482.799,560.074C464.816,555.643 446.312,556.634 429.263,566.887C387.652,591.912 375.656,611.425 376.13,660.1C376.544,702.645 343.596,689.08 308.917,693.016C274.238,696.952 247.529,733.533 233.926,700.595C220.322,667.656 281.445,620.261 338.736,595.745C325.561,584.071 257.76,606.287 223.861,627.733C189.963,649.18 192.398,617.322 202.028,601.943C211.658,586.564 196.006,569.786 237.158,546.549C262.756,532.094 285.825,535.481 314.38,543.671C333.06,550.23 336.613,553.156 358.039,568.203C352.896,563.139 349.052,558.269 345.023,552.967C345.078,552.984 345.133,553 345.188,553.017C333.852,538.846 321.148,521.055 302.458,506.999C264.848,478.714 227.648,486.354 219.213,501.953C212.156,515.003 190.89,518.778 196.787,503.725C202.684,488.671 227.932,466.31 281.868,487.884C324.421,504.904 336.106,539.568 363.045,558.12C366.697,559.1 370.447,560.062 374.303,560.993C363.107,507.893 308.797,495.618 288.347,443.188C267.896,390.758 303.759,373.613 323.281,361.964C341.666,350.993 343.743,343.14 360.385,344.353C377.028,345.567 389.985,367.626 393.609,415.295C397.166,462.087 408.485,498.406 419.561,520.754C404.191,473.454 398.023,397.197 431.933,346.07C443.617,328.455 452.431,319.887 458.436,316.754C474.205,308.528 472.529,338.057 450.668,339.178C434.212,340.023 416.19,382.567 413.244,434.649C411.052,473.387 428.074,519.62 438.414,539.188ZM313.042,643.713C320.078,628.937 334.241,617.688 345.313,614.175C346.54,613.786 347.219,612.477 346.83,611.25C346.441,610.024 345.131,609.345 343.904,609.734C331.893,613.544 316.468,625.681 308.835,641.709C308.282,642.871 308.775,644.261 309.936,644.814C311.098,645.367 312.488,644.874 313.042,643.713ZM270.918,571.853C271.524,571.277 272.533,570.84 273.77,570.434C276.081,569.676 279.109,569.166 282.347,568.87C287.32,568.416 292.78,568.479 296.986,569.036C299.426,569.359 301.407,569.779 302.428,570.473C303.493,571.196 304.941,570.919 305.664,569.854C306.387,568.79 306.11,567.341 305.046,566.618C303.95,565.874 302.122,565.217 299.793,564.769C295.104,563.867 288.157,563.66 281.923,564.23C278.295,564.561 274.907,565.158 272.317,566.007C270.287,566.673 268.704,567.53 267.708,568.475C266.775,569.362 266.738,570.836 267.624,571.769C268.51,572.702 269.985,572.74 270.918,571.853ZM357.792,461.912C359.45,469.825 363.313,476.214 367.126,482.456C370.653,488.232 374.147,493.866 375.358,500.708C375.583,501.975 376.792,502.82 378.059,502.596C379.325,502.371 380.171,501.162 379.946,499.895C378.631,492.464 374.934,486.301 371.102,480.028C367.557,474.223 363.894,468.314 362.353,460.956C362.089,459.697 360.854,458.89 359.595,459.154C358.335,459.418 357.528,460.652 357.792,461.912ZM492.155,387.288C478.594,396.401 472.001,417.499 474.667,432.56C474.892,433.827 476.101,434.672 477.368,434.448C478.635,434.224 479.48,433.015 479.256,431.748C476.868,418.264 482.613,399.314 494.754,391.156C495.822,390.438 496.106,388.991 495.388,387.923C494.671,386.855 493.223,386.571 492.155,387.288ZM418.553,581.08C465.346,548.013 494.027,571.446 504.411,585.824C511.871,596.154 516.109,612.506 500.826,625.381C483.906,639.633 460.76,665.643 450.134,688.168C440.951,707.636 420.825,715.938 403.865,691.382C379.611,656.266 377.137,610.347 418.553,581.08ZM428.435,602.435C427.333,613.301 426.673,624.104 428.277,632.967C429.418,639.264 431.705,644.613 435.613,648.479C436.528,649.384 438.003,649.376 438.908,648.461C439.813,647.546 439.805,646.071 438.89,645.166C435.62,641.932 433.816,637.405 432.862,632.136C431.326,623.651 432.016,613.309 433.071,602.906C433.201,601.626 432.268,600.483 430.988,600.353C429.708,600.223 428.565,601.155 428.435,602.435ZM490.113,521.586C515.09,539.712 528.226,574.762 526.212,606.909C522.978,658.542 537.645,670.301 537.645,670.301L519.691,686.558C519.691,686.558 486.565,677.292 468.886,671.81C473.025,659.453 493.154,639.608 506.102,628.782C513.468,622.623 518.928,610.952 517.158,601.076C514.629,586.971 504.227,570.478 490.367,564.258C493.709,554.412 493.591,536.627 490.113,521.586Z" />
	                </g>
	            </g>
	        </g>
	    </g>
	</svg>`;
	
	let footerContentContainer = document.createElement("div");
	footerContentContainer.id = "footer-content-container";
	footerContentContainer.appendChild(footerTextContentContainer);
	footerContentContainer.appendChild(footerPostscriptContainer);
	
	return footerContentContainer;
}

document.body.appendChild(footer);