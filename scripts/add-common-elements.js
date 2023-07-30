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

              <a href="/" class="text-footer">Home</a>
              <a href="/visuals" class="text-footer">Visuals</a>
              <a href="/music" class="text-footer">Music</a>
              <a href="/contact" class="text-footer">Contact</a>
              <a href="/commissions" class="text-footer">Commissions</a>
              <a href="/about" class="text-footer">About</a>
              <a href="/get-real" class="text-footer">Get Real</a>
              <a href="/test" class="text-footer">Test</a>
            </div>
            <div>
              <p class="text-footer-header">Cool Links</p>

              <a href="https://throne.me/u/phlixfer" target="_blank" class="text-footer">My Throne Wishlist!</a>
              <a href="/wishlist" class="text-footer">my upgrade wishlist;;</a>
              <a href="/cherished-music" class="text-footer">the music i cherish~</a>
            </div>
            <div>
              <p class="text-footer-header">Socials</p>

              <div class="footer-social-buttons-wrapper">
                <a href="https://twitter.com/phlixfer" target="_blank" class="footer-sb sb-twitter"></a>
                <a href="https://instagram.com/phlixfer" target="_blank" class="footer-sb sb-insta"></a>
                <a href="https://ko-fi.com/phlixfer" target="_blank" class="footer-sb sb-kofi"></a>
                <a href="https://discord.gg/Q5P6t4jeam" target="_blank" class="footer-sb sb-discord"></a>
                <a href="https://youtube.com/@phlixfer" target="_blank" class="footer-sb sb-youtube"></a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-section footer-copyright">
          <p class="text-footer">© Phlixfer on all content, MIT for website</p>
          <div style="flex-grow: 1;"></div>
          <a href="/support-me" class="text-footer" style="text-align: left;">💸 I'm in need financially, support me here!</a>
        </div>
	</div>`;
var htmlNavbar = `
      <a href="javascript:void(0);" class="borgor-menu" onclick="navbarActivate()">
        <div id="hamborgoranim_hype_container" class="HYPE_document" style="margin:auto;position:relative;width:64px;height:64px;overflow:hidden;">
        </div>
      </a>
      <a href="/">Home</a>
      <a href="/visuals">Visuals</a>
      <a href="/music">Music</a>
      <a href="/contact">Contact</a>
      <a href="/commissions">Commissions</a>
      <a href="/about">About</a>
      <a href="/get-real">Get Real</a>
      <div class="navbar-icon-container">
        <a href="https://patreon.com/phlixfer" target="_blank" class="navbar-icon">
          <svg width="100%" height="100%" viewBox="0 0 600 600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
              <g transform="matrix(1,0,0,1,-2800,-700)">
                  <g id="patreon-logo-mono" transform="matrix(1,0,0,1,-700,700)">
                      <rect x="3500" y="0" width="600" height="600" style="fill:none;"/>
                      <path d="M3635.5,474.76L3697.73,474.76L3697.73,134.92L3635.5,134.92L3635.5,474.76ZM3862.43,134.921C3792.15,134.921 3734.97,192.152 3734.97,262.503C3734.97,332.641 3792.15,389.704 3862.43,389.704C3932.5,389.704 3989.5,332.641 3989.5,262.503C3989.5,192.152 3932.5,134.921 3862.43,134.921Z"/>
                  </g>
              </g>
          </svg>
          <p>Support me!</p>
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
		div.className = "navbar";
		div.id = "navbar";

                if (document.title == "Phlixfer") {
                	div.className += " paused";
                }
                
                let script = document.createElement('script');
                script.src = '/media/hamborgor_anim.hyperesources/hamborgoranim_hype_generated_script.js?62498';

            	body.insertBefore(div, body.firstChild);
        
            	let burgerMenu = document.getElementById('hamborgoranim_hype_container');
            	burgerMenu.appendChild(script);

	} else {
		footer.innerHTML = htmlFooter;
		footer.className = "footer";
    		footer.id = "footer"
		body.appendChild(footer);
	}
});
