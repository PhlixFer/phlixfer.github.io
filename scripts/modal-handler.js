export function toggleModal(modalElement, audio = null) {
	if (modalElement.open) {
		let animationKeyframes = new KeyframeEffect(modalElement,
			[
				{ transform: "translateY(0)" },
				{ transform: "translateY(100vh)" }
			],
			{
				duration: 400,
				iterations: 1,
				easing: "cubic-bezier(0.2, 0.1, 0.1, 1)"
			}
		);
		let modalCloseAnimation = new Animation(animationKeyframes);
		modalElement.setAttribute('closed', "");
		modalCloseAnimation.play();
		modalCloseAnimation.onfinish = (event) => {
			modalElement.close();
			if (audio) { audio.pause(); }
		};
	} else {
		modalElement.removeAttribute('closed');
		modalElement.showModal();
	}
}