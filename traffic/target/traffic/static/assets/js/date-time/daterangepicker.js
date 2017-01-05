(function(a,b){if(typeof define==="function"&&define.amd){define(["moment","jquery","exports"],function(h,g,f){a.daterangepicker=b(a,f,h,g)})}else{if(typeof exports!=="undefined"){var d=require("moment");var e;try{e=require("jquery")}catch(c){e=window.jQuery;if(!e){throw new Error("jQuery dependency not found")}}b(a,exports,d,e)}else{a.daterangepicker=b(a,{},a.moment,(a.jQuery||a.Zepto||a.ender||a.$))}}}(this,function(b,c,e,d){var a=function(i,h,f){this.parentEl="body";this.element=d(i);this.isShowing=false;var g='<div class="daterangepicker dropdown-menu"><div class="calendar left"></div><div class="calendar right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input"><label for="daterangepicker_start"></label><input class="input-mini" type="text" name="daterangepicker_start" value="" /></div><div class="daterangepicker_end_input"><label for="daterangepicker_end"></label><input class="input-mini" type="text" name="daterangepicker_end" value="" /></div><button class="applyBtn" disabled="disabled"></button>&nbsp;<button class="cancelBtn"></button></div></div></div>';if(typeof h!=="object"||h===null){h={}}this.parentEl=(typeof h==="object"&&h.parentEl&&d(h.parentEl).length)?d(h.parentEl):d(this.parentEl);this.container=d(g).appendTo(this.parentEl);this.setOptions(h,f);var j=this.container;d.each(this.buttonClasses,function(k,l){j.find("button").addClass(l)});this.container.find(".daterangepicker_start_input label").html(this.locale.fromLabel);this.container.find(".daterangepicker_end_input label").html(this.locale.toLabel);if(this.applyClass.length){this.container.find(".applyBtn").addClass(this.applyClass)}if(this.cancelClass.length){this.container.find(".cancelBtn").addClass(this.cancelClass)}this.container.find(".applyBtn").html(this.locale.applyLabel);this.container.find(".cancelBtn").html(this.locale.cancelLabel);this.container.find(".calendar").on("click.daterangepicker",".prev",d.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",d.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",d.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",d.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",d.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",d.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.monthselect",d.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.ampmselect",d.proxy(this.updateTime,this));this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",d.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",d.proxy(this.clickCancel,this)).on("click.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",d.proxy(this.showCalendars,this)).on("change.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",d.proxy(this.inputsChanged,this)).on("keydown.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",d.proxy(this.inputsKeydown,this)).on("click.daterangepicker","li",d.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",d.proxy(this.enterRange,this)).on("mouseleave.daterangepicker","li",d.proxy(this.updateFormInputs,this));if(this.element.is("input")){this.element.on({"click.daterangepicker":d.proxy(this.show,this),"focus.daterangepicker":d.proxy(this.show,this),"keyup.daterangepicker":d.proxy(this.updateFromControl,this)})}else{this.element.on("click.daterangepicker",d.proxy(this.toggle,this))}};a.prototype={constructor:a,setOptions:function(p,o){this.startDate=e().startOf("day");this.endDate=e().endOf("day");this.minDate=false;this.maxDate=false;this.dateLimit=false;this.showDropdowns=false;this.showWeekNumbers=false;this.timePicker=false;this.timePickerIncrement=30;this.timePicker12Hour=true;this.singleDatePicker=false;this.ranges={};this.opens="right";if(this.element.hasClass("pull-right")){this.opens="left"}this.buttonClasses=["btn","btn-small btn-sm"];this.applyClass="btn-success";this.cancelClass="btn-default";this.format="MM/DD/YYYY";this.separator=" - ";this.locale={applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:e.weekdaysMin(),monthNames:e.monthsShort(),firstDay:e.localeData()._week.dow};this.cb=function(){};if(typeof p.format==="string"){this.format=p.format}if(typeof p.separator==="string"){this.separator=p.separator}if(typeof p.startDate==="string"){this.startDate=e(p.startDate,this.format)}if(typeof p.endDate==="string"){this.endDate=e(p.endDate,this.format)}if(typeof p.minDate==="string"){this.minDate=e(p.minDate,this.format)}if(typeof p.maxDate==="string"){this.maxDate=e(p.maxDate,this.format)}if(typeof p.startDate==="object"){this.startDate=e(p.startDate)}if(typeof p.endDate==="object"){this.endDate=e(p.endDate)}if(typeof p.minDate==="object"){this.minDate=e(p.minDate)}if(typeof p.maxDate==="object"){this.maxDate=e(p.maxDate)}if(typeof p.applyClass==="string"){this.applyClass=p.applyClass}if(typeof p.cancelClass==="string"){this.cancelClass=p.cancelClass}if(typeof p.dateLimit==="object"){this.dateLimit=p.dateLimit}if(typeof p.locale==="object"){if(typeof p.locale.daysOfWeek==="object"){this.locale.daysOfWeek=p.locale.daysOfWeek.slice()}if(typeof p.locale.monthNames==="object"){this.locale.monthNames=p.locale.monthNames.slice()}if(typeof p.locale.firstDay==="number"){this.locale.firstDay=p.locale.firstDay}if(typeof p.locale.applyLabel==="string"){this.locale.applyLabel=p.locale.applyLabel}if(typeof p.locale.cancelLabel==="string"){this.locale.cancelLabel=p.locale.cancelLabel}if(typeof p.locale.fromLabel==="string"){this.locale.fromLabel=p.locale.fromLabel}if(typeof p.locale.toLabel==="string"){this.locale.toLabel=p.locale.toLabel}if(typeof p.locale.weekLabel==="string"){this.locale.weekLabel=p.locale.weekLabel}if(typeof p.locale.customRangeLabel==="string"){this.locale.customRangeLabel=p.locale.customRangeLabel}}if(typeof p.opens==="string"){this.opens=p.opens}if(typeof p.showWeekNumbers==="boolean"){this.showWeekNumbers=p.showWeekNumbers}if(typeof p.buttonClasses==="string"){this.buttonClasses=[p.buttonClasses]}if(typeof p.buttonClasses==="object"){this.buttonClasses=p.buttonClasses}if(typeof p.showDropdowns==="boolean"){this.showDropdowns=p.showDropdowns}if(typeof p.singleDatePicker==="boolean"){this.singleDatePicker=p.singleDatePicker;if(this.singleDatePicker){this.endDate=this.startDate.clone()}}if(typeof p.timePicker==="boolean"){this.timePicker=p.timePicker}if(typeof p.timePickerIncrement==="number"){this.timePickerIncrement=p.timePickerIncrement}if(typeof p.timePicker12Hour==="boolean"){this.timePicker12Hour=p.timePicker12Hour}if(this.locale.firstDay!=0){var j=this.locale.firstDay;while(j>0){this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());j--}}var f,i,k;if(typeof p.startDate==="undefined"&&typeof p.endDate==="undefined"){if(d(this.element).is("input[type=text]")){var g=d(this.element).val();var m=g.split(this.separator);f=i=null;if(m.length==2){f=e(m[0],this.format);i=e(m[1],this.format)}else{if(this.singleDatePicker){f=e(g,this.format);i=e(g,this.format)}}if(f!==null&&i!==null){this.startDate=f;this.endDate=i}}}if(typeof p.ranges==="object"){for(k in p.ranges){f=e(p.ranges[k][0]);i=e(p.ranges[k][1]);if(this.minDate&&f.isBefore(this.minDate)){f=e(this.minDate)}if(this.maxDate&&i.isAfter(this.maxDate)){i=e(this.maxDate)}if((this.minDate&&i.isBefore(this.minDate))||(this.maxDate&&f.isAfter(this.maxDate))){continue}this.ranges[k]=[f,i]}var l="<ul>";for(k in this.ranges){l+="<li>"+k+"</li>"}l+="<li>"+this.locale.customRangeLabel+"</li>";l+="</ul>";this.container.find(".ranges ul").remove();this.container.find(".ranges").prepend(l)}if(typeof o==="function"){this.cb=o}if(!this.timePicker){this.startDate=this.startDate.startOf("day");this.endDate=this.endDate.endOf("day")}if(this.singleDatePicker){this.opens="right";this.container.addClass("single");this.container.find(".calendar.right").show();this.container.find(".calendar.left").hide();if(!this.timePicker){this.container.find(".ranges").hide()}else{this.container.find(".ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input").hide()}if(!this.container.find(".calendar.right").hasClass("single")){this.container.find(".calendar.right").addClass("single")}}else{this.container.removeClass("single");this.container.find(".calendar.right").removeClass("single");this.container.find(".ranges").show()}this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.oldChosenLabel=this.chosenLabel;this.leftCalendar={month:e([this.startDate.year(),this.startDate.month(),1,this.startDate.hour(),this.startDate.minute()]),calendar:[]};this.rightCalendar={month:e([this.endDate.year(),this.endDate.month(),1,this.endDate.hour(),this.endDate.minute()]),calendar:[]};if(this.opens=="right"||this.opens=="center"){var h=this.container.find(".calendar.left");var n=this.container.find(".calendar.right");if(n.hasClass("single")){n.removeClass("single");h.addClass("single")}h.removeClass("left").addClass("right");n.removeClass("right").addClass("left");if(this.singleDatePicker){h.show();n.hide()}}if(typeof p.ranges==="undefined"&&!this.singleDatePicker){this.container.addClass("show-calendar")}this.container.addClass("opens"+this.opens);this.updateView();this.updateCalendars()},setStartDate:function(f){if(typeof f==="string"){this.startDate=e(f,this.format)}if(typeof f==="object"){this.startDate=e(f)}if(!this.timePicker){this.startDate=this.startDate.startOf("day")}this.oldStartDate=this.startDate.clone();this.updateView();this.updateCalendars();this.updateInputText()},setEndDate:function(f){if(typeof f==="string"){this.endDate=e(f,this.format)}if(typeof f==="object"){this.endDate=e(f)}if(!this.timePicker){this.endDate=this.endDate.endOf("day")}this.oldEndDate=this.endDate.clone();this.updateView();this.updateCalendars();this.updateInputText()},updateView:function(){this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());this.updateFormInputs()},updateFormInputs:function(){this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format));this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format));if(this.startDate.isSame(this.endDate)||this.startDate.isBefore(this.endDate)){this.container.find("button.applyBtn").removeAttr("disabled")}else{this.container.find("button.applyBtn").attr("disabled","disabled")}},updateFromControl:function(){if(!this.element.is("input")){return}if(!this.element.val().length){return}var g=this.element.val().split(this.separator),h=null,f=null;if(g.length===2){h=e(g[0],this.format);f=e(g[1],this.format)}if(this.singleDatePicker||h===null||f===null){h=e(this.element.val(),this.format);f=h}if(f.isBefore(h)){return}this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.startDate=h;this.endDate=f;if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate)){this.notify()}this.updateCalendars()},notify:function(){this.updateView();this.cb(this.startDate,this.endDate,this.chosenLabel)},move:function(){var f={top:0,left:0};var g=d(window).width();if(!this.parentEl.is("body")){f={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()};g=this.parentEl[0].clientWidth+this.parentEl.offset().left}if(this.opens=="left"){this.container.css({top:this.element.offset().top+this.element.outerHeight()-f.top,right:g-this.element.offset().left-this.element.outerWidth(),left:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{if(this.opens=="center"){this.container.css({top:this.element.offset().top+this.element.outerHeight()-f.top,left:this.element.offset().left-f.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{this.container.css({top:this.element.offset().top+this.element.outerHeight()-f.top,left:this.element.offset().left-f.left,right:"auto"});if(this.container.offset().left+this.container.outerWidth()>d(window).width()){this.container.css({left:"auto",right:0})}}}},toggle:function(f){if(this.element.hasClass("active")){this.hide()}else{this.show()}},show:function(f){if(this.isShowing){return}this.element.addClass("active");this.container.show();this.move();this._outsideClickProxy=d.proxy(function(g){this.outsideClick(g)},this);d(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy);this.isShowing=true;this.element.trigger("show.daterangepicker",this)},outsideClick:function(g){var f=d(g.target);if(f.closest(this.element).length||f.closest(this.container).length||f.closest(".calendar-date").length){return}this.hide()},hide:function(f){if(!this.isShowing){return}d(document).off("mousedown.daterangepicker").off("click.daterangepicker","[data-toggle=dropdown]").off("focusin.daterangepicker");this.element.removeClass("active");this.container.hide();if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate)){this.notify()}this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.isShowing=false;this.element.trigger("hide.daterangepicker",this)},enterRange:function(h){var f=h.target.innerHTML;if(f==this.locale.customRangeLabel){this.updateView()}else{var g=this.ranges[f];this.container.find("input[name=daterangepicker_start]").val(g[0].format(this.format));this.container.find("input[name=daterangepicker_end]").val(g[1].format(this.format))}},showCalendars:function(){this.container.addClass("show-calendar");this.move();this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar");this.element.trigger("hideCalendar.daterangepicker",this)},inputsChanged:function(j){var h=d(j.target);var g=e(h.val(),this.format);if(!g.isValid()){return}var f,i;if(h.attr("name")==="daterangepicker_start"){f=g;i=this.endDate}else{f=this.startDate;i=g}this.setCustomDates(f,i)},inputsKeydown:function(f){if(f.keyCode===13){this.inputsChanged(f);this.notify()}},updateInputText:function(){if(this.element.is("input")&&!this.singleDatePicker){this.element.val(this.startDate.format(this.format)+this.separator+this.endDate.format(this.format))}else{if(this.element.is("input")){this.element.val(this.endDate.format(this.format))}}},clickRange:function(h){var f=h.target.innerHTML;this.chosenLabel=f;if(f==this.locale.customRangeLabel){this.showCalendars()}else{var g=this.ranges[f];this.startDate=g[0];this.endDate=g[1];if(!this.timePicker){this.startDate.startOf("day");this.endDate.endOf("day")}this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());this.updateCalendars();this.updateInputText();this.hideCalendars();this.hide();this.element.trigger("apply.daterangepicker",this)}},clickPrev:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.subtract(1,"month")}else{this.rightCalendar.month.subtract(1,"month")}this.updateCalendars()},clickNext:function(g){var f=d(g.target).parents(".calendar");if(f.hasClass("left")){this.leftCalendar.month.add(1,"month")}else{this.rightCalendar.month.add(1,"month")}this.updateCalendars()},hoverDate:function(h){var j=d(h.target).attr("data-title");var i=j.substr(1,1);var f=j.substr(3,1);var g=d(h.target).parents(".calendar");if(g.hasClass("left")){this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[i][f].format(this.format))}else{this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[i][f].format(this.format))}},setCustomDates:function(f,g){this.chosenLabel=this.locale.customRangeLabel;if(f.isAfter(g)){var h=this.endDate.diff(this.startDate);g=e(f).add(h,"ms")}this.startDate=f;this.endDate=g;this.updateView();this.updateCalendars()},clickDate:function(l){var m=d(l.target).attr("data-title");var n=m.substr(1,1);var i=m.substr(3,1);var g=d(l.target).parents(".calendar");var h,k;if(g.hasClass("left")){h=this.leftCalendar.calendar[n][i];k=this.endDate;if(typeof this.dateLimit==="object"){var f=e(h).add(this.dateLimit).startOf("day");if(k.isAfter(f)){k=f}}}else{h=this.startDate;k=this.rightCalendar.calendar[n][i];if(typeof this.dateLimit==="object"){var j=e(k).subtract(this.dateLimit).startOf("day");if(h.isBefore(j)){h=j}}}if(this.singleDatePicker&&g.hasClass("left")){k=h.clone()}else{if(this.singleDatePicker&&g.hasClass("right")){h=k.clone()}}g.find("td").removeClass("active");d(l.target).addClass("active");this.setCustomDates(h,k);if(!this.timePicker){k.endOf("day")}if(this.singleDatePicker&&!this.timePicker){this.clickApply()}},clickApply:function(f){this.updateInputText();this.hide();this.element.trigger("apply.daterangepicker",this)},clickCancel:function(f){this.startDate=this.oldStartDate;this.endDate=this.oldEndDate;this.chosenLabel=this.oldChosenLabel;this.updateView();this.updateCalendars();this.hide();this.element.trigger("cancel.daterangepicker",this)},updateMonthYear:function(i){var k=d(i.target).closest(".calendar").hasClass("left"),j=k?"left":"right",h=this.container.find(".calendar."+j);var g=parseInt(h.find(".monthselect").val(),10);var f=h.find(".yearselect").val();this[j+"Calendar"].month.month(g).year(f);this.updateCalendars()},updateTime:function(j){var i=d(j.target).closest(".calendar"),l=i.hasClass("left");var g=parseInt(i.find(".hourselect").val(),10);var k=parseInt(i.find(".minuteselect").val(),10);if(this.timePicker12Hour){var h=i.find(".ampmselect").val();if(h==="PM"&&g<12){g+=12}if(h==="AM"&&g===12){g=0}}if(l){var m=this.startDate.clone();m.hour(g);m.minute(k);this.startDate=m;this.leftCalendar.month.hour(g).minute(k);if(this.singleDatePicker){this.endDate=m.clone()}}else{var f=this.endDate.clone();f.hour(g);f.minute(k);this.endDate=f;if(this.singleDatePicker){this.startDate=f.clone()}this.rightCalendar.month.hour(g).minute(k)}this.updateCalendars()},updateCalendars:function(){this.leftCalendar.calendar=this.buildCalendar(this.leftCalendar.month.month(),this.leftCalendar.month.year(),this.leftCalendar.month.hour(),this.leftCalendar.month.minute(),"left");this.rightCalendar.calendar=this.buildCalendar(this.rightCalendar.month.month(),this.rightCalendar.month.year(),this.rightCalendar.month.hour(),this.rightCalendar.month.minute(),"right");this.container.find(".calendar.left").empty().html(this.renderCalendar(this.leftCalendar.calendar,this.startDate,this.minDate,this.maxDate,"left"));this.container.find(".calendar.right").empty().html(this.renderCalendar(this.rightCalendar.calendar,this.endDate,this.singleDatePicker?this.minDate:this.startDate,this.maxDate,"right"));this.container.find(".ranges li").removeClass("active");var f=true;var h=0;for(var g in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[g][0])&&this.endDate.isSame(this.ranges[g][1])){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+h+")").addClass("active").html()}}else{if(this.startDate.format("YYYY-MM-DD")==this.ranges[g][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[g][1].format("YYYY-MM-DD")){f=false;this.chosenLabel=this.container.find(".ranges li:eq("+h+")").addClass("active").html()}}h++}if(f){this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html();this.showCalendars()}},buildCalendar:function(w,r,m,t,j){var g=e([r,w]).daysInMonth();var q=e([r,w,1]);var k=e([r,w,g]);var o=e(q).subtract(1,"month").month();var h=e(q).subtract(1,"month").year();var f=e([h,o]).daysInMonth();var u=q.day();var v;var s=[];s.firstDay=q;s.lastDay=k;for(v=0;v<6;v++){s[v]=[]}var p=f-u+this.locale.firstDay+1;if(p>f){p-=7}if(u==this.locale.firstDay){p=f-6}var x=e([h,o,p,12,t]);var l,n;for(v=0,l=0,n=0;v<42;v++,l++,x=e(x).add(24,"hour")){if(v>0&&l%7===0){l=0;n++}s[n][l]=x.clone().hour(m);x.hour(12);if(this.minDate&&s[n][l].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&s[n][l].isBefore(this.minDate)&&j=="left"){s[n][l]=this.minDate.clone()}if(this.maxDate&&s[n][l].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&s[n][l].isAfter(this.maxDate)&&j=="right"){s[n][l]=this.maxDate.clone()}}return s},renderDropdowns:function(k,j,f){var o=k.month();var n=k.year();var l=(f&&f.year())||(n+5);var r=(j&&j.year())||(n-50);var i='<select class="monthselect">';var g=n==r;var s=n==l;for(var h=0;h<12;h++){if((!g||h>=j.month())&&(!s||h<=f.month())){i+="<option value='"+h+"'"+(h===o?" selected='selected'":"")+">"+this.locale.monthNames[h]+"</option>"}}i+="</select>";var q='<select class="yearselect">';for(var p=r;p<=l;p++){q+='<option value="'+p+'"'+(p===n?' selected="selected"':"")+">"+p+"</option>"}q+="</select>";return i+q},renderCalendar:function(u,x,o,s,g){var q='<div class="calendar-date">';q+='<table class="table-condensed">';q+="<thead>";q+="<tr>";if(this.showWeekNumbers){q+="<th></th>"}if(!o||o.isBefore(u.firstDay)){q+='<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>'}else{q+="<th></th>"}var r=this.locale.monthNames[u[1][1].month()]+u[1][1].format(" YYYY");if(this.showDropdowns){r=this.renderDropdowns(u[1][1],o,s)}q+='<th colspan="5" class="month">'+r+"</th>";if(!s||s.isAfter(u.lastDay)){q+='<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>'}else{q+="<th></th>"}q+="</tr>";q+="<tr>";if(this.showWeekNumbers){q+='<th class="week">'+this.locale.weekLabel+"</th>"}d.each(this.locale.daysOfWeek,function(C,i){q+="<th>"+i+"</th>"});q+="</tr>";q+="</thead>";q+="<tbody>";for(var n=0;n<6;n++){q+="<tr>";if(this.showWeekNumbers){q+='<td class="week">'+u[n][0].week()+"</td>"}for(var m=0;m<7;m++){var f="available ";f+=(u[n][m].month()==u[1][1].month())?"":"off";if((o&&u[n][m].isBefore(o,"day"))||(s&&u[n][m].isAfter(s,"day"))){f=" off disabled "}else{if(u[n][m].format("YYYY-MM-DD")==x.format("YYYY-MM-DD")){f+=" active ";if(u[n][m].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")){f+=" start-date "}if(u[n][m].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")){f+=" end-date "}}else{if(u[n][m]>=this.startDate&&u[n][m]<=this.endDate){f+=" in-range ";if(u[n][m].isSame(this.startDate)){f+=" start-date "}if(u[n][m].isSame(this.endDate)){f+=" end-date "}}}}var B="r"+n+"c"+m;q+='<td class="'+f.replace(/\s+/g," ").replace(/^\s?(.*?)\s?$/,"$1")+'" data-title="'+B+'">'+u[n][m].date()+"</td>"}q+="</tr>"}q+="</tbody>";q+="</table>";q+="</div>";var y;if(this.timePicker){q+='<div class="calendar-time">';q+='<select class="hourselect">';var v=0;var z=23;if(o&&(g=="left"||this.singleDatePicker)&&x.format("YYYY-MM-DD")==o.format("YYYY-MM-DD")){v=o.hour();if(x.hour()<v){x.hour(v)}if(this.timePicker12Hour&&v>=12&&x.hour()>=12){v-=12}if(this.timePicker12Hour&&v==12){v=1}}if(s&&(g=="right"||this.singleDatePicker)&&x.format("YYYY-MM-DD")==s.format("YYYY-MM-DD")){z=s.hour();if(x.hour()>z){x.hour(z)}if(this.timePicker12Hour&&z>=12&&x.hour()>=12){z-=12}}var l=0;var j=23;var t=x.hour();if(this.timePicker12Hour){l=1;j=12;if(t>=12){t-=12}if(t===0){t=12}}for(y=l;y<=j;y++){if(y==t){q+='<option value="'+y+'" selected="selected">'+y+"</option>"}else{if(y<v||y>z){q+='<option value="'+y+'" disabled="disabled" class="disabled">'+y+"</option>"}else{q+='<option value="'+y+'">'+y+"</option>"}}}q+="</select> : ";q+='<select class="minuteselect">';var A=0;var w=59;if(o&&(g=="left"||this.singleDatePicker)&&x.format("YYYY-MM-DD h A")==o.format("YYYY-MM-DD h A")){A=o.minute();if(x.minute()<A){x.minute(A)}}if(s&&(g=="right"||this.singleDatePicker)&&x.format("YYYY-MM-DD h A")==s.format("YYYY-MM-DD h A")){w=s.minute();if(x.minute()>w){x.minute(w)}}for(y=0;y<60;y+=this.timePickerIncrement){var p=y;if(p<10){p="0"+p}if(y==x.minute()){q+='<option value="'+y+'" selected="selected">'+p+"</option>"}else{if(y<A||y>w){q+='<option value="'+y+'" disabled="disabled" class="disabled">'+p+"</option>"}else{q+='<option value="'+y+'">'+p+"</option>"}}}q+="</select> ";if(this.timePicker12Hour){q+='<select class="ampmselect">';var h="";var k="";if(o&&(g=="left"||this.singleDatePicker)&&x.format("YYYY-MM-DD")==o.format("YYYY-MM-DD")&&o.hour()>=12){h=' disabled="disabled" class="disabled"'}if(s&&(g=="right"||this.singleDatePicker)&&x.format("YYYY-MM-DD")==s.format("YYYY-MM-DD")&&s.hour()<12){k=' disabled="disabled" class="disabled"'}if(x.hour()>=12){q+='<option value="AM"'+h+'>AM</option><option value="PM" selected="selected"'+k+">PM</option>"}else{q+='<option value="AM" selected="selected"'+h+'>AM</option><option value="PM"'+k+">PM</option>"}q+="</select>"}q+="</div>"}return q},remove:function(){this.container.remove();this.element.off(".daterangepicker");this.element.removeData("daterangepicker")}};d.fn.daterangepicker=function(g,f){this.each(function(){var h=d(this);if(h.data("daterangepicker")){h.data("daterangepicker").remove()}h.data("daterangepicker",new a(h,g,f))});return this}}));