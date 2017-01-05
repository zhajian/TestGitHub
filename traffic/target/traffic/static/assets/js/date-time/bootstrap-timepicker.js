/*!
 * Timepicker Component for Twitter Bootstrap
 *
 * Copyright 2013 Joris de Wit
 *
 * Contributors https://github.com/jdewit/bootstrap-timepicker/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function(d,c,a,e){var b=function(g,f){this.iconUp=f.iconUp||"fa fa-chevron-up";this.iconDown=f.iconDown||"fa fa-chevron-down";this.widget="";this.$element=d(g);this.defaultTime=f.defaultTime;this.disableFocus=f.disableFocus;this.disableMousewheel=f.disableMousewheel;this.isOpen=f.isOpen;this.minuteStep=f.minuteStep;this.modalBackdrop=f.modalBackdrop;this.orientation=f.orientation;this.secondStep=f.secondStep;this.showInputs=f.showInputs;this.showMeridian=f.showMeridian;this.showSeconds=f.showSeconds;this.template=f.template;this.appendWidgetTo=f.appendWidgetTo;this.showWidgetOnAddonClick=f.showWidgetOnAddonClick;this._init()};b.prototype={constructor:b,_init:function(){var f=this;if(this.showWidgetOnAddonClick&&(this.$element.parent().hasClass("input-append")||this.$element.parent().hasClass("input-prepend"))){this.$element.parent(".input-append, .input-prepend").find(".add-on").on({"click.timepicker":d.proxy(this.showWidget,this)});this.$element.on({"focus.timepicker":d.proxy(this.highlightUnit,this),"click.timepicker":d.proxy(this.highlightUnit,this),"keydown.timepicker":d.proxy(this.elementKeydown,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}else{if(this.template){this.$element.on({"focus.timepicker":d.proxy(this.showWidget,this),"click.timepicker":d.proxy(this.showWidget,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}else{this.$element.on({"focus.timepicker":d.proxy(this.highlightUnit,this),"click.timepicker":d.proxy(this.highlightUnit,this),"keydown.timepicker":d.proxy(this.elementKeydown,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}}if(this.template!==false){this.$widget=d(this.getTemplate()).on("click",d.proxy(this.widgetClick,this))}else{this.$widget=false}if(this.showInputs&&this.$widget!==false){this.$widget.find("input").each(function(){d(this).on({"click.timepicker":function(){d(this).select()},"keydown.timepicker":d.proxy(f.widgetKeydown,f),"keyup.timepicker":d.proxy(f.widgetKeyup,f)})})}this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null;this.updateFromElementVal()},clear:function(){this.hour="";this.minute="";this.second="";this.meridian="";this.$element.val("")},decrementHour:function(){if(this.showMeridian){if(this.hour===1){this.hour=12}else{if(this.hour===12){this.hour--;return this.toggleMeridian()}else{if(this.hour===0){this.hour=11;return this.toggleMeridian()}else{this.hour--}}}}else{if(this.hour<=0){this.hour=23}else{this.hour--}}},decrementMinute:function(g){var f;if(g){f=this.minute-g}else{f=this.minute-this.minuteStep}if(f<0){this.decrementHour();this.minute=f+60}else{this.minute=f}},decrementSecond:function(){var f=this.second-this.secondStep;if(f<0){this.decrementMinute(true);this.second=f+60}else{this.second=f}},elementKeydown:function(f){switch(f.keyCode){case 9:case 27:this.updateFromElementVal();break;case 37:f.preventDefault();this.highlightPrevUnit();break;case 38:f.preventDefault();switch(this.highlightedUnit){case"hour":this.incrementHour();this.highlightHour();break;case"minute":this.incrementMinute();this.highlightMinute();break;case"second":this.incrementSecond();this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break}this.update();break;case 39:f.preventDefault();this.highlightNextUnit();break;case 40:f.preventDefault();switch(this.highlightedUnit){case"hour":this.decrementHour();this.highlightHour();break;case"minute":this.decrementMinute();this.highlightMinute();break;case"second":this.decrementSecond();this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break}this.update();break}},getCursorPosition:function(){var g=this.$element.get(0);if("selectionStart" in g){return g.selectionStart}else{if(a.selection){g.focus();var h=a.selection.createRange(),f=a.selection.createRange().text.length;h.moveStart("character",-g.value.length);return h.text.length-f}}},getTemplate:function(){var h,j,g,f,i,k;if(this.showInputs){j='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>';g='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>';f='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>';i='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'}else{j='<span class="bootstrap-timepicker-hour"></span>';g='<span class="bootstrap-timepicker-minute"></span>';f='<span class="bootstrap-timepicker-second"></span>';i='<span class="bootstrap-timepicker-meridian"></span>'}k='<table><tr><td><a href="#" data-action="incrementHour"><i class="'+this.iconUp+'"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="'+this.iconUp+'"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="'+this.iconUp+'"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="'+this.iconUp+'"></i></a></td>':"")+"</tr><tr><td>"+j+'</td> <td class="separator">:</td><td>'+g+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+f+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+i+"</td>":"")+'</tr><tr><td><a href="#" data-action="decrementHour"><i class="'+this.iconDown+'"></i></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><i class="'+this.iconDown+'"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="'+this.iconDown+'"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="'+this.iconDown+'"></i></a></td>':"")+"</tr></table>";switch(this.template){case"modal":h='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">×</a><h3>Pick a Time</h3></div><div class="modal-content">'+k+'</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';break;case"dropdown":h='<div class="bootstrap-timepicker-widget dropdown-menu">'+k+"</div>";break}return h},getTime:function(){if(this.hour===""){return""}return this.hour+":"+(this.minute.toString().length===1?"0"+this.minute:this.minute)+(this.showSeconds?":"+(this.second.toString().length===1?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:"")},hideWidget:function(){if(this.isOpen===false){return}this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}});if(this.template==="modal"&&this.$widget.modal){this.$widget.modal("hide")}else{this.$widget.removeClass("open")}d(a).off("mousedown.timepicker, touchend.timepicker");this.isOpen=false;this.$widget.detach()},highlightUnit:function(){this.position=this.getCursorPosition();if(this.position>=0&&this.position<=2){this.highlightHour()}else{if(this.position>=3&&this.position<=5){this.highlightMinute()}else{if(this.position>=6&&this.position<=8){if(this.showSeconds){this.highlightSecond()}else{this.highlightMeridian()}}else{if(this.position>=9&&this.position<=11){this.highlightMeridian()}}}}},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":if(this.showSeconds){this.highlightSecond()}else{if(this.showMeridian){this.highlightMeridian()}else{this.highlightHour()}}break;case"second":if(this.showMeridian){this.highlightMeridian()}else{this.highlightHour()}break;case"meridian":this.highlightHour();break}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":if(this.showMeridian){this.highlightMeridian()}else{if(this.showSeconds){this.highlightSecond()}else{this.highlightMinute()}}break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":if(this.showSeconds){this.highlightSecond()}else{this.highlightMinute()}break}},highlightHour:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="hour";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(0,1)}else{f.setSelectionRange(0,2)}},0)}},highlightMinute:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="minute";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(2,4)}else{f.setSelectionRange(3,5)}},0)}},highlightSecond:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="second";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(5,7)}else{f.setSelectionRange(6,8)}},0)}},highlightMeridian:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="meridian";if(f.setSelectionRange){if(this.showSeconds){setTimeout(function(){if(g.hour<10){f.setSelectionRange(8,10)}else{f.setSelectionRange(9,11)}},0)}else{setTimeout(function(){if(g.hour<10){f.setSelectionRange(5,7)}else{f.setSelectionRange(6,8)}},0)}}},incrementHour:function(){if(this.showMeridian){if(this.hour===11){this.hour++;return this.toggleMeridian()}else{if(this.hour===12){this.hour=0}}}if(this.hour===23){this.hour=0;return}this.hour++},incrementMinute:function(g){var f;if(g){f=this.minute+g}else{f=this.minute+this.minuteStep-(this.minute%this.minuteStep)}if(f>59){this.incrementHour();this.minute=f-60}else{this.minute=f}},incrementSecond:function(){var f=this.second+this.secondStep-(this.second%this.secondStep);if(f>59){this.incrementMinute(true);this.second=f-60}else{this.second=f}},mousewheel:function(g){if(this.disableMousewheel){return}g.preventDefault();g.stopPropagation();var h=g.originalEvent.wheelDelta||-g.originalEvent.detail,f=null;if(g.type==="mousewheel"){f=(g.originalEvent.wheelDelta*-1)}else{if(g.type==="DOMMouseScroll"){f=40*g.originalEvent.detail}}if(f){g.preventDefault();d(this).scrollTop(f+d(this).scrollTop())}switch(this.highlightedUnit){case"minute":if(h>0){this.incrementMinute()}else{this.decrementMinute()}this.highlightMinute();break;case"second":if(h>0){this.incrementSecond()}else{this.decrementSecond()}this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break;default:if(h>0){this.incrementHour()}else{this.decrementHour()}this.highlightHour();break}return false},place:function(){if(this.isInline){return}var h=this.$widget.outerWidth(),o=this.$widget.outerHeight(),j=10,l=d(c).width(),g=d(c).height(),k=d(c).scrollTop();var r=parseInt(this.$element.parents().filter(function(){}).first().css("z-index"),10)+10;var n=this.component?this.component.parent().offset():this.$element.offset();var s=this.component?this.component.outerHeight(true):this.$element.outerHeight(false);var i=this.component?this.component.outerWidth(true):this.$element.outerWidth(false);var m=n.left,q=n.top;this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left");if(this.orientation.x!=="auto"){this.picker.addClass("datepicker-orient-"+this.orientation.x);if(this.orientation.x==="right"){m-=h-i}}else{this.$widget.addClass("timepicker-orient-left");if(n.left<0){m-=n.left-j}else{if(n.left+h>l){m=l-h-j}}}var f=this.orientation.y,p,t;if(f==="auto"){p=-k+n.top-o;t=k+g-(n.top+s+o);if(Math.max(p,t)===t){f="top"}else{f="bottom"}}this.$widget.addClass("timepicker-orient-"+f);if(f==="top"){q+=s}else{q-=o+parseInt(this.$widget.css("padding-top"),10)}this.$widget.css({top:q,left:m,zIndex:r})},remove:function(){d("document").off(".timepicker");if(this.$widget){this.$widget.remove()}delete this.$element.data().timepicker},setDefaultTime:function(h){if(!this.$element.val()){if(h==="current"){var f=new Date(),g=f.getHours(),j=f.getMinutes(),k=f.getSeconds(),i="AM";if(k!==0){k=Math.ceil(f.getSeconds()/this.secondStep)*this.secondStep;if(k===60){j+=1;k=0}}if(j!==0){j=Math.ceil(f.getMinutes()/this.minuteStep)*this.minuteStep;if(j===60){g+=1;j=0}}if(this.showMeridian){if(g===0){g=12}else{if(g>=12){if(g>12){g=g-12}i="PM"}else{i="AM"}}}this.hour=g;this.minute=j;this.second=k;this.meridian=i;this.update()}else{if(h===false){this.hour=0;this.minute=0;this.second=0;this.meridian="AM"}else{this.setTime(h)}}}else{this.updateFromElementVal()}},setTime:function(k,i){if(!k){this.clear();return}var j,f,l,g,h;if(typeof k==="object"&&k.getMonth){f=k.getHours();l=k.getMinutes();g=k.getSeconds();if(this.showMeridian){h="AM";if(f>12){h="PM";f=f%12}if(f===12){h="PM"}}}else{if(k.match(/p/i)!==null){h="PM"}else{h="AM"}k=k.replace(/[^0-9\:]/g,"");j=k.split(":");f=j[0]?j[0].toString():j.toString();l=j[1]?j[1].toString():"";g=j[2]?j[2].toString():"";if(f.length>4){g=f.substr(4,2)}if(f.length>2){l=f.substr(2,2);f=f.substr(0,2)}if(l.length>2){g=l.substr(2,2);l=l.substr(0,2)}if(g.length>2){g=g.substr(2,2)}f=parseInt(f,10);l=parseInt(l,10);g=parseInt(g,10);if(isNaN(f)){f=0}if(isNaN(l)){l=0}if(isNaN(g)){g=0}if(this.showMeridian){if(f<1){f=1}else{if(f>12){f=12}}}else{if(f>=24){f=23}else{if(f<0){f=0}}if(f<13&&h==="PM"){f=f+12}}if(l<0){l=0}else{if(l>=60){l=59}}if(this.showSeconds){if(isNaN(g)){g=0}else{if(g<0){g=0}else{if(g>=60){g=59}}}}}this.hour=f;this.minute=l;this.second=g;this.meridian=h;this.update(i)},showWidget:function(){if(this.isOpen){return}if(this.$element.is(":disabled")){return}this.$widget.appendTo(this.appendWidgetTo);var f=this;d(a).on("mousedown.timepicker, touchend.timepicker",function(g){if(!(f.$element.parent().find(g.target).length||f.$widget.is(g.target)||f.$widget.find(g.target).length)){f.hideWidget()}});this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}});this.place();if(this.disableFocus){this.$element.blur()}if(this.hour===""){if(this.defaultTime){this.setDefaultTime(this.defaultTime)}else{this.setTime("0:0:0")}}if(this.template==="modal"&&this.$widget.modal){this.$widget.modal("show").on("hidden",d.proxy(this.hideWidget,this))}else{if(this.isOpen===false){this.$widget.addClass("open")}}this.isOpen=true},toggleMeridian:function(){this.meridian=this.meridian==="AM"?"PM":"AM"},update:function(f){this.updateElement();if(!f){this.updateWidget()}this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(this.$widget===false){return}var f=this.hour,h=this.minute.toString().length===1?"0"+this.minute:this.minute,g=this.second.toString().length===1?"0"+this.second:this.second;if(this.showInputs){this.$widget.find("input.bootstrap-timepicker-hour").val(f);this.$widget.find("input.bootstrap-timepicker-minute").val(h);if(this.showSeconds){this.$widget.find("input.bootstrap-timepicker-second").val(g)}if(this.showMeridian){this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)}}else{this.$widget.find("span.bootstrap-timepicker-hour").text(f);this.$widget.find("span.bootstrap-timepicker-minute").text(h);if(this.showSeconds){this.$widget.find("span.bootstrap-timepicker-second").text(g)}if(this.showMeridian){this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian)}}},updateFromWidgetInputs:function(){if(this.$widget===false){return}var f=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(f,true)},widgetClick:function(g){g.stopPropagation();g.preventDefault();var h=d(g.target),f=h.closest("a").data("action");if(f){this[f]()}this.update();if(h.is("input")){h.get(0).setSelectionRange(0,2)}},widgetKeydown:function(g){var h=d(g.target),f=h.attr("class").replace("bootstrap-timepicker-","");switch(g.keyCode){case 9:if((this.showMeridian&&f==="meridian")||(this.showSeconds&&f==="second")||(!this.showMeridian&&!this.showSeconds&&f==="minute")){return this.hideWidget()}break;case 27:this.hideWidget();break;case 38:g.preventDefault();switch(f){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian();break}this.setTime(this.getTime());h.get(0).setSelectionRange(0,2);break;case 40:g.preventDefault();switch(f){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian();break}this.setTime(this.getTime());h.get(0).setSelectionRange(0,2);break}},widgetKeyup:function(f){if((f.keyCode===65)||(f.keyCode===77)||(f.keyCode===80)||(f.keyCode===46)||(f.keyCode===8)||(f.keyCode>=46&&f.keyCode<=57)){this.updateFromWidgetInputs()}}};d.fn.timepicker=function(g){var f=Array.apply(null,arguments);f.shift();return this.each(function(){var j=d(this),i=j.data("timepicker"),h=typeof g==="object"&&g;if(!i){j.data("timepicker",(i=new b(this,d.extend({},d.fn.timepicker.defaults,h,d(this).data()))))}if(typeof g==="string"){i[g].apply(i,f)}})};d.fn.timepicker.defaults={defaultTime:"current",disableFocus:false,disableMousewheel:false,isOpen:false,minuteStep:15,modalBackdrop:false,orientation:{x:"auto",y:"auto"},secondStep:15,showSeconds:false,showInputs:true,showMeridian:true,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:true};d.fn.timepicker.Constructor=b})(jQuery,window,document);