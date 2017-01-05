if(typeof Object.create!=="function"){Object.create=function(b){function a(){}a.prototype=b;return new a()}}(function(b){var a={init:function(d){this.options=b.extend({},b.noty.defaults,d);this.options.layout=(this.options.custom)?b.noty.layouts.inline:b.noty.layouts[this.options.layout];if(b.noty.themes[this.options.theme]){this.options.theme=b.noty.themes[this.options.theme]}else{d.themeClassName=this.options.theme}delete d.layout;delete d.theme;this.options=b.extend({},this.options,this.options.layout.options);this.options.id="noty_"+(new Date().getTime()*Math.floor(Math.random()*1000000));this.options=b.extend({},this.options,d);this._build();return this},_build:function(){var f=b('<div class="noty_bar noty_type_'+this.options.type+'"></div>').attr("id",this.options.id);f.append(this.options.template).find(".noty_text").html(this.options.text);this.$bar=(this.options.layout.parent.object!==null)?b(this.options.layout.parent.object).css(this.options.layout.parent.css).append(f):f;if(this.options.themeClassName){this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_"+this.options.type)}if(this.options.buttons){this.options.closeWith=[];this.options.timeout=false;var e=b("<div/>").addClass("noty_buttons");(this.options.layout.parent.object!==null)?this.$bar.find(".noty_bar").append(e):this.$bar.append(e);var d=this;b.each(this.options.buttons,function(h,g){var j=b("<button/>").addClass((g.addClass)?g.addClass:"gray").html(g.text).attr("id",g.id?g.id:"button-"+h).appendTo(d.$bar.find(".noty_buttons")).bind("click",function(){if(b.isFunction(g.onClick)){g.onClick.call(j,d)}})})}this.$message=this.$bar.find(".noty_message");this.$closeButton=this.$bar.find(".noty_close");this.$buttons=this.$bar.find(".noty_buttons");b.noty.store[this.options.id]=this},show:function(){var d=this;(d.options.custom)?d.options.custom.find(d.options.layout.container.selector).append(d.$bar):b(d.options.layout.container.selector).append(d.$bar);if(d.options.theme&&d.options.theme.style){d.options.theme.style.apply(d)}(b.type(d.options.layout.css)==="function")?this.options.layout.css.apply(d.$bar):d.$bar.css(this.options.layout.css||{});d.$bar.addClass(d.options.layout.addClass);d.options.layout.container.style.apply(b(d.options.layout.container.selector));d.showing=true;if(d.options.theme&&d.options.theme.style){d.options.theme.callback.onShow.apply(this)}if(b.inArray("click",d.options.closeWith)>-1){d.$bar.css("cursor","pointer").one("click",function(e){d.stopPropagation(e);if(d.options.callback.onCloseClick){d.options.callback.onCloseClick.apply(d)}d.close()})}if(b.inArray("hover",d.options.closeWith)>-1){d.$bar.one("mouseenter",function(){d.close()})}if(b.inArray("button",d.options.closeWith)>-1){d.$closeButton.one("click",function(e){d.stopPropagation(e);d.close()})}if(b.inArray("button",d.options.closeWith)==-1){d.$closeButton.remove()}if(d.options.callback.onShow){d.options.callback.onShow.apply(d)}d.$bar.animate(d.options.animation.open,d.options.animation.speed,d.options.animation.easing,function(){if(d.options.callback.afterShow){d.options.callback.afterShow.apply(d)}d.showing=false;d.shown=true});if(d.options.timeout){d.$bar.delay(d.options.timeout).promise().done(function(){d.close()})}return this},close:function(){if(this.closed){return}if(this.$bar&&this.$bar.hasClass("i-am-closing-now")){return}var e=this;if(this.showing){e.$bar.queue(function(){e.close.apply(e)});return}if(!this.shown&&!this.showing){var d=[];b.each(b.noty.queue,function(f,g){if(g.options.id!=e.options.id){d.push(g)}});b.noty.queue=d;return}e.$bar.addClass("i-am-closing-now");if(e.options.callback.onClose){e.options.callback.onClose.apply(e)}e.$bar.clearQueue().stop().animate(e.options.animation.close,e.options.animation.speed,e.options.animation.easing,function(){if(e.options.callback.afterClose){e.options.callback.afterClose.apply(e)}}).promise().done(function(){if(e.options.modal){b.notyRenderer.setModalCount(-1);if(b.notyRenderer.getModalCount()==0){b(".noty_modal").fadeOut("fast",function(){b(this).remove()})}}b.notyRenderer.setLayoutCountFor(e,-1);if(b.notyRenderer.getLayoutCountFor(e)==0){b(e.options.layout.container.selector).remove()}if(typeof e.$bar!=="undefined"&&e.$bar!==null){e.$bar.remove();e.$bar=null;e.closed=true}delete b.noty.store[e.options.id];e.options.theme.callback.onClose.apply(e);if(!e.options.dismissQueue){b.noty.ontap=true;b.notyRenderer.render()}if(e.options.maxVisible>0&&e.options.dismissQueue){b.notyRenderer.render()}})},setText:function(d){if(!this.closed){this.options.text=d;this.$bar.find(".noty_text").html(d)}return this},setType:function(d){if(!this.closed){this.options.type=d;this.options.theme.style.apply(this);this.options.theme.callback.onShow.apply(this)}return this},setTimeout:function(e){if(!this.closed){var d=this;this.options.timeout=e;d.$bar.delay(d.options.timeout).promise().done(function(){d.close()})}return this},stopPropagation:function(d){d=d||window.event;if(typeof d.stopPropagation!=="undefined"){d.stopPropagation()}else{d.cancelBubble=true}},closed:false,showing:false,shown:false};b.notyRenderer={};b.notyRenderer.init=function(d){var e=Object.create(a).init(d);if(e.options.killer){b.noty.closeAll()}(e.options.force)?b.noty.queue.unshift(e):b.noty.queue.push(e);b.notyRenderer.render();return(b.noty.returns=="object")?e:e.options.id};b.notyRenderer.render=function(){var d=b.noty.queue[0];if(b.type(d)==="object"){if(d.options.dismissQueue){if(d.options.maxVisible>0){if(b(d.options.layout.container.selector+" li").length<d.options.maxVisible){b.notyRenderer.show(b.noty.queue.shift())}else{}}else{b.notyRenderer.show(b.noty.queue.shift())}}else{if(b.noty.ontap){b.notyRenderer.show(b.noty.queue.shift());b.noty.ontap=false}}}else{b.noty.ontap=true}};b.notyRenderer.show=function(d){if(d.options.modal){b.notyRenderer.createModalFor(d);b.notyRenderer.setModalCount(+1)}if(d.options.custom){if(d.options.custom.find(d.options.layout.container.selector).length==0){d.options.custom.append(b(d.options.layout.container.object).addClass("i-am-new"))}else{d.options.custom.find(d.options.layout.container.selector).removeClass("i-am-new")}}else{if(b(d.options.layout.container.selector).length==0){b("body").append(b(d.options.layout.container.object).addClass("i-am-new"))}else{b(d.options.layout.container.selector).removeClass("i-am-new")}}b.notyRenderer.setLayoutCountFor(d,+1);d.show()};b.notyRenderer.createModalFor=function(d){if(b(".noty_modal").length==0){b("<div/>").addClass("noty_modal").data("noty_modal_count",0).css(d.options.theme.modal.css).prependTo(b("body")).fadeIn("fast")}};b.notyRenderer.getLayoutCountFor=function(d){return b(d.options.layout.container.selector).data("noty_layout_count")||0};b.notyRenderer.setLayoutCountFor=function(e,d){return b(e.options.layout.container.selector).data("noty_layout_count",b.notyRenderer.getLayoutCountFor(e)+d)};b.notyRenderer.getModalCount=function(){return b(".noty_modal").data("noty_modal_count")||0};b.notyRenderer.setModalCount=function(d){return b(".noty_modal").data("noty_modal_count",b.notyRenderer.getModalCount()+d)};b.fn.noty=function(d){d.custom=b(this);return b.notyRenderer.init(d)};b.noty={};b.noty.queue=[];b.noty.ontap=true;b.noty.layouts={};b.noty.themes={};b.noty.returns="object";b.noty.store={};b.noty.get=function(d){return b.noty.store.hasOwnProperty(d)?b.noty.store[d]:false};b.noty.close=function(d){return b.noty.get(d)?b.noty.get(d).close():false};b.noty.setText=function(e,d){return b.noty.get(e)?b.noty.get(e).setText(d):false};b.noty.setType=function(e,d){return b.noty.get(e)?b.noty.get(e).setType(d):false};b.noty.clearQueue=function(){b.noty.queue=[]};b.noty.closeAll=function(){b.noty.clearQueue();b.each(b.noty.store,function(e,d){d.close()})};var c=window.alert;b.noty.consumeAlert=function(d){window.alert=function(e){if(d){d.text=e}else{d={text:e}}b.notyRenderer.init(d)}};b.noty.stopConsumeAlert=function(){window.alert=c};b.noty.defaults={layout:"top",theme:"defaultTheme",type:"alert",text:"",dismissQueue:true,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:500},timeout:false,force:false,modal:false,maxVisible:5,killer:false,closeWith:["click"],callback:{onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:false};b(window).resize(function(){b.each(b.noty.layouts,function(d,e){e.container.style.apply(b(e.container.selector))})})})(jQuery);window.noty=function noty(a){return jQuery.notyRenderer.init(a)};