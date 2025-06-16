let modalHandler;
import("/scripts/modal-handler.js").then((response) => {
	modalHandler = response;
});

let portfolioItems = null;
let firstTimeLoad = false;

fetch("/scripts/portfolio-items.json")
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		portfolioItems = data;
		parseDir();
		firstTimeLoad = true;
	})
	.catch(error => console.error('cannot load portfolio-items.json', error));

// this file browser system revolves around the file path string. when parseDir() is run, it splits the file path into an array. it then loops through that array, delving deeper into the nested items of the portfolio-lists.json file by the indices in the array until it reaches the correct child list. after that, it then loops through each of its children to push the items to the DOM.
// i'm really proud of myself for figuring this out and building it all by myself, even if it's so basic oml 😭
// one issue with this system that will need a refactor in the future is the fact that it is very reliant on the order of everything being in one specific way: the way it is laid out in the .json file. a better bethod— i feel— would be to assign each folder and item a unique id, and navigate based on that instead. this way, i would be able to sort the displayed items however i'd like, independent of their order in the .json file. but that's a job for later me, i'm too tired -^-

let listContainer = document.getElementById("portfolio-browser-list-container");
let browserName = document.getElementById("window-toolbar-title");
let toolbarBackButton = document.getElementById("back-button");
let folderPath = "/";
let currentIndex = 0;
let nextIndex = 0;

function navigateForward(newIndex) {
	folderPath += newIndex + "/";
	parseDir();
	currentIndex = newIndex;
}

function navigateBack() {
	nextIndex = currentIndex;
	let folderPathArray = folderPath.split("/");
	folderPath = folderPathArray.slice(1,folderPathArray.length-2).length == 1 ?
	"/" + folderPathArray.slice(1,folderPathArray.length-2).join("/") + "/" :
	"/"; // if not at the root, set the folder path to the folder path, minus the last item
	parseDir();
	currentIndex = folderPathArray[folderPathArray.length];
}

function parseDir() {
	// makes sure the list is clear of dom elements before repopulating it
	let currentListItems = document.querySelectorAll(".list-item-container");
	if (currentListItems.length != 0)
	{
		for (const listItem of currentListItems)
		{
			listItem.remove();
		}
	}
	
	// parses the file path into a readable array
	let folderPathArray = folderPath.split("/");
	folderPathArray.splice(0,1); // at index 0, remove 1 item
	folderPathArray.splice(folderPathArray.length-1,1); // at the last index, remove 1 item
	let currentDirectory = portfolioItems;
	
	// "navigate" to the current position in the file system
	let i = 0;
	for (const index of folderPathArray)
	{
		currentDirectory = currentDirectory.directories[index];
		i++;
	}
	
	parseFolders(currentDirectory.directories);
	parseItems(currentDirectory.items);
	if (folderPathArray.length == 0) {
		browserName.innerHTML = "home";
		// disables the back button when at the root directory
		toolbarBackButton.setAttribute("class", `${toolbarBackButton.getAttribute("class")} toolbar-item-disabled`);
		// add animated icons to top directories
		let customIconTargets = [
			{
				"target": document.getElementById("visual-portfolio-item").querySelector("div"),
				"animatedIconPath": "/media/icons/visual-portfolio-folder.json"
			},
			{
				"target": document.getElementById("aural-portfolio-item").querySelector("div"),
				"animatedIconPath": "/media/icons/aural-portfolio-folder.json"
			},
			{
				"target": document.getElementById("reels-portfolio-item").querySelector("div"),
				"animatedIconPath": "/media/icons/reels-portfolio-folder.json"
			}
		];
		loadLottieAnimations(customIconTargets);
	} else {
		browserName.innerHTML = currentDirectory.dirName;
		toolbarBackButton.setAttribute("class", `${toolbarBackButton.getAttribute("class").replace(" toolbar-item-disabled","")}`);
	}
}

