(function(a){a.fn.ligerButton=function(b){return a.ligerui.run.call(this,"ligerButton",arguments)};a.fn.ligerGetButtonManager=function(){return a.ligerui.run.call(this,"ligerGetButtonManager",arguments)};a.ligerDefaults.Button={width:60,text:"Button",disabled:false,click:null,icon:null};a.ligerMethos.Button={};a.ligerui.controls.Button=function(c,b){a.ligerui.controls.Button.base.constructor.call(this,c,b)};a.ligerui.controls.Button.ligerExtend(a.ligerui.controls.Input,{__getType:function(){return"Button"},__idPrev:function(){return"Button"},_extendMethods:function(){return a.ligerMethos.Button},_render:function(){var b=this,c=this.options;b.button=a(b.element);b.button.addClass("l-button");b.button.append('<div class="l-button-l"></div><div class="l-button-r"></div><span></span>');b.button.hover(function(){if(c.disabled){return}b.button.addClass("l-button-over")},function(){if(c.disabled){return}b.button.removeClass("l-button-over")});c.click&&b.button.click(function(){if(!c.disabled){c.click()}});b.set(c)},_setIcon:function(b){var c=this;if(!b){c.button.removeClass("l-button-hasicon");c.button.find("img").remove()}else{c.button.addClass("l-button-hasicon");c.button.append('<img src="'+b+'" />')}},_setEnabled:function(b){if(b){this.button.removeClass("l-button-disabled")}},_setDisabled:function(b){if(b){this.button.addClass("l-button-disabled");this.options.disabled=true}else{this.button.removeClass("l-button-disabled");this.options.disabled=false}},_setWidth:function(b){this.button.width(b)},_setText:function(b){a("span",this.button).html(b)},setValue:function(b){this.set("text",b)},getValue:function(){return this.options.text},setEnabled:function(){this.set("disabled",false)},setDisabled:function(){this.set("disabled",true)}})})(jQuery);