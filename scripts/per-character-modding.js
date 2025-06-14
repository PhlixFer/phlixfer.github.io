function splitElementText(element) {
  let elementText = element.innerText;
  element.innerText = "";
  
  let tmpElement;
  for (character of elementText) {
    tmpElement = document.createElement('span');
    tmpElement.innerHTML = character;

    element.appendChild(tmpElement);
  }
  
  element.setAttribute("stringsplitted", "");
}

function splittedElementTextDance(element, delay) {
  if ( element.getAttribute("stringsplitted") != null ) {
    const keyframes = [
      { fontWeight: element.style.fontWeight, fontWidth: element.style.fontWidth },
      { fontWeight: 900, fontWidth: '200%' },
      { fontWeight: element.style.fontWeight, fontWidth: element.style.fontWidth }
    ];
    let currentDelay = 0;
    for (childElement of element.children) {
      if (childElement.innerText != " ") {
        childElement.animate(keyframes, {
          duration: 1500,
          iterations: 1,
          easing: 'cubic-bezier(0.2, 1.2, 0.3, 1)',
          delay: currentDelay
        });
        currentDelay += delay;
      }
    }
  } else {
    throw new Error("Element's text has not been splitted!");
  }
}