// handles adding animated thumbnails to appropriate items
function loadLottieAnimations(customIconTargets) {
	let delayTime = 0;
	for (const target of customIconTargets)
	{
		let animatedIcon = lottie.loadAnimation({
			container: target.target,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: `${target.animatedIconPath}`
		});
		target.target.onpointerenter = (event) => {
			animatedIcon.playSegments([0, 60], true);
		};
		target.target.onpointerleave = (event) => {
			animatedIcon.stop();
		};
		
		// plays the animated icons in a staggered manner on first load
		if (!firstTimeLoad) {
			setTimeout(() => {
				animatedIcon.play();
			}, delayTime);
			delayTime += 150;
		}
	}
}

function parseFolders(folders) {
	let i = 0;
	for (const folder of folders)
	{
		let folderContainer = document.createElement("div");
		folderContainer.setAttribute("class", "list-item-container folder-container");
		folderContainer.setAttribute("onclick", `navigateForward(${i});`);
		if (folder.customId != "")
		{
			folderContainer.id = folder.customId;
		}
		
		let folderThumbnail = document.createElement("div");
		if (!folder.hasCustomIcon) {
			folderThumbnail.setAttribute("class", "folder-thumbnail");
		}
		
		let folderName = document.createElement("p");
		folderName.innerHTML = folder.dirName;
		
		folderContainer.appendChild(folderThumbnail);
		folderContainer.appendChild(folderName);
		
		listContainer.appendChild(folderContainer);
		i++;
	}
}

function parseItems(items) {
	for (const item of items)
	{
		let itemContainer = document.createElement("div");
		itemContainer.setAttribute("class", "list-item-container item-container");
		
		let itemThumbnail = document.createElement("div");
		itemThumbnail.setAttribute("class", "item-thumbnail");
		
		if (item.type == "text")
		{
			itemThumbnail.style.background = `url("/media/icons/browser-icons/text-file-icon.svg")`;
		} else if (item.type == "audio") {
			itemThumbnail.style.background = `url("/media/icons/browser-icons/audio-file-icon.svg")`;
		} else {
			const thumbnail = new Image();
			let aspectRatio;
			thumbnail.onload = function() {
				aspectRatio = this.width / this.height;
				if (aspectRatio > 1) {
					thumbnail.style.width = '80%';
				} else {
					thumbnail.style.height = '80%';
				}
				itemThumbnail.appendChild(thumbnail);
			}
			thumbnail.src = `${item.thumbnailPath}`;
		}
		
		let itemName = document.createElement("p");
		itemName.innerHTML = simpleToSnakeCase(item.name);
		
		let itemDate = document.createElement("p");
		itemDate.setAttribute("class", "item-date");
		itemDate.innerHTML = item.date;
		
		itemContainer.appendChild(itemThumbnail);
		itemContainer.appendChild(itemName);
		
		itemContainer.addEventListener("click", (event) => {
			showItemPreview(item.name, item.path, item.comments, item.date, item.type);
		});
		
		listContainer.appendChild(itemContainer);
	}
}

function toSnakeCase(string) {
	return string.replace(/\W+/g, " ")
		.split(/ |\B(?=[A-Z])/)
		.map(word => word.toLowerCase())
		.join("_");
}

function simpleToSnakeCase(string) {
	return string.split(" ").join("_");
}

// handle preview modal

let previewModalContainer = document.getElementById("preview-modal-container");
let previewAudio = null;

