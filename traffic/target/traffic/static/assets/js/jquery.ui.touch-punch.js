/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return}var d=b.ui.mouse.prototype,f=d._mouseInit,c=d._mouseDestroy,a;function e(i,j,g){if(i.originalEvent.touches.length>1){return}if(g!==false){i.preventDefault()}var k=i.originalEvent.changedTouches[0],h=document.createEvent("MouseEvents");h.initMouseEvent(j,true,true,window,1,k.screenX,k.screenY,k.clientX,k.clientY,false,false,false,false,0,null);i.target.dispatchEvent(h)}d._touchStart=function(h){var g=this;if(a||!g._mouseCapture(h.originalEvent.changedTouches[0])){return}a=true;g._touchMoved=false;e(h,"mouseover",false);e(h,"mousemove",false);e(h,"mousedown",false)};d._touchMove=function(g){if(!a){return}this._touchMoved=true;e(g,"mousemove")};d._touchEnd=function(g){if(!a){return}e(g,"mouseup");e(g,"mouseout");if(!this._touchMoved){e(g,"click")}a=false};d._mouseInit=function(){var g=this;g.element.bind({touchstart:b.proxy(g,"_touchStart"),touchmove:b.proxy(g,"_touchMove"),touchend:b.proxy(g,"_touchEnd")});f.call(g)};d._mouseDestroy=function(){var g=this;g.element.unbind({touchstart:b.proxy(g,"_touchStart"),touchmove:b.proxy(g,"_touchMove"),touchend:b.proxy(g,"_touchEnd")});c.call(g)}})(jQuery);