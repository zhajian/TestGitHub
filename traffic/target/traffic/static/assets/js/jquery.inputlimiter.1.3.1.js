(function(a){a.fn.inputlimiter=function(d){var g=a.extend({},a.fn.inputlimiter.defaults,d),f=a(this);if(g.boxAttach&&!a("#"+g.boxId).length){a("<div/>").appendTo("body").attr({id:g.boxId,"class":g.boxClass}).css({position:"absolute"}).hide();if(a.fn.bgiframe){a("#"+g.boxId).bgiframe()}}var i=function(o){var n=a(this),m=b(n.val());if(!g.allowExceed&&m>g.limit){n.val(e(n.val()))}if(g.boxAttach){a("#"+g.boxId).css({width:n.outerWidth()-(a("#"+g.boxId).outerWidth()-a("#"+g.boxId).width())+"px",left:n.offset().left+"px",top:(n.offset().top+n.outerHeight())-1+"px","z-index":2000})}var k=(g.limit-m>0?g.limit-m:0),l=g.remTextFilter(g,k),j=g.limitTextFilter(g);if(g.limitTextShow){a("#"+g.boxId).html(l+" "+j);var p=a("<span/>").appendTo("body").attr({id:"19cc9195583bfae1fad88e19d443be7a","class":g.boxClass}).html(l+" "+j).innerWidth();a("#19cc9195583bfae1fad88e19d443be7a").remove();if(p>a("#"+g.boxId).innerWidth()){a("#"+g.boxId).html(l+"<br />"+j)}a("#"+g.boxId).show()}else{a("#"+g.boxId).html(l).show()}},c=function(l){var k=b(a(this).val());if(!g.allowExceed&&k>g.limit){var j=l.ctrlKey||l.altKey||l.metaKey;if(!j&&(l.which>=32&&l.which<=122)&&this.selectionStart===this.selectionEnd){return false}}},h=function(){var k=a(this);count=b(k.val());if(!g.allowExceed&&count>g.limit){k.val(e(k.val()))}if(g.boxAttach){a("#"+g.boxId).fadeOut("fast")}else{if(g.remTextHideOnBlur){var j=g.limitText;j=j.replace(/\%n/g,g.limit);j=j.replace(/\%s/g,(g.limit===1?"":"s"));a("#"+g.boxId).html(j)}}},b=function(l){if(g.limitBy.toLowerCase()==="words"){return(l.length>0?a.trim(l).replace(/\ +(?= )/g,"").split(" ").length:0)}var j=l.length,k=l.match(/\n/g);if(k&&g.lineReturnCount>1){j+=k.length*(g.lineReturnCount-1)}return j},e=function(j){if(g.limitBy.toLowerCase()==="words"){return a.trim(j).replace(/\ +(?= )/g,"").split(" ").splice(0,g.limit).join(" ")+" "}return j.substring(0,g.limit)};a(this).each(function(j){var k=a(this);if((!d||!d.limit)&&g.useMaxlength&&parseInt(k.attr("maxlength"))>0&&parseInt(k.attr("maxlength"))!=g.limit){k.inputlimiter(a.extend({},g,{limit:parseInt(k.attr("maxlength"))}))}else{if(!g.allowExceed&&g.useMaxlength&&g.limitBy.toLowerCase()==="characters"){k.attr("maxlength",g.limit)}k.unbind(".inputlimiter");k.bind("keyup.inputlimiter",i);k.bind("keypress.inputlimiter",c);k.bind("blur.inputlimiter",h)}})};a.fn.inputlimiter.remtextfilter=function(d,b){var c=d.remText;if(b===0&&d.remFullText!==null){c=d.remFullText}c=c.replace(/\%n/g,b);c=c.replace(/\%s/g,(d.zeroPlural?(b===1?"":"s"):(b<=1?"":"s")));return c};a.fn.inputlimiter.limittextfilter=function(c){var b=c.limitText;b=b.replace(/\%n/g,c.limit);b=b.replace(/\%s/g,(c.limit<=1?"":"s"));return b};a.fn.inputlimiter.defaults={limit:255,boxAttach:true,boxId:"limiterBox",boxClass:"limiterBox",remText:"%n character%s remaining.",remTextFilter:a.fn.inputlimiter.remtextfilter,remTextHideOnBlur:true,remFullText:null,limitTextShow:true,limitText:"Field limited to %n character%s.",limitTextFilter:a.fn.inputlimiter.limittextfilter,zeroPlural:true,allowExceed:false,useMaxlength:true,limitBy:"characters",lineReturnCount:1}})(jQuery);