function showItemPreview(name, path, comments, date, type)
	{
	// removes leftover dom elements before adding the new ones
	for (const child of Array.from(previewModalContainer.querySelector("#preview-modal").children)) {
		child.remove();
	}
	for (const child of previewModalContainer.querySelector("#preview-image-info").children) {
		child.remove();
	}
	
	let previewContent = document.getElementById("preview-modal");
	if (type == "image") {
		
		previewModalContainer.setAttribute("class", "image-preview");
		// console.log("this is an image file");
		
		let previewImage = new Image();
		previewImage.src = path;
		let aspectRatio;
		previewImage.onload = function() {
			aspectRatio = this.width / this.height;
			this.style.aspectRatio = `${aspectRatio}`;
			if (aspectRatio >= 1) {
				this.style.width = "100%";
			} else {
				this.style.height = "100%";
			}
		}
		
		let previewImageContainer = document.createElement("div");
		previewImageContainer.id = "preview-image-container";
		previewImageContainer.appendChild(previewImage);
		
		previewContent.appendChild(previewImageContainer);
		
		let imageInfo = previewModalContainer.querySelector("#preview-image-info");
		imageInfo.innerHTML =`
		<h1>${name}</h1>
		<p style="display:none;"><small>${date}</small></p>
		<p style="display:none;">${comments}</p>`;
		
	} else if (type == "audio") {
		
		previewModalContainer.setAttribute("class", "audio-preview");
		// console.log("this is an audio file");
		
		previewAudio = new Audio(path);
		
		let audioInfo = document.createElement("div");
		audioInfo.id = "preview-audio-info";
		audioInfo.innerHTML = `
		<h1>${name}</h1>
		<p><small>${date}</small></p>
		<p>${comments}</p>`;
		
		previewContent.appendChild(audioInfo);
		previewContent.appendChild(previewAudio);
		previewContent.appendChild(addAudioControls("preview-audio-controls", previewAudio));
		
		previewAudio.addEventListener("canplay", (event) => {
			previewAudio.play();
		});
		
	} else if (type == "text") {
		
		previewModalContainer.setAttribute("class", "text-preview");
		// console.log("this is a text file");
		
		let textContent = document.createElement("p");
		textContent.innerHTML = comments;
		previewContent.appendChild(textContent);
		
	} else if (type == "cables_canvas") {
		
		previewModalContainer.setAttribute("class", "canvas-preview");
		// console.log("this is an canvas file");
		
	} else {
		
		throw new Error(`The targeted file is not a valid file!`);
		
	}
	
	let previewModalCloseButton = document.querySelector('#preview-modal-close-button');
	previewModalCloseButton.addEventListener("click", () => {
		modalHandler.toggleModal(previewModalContainer, previewAudio);
	});
	
	modalHandler.toggleModal(previewModalContainer);
}

