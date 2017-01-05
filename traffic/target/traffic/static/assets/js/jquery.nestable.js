/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
(function(e,g,h,c){var f="ontouchstart" in h.documentElement;var b=(function(){var m=h.createElement("div"),n=h.documentElement;if(!("pointerEvents" in m.style)){return false}m.style.pointerEvents="auto";m.style.pointerEvents="x";n.appendChild(m);var l=g.getComputedStyle&&g.getComputedStyle(m,"").pointerEvents==="auto";n.removeChild(m);return !!l})();var k="mousedown touchstart MSPointerDown pointerdown",j="mousemove touchmove MSPointerMove pointermove",a="mouseup touchend touchcancel MSPointerUp MSPointerCancel pointerup pointercancel";var d={listNodeName:"ol",itemNodeName:"li",rootClass:"dd",listClass:"dd-list",itemClass:"dd-item",dragClass:"dd-dragel",handleClass:"dd-handle",collapsedClass:"dd-collapsed",placeClass:"dd-placeholder",noDragClass:"dd-nodrag",emptyClass:"dd-empty",expandBtnHTML:'<button data-action="expand" type="button">Expand</button>',collapseBtnHTML:'<button data-action="collapse" type="button">Collapse</button>',group:0,maxDepth:5,threshold:20};function i(m,l){this.w=e(g);this.el=e(m);this.options=e.extend({},d,l);this.init()}i.prototype={init:function(){var o=this;o.reset();o.el.data("nestable-group",this.options.group);o.placeEl=e('<div class="'+o.options.placeClass+'"/>');e.each(this.el.find(o.options.itemNodeName),function(p,q){o.setParent(e(q))});o.el.on("click","button",function(s){if(o.dragEl||("button" in s&&s.button!==0)){return}var r=e(s.currentTarget),q=r.data("action"),p=r.parent(o.options.itemNodeName);if(q==="collapse"){o.collapseItem(p)}if(q==="expand"){o.expandItem(p)}});var l=function(q){q=q.originalEvent;var p=e(q.target);if(!p.hasClass(o.options.handleClass)){if(p.closest("."+o.options.noDragClass).length){return}p=p.closest("."+o.options.handleClass)}if(!p.length||o.dragEl||("button" in q&&q.button!==0)||("touches" in q&&q.touches.length!==1)){return}q.preventDefault();o.dragStart("touches" in q?q.touches[0]:q)};var n=function(p){if(o.dragEl){p=p.originalEvent;p.preventDefault();o.dragMove("touches" in p?p.touches[0]:p)}};var m=function(p){if(o.dragEl){p=p.originalEvent;p.preventDefault();o.dragStop("touches" in p?p.touches[0]:p)}};o.el.on(k,l);o.w.on(j,n);o.w.on(a,m)},serialize:function(){var m,n=0,l=this;step=function(r,p){var q=[],o=r.children(l.options.itemNodeName);o.each(function(){var s=e(this),u=e.extend({},s.data()),t=s.children(l.options.listNodeName);if(t.length){u.children=step(t,p+1)}q.push(u)});return q};m=step(l.el.find(l.options.listNodeName).first(),n);return m},serialise:function(){return this.serialize()},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0};this.moving=false;this.dragEl=null;this.dragRootEl=null;this.dragDepth=0;this.hasNewRoot=false;this.pointEl=null},expandItem:function(l){l.removeClass(this.options.collapsedClass);l.children('[data-action="expand"]').hide();l.children('[data-action="collapse"]').show();l.children(this.options.listNodeName).show()},collapseItem:function(m){var l=m.children(this.options.listNodeName);if(l.length){m.addClass(this.options.collapsedClass);m.children('[data-action="collapse"]').hide();m.children('[data-action="expand"]').show();m.children(this.options.listNodeName).hide()}},expandAll:function(){var l=this;l.el.find(l.options.itemNodeName).each(function(){l.expandItem(e(this))})},collapseAll:function(){var l=this;l.el.find(l.options.itemNodeName).each(function(){l.collapseItem(e(this))})},setParent:function(l){if(l.children(this.options.listNodeName).length){l.prepend(e(this.options.expandBtnHTML));l.prepend(e(this.options.collapseBtnHTML))}l.children('[data-action="expand"]').hide()},unsetParent:function(l){l.removeClass(this.options.collapsedClass);l.children("[data-action]").remove();l.children(this.options.listNodeName).remove()},dragStart:function(q){var m=this.mouse,p=e(q.target),o=p.closest(this.options.itemNodeName);this.placeEl.css("height",o.height());m.offsetX=q.offsetX!==c?q.offsetX:q.pageX-p.offset().left;m.offsetY=q.offsetY!==c?q.offsetY:q.pageY-p.offset().top;m.startX=m.lastX=q.pageX;m.startY=m.lastY=q.pageY;this.dragRootEl=this.el;this.dragEl=e(h.createElement(this.options.listNodeName)).addClass(this.options.listClass+" "+this.options.dragClass);this.dragEl.css("width",o.width());o.after(this.placeEl);o[0].parentNode.removeChild(o[0]);o.appendTo(this.dragEl);e(h.body).append(this.dragEl);this.dragEl.css({left:q.pageX-m.offsetX,top:q.pageY-m.offsetY});var n,r,l=this.dragEl.find(this.options.itemNodeName);for(n=0;n<l.length;n++){r=e(l[n]).parents(this.options.listNodeName).length;if(r>this.dragDepth){this.dragDepth=r}}},dragStop:function(m){var l=this.dragEl.children(this.options.itemNodeName).first();l[0].parentNode.removeChild(l[0]);this.placeEl.replaceWith(l);this.dragEl.remove();this.el.trigger("change");if(this.hasNewRoot){this.dragRootEl.trigger("change")}this.reset()},dragMove:function(s){var t,x,n,q,p,m=this.options,u=this.mouse;this.dragEl.css({left:s.pageX-u.offsetX,top:s.pageY-u.offsetY});u.lastX=u.nowX;u.lastY=u.nowY;u.nowX=s.pageX;u.nowY=s.pageY;u.distX=u.nowX-u.lastX;u.distY=u.nowY-u.lastY;u.lastDirX=u.dirX;u.lastDirY=u.dirY;u.dirX=u.distX===0?0:u.distX>0?1:-1;u.dirY=u.distY===0?0:u.distY>0?1:-1;var l=Math.abs(u.distX)>Math.abs(u.distY)?1:0;if(!u.moving){u.dirAx=l;u.moving=true;return}if(u.dirAx!==l){u.distAxX=0;u.distAxY=0}else{u.distAxX+=Math.abs(u.distX);if(u.dirX!==0&&u.dirX!==u.lastDirX){u.distAxX=0}u.distAxY+=Math.abs(u.distY);if(u.dirY!==0&&u.dirY!==u.lastDirY){u.distAxY=0}}u.dirAx=l;if(u.dirAx&&u.distAxX>=m.threshold){u.distAxX=0;n=this.placeEl.prev(m.itemNodeName);if(u.distX>0&&n.length&&!n.hasClass(m.collapsedClass)){t=n.find(m.listNodeName).last();p=this.placeEl.parents(m.listNodeName).length;if(p+this.dragDepth<=m.maxDepth){if(!t.length){t=e("<"+m.listNodeName+"/>").addClass(m.listClass);t.append(this.placeEl);n.append(t);this.setParent(n)}else{t=n.children(m.listNodeName).last();t.append(this.placeEl)}}}if(u.distX<0){q=this.placeEl.next(m.itemNodeName);if(!q.length){x=this.placeEl.parent();this.placeEl.closest(m.itemNodeName).after(this.placeEl);if(!x.children().length){this.unsetParent(x.parent())}}}}var o=false;if(!b){this.dragEl[0].style.visibility="hidden"}this.pointEl=e(h.elementFromPoint(s.pageX-h.body.scrollLeft,s.pageY-(g.pageYOffset||h.documentElement.scrollTop)));if(!b){this.dragEl[0].style.visibility="visible"}if(this.pointEl.hasClass(m.handleClass)){this.pointEl=this.pointEl.parent(m.itemNodeName)}if(this.pointEl.hasClass(m.emptyClass)){o=true}else{if(!this.pointEl.length||!this.pointEl.hasClass(m.itemClass)){return}}var r=this.pointEl.closest("."+m.rootClass),w=this.dragRootEl.data("nestable-id")!==r.data("nestable-id");if(!u.dirAx||w||o){if(w&&m.group!==r.data("nestable-group")){return}p=this.dragDepth-1+this.pointEl.parents(m.listNodeName).length;if(p>m.maxDepth){return}var v=s.pageY<(this.pointEl.offset().top+this.pointEl.height()/2);x=this.placeEl.parent();if(o){t=e(h.createElement(m.listNodeName)).addClass(m.listClass);t.append(this.placeEl);this.pointEl.replaceWith(t)}else{if(v){this.pointEl.before(this.placeEl)}else{this.pointEl.after(this.placeEl)}}if(!x.children().length){this.unsetParent(x.parent())}if(!this.dragRootEl.find(m.itemNodeName).length){this.dragRootEl.append('<div class="'+m.emptyClass+'"/>')}if(w){this.dragRootEl=r;this.hasNewRoot=this.el[0]!==this.dragRootEl[0]}}}};e.fn.nestable=function(n){var l=this,m=this;l.each(function(){var o=e(this).data("nestable");if(!o){e(this).data("nestable",new i(this,n));e(this).data("nestable-id",new Date().getTime())}else{if(typeof n==="string"&&typeof o[n]==="function"){m=o[n]()}}});return m||l}})(window.jQuery||window.Zepto,window,document);