(function(b){var a=b.ligerui;b.fn.ligerDrag=function(c){return a.run.call(this,"ligerDrag",arguments,{idAttrName:"ligeruidragid",hasElement:false,propertyToElemnt:"target"})};b.fn.ligerGetDragManager=function(){return a.run.call(this,"ligerGetDragManager",arguments,{idAttrName:"ligeruidragid",hasElement:false,propertyToElemnt:"target"})};b.ligerDefaults.Drag={onStartDrag:false,onDrag:false,onStopDrag:false,handler:null,proxy:true,revert:false,animate:true,onRevert:null,onEndRevert:null,receive:null,onDragEnter:null,onDragOver:null,onDragLeave:null,onDrop:null,disabled:false,proxyX:null,proxyY:null};a.controls.Drag=function(c){a.controls.Drag.base.constructor.call(this,null,c)};a.controls.Drag.ligerExtend(a.core.UIComponent,{__getType:function(){return"Drag"},__idPrev:function(){return"Drag"},_render:function(){var c=this,d=this.options;this.set(d);c.cursor="move";c.handler.css("cursor",c.cursor);c.handler.bind("mousedown.drag",function(f){if(d.disabled){return}if(f.button==2){return}c._start.call(c,f)}).bind("mousemove.drag",function(){if(d.disabled){return}c.handler.css("cursor",c.cursor)})},_rendered:function(){this.options.target.ligeruidragid=this.id},_start:function(f){var c=this,d=this.options;if(c.reverting){return}if(d.disabled){return}c.current={target:c.target,left:c.target.offset().left,top:c.target.offset().top,startX:f.pageX||f.screenX,startY:f.pageY||f.clientY};if(c.trigger("startDrag",[c.current,f])==false){return false}c.cursor="move";c._createProxy(d.proxy,f);if(d.proxy&&!c.proxy){return false}(c.proxy||c.handler).css("cursor",c.cursor);b(document).bind("selectstart.drag",function(){return false});b(document).bind("mousemove.drag",function(){c._drag.apply(c,arguments)});a.draggable.dragging=true;b(document).bind("mouseup.drag",function(){a.draggable.dragging=false;c._stop.apply(c,arguments)})},_drag:function(i){var f=this,h=this.options;if(!f.current){return}var d=i.pageX||i.screenX;var c=i.pageY||i.screenY;f.current.diffX=d-f.current.startX;f.current.diffY=c-f.current.startY;(f.proxy||f.handler).css("cursor",f.cursor);if(f.receive){f.receive.each(function(e,k){var j=b(k);var g=j.offset();if(d>g.left&&d<g.left+j.width()&&c>g.top&&c<g.top+j.height()){if(!f.receiveEntered[e]){f.receiveEntered[e]=true;f.trigger("dragEnter",[k,f.proxy||f.target,i])}else{f.trigger("dragOver",[k,f.proxy||f.target,i])}}else{if(f.receiveEntered[e]){f.receiveEntered[e]=false;f.trigger("dragLeave",[k,f.proxy||f.target,i])}}})}if(f.hasBind("drag")){if(f.trigger("drag",[f.current,i])!=false){f._applyDrag()}else{if(f.proxy){f._removeProxy()}else{f._stop()}}}else{f._applyDrag()}},_stop:function(f){var c=this,d=this.options;b(document).unbind("mousemove.drag");b(document).unbind("mouseup.drag");b(document).unbind("selectstart.drag");if(c.receive){c.receive.each(function(e,g){if(c.receiveEntered[e]){c.trigger("drop",[g,c.proxy||c.target,f])}})}if(c.proxy){if(d.revert){if(c.hasBind("revert")){if(c.trigger("revert",[c.current,f])!=false){c._revert(f)}else{c._removeProxy()}}else{c._revert(f)}}else{c._applyDrag(c.target);c._removeProxy()}}c.cursor="move";c.trigger("stopDrag",[c.current,f]);c.current=null;c.handler.css("cursor",c.cursor)},_revert:function(d){var c=this;c.reverting=true;c.proxy.animate({left:c.current.left,top:c.current.top},function(){c.reverting=false;c._removeProxy();c.trigger("endRevert",[c.current,d]);c.current=null})},_applyDrag:function(c){var d=this,f=this.options;c=c||d.proxy||d.target;var i={},h=false;var e=c==d.target;if(d.current.diffX){if(e||f.proxyX==null){i.left=d.current.left+d.current.diffX}else{i.left=d.current.startX+f.proxyX+d.current.diffX}h=true}if(d.current.diffY){if(e||f.proxyY==null){i.top=d.current.top+d.current.diffY}else{i.top=d.current.startY+f.proxyY+d.current.diffY}h=true}if(c==d.target&&d.proxy&&f.animate){d.reverting=true;c.animate(i,function(){d.reverting=false})}else{c.css(i)}},_setReceive:function(c){this.receiveEntered={};if(!c){return}if(typeof c=="string"){this.receive=b(c)}else{this.receive=c}},_setHandler:function(c){var d=this,e=this.options;if(!c){d.handler=b(e.target)}else{d.handler=(typeof c=="string"?b(c,e.target):c)}},_setTarget:function(c){this.target=b(c)},_setCursor:function(c){this.cursor=c;(this.proxy||this.handler).css("cursor",c)},_createProxy:function(c,h){if(!c){return}var d=this,f=this.options;if(typeof c=="function"){d.proxy=c.call(this.options.target,d,h)}else{if(c=="clone"){d.proxy=d.target.clone().css("position","absolute");d.proxy.appendTo("body")}else{d.proxy=b("<div class='l-draggable'></div>");d.proxy.width(d.target.width()).height(d.target.height());d.proxy.attr("dragid",d.id).appendTo("body")}}d.proxy.css({left:f.proxyX==null?d.current.left:d.current.startX+f.proxyX,top:f.proxyY==null?d.current.top:d.current.startY+f.proxyY}).show()},_removeProxy:function(){var c=this;if(c.proxy){c.proxy.remove();c.proxy=null}}})})(jQuery);