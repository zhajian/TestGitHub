(function(a,b){a.fn.ace_wysiwyg=function(c,h){var d=a.extend({speech_button:true,wysiwyg:{}},c);var e=["#ac725e","#d06b64","#f83a22","#fa573c","#ff7537","#ffad46","#42d692","#16a765","#7bd148","#b3dc6c","#fbe983","#fad165","#92e1c0","#9fe1e7","#9fc6e7","#4986e7","#9a9cff","#b99aff","#c2c2c2","#cabdbf","#cca6ac","#f691b2","#cd74e6","#a47ae2","#444444"];var g={font:{values:["Arial","Courier","Comic Sans MS","Helvetica","Open Sans","Tahoma","Verdana"],icon:"fa fa-font",title:"Font"},fontSize:{values:{5:"Huge",3:"Normal",1:"Small"},icon:"fa fa-text-height",title:"Font Size"},bold:{icon:"fa fa-bold",title:"Bold (Ctrl/Cmd+B)"},italic:{icon:"fa fa-italic",title:"Italic (Ctrl/Cmd+I)"},strikethrough:{icon:"fa fa-strikethrough",title:"Strikethrough"},underline:{icon:"fa fa-underline",title:"Underline"},insertunorderedlist:{icon:"fa fa-list-ul",title:"Bullet list"},insertorderedlist:{icon:"fa fa-list-ol",title:"Number list"},outdent:{icon:"fa fa-outdent",title:"Reduce indent (Shift+Tab)"},indent:{icon:"fa fa-indent",title:"Indent (Tab)"},justifyleft:{icon:"fa fa-align-left",title:"Align Left (Ctrl/Cmd+L)"},justifycenter:{icon:"fa fa-align-center",title:"Center (Ctrl/Cmd+E)"},justifyright:{icon:"fa fa-align-right",title:"Align Right (Ctrl/Cmd+R)"},justifyfull:{icon:"fa fa-align-justify",title:"Justify (Ctrl/Cmd+J)"},createLink:{icon:"fa fa-link",title:"Hyperlink",button_text:"Add",placeholder:"URL",button_class:"btn-primary"},unlink:{icon:"fa fa-chain-broken",title:"Remove Hyperlink"},insertImage:{icon:"fa fa-picture-o",title:"Insert picture",button_text:'<i class="'+ace.vars.icon+'fa fa-file"></i> Choose Image &hellip;',placeholder:"Image URL",button_insert:"Insert",button_class:"btn-success",button_insert_class:"btn-primary",choose_file:true},foreColor:{values:e,title:"Change Color"},backColor:{values:e,title:"Change Background Color"},undo:{icon:"fa fa-undo",title:"Undo (Ctrl/Cmd+Z)"},redo:{icon:"fa fa-repeat",title:"Redo (Ctrl/Cmd+Y)"},viewSource:{icon:"fa fa-code",title:"View Source"}};var f=d.toolbar||["font",null,"fontSize",null,"bold","italic","strikethrough","underline",null,"insertunorderedlist","insertorderedlist","outdent","indent",null,"justifyleft","justifycenter","justifyright","justifyfull",null,"createLink","unlink",null,"insertImage",null,"foreColor",null,"undo","redo",null,"viewSource"];this.each(function(){var p=' <div class="wysiwyg-toolbar btn-toolbar center"> <div class="btn-group"> ';for(var l in f){if(f.hasOwnProperty(l)){var n=f[l];if(n===null){p+=' </div> <div class="btn-group"> ';continue}if(typeof n=="string"&&n in g){n=g[n];n.name=f[l]}else{if(typeof n=="object"&&n.name in g){n=a.extend(g[n.name],n)}else{continue}}var o="className" in n?n.className:"btn-default";switch(n.name){case"font":p+=' <a class="btn btn-sm '+o+' dropdown-toggle" data-toggle="dropdown" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i><i class="'+ace.vars.icon+'fa fa-angle-down icon-on-right"></i></a> ';p+=' <ul class="dropdown-menu dropdown-light dropdown-caret">';for(var i in n.values){if(n.values.hasOwnProperty(i)){p+=' <li><a data-edit="fontName '+n.values[i]+'" style="font-family:\''+n.values[i]+"'\">"+n.values[i]+"</a></li> "}}p+=" </ul>";break;case"fontSize":p+=' <a class="btn btn-sm '+o+' dropdown-toggle" data-toggle="dropdown" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i>&nbsp;<i class="'+ace.vars.icon+'fa fa-angle-down icon-on-right"></i></a> ';p+=' <ul class="dropdown-menu dropdown-light dropdown-caret"> ';for(var r in n.values){if(n.values.hasOwnProperty(r)){p+=' <li><a data-edit="fontSize '+r+'"><font size="'+r+'">'+n.values[r]+"</font></a></li> "}}p+=" </ul> ";break;case"createLink":p+=' <div class="btn-group"> <a class="btn btn-sm '+o+' dropdown-toggle" data-toggle="dropdown" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i></a> ';p+=' <div class="dropdown-menu dropdown-caret dropdown-menu-right">							 <div class="input-group">								<input class="form-control" placeholder="'+n.placeholder+'" type="text" data-edit="'+n.name+'" />								<span class="input-group-btn">									<button class="btn btn-sm '+n.button_class+'" type="button">'+n.button_text+"</button>								</span>							 </div>						</div> </div>";break;case"insertImage":p+=' <div class="btn-group"> <a class="btn btn-sm '+o+' dropdown-toggle" data-toggle="dropdown" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i></a> ';p+=' <div class="dropdown-menu dropdown-caret dropdown-menu-right">							 <div class="input-group">								<input class="form-control" placeholder="'+n.placeholder+'" type="text" data-edit="'+n.name+'" />								<span class="input-group-btn">									<button class="btn btn-sm '+n.button_insert_class+'" type="button">'+n.button_insert+"</button>								</span>							 </div>";if(n.choose_file&&"FileReader" in window){p+='<div class="space-2"></div>							 <label class="center block no-margin-bottom">								<button class="btn btn-sm '+n.button_class+' wysiwyg-choose-file" type="button">'+n.button_text+'</button>								<input type="file" data-edit="'+n.name+'" />							  </label>'}p+=" </div> </div>";break;case"foreColor":case"backColor":p+=' <select class="hide wysiwyg_colorpicker" title="'+n.title+'"> ';a.each(n.values,function(t,s){p+=' <option value="'+s+'">'+s+"</option> "});p+=" </select> ";p+=' <input style="display:none;" disabled class="hide" type="text" data-edit="'+n.name+'" /> ';break;case"viewSource":p+=' <a class="btn btn-sm '+o+'" data-view="source" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i></a> ';break;default:p+=' <a class="btn btn-sm '+o+'" data-edit="'+n.name+'" title="'+n.title+'"><i class="'+ace.vars.icon+n.icon+'"></i></a> ';break}}}p+=" </div> ";var j;if(d.speech_button&&"onwebkitspeechchange" in (j=document.createElement("input"))){p+=' <input class="wysiwyg-speech-input" type="text" data-edit="inserttext" x-webkit-speech />'}j=null;p+=" </div> ";if(d.toolbar_place){p=d.toolbar_place.call(this,p)}else{p=a(this).before(p).prev()}p.find("a[title]").tooltip({animation:false,container:"body"});p.find(".dropdown-menu input[type=text]").on("click",function(){return false}).on("change",function(){a(this).closest(".dropdown-menu").siblings(".dropdown-toggle").dropdown("toggle")}).on("keydown",function(s){if(s.which==27){this.value="";a(this).change()}else{if(s.which==13){s.preventDefault();s.stopPropagation();a(this).change()}}});p.find("input[type=file]").prev().on(ace.click_event,function(s){a(this).next().click()});p.find(".wysiwyg_colorpicker").each(function(){a(this).ace_colorpicker({pull_right:true}).change(function(){a(this).nextAll("input").eq(0).val(this.value).change()}).next().find(".btn-colorpicker").tooltip({title:this.title,animation:false,container:"body"})});var q=a(this);var k=false;p.find("a[data-view=source]").on("click",function(t){t.preventDefault();if(!k){a("<textarea />").css({width:q.outerWidth(),height:q.outerHeight()}).val(q.html()).insertAfter(q);q.hide();a(this).addClass("active")}else{var s=q.next();q.html(s.val()).show();s.remove();a(this).removeClass("active")}k=!k});var m=a.extend({},{activeToolbarClass:"active",toolbarSelector:p},d.wysiwyg||{});a(this).wysiwyg(m)});return this}})(window.jQuery);