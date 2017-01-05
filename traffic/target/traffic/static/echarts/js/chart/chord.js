define("echarts/chart/chord",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Sector","../util/shape/Ribbon","../util/shape/Icon","zrender/shape/BezierCurve","../config","../util/ecData","zrender/tool/util","zrender/tool/vector","../data/Graph","../layout/Chord","../chart"],function(x){function C(h,d,l,c,i){v.call(this,h,d,l,c,i),this.scaleLineLength=4,this.scaleUnitAngle=4,this.refresh(c)}var v=x("./base"),j=x("zrender/shape/Text"),A=x("zrender/shape/Line"),g=x("zrender/shape/Sector"),b=x("../util/shape/Ribbon"),D=x("../util/shape/Icon"),q=x("zrender/shape/BezierCurve"),w=x("../config");w.chord={zlevel:0,z:2,clickable:!0,radius:["65%","75%"],center:["50%","50%"],padding:2,sort:"none",sortSub:"none",startAngle:90,clockWise:!0,ribbonType:!0,minRadius:10,maxRadius:20,symbol:"circle",showScale:!1,showScaleText:!1,itemStyle:{normal:{borderWidth:0,borderColor:"#000",label:{show:!0,rotate:!1,distance:5},chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999",opacity:0.5}},emphasis:{borderWidth:0,borderColor:"#000",chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999"}}}};var y=x("../util/ecData"),z=x("zrender/tool/util"),f=x("zrender/tool/vector"),k=x("../data/Graph"),B=x("../layout/Chord");return C.prototype={type:w.CHART_TYPE_CHORD,_init:function(){var u=this.series;this.selectedMap={};for(var F={},p={},h=0,E=u.length;E>h;h++){if(u[h].type===this.type){var d=this.isSelected(u[h].name);this.selectedMap[u[h].name]=d,d&&this.buildMark(h),this.reformOption(u[h]),F[u[h].name]=u[h]}}for(var h=0,E=u.length;E>h;h++){if(u[h].type===this.type){if(u[h].insertToSerie){var c=F[u[h].insertToSerie];u[h]._referenceSerie=c}else{p[u[h].name]=[u[h]]}}}for(var h=0,E=u.length;E>h;h++){if(u[h].type===this.type&&u[h].insertToSerie){for(var G=u[h]._referenceSerie;G&&G._referenceSerie;){G=G._referenceSerie}p[G.name]&&this.selectedMap[u[h].name]&&p[G.name].push(u[h])}}for(var m in p){this._buildChords(p[m])}this.addShapeList()},_getNodeCategory:function(c,a){return c.categories&&c.categories[a.category||0]},_getNodeQueryTarget:function(d,c){var a=this._getNodeCategory(d,c);return[c,a,d]},_getEdgeQueryTarget:function(d,c,a){return a=a||"normal",[c.itemStyle&&c.itemStyle[a],d.itemStyle[a].chordStyle]},_buildChords:function(N){for(var S=[],K=N[0],G=function(a){return a.layout.size>0},R=function(a){return function(c){return a.getEdge(c.node2,c.node1)}},F=0;F<N.length;F++){var u=N[F];if(this.selectedMap[u.name]){var T;u.matrix?T=this._getSerieGraphFromDataMatrix(u,K):u.links&&(T=this._getSerieGraphFromNodeLinks(u,K)),T.filterNode(G,this),u.ribbonType&&T.filterEdge(R(T)),S.push(T),T.__serie=u}}if(S.length){var J=S[0];if(!K.ribbonType){var L=K.minRadius,O=K.maxRadius,P=1/0,E=-(1/0);J.eachNode(function(a){E=Math.max(a.layout.size,E),P=Math.min(a.layout.size,P)});var I=(O-L)/(E-P);J.eachNode(function(c){var a=this._getNodeQueryTarget(K,c),d=this.query(a,"symbolSize");c.layout.size=E===P?d||P:d||(c.layout.size-P)*I+L},this)}var M=new B;M.clockWise=K.clockWise,M.startAngle=K.startAngle*Math.PI/180,M.clockWise||(M.startAngle=-M.startAngle),M.padding=K.padding*Math.PI/180,M.sort=K.sort,M.sortSub=K.sortSub,M.directed=K.ribbonType,M.run(S);var H=this.query(K,"itemStyle.normal.label.show");if(K.ribbonType){this._buildSectors(K,0,J,K,S),H&&this._buildLabels(K,0,J,K,S);for(var F=0,Q=0;F<N.length;F++){this.selectedMap[N[F].name]&&this._buildRibbons(N,F,S[Q++],K)}K.showScale&&this._buildScales(K,0,J)}else{this._buildNodeIcons(K,0,J,K,S),H&&this._buildLabels(K,0,J,K,S);for(var F=0,Q=0;F<N.length;F++){this.selectedMap[N[F].name]&&this._buildEdgeCurves(N,F,S[Q++],K,J)}}this._initHoverHandler(N,S)}},_getSerieGraphFromDataMatrix:function(K,P){for(var I=[],G=0,N=[],F=0;F<K.matrix.length;F++){N[F]=K.matrix[F].slice()}for(var m=K.data||K.nodes,F=0;F<m.length;F++){var Q={},H=m[F];H.rawIndex=F;for(var J in H){"name"===J?Q.id=H.name:Q[J]=H[J]}var L=this._getNodeCategory(P,H),M=L?L.name:H.name;if(this.selectedMap[M]=this.isSelected(M),this.selectedMap[M]){I.push(Q),G++}else{N.splice(G,1);for(var E=0;E<N.length;E++){N[E].splice(G,1)}}}var O=k.fromMatrix(I,N,!0);return O.eachNode(function(a){a.layout={size:a.data.outValue},a.rawIndex=a.data.rawIndex}),O.eachEdge(function(a){a.layout={weight:a.data.weight}}),O},_getSerieGraphFromNodeLinks:function(K,P){for(var I=new k(!0),G=K.data||K.nodes,N=0,F=G.length;F>N;N++){var m=G[N];if(m&&!m.ignore){var Q=this._getNodeCategory(P,m),H=Q?Q.name:m.name;if(this.selectedMap[H]=this.isSelected(H),this.selectedMap[H]){var J=I.addNode(m.name,m);J.rawIndex=N}}}for(var N=0,F=K.links.length;F>N;N++){var L=K.links[N],M=L.source,E=L.target;"number"==typeof M&&(M=G[M],M&&(M=M.name)),"number"==typeof E&&(E=G[E],E&&(E=E.name));var O=I.addEdge(M,E,L);O&&(O.rawIndex=N)}return I.eachNode(function(c){var a=c.data.value;if(null==a){if(a=0,P.ribbonType){for(var d=0;d<c.outEdges.length;d++){a+=c.outEdges[d].data.weight||0}}else{for(var d=0;d<c.edges.length;d++){a+=c.edges[d].data.weight||0}}}c.layout={size:a}}),I.eachEdge(function(a){a.layout={weight:null==a.data.weight?1:a.data.weight}}),I},_initHoverHandler:function(l,h){var d=l[0],m=h[0],c=this;m.eachNode(function(a){a.shape.onmouseover=function(){m.eachNode(function(i){i.shape.style.opacity=0.1,i.labelShape&&(i.labelShape.style.opacity=0.1,i.labelShape.modSelf()),i.shape.modSelf()});for(var n=0;n<h.length;n++){for(var E=0;E<h[n].edges.length;E++){var u=h[n].edges[E],t=c._getEdgeQueryTarget(h[n].__serie,u.data);u.shape.style.opacity=0.1*c.deepQuery(t,"opacity"),u.shape.modSelf()}}a.shape.style.opacity=1,a.labelShape&&(a.labelShape.style.opacity=1);for(var n=0;n<h.length;n++){var e=h[n].getNodeById(a.id);if(e){for(var E=0;E<e.outEdges.length;E++){var u=e.outEdges[E],t=c._getEdgeQueryTarget(h[n].__serie,u.data);u.shape.style.opacity=c.deepQuery(t,"opacity");var p=h[0].getNodeById(u.node2.id);p&&(p.shape&&(p.shape.style.opacity=1),p.labelShape&&(p.labelShape.style.opacity=1))}}}c.zr.refreshNextFrame()},a.shape.onmouseout=function(){m.eachNode(function(o){o.shape.style.opacity=1,o.labelShape&&(o.labelShape.style.opacity=1,o.labelShape.modSelf()),o.shape.modSelf()});for(var p=0;p<h.length;p++){for(var t=0;t<h[p].edges.length;t++){var n=h[p].edges[t],i=[n.data,d];n.shape.style.opacity=c.deepQuery(i,"itemStyle.normal.chordStyle.opacity"),n.shape.modSelf()}}c.zr.refreshNextFrame()}})},_buildSectors:function(u,m,h,E){var d=this.parseCenter(this.zr,E.center),p=this.parseRadius(this.zr,E.radius),o=E.clockWise,c=o?1:-1;h.eachNode(function(l){var n=this._getNodeCategory(E,l.data),s=this.getColor(n?n.name:l.id),r=l.layout.startAngle/Math.PI*180*c,a=l.layout.endAngle/Math.PI*180*c,e=new g({zlevel:u.zlevel,z:u.z,style:{x:d[0],y:d[1],r0:p[0],r:p[1],startAngle:r,endAngle:a,brushType:"fill",opacity:1,color:s,clockWise:o},clickable:E.clickable,highlightStyle:{brushType:"fill"}});e.style.lineWidth=this.deepQuery([l.data,E],"itemStyle.normal.borderWidth"),e.highlightStyle.lineWidth=this.deepQuery([l.data,E],"itemStyle.emphasis.borderWidth"),e.style.strokeColor=this.deepQuery([l.data,E],"itemStyle.normal.borderColor"),e.highlightStyle.strokeColor=this.deepQuery([l.data,E],"itemStyle.emphasis.borderColor"),e.style.lineWidth>0&&(e.style.brushType="both"),e.highlightStyle.lineWidth>0&&(e.highlightStyle.brushType="both"),y.pack(e,u,m,l.data,l.rawIndex,l.id,l.category),this.shapeList.push(e),l.shape=e},this)},_buildNodeIcons:function(m,h,d,s){var c=this.parseCenter(this.zr,s.center),p=this.parseRadius(this.zr,s.radius),l=p[1];d.eachNode(function(E){var e=E.layout.startAngle,t=E.layout.endAngle,F=(e+t)/2,H=l*Math.cos(F),a=l*Math.sin(F),r=this._getNodeQueryTarget(s,E.data),I=this._getNodeCategory(s,E.data),G=this.deepQuery(r,"itemStyle.normal.color");G||(G=this.getColor(I?I.name:E.id));var n=new D({zlevel:m.zlevel,z:m.z+1,style:{x:-E.layout.size,y:-E.layout.size,width:2*E.layout.size,height:2*E.layout.size,iconType:this.deepQuery(r,"symbol"),color:G,brushType:"both",lineWidth:this.deepQuery(r,"itemStyle.normal.borderWidth"),strokeColor:this.deepQuery(r,"itemStyle.normal.borderColor")},highlightStyle:{color:this.deepQuery(r,"itemStyle.emphasis.color"),lineWidth:this.deepQuery(r,"itemStyle.emphasis.borderWidth"),strokeColor:this.deepQuery(r,"itemStyle.emphasis.borderColor")},clickable:s.clickable,position:[H+c[0],a+c[1]]});y.pack(n,m,h,E.data,E.rawIndex,E.id,E.category),this.shapeList.push(n),E.shape=n},this)},_buildLabels:function(E,H,p,G){var m=this.query(G,"itemStyle.normal.label.rotate"),c=this.query(G,"itemStyle.normal.label.distance"),I=this.parseCenter(this.zr,G.center),n=this.parseRadius(this.zr,G.radius),u=G.clockWise,F=u?1:-1;p.eachNode(function(K){var e=K.layout.startAngle/Math.PI*180*F,l=K.layout.endAngle/Math.PI*180*F,r=(e*-F+l*-F)/2;r%=360,0>r&&(r+=360);var d=90>=r||r>=270;r=r*Math.PI/180;var J=[Math.cos(r),-Math.sin(r)],o=0;o=G.ribbonType?G.showScaleText?35+c:c:c+K.layout.size;var a=f.scale([],J,n[1]+o);f.add(a,a,I);var s={zlevel:E.zlevel,z:E.z+1,hoverable:!1,style:{text:null==K.data.label?K.id:K.data.label,textAlign:d?"left":"right"}};m?(s.rotation=d?r:Math.PI+r,s.style.x=d?n[1]+o:-n[1]-o,s.style.y=0,s.position=I.slice()):(s.style.x=a[0],s.style.y=a[1]),s.style.color=this.deepQuery([K.data,G],"itemStyle.normal.label.textStyle.color")||"#000000",s.style.textFont=this.getFont(this.deepQuery([K.data,G],"itemStyle.normal.label.textStyle")),s=new j(s),this.shapeList.push(s),K.labelShape=s},this)},_buildRibbons:function(m,h,d,r){var c=m[h],p=this.parseCenter(this.zr,r.center),l=this.parseRadius(this.zr,r.radius);d.eachEdge(function(o,s){var F,a=d.getEdge(o.node2,o.node1);if(a&&!o.shape){if(a.shape){return void (o.shape=a.shape)}var i=o.layout.startAngle/Math.PI*180,J=o.layout.endAngle/Math.PI*180,t=a.layout.startAngle/Math.PI*180,e=a.layout.endAngle/Math.PI*180;F=this.getColor(1===m.length?o.layout.weight<=a.layout.weight?o.node1.id:o.node2.id:c.name);var H,E,n=this._getEdgeQueryTarget(c,o.data),I=this._getEdgeQueryTarget(c,o.data,"emphasis"),G=new b({zlevel:c.zlevel,z:c.z,style:{x:p[0],y:p[1],r:l[0],source0:i,source1:J,target0:t,target1:e,brushType:"both",opacity:this.deepQuery(n,"opacity"),color:F,lineWidth:this.deepQuery(n,"borderWidth"),strokeColor:this.deepQuery(n,"borderColor"),clockWise:r.clockWise},clickable:r.clickable,highlightStyle:{brushType:"both",opacity:this.deepQuery(I,"opacity"),lineWidth:this.deepQuery(I,"borderWidth"),strokeColor:this.deepQuery(I,"borderColor")}});o.layout.weight<=a.layout.weight?(H=a.node1,E=a.node2):(H=o.node1,E=o.node2),y.pack(G,c,h,o.data,null==o.rawIndex?s:o.rawIndex,o.data.name||H.id+"-"+E.id,H.id,E.id),this.shapeList.push(G),o.shape=G}},this)},_buildEdgeCurves:function(m,h,d,s,c){var p=m[h],l=this.parseCenter(this.zr,s.center);d.eachEdge(function(F,t){var o=c.getNodeById(F.node1.id),I=c.getNodeById(F.node2.id),E=o.shape,G=I.shape,a=this._getEdgeQueryTarget(p,F.data),r=this._getEdgeQueryTarget(p,F.data,"emphasis"),H=new q({zlevel:p.zlevel,z:p.z,style:{xStart:E.position[0],yStart:E.position[1],xEnd:G.position[0],yEnd:G.position[1],cpX1:l[0],cpY1:l[1],lineWidth:this.deepQuery(a,"width"),strokeColor:this.deepQuery(a,"color"),opacity:this.deepQuery(a,"opacity")},highlightStyle:{lineWidth:this.deepQuery(r,"width"),strokeColor:this.deepQuery(r,"color"),opacity:this.deepQuery(r,"opacity")}});y.pack(H,p,h,F.data,null==F.rawIndex?t:F.rawIndex,F.data.name||F.node1.id+"-"+F.node2.id,F.node1.id,F.node2.id),this.shapeList.push(H),F.shape=H},this)},_buildScales:function(H,L,F){var n,a,M=H.clockWise,E=this.parseCenter(this.zr,H.center),G=this.parseRadius(this.zr,H.radius),I=M?1:-1,J=0,p=-(1/0);H.showScaleText&&(F.eachNode(function(d){var c=d.data.value;c>p&&(p=c),J+=c}),p>10000000000?(n="b",a=1e-9):p>10000000?(n="m",a=0.000001):p>10000?(n="k",a=0.001):(n="",a=1));var K=J/(360-H.padding);F.eachNode(function(S){for(var o=S.layout.startAngle/Math.PI*180,u=S.layout.endAngle/Math.PI*180,e=o;;){if(M&&e>u||!M&&u>e){break}var r=e/180*Math.PI,d=[Math.cos(r),Math.sin(r)],O=f.scale([],d,G[1]+1);f.add(O,O,E);var s=f.scale([],d,G[1]+this.scaleLineLength);f.add(s,s,E);var h=new A({zlevel:H.zlevel,z:H.z-1,hoverable:!1,style:{xStart:O[0],yStart:O[1],xEnd:s[0],yEnd:s[1],lineCap:"round",brushType:"stroke",strokeColor:"#666",lineWidth:1}});this.shapeList.push(h),e+=I*this.scaleUnitAngle}if(H.showScaleText){for(var R=o,N=5*K*this.scaleUnitAngle,P=0;;){if(M&&R>u||!M&&u>R){break}var r=R;r%=360,0>r&&(r+=360);var l=90>=r||r>=270,Q=new j({zlevel:H.zlevel,z:H.z-1,hoverable:!1,style:{x:l?G[1]+this.scaleLineLength+4:-G[1]-this.scaleLineLength-4,y:0,text:Math.round(10*P)/10+n,textAlign:l?"left":"right"},position:E.slice(),rotation:l?[-r/180*Math.PI,0,0]:[-(r+180)/180*Math.PI,0,0]});this.shapeList.push(Q),P+=N*a,R+=I*this.scaleUnitAngle*5}}},this)},refresh:function(d){if(d&&(this.option=d,this.series=d.series),this.legend=this.component.legend,this.legend){this.getColor=function(h){return this.legend.getColor(h)},this.isSelected=function(h){return this.legend.isSelected(h)}}else{var c={},a=0;this.getColor=function(h){return c[h]?c[h]:(c[h]||(c[h]=this.zr.getColor(a++)),c[h])},this.isSelected=function(){return !0}}this.backupShapeList(),this._init()},reformOption:function(c){var a=z.merge;c=a(a(c||{},this.ecTheme.chord),w.chord),c.itemStyle.normal.label.textStyle=this.getTextStyle(c.itemStyle.normal.label.textStyle),this.z=c.z,this.zlevel=c.zlevel}},z.inherits(C,v),x("../chart").define("chord",C),C}),define("echarts/util/shape/Ribbon",["require","zrender/shape/Base","zrender/shape/util/PathProxy","zrender/tool/util","zrender/tool/area"],function(f){function d(a){c.call(this,a),this._pathProxy=new h}var c=f("zrender/shape/Base"),h=f("zrender/shape/util/PathProxy"),b=f("zrender/tool/util"),g=f("zrender/tool/area");return d.prototype={type:"ribbon",buildPath:function(I,v){var E=v.clockWise||!1,B=this._pathProxy;B.begin(I);var L=v.x,A=v.y,x=v.r,w=v.source0/180*Math.PI,D=v.source1/180*Math.PI,F=v.target0/180*Math.PI,J=v.target1/180*Math.PI,K=L+Math.cos(w)*x,z=A+Math.sin(w)*x,C=L+Math.cos(D)*x,q=A+Math.sin(D)*x,G=L+Math.cos(F)*x,j=A+Math.sin(F)*x,k=L+Math.cos(J)*x,H=A+Math.sin(J)*x;B.moveTo(K,z),B.arc(L,A,v.r,w,D,!E),B.bezierCurveTo(0.7*(L-C)+C,0.7*(A-q)+q,0.7*(L-G)+G,0.7*(A-j)+j,G,j),(v.source0!==v.target0||v.source1!==v.target1)&&(B.arc(L,A,v.r,F,J,!E),B.bezierCurveTo(0.7*(L-k)+k,0.7*(A-H)+H,0.7*(L-K)+K,0.7*(A-z)+z,K,z))},getRect:function(a){return a.__rect?a.__rect:(this._pathProxy.isEmpty()||this.buildPath(null,a),this._pathProxy.fastBoundingRect())},isCover:function(k,j){var a=this.getRect(this.style);return k>=a.x&&k<=a.x+a.width&&j>=a.y&&j<=a.y+a.height?g.isInsidePath(this._pathProxy.pathCommands,0,"fill",k,j):void 0}},b.inherits(d,c),d}),define("echarts/data/Graph",["require","zrender/tool/util"],function(f){var d=f("zrender/tool/util"),c=function(a){this._directed=a||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={}};c.prototype.isDirected=function(){return this._directed},c.prototype.addNode=function(h,a){if(this._nodesMap[h]){return this._nodesMap[h]}var i=new c.Node(h,a);return this.nodes.push(i),this._nodesMap[h]=i,i},c.prototype.getNodeById=function(a){return this._nodesMap[a]},c.prototype.addEdge=function(j,i,l){if("string"==typeof j&&(j=this._nodesMap[j]),"string"==typeof i&&(i=this._nodesMap[i]),j&&i){var h=j.id+"-"+i.id;if(this._edgesMap[h]){return this._edgesMap[h]}var k=new c.Edge(j,i,l);return this._directed&&(j.outEdges.push(k),i.inEdges.push(k)),j.edges.push(k),j!==i&&i.edges.push(k),this.edges.push(k),this._edgesMap[h]=k,k}},c.prototype.removeEdge=function(k){var j=k.node1,l=k.node2,h=j.id+"-"+l.id;this._directed&&(j.outEdges.splice(d.indexOf(j.outEdges,k),1),l.inEdges.splice(d.indexOf(l.inEdges,k),1)),j.edges.splice(d.indexOf(j.edges,k),1),j!==l&&l.edges.splice(d.indexOf(l.edges,k),1),delete this._edgesMap[h],this.edges.splice(d.indexOf(this.edges,k),1)},c.prototype.getEdge=function(h,a){return"string"!=typeof h&&(h=h.id),"string"!=typeof a&&(a=a.id),this._directed?this._edgesMap[h+"-"+a]:this._edgesMap[h+"-"+a]||this._edgesMap[a+"-"+h]},c.prototype.removeNode=function(h){if("string"!=typeof h||(h=this._nodesMap[h])){delete this._nodesMap[h.id],this.nodes.splice(d.indexOf(this.nodes,h),1);for(var a=0;a<this.edges.length;){var j=this.edges[a];j.node1===h||j.node2===h?this.removeEdge(j):a++}}},c.prototype.filterNode=function(j,h){for(var a=this.nodes.length,k=0;a>k;){j.call(h,this.nodes[k],k)?k++:(this.removeNode(this.nodes[k]),a--)}},c.prototype.filterEdge=function(j,h){for(var a=this.edges.length,k=0;a>k;){j.call(h,this.edges[k],k)?k++:(this.removeEdge(this.edges[k]),a--)}},c.prototype.eachNode=function(j,h){for(var a=this.nodes.length,k=0;a>k;k++){this.nodes[k]&&j.call(h,this.nodes[k],k)}},c.prototype.eachEdge=function(j,h){for(var a=this.edges.length,k=0;a>k;k++){this.edges[k]&&j.call(h,this.edges[k],k)}},c.prototype.clear=function(){this.nodes.length=0,this.edges.length=0,this._nodesMap={},this._edgesMap={}},c.prototype.breadthFirstTraverse=function(v,y,q,m){if("string"==typeof y&&(y=this._nodesMap[y]),y){var x="edges";"out"===q?x="outEdges":"in"===q&&(x="inEdges");for(var k=0;k<this.nodes.length;k++){this.nodes[k].__visited=!1}if(!v.call(m,y,null)){for(var j=[y];j.length;){for(var z=j.shift(),p=z[x],k=0;k<p.length;k++){var u=p[k],w=u.node1===z?u.node2:u.node1;if(!w.__visited){if(v.call(w,w,z)){return}j.push(w),w.__visited=!0}}}}}},c.prototype.clone=function(){for(var h=new c(this._directed),a=0;a<this.nodes.length;a++){h.addNode(this.nodes[a].id,this.nodes[a].data)}for(var a=0;a<this.edges.length;a++){var i=this.edges[a];h.addEdge(i.node1.id,i.node2.id,i.data)}return h};var g=function(h,a){this.id=h,this.data=a||null,this.inEdges=[],this.outEdges=[],this.edges=[]};g.prototype.degree=function(){return this.edges.length},g.prototype.inDegree=function(){return this.inEdges.length},g.prototype.outDegree=function(){return this.outEdges.length};var b=function(j,h,a){this.node1=j,this.node2=h,this.data=a||null};return c.Node=g,c.Edge=b,c.fromMatrix=function(x,B,q){if(B&&B.length&&B[0].length===B.length&&x.length===B.length){for(var A=B.length,k=new c(q),i=0;A>i;i++){var C=k.addNode(x[i].id,x[i]);C.data.value=0,q&&(C.data.outValue=C.data.inValue=0)}for(var i=0;A>i;i++){for(var v=0;A>v;v++){var w=B[i][v];q&&(k.nodes[i].data.outValue+=w,k.nodes[v].data.inValue+=w),k.nodes[i].data.value+=w,k.nodes[v].data.value+=w}}for(var i=0;A>i;i++){for(var v=i;A>v;v++){var w=B[i][v];if(0!==w){var y=k.nodes[i],z=k.nodes[v],j=k.addEdge(y,z,{});if(j.data.weight=w,i!==v&&q&&B[v][i]){var u=k.addEdge(z,y,{});u.data.weight=B[v][i]}}}}return k}},c}),define("echarts/layout/Chord",["require"],function(){var c=function(d){d=d||{},this.sort=d.sort||null,this.sortSub=d.sortSub||null,this.padding=0.05,this.startAngle=d.startAngle||0,this.clockWise=null==d.clockWise?!1:d.clockWise,this.center=d.center||[0,0],this.directed=!0};c.prototype.run=function(H){H instanceof Array||(H=[H]);var B=H.length;if(B){for(var L=H[0],A=L.nodes.length,w=[],v=0,D=0;A>D;D++){var E=L.nodes[D],I={size:0,subGroups:[],node:E};w.push(I);for(var J=0,z=0;z<H.length;z++){var C=H[z],t=C.getNodeById(E.id);if(t){I.size+=t.layout.size;for(var F=this.directed?t.outEdges:t.edges,i=0;i<F.length;i++){var k=F[i],G=k.layout.weight;I.subGroups.push({weight:G,edge:k,graph:C}),J+=G}}}v+=I.size;for(var j=I.size/J,i=0;i<I.subGroups.length;i++){I.subGroups[i].weight*=j}"ascending"===this.sortSub?I.subGroups.sort(b):"descending"===this.sort&&(I.subGroups.sort(b),I.subGroups.reverse())}"ascending"===this.sort?w.sort(a):"descending"===this.sort&&(w.sort(a),w.reverse());for(var j=(2*Math.PI-this.padding*A)/v,M=this.startAngle,K=this.clockWise?1:-1,D=0;A>D;D++){var I=w[D];I.node.layout.startAngle=M,I.node.layout.endAngle=M+K*I.size*j,I.node.layout.subGroups=[];for(var i=0;i<I.subGroups.length;i++){var q=I.subGroups[i];q.edge.layout.startAngle=M,M+=K*q.weight*j,q.edge.layout.endAngle=M}M=I.node.layout.endAngle+K*this.padding}}};var b=function(f,d){return f.weight-d.weight},a=function(f,d){return f.size-d.size};return c});