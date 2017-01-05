define("echarts/chart/scatter",["require","./base","../util/shape/Symbol","../component/axis","../component/grid","../component/dataZoom","../component/dataRange","../config","zrender/tool/util","zrender/tool/color","../chart"],function(g){function d(l,k,p,i,m){c.call(this,l,k,p,i,m),this.refresh(i)}var c=g("./base"),j=g("../util/shape/Symbol");g("../component/axis"),g("../component/grid"),g("../component/dataZoom"),g("../component/dataRange");var b=g("../config");b.scatter={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,xAxisIndex:0,yAxisIndex:0,symbolSize:4,large:!1,largeThreshold:2000,itemStyle:{normal:{label:{show:!1}},emphasis:{label:{show:!1}}}};var h=g("zrender/tool/util"),f=g("zrender/tool/color");return d.prototype={type:b.CHART_TYPE_SCATTER,_buildShape:function(){var r=this.series;this._sIndex2ColorMap={},this._symbol=this.option.symbolList,this._sIndex2ShapeMap={},this.selectedMap={},this.xMarkMap={};for(var v,p,k,a,w=this.component.legend,m=[],q=0,u=r.length;u>q;q++){if(v=r[q],p=v.name,v.type===b.CHART_TYPE_SCATTER){if(r[q]=this.reformOption(r[q]),this.legendHoverLink=r[q].legendHoverLink||this.legendHoverLink,this._sIndex2ShapeMap[q]=this.query(v,"symbol")||this._symbol[q%this._symbol.length],w){if(this.selectedMap[p]=w.isSelected(p),this._sIndex2ColorMap[q]=f.alpha(w.getColor(p),0.5),k=w.getItemShape(p)){var a=this._sIndex2ShapeMap[q];k.style.brushType=a.match("empty")?"stroke":"both",a=a.replace("empty","").toLowerCase(),a.match("rectangle")&&(k.style.x+=Math.round((k.style.width-k.style.height)/2),k.style.width=k.style.height),a.match("star")&&(k.style.n=a.replace("star","")-0||5,a="star"),a.match("image")&&(k.style.image=a.replace(new RegExp("^image:\\/\\/"),""),k.style.x+=Math.round((k.style.width-k.style.height)/2),k.style.width=k.style.height,a="image"),k.style.iconType=a,w.setItemShape(p,k)}}else{this.selectedMap[p]=!0,this._sIndex2ColorMap[q]=f.alpha(this.zr.getColor(q),0.5)}this.selectedMap[p]&&m.push(q)}}this._buildSeries(m),this.addShapeList()},_buildSeries:function(B){if(0!==B.length){for(var G,z,w,E,v,k,H,y,A=this.series,C={},D=0,x=B.length;x>D;D++){if(G=B[D],z=A[G],0!==z.data.length){v=this.component.xAxis.getAxis(z.xAxisIndex||0),k=this.component.yAxis.getAxis(z.yAxisIndex||0),C[G]=[];for(var q=0,F=z.data.length;F>q;q++){w=z.data[q],E=this.getDataFromOption(w,"-"),"-"===E||E.length<2||(H=v.getCoord(E[0]),y=k.getCoord(E[1]),C[G].push([H,y,q,w.name||""]))}this.xMarkMap[G]=this._markMap(v,k,z.data,C[G]),this.buildMark(G)}}this._buildPointList(C)}},_markMap:function(A,E,y,v){for(var D,u={min0:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,sum0:0,counter0:0,average0:0,min1:Number.POSITIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum1:0,counter1:0,average1:0},k=0,F=v.length;F>k;k++){D=y[v[k][2]].value||y[v[k][2]],u.min0>D[0]&&(u.min0=D[0],u.minY0=v[k][1],u.minX0=v[k][0]),u.max0<D[0]&&(u.max0=D[0],u.maxY0=v[k][1],u.maxX0=v[k][0]),u.sum0+=D[0],u.counter0++,u.min1>D[1]&&(u.min1=D[1],u.minY1=v[k][1],u.minX1=v[k][0]),u.max1<D[1]&&(u.max1=D[1],u.maxY1=v[k][1],u.maxX1=v[k][0]),u.sum1+=D[1],u.counter1++}var x=this.component.grid.getX(),z=this.component.grid.getXend(),B=this.component.grid.getY(),C=this.component.grid.getYend();u.average0=u.sum0/u.counter0;var w=A.getCoord(u.average0);u.averageLine0=[[w,C],[w,B]],u.minLine0=[[u.minX0,C],[u.minX0,B]],u.maxLine0=[[u.maxX0,C],[u.maxX0,B]],u.average1=u.sum1/u.counter1;var q=E.getCoord(u.average1);return u.averageLine1=[[x,q],[z,q]],u.minLine1=[[x,u.minY1],[z,u.minY1]],u.maxLine1=[[x,u.maxY1],[z,u.maxY1]],u},_buildPointList:function(v){var x,u,p,w,m=this.series;for(var k in v){if(x=m[k],u=v[k],x.large&&x.data.length>x.largeThreshold){this.shapeList.push(this._getLargeSymbol(x,u,this.getItemStyleColor(this.query(x,"itemStyle.normal.color"),k,-1)||this._sIndex2ColorMap[k]))}else{for(var y=0,q=u.length;q>y;y++){p=u[y],w=this._getSymbol(k,p[2],p[3],p[0],p[1]),w&&this.shapeList.push(w)}}}},_getSymbol:function(w,z,u,p,y){var m,k=this.series,A=k[w],q=A.data[z],v=this.component.dataRange;if(v){if(m=isNaN(q[2])?this._sIndex2ColorMap[w]:v.getColor(q[2]),!m){return null}}else{m=this._sIndex2ColorMap[w]}var x=this.getSymbolShape(A,w,q,z,u,p,y,this._sIndex2ShapeMap[w],m,"rgba(0,0,0,0)","vertical");return x.zlevel=A.zlevel,x.z=A.z,x._main=!0,x},_getLargeSymbol:function(l,k,a){return new j({zlevel:l.zlevel,z:l.z,_main:!0,hoverable:!1,style:{pointList:k,color:a,strokeColor:a},highlightStyle:{pointList:[]}})},getMarkCoord:function(u,m){var l,w=this.series[u],k=this.xMarkMap[u],v=this.component.xAxis.getAxis(w.xAxisIndex),q=this.component.yAxis.getAxis(w.yAxisIndex);if(!m.type||"max"!==m.type&&"min"!==m.type&&"average"!==m.type){l=["string"!=typeof m.xAxis&&v.getCoordByIndex?v.getCoordByIndex(m.xAxis||0):v.getCoord(m.xAxis||0),"string"!=typeof m.yAxis&&q.getCoordByIndex?q.getCoordByIndex(m.yAxis||0):q.getCoord(m.yAxis||0)]}else{var p=null!=m.valueIndex?m.valueIndex:1;l=[k[m.type+"X"+p],k[m.type+"Y"+p],k[m.type+"Line"+p],k[m.type+p]]}return l},refresh:function(a){a&&(this.option=a,this.series=a.series),this.backupShapeList(),this._buildShape()},ondataRange:function(i,a){this.component.dataRange&&(this.refresh(),a.needRefresh=!0)}},h.inherits(d,c),g("../chart").define("scatter",d),d}),define("echarts/component/dataRange",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","../util/shape/HandlePolygon","../config","zrender/tool/util","zrender/tool/event","zrender/tool/area","zrender/tool/color","../component"],function(m){function u(l,h,w,d,r){j.call(this,l,h,w,d,r);var i=this;i._ondrift=function(n,a){return i.__ondrift(this,n,a)},i._ondragend=function(){return i.__ondragend()},i._dataRangeSelected=function(a){return i.__dataRangeSelected(a)},i._dispatchHoverLink=function(a){return i.__dispatchHoverLink(a)},i._onhoverlink=function(a){return i.__onhoverlink(a)},this._selectedMap={},this._range={},this.refresh(d),h.bind(b.EVENT.HOVER,this._onhoverlink)}var j=m("./base"),f=m("zrender/shape/Text"),q=m("zrender/shape/Rectangle"),c=m("../util/shape/HandlePolygon"),b=m("../config");b.dataRange={zlevel:0,z:4,show:!0,orient:"vertical",x:"left",y:"bottom",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemWidth:20,itemHeight:14,precision:0,splitNumber:5,splitList:null,calculable:!1,selectedMode:!0,hoverLink:!0,realtime:!0,color:["#006edd","#e0ffff"],textStyle:{color:"#333"}};var v=m("zrender/tool/util"),g=m("zrender/tool/event"),k=m("zrender/tool/area"),p=m("zrender/tool/color");return u.prototype={type:b.COMPONENT_TYPE_DATARANGE,_textGap:10,_buildShape:function(){if(this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this._isContinuity()?this._buildGradient():this._buildItem(),this.dataRangeOption.show){for(var d=0,a=this.shapeList.length;a>d;d++){this.zr.addShape(this.shapeList[d])}}this._syncShapeFromRange()},_buildItem:function(){var C,G,A,n,a=this._valueTextList,H=a.length,z=this.getFont(this.dataRangeOption.textStyle),D=this._itemGroupLocation.x,E=this._itemGroupLocation.y,x=this.dataRangeOption.itemWidth,h=this.dataRangeOption.itemHeight,F=this.dataRangeOption.itemGap,B=k.getTextHeight("国",z);"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(D=this._itemGroupLocation.x+this._itemGroupLocation.width-x);var w=!0;this.dataRangeOption.text&&(w=!1,this.dataRangeOption.text[0]&&(A=this._getTextShape(D,E,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?D+=k.getTextWidth(this.dataRangeOption.text[0],z)+this._textGap:(E+=B+this._textGap,A.style.y+=B/2+this._textGap,A.style.textBaseline="bottom"),this.shapeList.push(new f(A))));for(var y=0;H>y;y++){C=a[y],n=this.getColorByIndex(y),G=this._getItemShape(D,E,x,h,this._selectedMap[y]?n:"#ccc"),G._idx=y,G.onmousemove=this._dispatchHoverLink,this.dataRangeOption.selectedMode&&(G.clickable=!0,G.onclick=this._dataRangeSelected),this.shapeList.push(new q(G)),w&&(A={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:D+x+5,y:E,color:this._selectedMap[y]?this.dataRangeOption.textStyle.color:"#ccc",text:a[y],textFont:z,textBaseline:"top"},highlightStyle:{brushType:"fill"}},"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(A.style.x-=x+10,A.style.textAlign="right"),A._idx=y,A.onmousemove=this._dispatchHoverLink,this.dataRangeOption.selectedMode&&(A.clickable=!0,A.onclick=this._dataRangeSelected),this.shapeList.push(new f(A))),"horizontal"==this.dataRangeOption.orient?D+=x+(w?5:0)+(w?k.getTextWidth(C,z):0)+F:E+=h+F}!w&&this.dataRangeOption.text[1]&&("horizontal"==this.dataRangeOption.orient?D=D-F+this._textGap:E=E-F+this._textGap,A=this._getTextShape(D,E,this.dataRangeOption.text[1]),"horizontal"!=this.dataRangeOption.orient&&(A.style.y-=5,A.style.textBaseline="top"),this.shapeList.push(new f(A)))},_buildGradient:function(){var F,z,h=this.getFont(this.dataRangeOption.textStyle),a=this._itemGroupLocation.x,G=this._itemGroupLocation.y,y=this.dataRangeOption.itemWidth,C=this.dataRangeOption.itemHeight,D=k.getTextHeight("国",h),w=10,e=!0;this.dataRangeOption.text&&(e=!1,this.dataRangeOption.text[0]&&(z=this._getTextShape(a,G,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?a+=k.getTextWidth(this.dataRangeOption.text[0],h)+this._textGap:(G+=D+this._textGap,z.style.y+=D/2+this._textGap,z.style.textBaseline="bottom"),this.shapeList.push(new f(z))));for(var E=m("zrender/tool/color"),A=1/(this.dataRangeOption.color.length-1),n=[],x=0,B=this.dataRangeOption.color.length;B>x;x++){n.push([x*A,this.dataRangeOption.color[x]])}"horizontal"==this.dataRangeOption.orient?(F={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:a,y:G,width:y*w,height:C,color:E.getLinearGradient(a,G,a+y*w,G,n)},hoverable:!1},a+=y*w+this._textGap):(F={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:a,y:G,width:y,height:C*w,color:E.getLinearGradient(a,G,a,G+C*w,n)},hoverable:!1},G+=C*w+this._textGap),this.shapeList.push(new q(F)),this._calculableLocation=F.style,this.dataRangeOption.calculable&&(this._buildFiller(),this._bulidMask(),this._bulidHandle()),this._buildIndicator(),!e&&this.dataRangeOption.text[1]&&(z=this._getTextShape(a,G,this.dataRangeOption.text[1]),this.shapeList.push(new f(z)))},_buildIndicator:function(){var x,l,h=this._calculableLocation.x,y=this._calculableLocation.y,d=this._calculableLocation.width,w=this._calculableLocation.height,o=5;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(x=[[h,y+w],[h-o,y+w+o],[h+o,y+w+o]],l="bottom"):(x=[[h,y],[h-o,y-o],[h+o,y-o]],l="top"):"right"!=this.dataRangeOption.x?(x=[[h+d,y],[h+d+o,y-o],[h+d+o,y+o]],l="right"):(x=[[h,y],[h-o,y-o],[h-o,y+o]],l="left"),this._indicatorShape={style:{pointList:x,color:"#fff",__rect:{x:Math.min(x[0][0],x[1][0]),y:Math.min(x[0][1],x[1][1]),width:o*("horizontal"==this.dataRangeOption.orient?2:1),height:o*("horizontal"==this.dataRangeOption.orient?1:2)}},highlightStyle:{brushType:"fill",textPosition:l,textColor:this.dataRangeOption.textStyle.color},hoverable:!1},this._indicatorShape=new c(this._indicatorShape)},_buildFiller:function(){this._fillerShape={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:this._calculableLocation.x,y:this._calculableLocation.y,width:this._calculableLocation.width,height:this._calculableLocation.height,color:"rgba(255,255,255,0)"},highlightStyle:{strokeColor:"rgba(255,255,255,0.5)",lineWidth:1},draggable:!0,ondrift:this._ondrift,ondragend:this._ondragend,onmousemove:this._dispatchHoverLink,_type:"filler"},this._fillerShape=new q(this._fillerShape),this.shapeList.push(this._fillerShape)},_bulidHandle:function(){var C,H,A,w,F,h,I,z,D=this._calculableLocation.x,E=this._calculableLocation.y,y=this._calculableLocation.width,o=this._calculableLocation.height,G=this.getFont(this.dataRangeOption.textStyle),B=k.getTextHeight("国",G),x=Math.max(k.getTextWidth(this._textFormat(this.dataRangeOption.max),G),k.getTextWidth(this._textFormat(this.dataRangeOption.min),G))+2;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(C=[[D,E],[D,E+o+B],[D-B,E+o+B],[D-1,E+o],[D-1,E]],H=D-x/2-B,A=E+o+B/2+2,w={x:D-x-B,y:E+o,width:x+B,height:B},F=[[D+y,E],[D+y,E+o+B],[D+y+B,E+o+B],[D+y+1,E+o],[D+y+1,E]],h=D+y+x/2+B,I=A,z={x:D+y,y:E+o,width:x+B,height:B}):(C=[[D,E+o],[D,E-B],[D-B,E-B],[D-1,E],[D-1,E+o]],H=D-x/2-B,A=E-B/2-2,w={x:D-x-B,y:E-B,width:x+B,height:B},F=[[D+y,E+o],[D+y,E-B],[D+y+B,E-B],[D+y+1,E],[D+y+1,E+o]],h=D+y+x/2+B,I=A,z={x:D+y,y:E-B,width:x+B,height:B}):(x+=B,"right"!=this.dataRangeOption.x?(C=[[D,E],[D+y+B,E],[D+y+B,E-B],[D+y,E-1],[D,E-1]],H=D+y+x/2+B/2,A=E-B/2,w={x:D+y,y:E-B,width:x+B,height:B},F=[[D,E+o],[D+y+B,E+o],[D+y+B,E+B+o],[D+y,E+1+o],[D,E+o+1]],h=H,I=E+o+B/2,z={x:D+y,y:E+o,width:x+B,height:B}):(C=[[D+y,E],[D-B,E],[D-B,E-B],[D,E-1],[D+y,E-1]],H=D-x/2-B/2,A=E-B/2,w={x:D-x-B,y:E-B,width:x+B,height:B},F=[[D+y,E+o],[D-B,E+o],[D-B,E+B+o],[D,E+1+o],[D+y,E+o+1]],h=H,I=E+o+B/2,z={x:D-x-B,y:E+o,width:x+B,height:B})),this._startShape={style:{pointList:C,text:this._textFormat(this.dataRangeOption.max),textX:H,textY:A,textFont:G,color:this.getColor(this.dataRangeOption.max),rect:w,x:C[0][0],y:C[0][1],_x:C[0][0],_y:C[0][1]}},this._startShape.highlightStyle={strokeColor:this._startShape.style.color,lineWidth:1},this._endShape={style:{pointList:F,text:this._textFormat(this.dataRangeOption.min),textX:h,textY:I,textFont:G,color:this.getColor(this.dataRangeOption.min),rect:z,x:F[0][0],y:F[0][1],_x:F[0][0],_y:F[0][1]}},this._endShape.highlightStyle={strokeColor:this._endShape.style.color,lineWidth:1},this._startShape.zlevel=this._endShape.zlevel=this.getZlevelBase(),this._startShape.z=this._endShape.z=this.getZBase()+1,this._startShape.draggable=this._endShape.draggable=!0,this._startShape.ondrift=this._endShape.ondrift=this._ondrift,this._startShape.ondragend=this._endShape.ondragend=this._ondragend,this._startShape.style.textColor=this._endShape.style.textColor=this.dataRangeOption.textStyle.color,this._startShape.style.textAlign=this._endShape.style.textAlign="center",this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape.style.textBaseline=this._endShape.style.textBaseline="middle",this._startShape.style.width=this._endShape.style.width=0,this._startShape.style.height=this._endShape.style.height=0,this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape=new c(this._startShape),this._endShape=new c(this._endShape),this.shapeList.push(this._startShape),this.shapeList.push(this._endShape)},_bulidMask:function(){var h=this._calculableLocation.x,d=this._calculableLocation.y,a=this._calculableLocation.width,l=this._calculableLocation.height;this._startMask={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:h,y:d,width:"horizontal"==this.dataRangeOption.orient?0:a,height:"horizontal"==this.dataRangeOption.orient?l:0,color:"#ccc"},hoverable:!1},this._endMask={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:"horizontal"==this.dataRangeOption.orient?h+a:h,y:"horizontal"==this.dataRangeOption.orient?d:d+l,width:"horizontal"==this.dataRangeOption.orient?0:a,height:"horizontal"==this.dataRangeOption.orient?l:0,color:"#ccc"},hoverable:!1},this._startMask=new q(this._startMask),this._endMask=new q(this._endMask),this.shapeList.push(this._startMask),this.shapeList.push(this._endMask)},_buildBackground:function(){var a=this.reformCssArray(this.dataRangeOption.padding);this.shapeList.push(new q({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._itemGroupLocation.x-a[3],y:this._itemGroupLocation.y-a[0],width:this._itemGroupLocation.width+a[3]+a[1],height:this._itemGroupLocation.height+a[0]+a[2],brushType:0===this.dataRangeOption.borderWidth?"fill":"both",color:this.dataRangeOption.backgroundColor,strokeColor:this.dataRangeOption.borderColor,lineWidth:this.dataRangeOption.borderWidth}}))},_getItemGroupLocation:function(){var J=this._valueTextList,y=J.length,G=this.dataRangeOption.itemGap,D=this.dataRangeOption.itemWidth,M=this.dataRangeOption.itemHeight,C=0,A=0,z=this.getFont(this.dataRangeOption.textStyle),F=k.getTextHeight("国",z),K=10;if("horizontal"==this.dataRangeOption.orient){if(this.dataRangeOption.text||this._isContinuity()){C=(this._isContinuity()?D*K+G:y*(D+G))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?k.getTextWidth(this.dataRangeOption.text[0],z)+this._textGap:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?k.getTextWidth(this.dataRangeOption.text[1],z)+this._textGap:0)}else{D+=5;for(var L=0;y>L;L++){C+=D+k.getTextWidth(J[L],z)+G}}C-=G,A=Math.max(F,M)}else{var E;if(this.dataRangeOption.text||this._isContinuity()){A=(this._isContinuity()?M*K+G:y*(M+G))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?this._textGap+F:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?this._textGap+F:0),E=Math.max(k.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[0]||"",z),k.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[1]||"",z)),C=Math.max(D,E)}else{A=(M+G)*y,D+=5,E=0;for(var L=0;y>L;L++){E=Math.max(E,k.getTextWidth(J[L],z))}C=D+E}A-=G}var B,x=this.reformCssArray(this.dataRangeOption.padding),H=this.zr.getWidth();switch(this.dataRangeOption.x){case"center":B=Math.floor((H-C)/2);break;case"left":B=x[3]+this.dataRangeOption.borderWidth;break;case"right":B=H-C-x[1]-this.dataRangeOption.borderWidth;break;default:B=this.parsePercent(this.dataRangeOption.x,H),B=isNaN(B)?0:B}var h,w=this.zr.getHeight();switch(this.dataRangeOption.y){case"top":h=x[0]+this.dataRangeOption.borderWidth;break;case"bottom":h=w-A-x[2]-this.dataRangeOption.borderWidth;break;case"center":h=Math.floor((w-A)/2);break;default:h=this.parsePercent(this.dataRangeOption.y,w),h=isNaN(h)?0:h}if(this.dataRangeOption.calculable){var I=Math.max(k.getTextWidth(this.dataRangeOption.max,z),k.getTextWidth(this.dataRangeOption.min,z))+F;"horizontal"==this.dataRangeOption.orient?(I>B&&(B=I),B+C+I>H&&(B-=I)):(F>h&&(h=F),h+A+F>w&&(h-=F))}return{x:B,y:h,width:C,height:A}},_getTextShape:function(h,d,a){return{zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:"horizontal"==this.dataRangeOption.orient?h:this._itemGroupLocation.x+this._itemGroupLocation.width/2,y:"horizontal"==this.dataRangeOption.orient?this._itemGroupLocation.y+this._itemGroupLocation.height/2:d,color:this.dataRangeOption.textStyle.color,text:a,textFont:this.getFont(this.dataRangeOption.textStyle),textBaseline:"horizontal"==this.dataRangeOption.orient?"middle":"top",textAlign:"horizontal"==this.dataRangeOption.orient?"left":"center"},hoverable:!1}},_getItemShape:function(o,l,h,r,d){return{zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:o,y:l+1,width:h,height:r-2,color:d},highlightStyle:{strokeColor:d,lineWidth:1}}},__ondrift:function(w,l,h){var y=this._calculableLocation.x,d=this._calculableLocation.y,x=this._calculableLocation.width,s=this._calculableLocation.height;return"horizontal"==this.dataRangeOption.orient?w.style.x+l<=y?w.style.x=y:w.style.x+l+w.style.width>=y+x?w.style.x=y+x-w.style.width:w.style.x+=l:w.style.y+h<=d?w.style.y=d:w.style.y+h+w.style.height>=d+s?w.style.y=d+s-w.style.height:w.style.y+=h,"filler"==w._type?this._syncHandleShape():this._syncFillerShape(w),this.dataRangeOption.realtime&&this._dispatchDataRange(),!0},__ondragend:function(){this.isDragend=!0},ondragend:function(d,a){this.isDragend&&d.target&&(a.dragOut=!0,a.dragIn=!0,this.dataRangeOption.realtime||this._dispatchDataRange(),a.needRefresh=!1,this.isDragend=!1)},_syncShapeFromRange:function(){var o=this.dataRangeOption.range||{},l=o.start,h=o.end;if(l>h&&(l=[h,h=l][0]),this._range.end=null!=l?l:null!=this._range.end?this._range.end:0,this._range.start=null!=h?h:null!=this._range.start?this._range.start:100,100!=this._range.start||0!==this._range.end){if("horizontal"==this.dataRangeOption.orient){var r=this._fillerShape.style.width;this._fillerShape.style.x+=r*(100-this._range.start)/100,this._fillerShape.style.width=r*(this._range.start-this._range.end)/100}else{var d=this._fillerShape.style.height;this._fillerShape.style.y+=d*(100-this._range.start)/100,this._fillerShape.style.height=d*(this._range.start-this._range.end)/100}this.zr.modShape(this._fillerShape.id),this._syncHandleShape()}},_syncHandleShape:function(){var h=this._calculableLocation.x,d=this._calculableLocation.y,a=this._calculableLocation.width,l=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(this._startShape.style.x=this._fillerShape.style.x,this._startMask.style.width=this._startShape.style.x-h,this._endShape.style.x=this._fillerShape.style.x+this._fillerShape.style.width,this._endMask.style.x=this._endShape.style.x,this._endMask.style.width=h+a-this._endShape.style.x,this._range.start=Math.ceil(100-(this._startShape.style.x-h)/a*100),this._range.end=Math.floor(100-(this._endShape.style.x-h)/a*100)):(this._startShape.style.y=this._fillerShape.style.y,this._startMask.style.height=this._startShape.style.y-d,this._endShape.style.y=this._fillerShape.style.y+this._fillerShape.style.height,this._endMask.style.y=this._endShape.style.y,this._endMask.style.height=d+l-this._endShape.style.y,this._range.start=Math.ceil(100-(this._startShape.style.y-d)/l*100),this._range.end=Math.floor(100-(this._endShape.style.y-d)/l*100)),this._syncShape()},_syncFillerShape:function(w){var l,h,y=this._calculableLocation.x,d=this._calculableLocation.y,x=this._calculableLocation.width,s=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(l=this._startShape.style.x,h=this._endShape.style.x,w.id==this._startShape.id&&l>=h?(h=l,this._endShape.style.x=l):w.id==this._endShape.id&&l>=h&&(l=h,this._startShape.style.x=l),this._fillerShape.style.x=l,this._fillerShape.style.width=h-l,this._startMask.style.width=l-y,this._endMask.style.x=h,this._endMask.style.width=y+x-h,this._range.start=Math.ceil(100-(l-y)/x*100),this._range.end=Math.floor(100-(h-y)/x*100)):(l=this._startShape.style.y,h=this._endShape.style.y,w.id==this._startShape.id&&l>=h?(h=l,this._endShape.style.y=l):w.id==this._endShape.id&&l>=h&&(l=h,this._startShape.style.y=l),this._fillerShape.style.y=l,this._fillerShape.style.height=h-l,this._startMask.style.height=l-d,this._endMask.style.y=h,this._endMask.style.height=d+s-h,this._range.start=Math.ceil(100-(l-d)/s*100),this._range.end=Math.floor(100-(h-d)/s*100)),this._syncShape()},_syncShape:function(){this._startShape.position=[this._startShape.style.x-this._startShape.style._x,this._startShape.style.y-this._startShape.style._y],this._startShape.style.text=this._textFormat(this._gap*this._range.start+this.dataRangeOption.min),this._startShape.style.color=this._startShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.start+this.dataRangeOption.min),this._endShape.position=[this._endShape.style.x-this._endShape.style._x,this._endShape.style.y-this._endShape.style._y],this._endShape.style.text=this._textFormat(this._gap*this._range.end+this.dataRangeOption.min),this._endShape.style.color=this._endShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.end+this.dataRangeOption.min),this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.modShape(this._startMask.id),this.zr.modShape(this._endMask.id),this.zr.modShape(this._fillerShape.id),this.zr.refreshNextFrame()},_dispatchDataRange:function(){this.messageCenter.dispatch(b.EVENT.DATA_RANGE,null,{range:{start:this._range.end,end:this._range.start}},this.myChart)},__dataRangeSelected:function(o){if("single"===this.dataRangeOption.selectedMode){for(var l in this._selectedMap){this._selectedMap[l]=!1}}var h=o.target._idx;this._selectedMap[h]=!this._selectedMap[h];var r,d;this._useCustomizedSplit()?(r=this._splitList[h].max,d=this._splitList[h].min):(r=(this._colorList.length-h)*this._gap+this.dataRangeOption.min,d=r-this._gap),this.messageCenter.dispatch(b.EVENT.DATA_RANGE_SELECTED,o.event,{selected:this._selectedMap,target:h,valueMax:r,valueMin:d},this.myChart),this.messageCenter.dispatch(b.EVENT.REFRESH,null,null,this.myChart)},__dispatchHoverLink:function(r){var l,h;if(this.dataRangeOption.calculable){var w,d=this.dataRangeOption.max-this.dataRangeOption.min;w="horizontal"==this.dataRangeOption.orient?(1-(g.getX(r.event)-this._calculableLocation.x)/this._calculableLocation.width)*d:(1-(g.getY(r.event)-this._calculableLocation.y)/this._calculableLocation.height)*d,l=w-0.05*d,h=w+0.05*d}else{if(this._useCustomizedSplit()){var s=r.target._idx;h=this._splitList[s].max,l=this._splitList[s].min}else{var s=r.target._idx;h=(this._colorList.length-s)*this._gap+this.dataRangeOption.min,l=h-this._gap}}this.messageCenter.dispatch(b.EVENT.DATA_RANGE_HOVERLINK,r.event,{valueMin:l,valueMax:h},this.myChart)},__onhoverlink:function(d){if(this.dataRangeOption.show&&this.dataRangeOption.hoverLink&&this._indicatorShape&&d&&null!=d.seriesIndex&&null!=d.dataIndex){var a=d.value;if(""===a||isNaN(a)){return}a<this.dataRangeOption.min?a=this.dataRangeOption.min:a>this.dataRangeOption.max&&(a=this.dataRangeOption.max),this._indicatorShape.position="horizontal"==this.dataRangeOption.orient?[(this.dataRangeOption.max-a)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.width,0]:[0,(this.dataRangeOption.max-a)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.height],this._indicatorShape.style.text=this._textFormat(d.value),this._indicatorShape.style.color=this.getColor(a),this.zr.addHoverShape(this._indicatorShape)}},_textFormat:function(h,d){var a=this.dataRangeOption;if(h!==-Number.MAX_VALUE&&(h=(+h).toFixed(a.precision)),null!=d&&d!==Number.MAX_VALUE&&(d=(+d).toFixed(a.precision)),a.formatter){if("string"==typeof a.formatter){return a.formatter.replace("{value}",h===-Number.MAX_VALUE?"min":h).replace("{value2}",d===Number.MAX_VALUE?"max":d)}if("function"==typeof a.formatter){return a.formatter.call(this.myChart,h,d)}}return null==d?h:h===-Number.MAX_VALUE?"< "+d:d===Number.MAX_VALUE?"> "+h:h+" - "+d},_isContinuity:function(){var a=this.dataRangeOption;return !(a.splitList?a.splitList.length>0:a.splitNumber>0)||a.calculable},_useCustomizedSplit:function(){var a=this.dataRangeOption;return a.splitList&&a.splitList.length>0},_buildColorList:function(r){if(this._colorList=p.getGradientColors(this.dataRangeOption.color,Math.max((r-this.dataRangeOption.color.length)/(this.dataRangeOption.color.length-1),0)+1),this._colorList.length>r){for(var l=this._colorList.length,h=[this._colorList[0]],w=l/(r-1),d=1;r-1>d;d++){h.push(this._colorList[Math.floor(d*w)])}h.push(this._colorList[l-1]),this._colorList=h}if(this._useCustomizedSplit()){for(var s=this._splitList,d=0,l=s.length;l>d;d++){s[d].color&&(this._colorList[d]=s[d].color)}}},_buildGap:function(d){if(!this._useCustomizedSplit()){var a=this.dataRangeOption.precision;for(this._gap=(this.dataRangeOption.max-this.dataRangeOption.min)/d;this._gap.toFixed(a)-0!=this._gap&&5>a;){a++}this.dataRangeOption.precision=a,this._gap=((this.dataRangeOption.max-this.dataRangeOption.min)/d).toFixed(a)-0}},_buildDataList:function(w){for(var l=this._valueTextList=[],h=this.dataRangeOption,y=this._useCustomizedSplit(),d=0;w>d;d++){this._selectedMap[d]=!0;var x="";if(y){var s=this._splitList[w-1-d];x=null!=s.label?s.label:null!=s.single?this._textFormat(s.single):this._textFormat(s.min,s.max)}else{x=this._textFormat(d*this._gap+h.min,(d+1)*this._gap+h.min)}l.unshift(x)}},_buildSplitList:function(){if(this._useCustomizedSplit()){for(var r=this.dataRangeOption.splitList,l=this._splitList=[],h=0,w=r.length;w>h;h++){var d=r[h];if(!d||null==d.start&&null==d.end){throw new Error("Empty item exists in splitList!")}var s={label:d.label,color:d.color};s.min=d.start,s.max=d.end,s.min>s.max&&(s.min=[s.max,s.max=s.min][0]),s.min===s.max&&(s.single=s.max),null==s.min&&(s.min=-Number.MAX_VALUE),null==s.max&&(s.max=Number.MAX_VALUE),l.push(s)}}},refresh:function(h){if(h){this.option=h,this.option.dataRange=this.reformOption(this.option.dataRange);var d=this.dataRangeOption=this.option.dataRange;if(!this._useCustomizedSplit()&&(null==d.min||null==d.max)){throw new Error("option.dataRange.min or option.dataRange.max has not been defined.")}this.myChart.canvasSupported||(d.realtime=!1);var a=this._isContinuity()?100:this._useCustomizedSplit()?d.splitList.length:d.splitNumber;this._buildSplitList(),this._buildColorList(a),this._buildGap(a),this._buildDataList(a)}this.clear(),this._buildShape()},getColor:function(o){if(isNaN(o)){return null}var l;if(this._useCustomizedSplit()){for(var h=this._splitList,r=0,d=h.length;d>r;r++){if(h[r].min<=o&&h[r].max>=o){l=r;break}}}else{if(this.dataRangeOption.min==this.dataRangeOption.max){return this._colorList[0]}if(o<this.dataRangeOption.min?o=this.dataRangeOption.min:o>this.dataRangeOption.max&&(o=this.dataRangeOption.max),this.dataRangeOption.calculable&&(o-(this._gap*this._range.start+this.dataRangeOption.min)>0.00005||o-(this._gap*this._range.end+this.dataRangeOption.min)<-0.00005)){return null}l=this._colorList.length-Math.ceil((o-this.dataRangeOption.min)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._colorList.length),l==this._colorList.length&&l--}return this._selectedMap[l]?this._colorList[l]:null},getColorByIndex:function(a){return a>=this._colorList.length?a=this._colorList.length-1:0>a&&(a=0),this._colorList[a]},onbeforDispose:function(){this.messageCenter.unbind(b.EVENT.HOVER,this._onhoverlink)}},v.inherits(u,j),m("../component").define("dataRange",u),u}),define("echarts/util/shape/HandlePolygon",["require","zrender/shape/Base","zrender/shape/Polygon","zrender/tool/util"],function(f){function d(a){c.call(this,a)}var c=f("zrender/shape/Base"),g=f("zrender/shape/Polygon"),b=f("zrender/tool/util");return d.prototype={type:"handle-polygon",buildPath:function(h,a){g.prototype.buildPath(h,a)},isCover:function(j,h){var a=this.transformCoordToLocal(j,h);j=a[0],h=a[1];var k=this.style.rect;return j>=k.x&&j<=k.x+k.width&&h>=k.y&&h<=k.y+k.height?!0:!1}},b.inherits(d,c),d});