var htmlFooter = `
	<div class="footer-container">
        <div class="footer-section footer-content">
          <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="flat-logo-badge" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M50,8.0078125 C57.6441828,8.0078125 64.1552366,12.7367618 66.5730946,21.4303408 C75.2206779,19.3310635 82.6044871,22.488197 86.3663086,29.0039062 C90.1414514,35.5426889 89.1635424,43.5492404 82.9630495,50.000833 C89.1636431,56.4515848 90.1412568,64.4576481 86.3663086,70.9960938 C82.5912867,77.5346669 75.1688131,80.6910522 66.4816723,78.5474873 C63.9946543,87.1424535 57.5500194,91.9921875 50,91.9921875 C42.4764678,91.9921875 36.0505777,87.1764218 33.5444383,78.6379363 C24.8068755,80.8905149 17.4557939,77.6162136 13.6336914,70.9960938 C9.82513833,64.3994424 10.6456061,56.4293275 16.9046598,50.0003811 C10.6456714,43.5713064 9.82498688,35.6008199 13.6336914,29.0039062 C17.4423338,22.4071003 24.7551432,19.1325886 33.452582,21.3389058 C35.8903599,12.7037133 42.3825749,8.0078125 50,8.0078125 Z M49.9990812,70.2968125 L40.859668,75.574707 C40.4857658,75.7905787 40.1131654,75.9966291 39.7420044,76.1929985 L39.4181862,76.3624315 C40.9896152,82.2099733 44.9173787,85.7421875 50,85.7421875 C55.0886669,85.7421875 59.0198413,82.2015654 60.5875792,76.3415553 C59.9953981,76.0451787 59.3999574,75.7245948 58.8020508,75.3793945 L49.9990812,70.2968125 Z M21.8119312,53.9736941 C17.4662561,58.2491725 16.4788261,63.4240205 19.0463867,67.8710938 C21.6172573,72.3240312 26.6022804,74.0550016 32.4864532,72.4172649 C32.4435672,71.7318742 32.421875,71.0299867 32.421875,70.3125 L32.4210812,60.1478125 L23.281543,54.871582 C22.7749046,54.5790753 22.2850777,54.2796221 21.8119312,53.9736941 Z M78.1057329,54.001355 L77.8903492,54.1428735 C77.4039886,54.4582252 76.9006256,54.7664138 76.3801758,55.0668945 L67.5780812,60.1488125 L67.578125,70.3125 C67.578125,71.0028723 67.5580414,71.6788023 67.5186533,72.3399881 C73.3773892,73.9121195 78.4092811,72.2780779 80.9536133,67.8710938 C83.4980691,63.4640249 82.3971855,58.2890893 78.1057329,54.001355 Z M61.3280812,63.7568125 L56.2490812,66.6888125 L61.3280812,69.6208125 L61.3280812,63.7568125 Z M38.6710812,63.7568125 L38.6710812,69.6208125 L43.7490812,66.6888125 L38.6710812,63.7568125 Z M50.0000812,36.9188125 L38.6710812,43.4598125 L38.6710812,56.5398125 L50.0000812,63.0808125 L61.3280812,56.5398125 L61.3280022,43.4596417 C56.6566128,40.7626064 55.6531076,40.183218 55.5274403,40.1106617 L55.5177791,40.1050837 L55.4771484,40.0816406 L50.0000812,36.9188125 Z M32.4210812,47.0678125 L27.3430812,49.9998125 L32.4210812,52.9318125 L32.4210812,47.0678125 Z M67.577627,47.0678686 L67.5780812,52.9318125 L72.6558696,49.9997916 C70.7643683,48.907734 69.0789912,47.9346816 67.577627,47.0678686 Z M21.8130748,46.025546 L22.1524911,45.8090448 C22.5191171,45.5782742 22.8954484,45.351329 23.281543,45.128418 L32.4210812,39.8508125 L32.421875,29.296875 C32.421875,28.7126516 32.4362575,28.139484 32.4645502,27.5774942 C26.589878,25.9493105 21.6140582,27.6815097 19.0463867,32.1289062 C16.5282023,36.4904588 17.4295928,41.5521207 21.565094,45.777028 L21.8130748,46.025546 Z M80.9536133,32.1289062 C78.412179,27.7269415 73.3888481,26.0916063 67.538518,27.6549764 C67.5650533,28.1929902 67.578125,28.7399084 67.578125,29.296875 L67.5780812,39.8508125 L76.3801758,44.9331055 C76.9781164,45.2783254 77.5535032,45.6337193 78.1064642,45.9984611 C82.3971855,41.7109107 83.4980691,36.5359751 80.9536133,32.1289062 Z M61.3280812,30.3778125 L56.2490812,33.3108125 L61.3280812,36.2428125 L61.3280812,30.3778125 Z M38.6710812,30.3788125 L38.6710812,36.2418125 L43.7490812,33.3098125 L38.6710812,30.3788125 Z M50,14.2578125 C44.8645928,14.2578125 40.8765397,17.7008748 39.3485542,23.6020648 C39.8494871,23.8586961 40.3533843,24.132991 40.859668,24.425293 L49.9990812,29.7018125 L58.8020508,24.6206055 C59.4231999,24.2619862 60.0416878,23.9299342 60.6567844,23.6238621 C59.1334346,17.709391 55.1417543,14.2578125 50,14.2578125 Z" id="Combined-Shape" fill="var(--footer-content-fill)"></path>
            </g>
          </svg>
          <div class="footer-sitemap">
            <div>
              <p class="text-footer-header">Sitemap</p>

              <a href="index" class="text-footer">Home</a>
              <a href="visuals" class="text-footer">Visuals</a>
              <a href="music" class="text-footer">Music</a>
              <a href="contact" class="text-footer">Contact</a>
              <a href="commissions" class="text-footer">Commissions</a>
              <a href="about" class="text-footer">About</a>
              <a href="get-real" class="text-footer">Get Real</a>
              <a href="test" class="text-footer">Test</a>
            </div>
            <div>
              <p class="text-footer-header">Cool Links</p>

              <a href="https://throne.me/u/phlixfer" target="_blank" class="text-footer">My Throne Wishlist!</a>
              <a href=""></a>
            </div>
            <div>
              <p class="text-footer-header">Socials</p>

              <a href="https://twitter.com/phlixfer" target="_blank" class="footer-sb sb-twitter"></a>
              <a href="https://instagram.com/phlixfer" target="_blank" class="footer-sb sb-insta"></a>
              <a href="https://ko-fi.com/phlixfer" target="_blank" class="footer-sb sb-kofi"></a>
              <a href="https://discord.gg/Q5P6t4jeam" target="_blank" class="footer-sb sb-discord"></a>
              <a href="https://www.youtube.com/channel/UC5UuFv0_n5PZG9AXfr5HPTg" target="_blank" class="footer-sb sb-youtube"></a>
            </div>
          </div>
        </div>

        <div class="footer-section footer-copyright">
          <p class="text-footer">© Phlixfer on all content, MIT for website</p>
          <div style="flex-grow: 1;"></div>
          <a href="https://ko-fi.com/phlixfer" target="_blank" class="text-footer" style="text-align: left;">Buy me a Coffee! ☕️</a>
        </div>
	</div>`;
