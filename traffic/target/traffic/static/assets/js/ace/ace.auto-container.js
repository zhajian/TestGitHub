(function(a,b){a(window).on("resize.auto_container",function(){var c=a(window).width()>1140;try{ace.settings.main_container_fixed(c,false,false)}catch(d){if(c){a(".main-container,.navbar-container").addClass("container")}else{a(".main-container,.navbar-container").removeClass("container")}a(document).trigger("settings.ace",["main_container_fixed",c])}}).triggerHandler("resize.auto_container")})(window.jQuery);