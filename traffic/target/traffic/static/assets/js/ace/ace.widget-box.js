(function(c,d){var b=function(g,e){this.$box=c(g);var f=this;this.reload=function(){var i=this.$box;var h=false;if(i.css("position")=="static"){h=true;i.addClass("position-relative")}i.append('<div class="widget-box-overlay"><i class="'+ace.vars.icon+'loading-icon fa fa-spinner fa-spin fa-2x white"></i></div>');i.one("reloaded.ace.widget",function(){i.find(".widget-box-overlay").remove();if(h){i.removeClass("position-relative")}})};this.close=function(){var i=this.$box;var h=300;i.fadeOut(h,function(){i.trigger("closed.ace.widget");i.remove()})};this.toggle=function(s,o){var h=this.$box;var l=h.find(".widget-body");var r=null;var p=typeof s!=="undefined"?s:(h.hasClass("collapsed")?"show":"hide");var k=p=="show"?"shown":"hidden";if(typeof o==="undefined"){o=h.find("> .widget-header a[data-action=collapse]").eq(0);if(o.length==0){o=null}}if(o){r=o.find(ace.vars[".icon"]).eq(0);var m;var i=null;var n=null;if((i=r.attr("data-icon-show"))){n=r.attr("data-icon-hide")}else{if(m=r.attr("class").match(/fa\-(.*)\-(up|down)/)){i="fa-"+m[1]+"-down";n="fa-"+m[1]+"-up"}}}var j=250;var q=200;if(p=="show"){if(r){r.removeClass(i).addClass(n)}l.hide();h.removeClass("collapsed");l.slideDown(j,function(){h.trigger(k+".ace.widget")})}else{if(r){r.removeClass(n).addClass(i)}l.slideUp(q,function(){h.addClass("collapsed");h.trigger(k+".ace.widget")})}};this.hide=function(){this.toggle("hide")};this.show=function(){this.toggle("show")};this.fullscreen=function(){var h=this.$box.find("> .widget-header a[data-action=fullscreen]").find(ace.vars[".icon"]).eq(0);var j=null;var i=null;if((j=h.attr("data-icon1"))){i=h.attr("data-icon2")}else{j="fa-expand";i="fa-compress"}if(!this.$box.hasClass("fullscreen")){h.removeClass(j).addClass(i);this.$box.addClass("fullscreen");a(this.$box,true)}else{h.addClass(j).removeClass(i);this.$box.removeClass("fullscreen");a(this.$box,false)}this.$box.trigger("fullscreened.ace.widget")}};c.fn.widget_box=function(f,h){var g;var e=this.each(function(){var k=c(this);var j=k.data("widget_box");var i=typeof f==="object"&&f;if(!j){k.data("widget_box",(j=new b(this,i)))}if(typeof f==="string"){g=j[f](h)}});return(g===d)?e:g};c(document).on("click.ace.widget",".widget-header a[data-action]",function(g){g.preventDefault();var j=c(this);var i=j.closest(".widget-box");if(i.length==0||i.hasClass("ui-sortable-helper")){return}var e=i.data("widget_box");if(!e){i.data("widget_box",(e=new b(i.get(0))))}var k=j.data("action");if(k=="collapse"){var h=i.hasClass("collapsed")?"show":"hide";var f;i.trigger(f=c.Event(h+".ace.widget"));if(f.isDefaultPrevented()){return}e.toggle(h,j)}else{if(k=="close"){var f;i.trigger(f=c.Event("close.ace.widget"));if(f.isDefaultPrevented()){return}e.close()}else{if(k=="reload"){j.blur();var f;i.trigger(f=c.Event("reload.ace.widget"));if(f.isDefaultPrevented()){return}e.reload()}else{if(k=="fullscreen"){var f;i.trigger(f=c.Event("fullscreen.ace.widget"));if(f.isDefaultPrevented()){return}e.fullscreen()}else{if(k=="settings"){i.trigger("setting.ace.widget")}}}}}});function a(k,f){var i=k.find(".widget-main");c(window).off("resize.widget.scroll");var h=ace.vars.old_ie||ace.vars.touch;if(f){var e=i.data("ace_scroll");if(e){i.data("save_scroll",{size:e.size,lock:e.lock,lock_anyway:e.lock_anyway})}var g=k.height()-k.find(".widget-header").height()-10;g=parseInt(g);i.css("min-height",g);if(!h){if(e){i.ace_scroll("update",{size:g,mouseWheelLock:true,lockAnyway:true})}else{i.ace_scroll({size:g,mouseWheelLock:true,lockAnyway:true})}i.ace_scroll("enable").ace_scroll("reset")}else{if(e){i.ace_scroll("disable")}i.css("max-height",g).addClass("overflow-scroll")}c(window).on("resize.widget.scroll",function(){var l=k.height()-k.find(".widget-header").height()-10;l=parseInt(l);i.css("min-height",l);if(!h){i.ace_scroll("update",{size:l}).ace_scroll("reset")}else{i.css("max-height",l).addClass("overflow-scroll")}})}else{i.css("min-height","");var j=i.data("save_scroll");if(j){i.ace_scroll("update",{size:j.size,mouseWheelLock:j.lock,lockAnyway:j.lock_anyway}).ace_scroll("enable").ace_scroll("reset")}if(!h){if(!j){i.ace_scroll("disable")}}else{i.css("max-height","").removeClass("overflow-scroll")}}}})(window.jQuery);