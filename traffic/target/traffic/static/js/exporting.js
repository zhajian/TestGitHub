(function(L){var a=L.Chart,i=L.addEvent,w=L.removeEvent,t=HighchartsAdapter.fireEvent,K=L.createElement,y=L.discardElement,g=L.css,I=L.merge,D=L.each,v=L.extend,h=L.splat,e=Math.max,J=document,o=window,d=L.isTouchDevice,c=L.Renderer.prototype.symbols,n=L.getOptions(),b;v(n.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});n.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:d?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};n.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};L.post=function(f,j,k){var l,f=K("form",I({method:"post",action:f,enctype:"multipart/form-data"},k),{display:"none"},J.body);for(l in j){K("input",{type:"hidden",name:l,value:j[l]},null,f)}f.submit();y(f)};v(a.prototype,{sanitizeSVG:function(f){return f.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g," ").replace(/&shy;/g,"").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(j){return j.toLowerCase()})},getSVG:function(f){var j=this,m,r,l,q,k,p=I(j.options,f);if(!J.createElementNS){J.createElementNS=function(u,s){return J.createElement(s)}}r=K("div",null,{position:"absolute",top:"-9999em",width:j.chartWidth+"px",height:j.chartHeight+"px"},J.body);l=j.renderTo.style.width;k=j.renderTo.style.height;l=p.exporting.sourceWidth||p.chart.width||/px$/.test(l)&&parseInt(l,10)||600;k=p.exporting.sourceHeight||p.chart.height||/px$/.test(k)&&parseInt(k,10)||400;v(p.chart,{animation:!1,renderTo:r,forExport:!0,width:l,height:k});p.exporting.enabled=!1;delete p.data;p.series=[];D(j.series,function(s){q=I(s.options,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:s.visible});q.isInternal||p.series.push(q)});f&&D(["xAxis","yAxis"],function(s){D(h(f[s]),function(u,x){p[s][x]=I(p[s][x],u)})});m=new L.Chart(p,j.callback);D(["xAxis","yAxis"],function(s){D(j[s],function(u,A){var B=m[s][A],z=u.getExtremes(),x=z.userMin,z=z.userMax;B&&(x!==void 0||z!==void 0)&&B.setExtremes(x,z,!0,!1)})});l=m.container.innerHTML;p=null;m.destroy();y(r);l=this.sanitizeSVG(l);return l=l.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},getSVGForExport:function(f,j){var k=this.options.exporting;return this.getSVG(I({chart:{borderRadius:0}},k.chartOptions,j,{exporting:{sourceWidth:f&&f.sourceWidth||k.sourceWidth,sourceHeight:f&&f.sourceHeight||k.sourceHeight}}))},exportChart:function(f,j){var k=this.getSVGForExport(f,j),f=I(this.options.exporting,f);L.post(f.url,{filename:f.filename||"chart",type:f.type,width:f.width||0,scale:f.scale||2,svg:k},f.formAttributes)},print:function(){var j=this,k=j.container,p=[],q=k.parentNode,l=J.body,m=l.childNodes;if(!j.isPrinting){j.isPrinting=!0,t(j,"beforePrint"),D(m,function(r,f){if(r.nodeType===1){p[f]=r.style.display,r.style.display="none"}}),l.appendChild(k),o.focus(),o.print(),setTimeout(function(){q.appendChild(k);D(m,function(r,f){if(r.nodeType===1){r.style.display=p[f]}});j.isPrinting=!1;t(j,"afterPrint")},1000)}},contextMenu:function(P,Q,M,O,G,H,F){var N=this,B=N.options.navigation,s=B.menuItemStyle,A=N.chartWidth,z=N.chartHeight,C="cache-"+P,E=N[C],q=e(G,H),m,j,x,u=function(f){N.pointer.inClass(f.target,P)||j()};if(!E){N[C]=E=K("div",{className:P},{position:"absolute",zIndex:1000,padding:q+"px"},N.container),m=K("div",null,v({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},B.menuStyle),E),j=function(){g(E,{display:"none"});F&&F.setState(0);N.openMenu=!1},i(E,"mouseleave",function(){x=setTimeout(j,500)}),i(E,"mouseenter",function(){clearTimeout(x)}),i(document,"mouseup",u),i(N,"destroy",function(){w(document,"mouseup",u)}),D(Q,function(k){if(k){var f=k.separator?K("hr",null,null,m):K("div",{onmouseover:function(){g(this,B.menuItemHoverStyle)},onmouseout:function(){g(this,s)},onclick:function(){j();k.onclick&&k.onclick.apply(N,arguments)},innerHTML:k.text||N.options.lang[k.textKey]},v({cursor:"pointer"},s),m);N.exportDivElements.push(f)}}),N.exportDivElements.push(m,E),N.exportMenuWidth=E.offsetWidth,N.exportMenuHeight=E.offsetHeight}Q={display:"block"};M+N.exportMenuWidth>A?Q.right=A-M-G-q+"px":Q.left=M-q+"px";O+H+N.exportMenuHeight>z&&F.alignOptions.verticalAlign!=="top"?Q.bottom=z-O-q+"px":Q.top=O+H-q+"px";g(E,Q);N.openMenu=!0},addButton:function(F){var G=this,B=G.renderer,E=I(G.options.navigation.buttonOptions,F),A=E.onclick,s=E.menuItems,z,C,r={stroke:E.symbolStroke,fill:E.symbolFill},u=E.symbolSize||12;if(!G.btnCount){G.btnCount=0}if(!G.exportDivElements){G.exportDivElements=[],G.exportSVGElements=[]}if(E.enabled!==!1){var q=E.theme,l=q.states,f=l&&l.hover,l=l&&l.select,x;delete q.states;A?x=function(){A.apply(G,arguments)}:s&&(x=function(){G.contextMenu(C.menuClassName,s,C.translateX,C.translateY,C.width,C.height,C);C.setState(2)});E.text&&E.symbol?q.paddingLeft=L.pick(q.paddingLeft,25):E.text||v(q,{width:E.width,height:E.height,padding:0});C=B.button(E.text,0,0,x,q,f,l).attr({title:G.options.lang[E._titleKey],"stroke-linecap":"round"});C.menuClassName=F.menuClassName||"highcharts-menu-"+G.btnCount++;E.symbol&&(z=B.symbol(E.symbol,E.symbolX-u/2,E.symbolY-u/2,u,u).attr(v(r,{"stroke-width":E.symbolStrokeWidth||1,zIndex:1})).add(C));C.add().align(v(E,{width:C.width,x:L.pick(E.x,b)}),!0,"spacingBox");b+=(C.width+E.buttonSpacing)*(E.align==="right"?-1:1);G.exportSVGElements.push(C,z)}},destroyExport:function(f){var f=f.target,j,k;for(j=0;j<f.exportSVGElements.length;j++){if(k=f.exportSVGElements[j]){k.onclick=k.ontouchstart=null,f.exportSVGElements[j]=k.destroy()}}for(j=0;j<f.exportDivElements.length;j++){k=f.exportDivElements[j],w(k,"mouseleave"),f.exportDivElements[j]=k.onmouseout=k.onmouseover=k.ontouchstart=k.onclick=null,y(k)}}});c.menu=function(f,j,k,l){return["M",f,j+2.5,"L",f+k,j+2.5,"M",f,j+l/2+0.5,"L",f+k,j+l/2+0.5,"M",f,j+l-1.5,"L",f+k,j+l-1.5]};a.prototype.callbacks.push(function(f){var j,k=f.options.exporting,l=k.buttons;b=0;if(k.enabled!==!1){for(j in l){f.addButton(l[j])}i(f,"destroy",f.destroyExport)}})})(Highcharts);