function addAudioControls(id, targetAudio) {
	let audioControlsContainer = document.createElement("div");
	audioControlsContainer.id = id;
	const audioControlsElements = `
	<div class="audio-timeline">
		<div class="audio-timecodes">
			<p>0:00</p>
			<p>0:00</p>
		</div>
		<div id="progress-bar-container" class="slider-container">
			<progress id="progress-bar" class="progress-bar slider"></progress>
		</div>
	</div>
	<div class="playback-controls">
		<div class="skip-backwards-button">
			<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M35 16.9998C30.678 16.9998 26.732 18.6175 23.7354 21.2703L21.6357 19.1716C20.5108 18.0468 18.8255 17.6956 17.3447 18.2771C15.8645 18.8587 14.8697 20.262 14.8105 21.8513L14.457 31.3972L14.4541 31.6052C14.4695 32.6426 14.8885 33.6373 15.626 34.3748C16.4124 35.161 17.4912 35.5849 18.6025 35.5437L28.1484 35.1902C29.738 35.1312 31.1421 34.1355 31.7236 32.655C32.3051 31.1742 31.9531 29.489 30.8281 28.364L29.4111 26.946C30.9484 25.7255 32.8883 24.9998 35 24.9998C39.9705 24.9998 43.9998 29.0293 44 33.9998C44 38.8151 40.2183 42.7471 35.4629 42.988L35 42.9998L34.7939 43.0046C32.6807 43.1119 31.0001 44.8598 31 46.9998C31 49.1398 32.6806 50.8876 34.7939 50.9949L35 50.9998L35.4385 50.9939C44.6247 50.7613 52 43.242 52 33.9998C51.9998 24.611 44.3887 16.9998 35 16.9998Z"/>
			</svg>
		</div>
		<div class="play-pause-buttons"></div>
		<div class="skip-forwards-button">
			<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M29.5645 16.9998C33.767 16.9998 37.6484 18.4343 40.6895 20.8455L42.3643 19.1716C43.4892 18.0468 45.1745 17.6956 46.6553 18.2771C48.1355 18.8587 49.1303 20.262 49.1895 21.8513L49.543 31.3972L49.5459 31.6052C49.5305 32.6426 49.1115 33.6373 48.374 34.3748C47.5876 35.161 46.5088 35.5849 45.3975 35.5437L35.8516 35.1902C34.262 35.1312 32.8579 34.1355 32.2764 32.655C31.6949 31.1742 32.0469 29.489 33.1719 28.364L34.9619 26.573C33.4349 25.5872 31.5823 24.9998 29.5645 24.9998C24.1203 24.9998 20.0002 29.1878 20 33.9998C20 38.6613 23.8665 42.7377 29.0576 42.988L29.5645 42.9998L29.7705 43.0046C31.8838 43.1119 33.5643 44.8599 33.5645 46.9998C33.5645 49.1398 31.8839 50.8876 29.7705 50.9949L29.5645 50.9998L29.1182 50.9939C19.7768 50.7658 12 43.3978 12 33.9998C12.0002 24.4525 20.0259 16.9998 29.5645 16.9998Z"/>
			</svg>
		</div>
	</div>
	<div class="volume-control">
		<div class="min-volume-icon">
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21.1719 8.96069C22.4618 7.81488 24.5 8.73043 24.5 10.4558V25.5486C24.4999 27.2744 22.4606 28.1896 21.1709 27.0427L16.0625 22.4997H14.5C13.1022 22.4997 12.4029 22.4996 11.8516 22.2712C11.1168 21.9667 10.5329 21.383 10.2285 20.6482C10.0002 20.0969 10 19.3976 10 17.9997C10 16.6023 10.0002 15.9035 10.2285 15.3523C10.533 14.6173 11.1166 14.0328 11.8516 13.7283C12.4029 13.4999 13.1022 13.4997 14.5 13.4997H16.0625L21.1719 8.96069Z"/>
			</svg>
		</div>
		<div id="volume-slider-container" class="slider-container">
			<progress id="volume-slider" class="slider" max="1"></progress>
		</div>
		<div class="max-volume-icon">
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M26.6963 7.93236C27.2488 7.38712 28.1181 7.35777 28.7041 7.84154L28.8174 7.94603L29.0859 8.22338C31.8176 11.1082 33.2499 14.5173 33.25 17.9997C33.25 21.5946 31.7235 25.1109 28.8174 28.0535C28.2353 28.6428 27.2857 28.649 26.6963 28.0671C26.1071 27.4851 26.1008 26.5354 26.6826 25.946C29.1095 23.4888 30.25 20.7046 30.25 17.9997C30.2499 15.464 29.2479 12.8586 27.123 10.5183L26.6826 10.0535L26.5801 9.9392C26.1036 9.34708 26.1439 8.47798 26.6963 7.93236ZM16.1719 8.96068C17.4618 7.81488 19.5 8.73042 19.5 10.4558V25.5486C19.4999 27.2744 17.4606 28.1896 16.1709 27.0427L11.0625 22.4997H9.5C8.10218 22.4997 7.40288 22.4996 6.85156 22.2712C6.11675 21.9667 5.53294 21.383 5.22852 20.6482C5.00015 20.0969 5 19.3976 5 17.9997C5 16.6023 5.00025 15.9035 5.22852 15.3523C5.53296 14.6173 6.11661 14.0328 6.85156 13.7283C7.40288 13.4999 8.10218 13.4997 9.5 13.4997H11.0625L16.1719 8.96068ZM22.4395 11.9392C22.9884 11.3904 23.8572 11.3558 24.4463 11.8357L24.5605 11.9392L24.8779 12.2703C26.4164 13.9454 27.2499 15.9362 27.25 17.9997C27.25 20.201 26.3015 22.3193 24.5605 24.0603C23.9748 24.6461 23.0252 24.6461 22.4395 24.0603C21.8539 23.4745 21.8537 22.5249 22.4395 21.9392C23.6983 20.6803 24.25 19.2983 24.25 17.9997C24.2499 16.7823 23.765 15.4915 22.667 14.2976L22.4395 14.0603L22.3359 13.946C21.856 13.3569 21.8905 12.4882 22.4395 11.9392Z"/>
			</svg>
		</div>
	</div>`;
	audioControlsContainer.innerHTML = audioControlsElements;
	
	// allows this progress bar to act as a volume slider
	let volumeSliderContainer = audioControlsContainer.querySelector("#volume-slider-container"); // touch detection is done on the container instead of the slider itself to de facto increase the touch target area
	let volumeSlider = volumeSliderContainer.querySelector("#volume-slider");
	let isScrubbing = false;
	let isManuallyPaused = false;
	
	volumeSliderContainer.onpointerdown = (event) => {isScrubbing = true;};
	
	volumeSlider.value = targetAudio.volume;
	
	volumeSliderContainer.onpointermove = (event) => {
		if (isScrubbing) {
			volumeSlider.value = (event.clientX - volumeSlider.offsetLeft - volumeSlider.offsetParent.offsetLeft)/volumeSlider.offsetWidth;
		}
		targetAudio.volume = volumeSlider.value;
		
		if (volumeSlider.value < 0.01) {
			targetAudio.setAttribute("mute", "");
		} else {
			targetAudio.removeAttribute("muted");
		}
	};
	
	let progressBarContainer = audioControlsContainer.querySelector("#progress-bar-container");
	let progressBar = progressBarContainer.querySelector("#progress-bar");
	
	// allows this progress bar to act as a timeline that you can use to scrub through the audio. pauses the audio while doing so.
	progressBarContainer.onpointerdown = (event) => {isScrubbing = true;};

	progressBarContainer.onpointermove = (event) => {
		if (isScrubbing) {
			targetAudio.pause();
			progressBar.value = (event.clientX - progressBar.offsetLeft- progressBar.offsetParent.offsetLeft)/progressBar.offsetWidth;
		}
	};
	
	// seeks the audio to the new time set above and then unpauses the audio if audio was not previously manually paused
	progressBarContainer.onpointerup = (event) => {
		targetAudio.fastSeek(progressBar.value * targetAudio.duration);
		if (!isManuallyPaused) {targetAudio.play();}
	};
	
	document.onpointerup = (event) => {isScrubbing = false;};
	
	// sets the timecodes to the current data
	let currentTimecodeNumbers = Array.from(audioControlsContainer.querySelector(".audio-timecodes").children);
	targetAudio.ontimeupdate = (event) => {
		currentTimecodeNumbers[0].innerHTML = secondsToMMSS(targetAudio.currentTime);
		currentTimecodeNumbers[1].innerHTML = secondsToMMSS(targetAudio.duration);
		progressBar.value = targetAudio.currentTime / targetAudio.duration;
	};
	
	// skip buttons code
	audioControlsContainer.querySelector(".skip-backwards-button").onclick = (event) => {
		targetAudio.fastSeek(Math.max(targetAudio.currentTime - 5.0, 0));
	};
	audioControlsContainer.querySelector(".skip-forwards-button").onclick = (event) => {
		targetAudio.fastSeek(Math.min(targetAudio.currentTime + 5.0, targetAudio.duration));
	};
	
	// add animated pause/play button
	let playPauseButtonsContainer = audioControlsContainer.querySelector(".play-pause-buttons");
	
	let playPauseButtonAnim = lottie.loadAnimation({
		container: playPauseButtonsContainer,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: "/media/icons/media-control-icons/play-pause.json"
	});
	// handles pause/play button animation depending on the audio play/pause state
	playPauseButtonsContainer.onclick = (event) => {
		if (targetAudio.paused) {
			playPauseButtonAnim.playSegments([0,29], true);
			targetAudio.play();
			isManuallyPaused = false;
		} else {
			playPauseButtonAnim.playSegments([30,60], true);
			targetAudio.pause();
			isManuallyPaused = true;
		}
	};
	
	targetAudio.onplay = (event) => {playPauseButtonAnim.playSegments([1,30], true);};
	targetAudio.onpause = (event) => {playPauseButtonAnim.playSegments([31,62], true);};
	
	// finally return all these elements and functions
	return audioControlsContainer;
}

function secondsToMMSS(seconds) {
	let convertedDate = new Date(seconds * 1000);
	return convertedDate.getUTCMinutes() + ":" + convertedDate.getUTCSeconds().toString().padStart(2, '0');
}