var htmlNavbar = `
      <a href="javascript:void(0);" class="borgor-menu" onclick="navbarActivate()">
        <div id="hamborgoranim_hype_container" class="HYPE_document" style="margin:auto;position:relative;width:64px;height:64px;overflow:hidden;">
        </div>
      </a>
      <a href="/">Home</a>
      <a href="visuals">Visuals</a>
      <a href="music">Music</a>
      <a href="contact">Contact</a>
      <a href="commissions">Commissions</a>
      <a href="about">About</a>
      <a href="get-real">Get Real</a>
      <div class="navbar-icon-container">
        <a href="https://ko-fi.com/phlixfer" target="_blank" class="navbar-icon">
          <svg width="100%" height="100%" viewBox="0 0 600 600" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g transform="matrix(1,0,0,1,-1400,-700)">
                <g transform="matrix(1,0,0,1,-2100,700)">
                    <g transform="matrix(1.03512,0,0,1.03512,3496.66,-21.0027)" style="fill:var(--main-text-col);">
                        <path d="M548.427,254.133C542.107,220.759 524.142,199.969 505.73,187.114C486.689,173.819 463.881,166.988 440.658,166.988L111.072,166.988C99.607,166.988 95.215,178.182 95.171,183.789C95.167,184.52 95.193,187.446 95.193,187.446C95.193,187.446 94.652,333.259 95.675,411.139C98.786,457.117 144.854,457.102 144.854,457.102C144.854,457.102 295.257,456.661 367.388,456.213C370.771,456.191 374.149,455.827 377.432,455.006C418.5,444.731 422.749,406.578 422.31,385.31C504.858,389.896 563.102,331.646 548.427,254.133ZM256.614,396.633C260.199,398.438 262.489,396.195 262.489,396.195C262.489,396.195 314.946,348.317 338.578,320.744C359.598,296.078 360.968,254.51 324.871,238.978C288.774,223.447 259.075,257.25 259.075,257.25C233.32,228.924 194.342,230.358 176.313,249.528C158.285,268.698 164.58,301.601 178.03,319.912C190.655,337.102 246.148,386.562 254.56,394.927C254.56,394.927 255.172,395.567 256.614,396.633ZM455.696,329.808C438.091,332.008 423.788,330.356 423.788,330.356L423.788,222.561L445.45,222.561C459.767,222.561 473.577,228.522 482.919,239.371C489.495,247.009 494.756,257.759 494.756,272.608C494.756,308.907 476.052,323.208 455.696,329.808Z"></path>
                    </g>
                </g>
            </g>
          </svg>
          <p>Buy me a coffee!</p>
        </a>
      </div>
`;

const commonElements = [htmlNavbar, htmlFooter];

commonElements.forEach((item)=>{
	let body = document.getElementById('body');
	let div = document.createElement('div');
	let footer = document.createElement('footer');

	if (item == htmlNavbar) {
		div.innerHTML = htmlNavbar;
		div.className = "navbar paused";
		div.id = "navbar";
		body.insertBefore(div, body.firstChild);

    let script = document.createElement('script');
    script.src = 'media/hamborgor_anim.hyperesources/hamborgoranim_hype_generated_script.js?62498';
    let burgerMenu = document.getElementById('hamborgoranim_hype_container');
    burgerMenu.appendChild(script);

	} else {
		footer.innerHTML = htmlFooter;
		footer.className = "footer";
    footer.id = "footer"
		body.appendChild(footer);
	}
});
