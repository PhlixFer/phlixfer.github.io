//	HYPE.documents["hamborgor_anim"]

(function(){(function m(){function k(a,b,c,d){var e=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(m),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),e=l,false==!0&&(e=""),b.type="text/javascript",""!=d&&(b.integrity=d,b.setAttribute("crossorigin","anonymous")),b.src=e+"/"+c,a.appendChild(b)):window[b].push(m),e=!0);return e}var l="hamborgor_anim.hyperesources",f="hamborgor_anim",g="hamborgoranim_hype_container";if(false==
!1)try{for(var c=document.getElementsByTagName("script"),a=0;a<c.length;a++){var d=c[a].src,b=null!=d?d.indexOf("/hamborgoranim_hype_generated_script.js"):-1;if(-1!=b){l=d.substr(0,b);break}}}catch(p){}c=navigator.userAgent.match(/MSIE (\d+\.\d+)/);c=parseFloat(c&&c[1])||null;d=!0==(null!=window.HYPE_736F||null!=window.HYPE_dtl_736F)||true==!0||null!=c&&10>c;a=!0==d?"HYPE-736.full.min.js":"HYPE-736.thin.min.js";c=!0==d?"F":"T";d=d?"":
"";if(false==!1&&(a=k("HYPE_736"+c,"HYPE_dtl_736"+c,a,d),false==!0&&(a=a||k("HYPE_w_736","HYPE_wdtl_736","HYPE-736.waypoints.min.js","")),false==!0&&(a=a||k("Matter","HYPE_pdtl_736","HYPE-736.physics.min.js","")),a))return;d=window.HYPE.documents;if(null!=d[f]){b=1;a=f;do f=""+a+"-"+b++;while(null!=d[f]);for(var e=document.getElementsByTagName("div"),
b=!1,a=0;a<e.length;a++)if(e[a].id==g&&null==e[a].getAttribute("HYP_dn")){var b=1,h=g;do g=""+h+"-"+b++;while(null!=document.getElementById(g));e[a].id=g;b=!0;break}if(!1==b)return}b=[];b=[{name:"borgorMenu",source:"function(hypeDocument, element, event) {  x = document.getElementById('navbar');\n\n  if (x.className == 'navbar') {\n    x.className += ' active';\n  } else {\n    x.className = 'navbar';\n  }\n}",identifier:"55"}];e={};h={};for(a=0;a<b.length;a++)try{h[b[a].identifier]=b[a].name,e[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(n){window.console&&window.console.log(n),e[b[a].name]=function(){}}c=new window["HYPE_736"+c](f,g,{"-1":{n:"PIE.htc"},"-2":{n:"blank.gif"}},l,[],e,[{n:"borgor anim",o:"1",X:[0]}],
[{A:{a:[{p:7,b:"kTimelineDefaultIdentifier",symbolOid:"2"}]},o:"3",p:"600px",cA:false,Y:48,Z:48,c:"#000",L:[],bY:1,d:48,U:{},T:{kTimelineDefaultIdentifier:{q:false,z:0.27,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"c",y:0,z:0.12,i:"f",e:45,s:0,o:"59"},{f:"c",y:0,z:0.12,i:"b",e:22,s:27,o:"58"},{f:"c",y:0,z:0.12,i:"f",e:-45,s:0,o:"58"},{f:"c",y:0,z:0.12,i:"b",e:22,s:17,o:"59"},{f:"c",y:0,z:0.06,i:"e",e:0,s:1,o:"57"},{f:"c",y:0.06,z:0.12,i:"e",e:0,s:0,o:"57"},{f:"c",p:2,y:0.12,z:0.15,i:"ActionHandler",e:{a:[{p:7,b:"kTimelineDefaultIdentifier",symbolOid:"2"}]},s:{a:[{p:7,b:"kTimelineDefaultIdentifier",symbolOid:"2"}]},o:"kTimelineDefaultIdentifier"},{f:"c",y:0.12,z:0.15,i:"b",e:17,s:22,o:"59"},{f:"c",y:0.12,z:0.15,i:"b",e:27,s:22,o:"58"},{f:"c",y:0.12,z:0.15,i:"f",e:-180,s:-45,o:"58"},{f:"c",y:0.12,z:0.15,i:"f",e:180,s:45,o:"59"},{f:"c",y:0.18,z:0.09,i:"e",e:1,s:0,o:"57"},{f:"c",p:2,y:0.27,z:0,i:"ActionHandler",s:{a:[{p:7,b:"kTimelineDefaultIdentifier",symbolOid:"2"}]},o:"kTimelineDefaultIdentifier"},{y:0.27,i:"f",s:-180,z:0,o:"58",f:"c"},{y:0.27,i:"b",s:27,z:0,o:"58",f:"c"},{y:0.27,i:"b",s:17,z:0,o:"59",f:"c"},{y:0.27,i:"f",s:180,z:0,o:"59",f:"c"},{y:0.27,i:"e",s:1,z:0,o:"57",f:"c"}],f:30,b:[]}},bZ:180,O:["56","59","57","58"],n:"Untitled Layout","_":0,v:{"58":{b:27,c:18,dE:"#F5F5F5",d:4,dF:"round",f:0,dG:"round",g:"#E8EBED",aP:"pointer",bF:"56",j:"absolute",x:"visible",k:"div",dB:"button",z:1,dC:{path:[[2,2,2,2,16,2,16,2]],closed:false},tX:0.5,a:15,dD:2,tY:0.5},"57":{dF:"round",x:"visible",a:15,dB:"button",b:22,j:"absolute",dG:"round",bF:"56",dC:{path:[[2,2,2,2,16,2,16,2]],closed:false},z:2,d:4,k:"div",c:18,e:1,dD:2,aP:"pointer",dE:"#F5F5F5",g:"#E8EBED"},"56":{dB:"button",x:"visible",aA:{a:[{b:"kTimelineDefaultIdentifier",p:8,z:false,symbolOid:"2",J:true},{p:4,h:"55"}]},k:"div",c:48,d:48,z:1,a:0,j:"absolute",aP:"pointer",b:0},"59":{b:17,c:18,dE:"#F5F5F5",d:4,dF:"round",f:0,dG:"round",g:"#E8EBED",aP:"pointer",bF:"56",j:"absolute",x:"visible",k:"div",dB:"button",z:3,dC:{path:[[2,2,2,2,16,2,16,2]],closed:false},tX:0.5,a:15,dD:2,tY:0.5}}}],{},h,{},null,false,false,-1,true,true,false,true,true);d[f]=c.API;document.getElementById(g).setAttribute("HYP_dn",f);c.z_o(this.body)})();})();
