function del_current_node(){set_cookie("current_node",null)}function fill_time(b){for(var a=5;a<22;a++){val=("0"+a);val=val.substring(val.length-2);$("#"+b).append("<option value='"+val+":00'>"+val+":00</option>");$("#"+b).append("<option value='"+val+":30'>"+val+":30</option>")}}function trim(a){return a.replace(/(^\s*)|(\s*$)/g,"")}function schedule_bg(a){var b=new Array(5);b[0]="#CCCCCC";b[1]="#99CCFF";b[2]="#CCFFCC";b[3]="#FFFFCC";b[4]="#FFCCCC ";return b[a-1]}function ui_info(a){$.gritter.add({position:"bottom-right",text:"<h5>"+a+"</h5>",sticky:false,time:3000,class_name:"gritter-light gritter-info"})}function ui_alert(a,b){bootbox.dialog({message:"<h5>"+a+"<h5>",buttons:{danger:{label:"确定",className:"btn-primary",callback:function(){b()}}}})}function ui_confirm(a,b){bootbox.dialog({message:"<h5>"+a+"<h5>",buttons:{main:{label:"取消",className:"btn-default",callback:function(){}},danger:{label:"确定",className:"btn-primary",callback:function(){b()}}}})}function ui_error(a){$.gritter.add({text:"<h5>"+a+"</h5>",sticky:false,time:2000,class_name:"gritter-light gritter-error gritter-center"})}function conv_address_item(b,a){html="<nobr><label>";html+='		<input class="ace" type="checkbox" name="addr_id" value="'+b+'"/>';html+='		<span class="lbl">'+a+"</span></label></nobr>";return html}function conv_inputbox_item(d,a,c,b){if(b!==undefined){html='<span data="'+b+'" id="'+d+'">'}else{html='<span id="'+d+'">'}html+='<nobr><b  title="'+c+'">'+a+"</b>";html+='<a class="del" title="删除"><i class="icon-remove"></i></a></nobr></span>';return html}function myclose(){parent.winclose()}function winclose(){$("html,body").css("overflow","auto");$("div.shade").hide();$("#dialog").html("");$("#dialog").remove()}function show_content(){var a=$("#content_iframe").get(0).contentWindow;var b=document.createElement("div");b.innerHTML=$("#content").val();b.className="height";a.document.body.appendChild(b);height=$(a.document.body).find("div.height").height();if(height<300){height=300}a.height=height;$("#content_wrap").height(height+30);$("#content_wrap").parent().height(height+40);$("#content_iframe").height(height+30)}function go_return_url(){window.open(get_cookie("return_url"),"_self");return false}function toggle_adv_search(){if($("#adv_search").attr("class").indexOf("display-none")<0){$("#adv_search").addClass("display-none");$("#toggle_adv_search_icon").addClass("icon-chevron-down");$("#toggle_adv_search_icon").removeClass("icon-chevron-up")}else{$("#adv_search").removeClass("display-none");$("#toggle_adv_search_icon").addClass("icon-chevron-up");$("#toggle_adv_search_icon").removeClass("icon-chevron-down")}}function submit_search(){$("#form_search").submit()}function submit_adv_search(){$("#form_adv_search").submit()}function close_adv_search(){$("#adv_search").addClass("display-none");$("#toggle_adv_search_icon").addClass("icon-chevron-down");$("#toggle_adv_search_icon").removeClass("icon-chevron-up")}var ul_table={display_bar:function(a){if(a==0){$("#id-toggle-all").removeAttr("checked");$("#id-message-list-navbar .message-toolbar").addClass("hide");$("#id-message-list-navbar .message-infobar").removeClass("hide")}else{$("#id-message-list-navbar .message-infobar").addClass("hide");$("#id-message-list-navbar .message-toolbar").removeClass("hide")}},select_all:function(){var a=0;$(".tbody input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});$("#id-toggle-all").get(0).checked=true;ul_table.display_bar(a)},select_none:function(){$(".tbody input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");$("#id-toggle-all").get(0).checked=false;ul_table.display_bar(0)},select_read:function(){$(".message-unread input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");var a=0;$(".tbody:not(.message-unread) input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});ul_table.display_bar(a)},select_unread:function(){$(".tbody:not(.message-unread) input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");var a=0;$(".message-unread input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});ul_table.display_bar(a)}};var Inputbox={display_bar:function(a){if(a==0){$("#id-toggle-all").removeAttr("checked");$("#id-message-list-navbar .message-toolbar").addClass("hide");$("#id-message-list-navbar .message-infobar").removeClass("hide")}else{$("#id-message-list-navbar .message-infobar").addClass("hide");$("#id-message-list-navbar .message-toolbar").removeClass("hide")}},select_all:function(){var a=0;$(".tbody input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});$("#id-toggle-all").get(0).checked=true;ul_table.display_bar(a)},select_none:function(){$(".tbody input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");$("#id-toggle-all").get(0).checked=false;ul_table.display_bar(0)},select_read:function(){$(".message-unread input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");var a=0;$(".tbody:not(.message-unread) input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});ul_table.display_bar(a)},select_unread:function(){$(".tbody:not(.message-unread) input[type=checkbox]").removeAttr("checked").closest(".tbody").removeClass("selected");var a=0;$(".message-unread input[type=checkbox]").each(function(){this.checked=true;$(this).closest(".tbody").addClass("selected");a++});ul_table.display_bar(a)}};function set_val(a,b){if($("#"+a+" option").length>0){$("#"+a+" option[value='"+b+"']").attr("selected","selected");return}if(($("#"+a).attr("type"))==="checkbox"){if(b==1){$("#"+a).attr("checked",true);return}}if(($("#"+a).attr("type"))==="text"){$("#"+a).val(b);return}if(($("#"+a).attr("type"))==="hidden"){$("#"+a).val(b);return}if(($("#"+a).attr("rows"))>0){$("#"+a).text(b);return}}function set_return_url(a){if(a!=undefined){set_cookie("return_url",a)}else{set_cookie("return_url",document.location)}}function winopen(b,a,c){b=fix_url(b);$("html,body").css("overflow","hidden");$("div.shade").show();var d=$("body").eq(0);if($("#dialog").length==0){if(!is_mobile()){d.append('<div id="dialog"><iframe src=\''+b+"' style='width:"+a+"px;height:100%' scrolling='auto' ></iframe></div>");$("#dialog").css({width:a,height:c,position:"fixed","z-index":"2000",top:($(window).height()/2-c/2),left:(d.width()/2-a/2),"background-color":"#ffffff"})}else{$("div.shade").css("width",d.width());d.append('<div id="dialog"><iframe src=\''+b+"' style='width:100%;height:100%' scrolling='auto' ></iframe></div>");$("#dialog").css({width:d.width(),height:c,position:"fixed","z-index":"2000",top:0,left:0,"background-color":"#ffffff"})}}else{$("#dialog").show()}}function contact_conv(c){var b=c.split(";");var a="";for(key in b){if(b[key]!=""){data=b[key].split("|")[1];id=b[key].split("|")[1];name=b[key].split("|")[0];title=b[key].split("|")[0];a+=conv_inputbox_item(id,name,title,data)}}return a}function is_mobile(){return navigator.userAgent.match(/mobile/i)}function fix_url(a){var c=a.split("?");a=c[0]+"?";for(var b=1;b<c.length;b++){a+=c[b]+"&"}if(c.length>0){a=a.substring(0,a.length-1)}return a}function check_form(a){var b=true;$("#"+a+" :input").each(function(c){if($(this).attr("check")){if(!validate($(this).val(),$(this).attr("check"))){ui_error($(this).attr("msg"));$(this).focus();b=false;return b}}});return b}function validate(c,b){if(b.indexOf("|")){tmp=b.split("|");b=tmp[0];data2=tmp[1]}switch(b){case"require":if(c==""){return false}else{return true}break;case"email":var a=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;return a.test(c);break;case"number":var a=/^[0-9]+\.{0,1}[0-9]{0,3}$/;return a.test(c);break;case"html":var a=/<...>/;return a.test(c);break;case"eqt":data2=$("#"+data2).val();return c>=data2;break}}function sendAjax(a,b,c){return $.ajax({type:"POST",url:a,data:b+"&ajax=1",dataType:"json",success:c})}function sendForm(d,a,b){if($("#ajax").val()==1){var c=$("#"+d).serialize();$.ajax({type:"POST",url:a,data:c,dataType:"json",success:function(e){if(e.status){ui_alert(e.info,function(){if(b){location.href=b}})}else{ui_error(e.info)}}})}else{$("#"+d).attr("action",a);if(b){set_cookie("return_url",b)}$("#"+d).submit()}}function click_nav_menu(a){url=$(a).attr("href");if(url.length>0&&(url!="#")){node=$(a).attr("node");set_cookie("current_node",node)}else{}}function set_cookie(b,d,g,f,c,e){f="/";var a=b+"="+escape(d);if(g){a+="; expires="+g.toGMTString()}if(f){a+="; path="+escape(f)}if(c){a+="; domain="+escape(c)}if(e){a+="; secure"}document.cookie=a}function get_cookie(b){var a=document.cookie.match("(^|;) ?"+b+"=([^;]*)(;|$)");if(a){return(unescape(a[2]))}else{return null}}function del_cookie(b){var a=new Date();a.setTime(a.getTime()-1);document.cookie=b+="=; expires="+a.toGMTString()}function byteLength(d){var c=0,a=d.length;if(!d){return 0}for(var b=0;b<a;b++){c+=d.charCodeAt(b)>255?2:1}return c}function click_tree_menu(a){$(".sub_left_menu .tree_menu a").click(function(){$(".sub_left_menu .tree_menu a.active").removeClass("active");$(this).addClass("active");a($(this));return false})}function ajaxExceptionHandler(b,c){var a=b.getResponseHeader("sessionstatus");if(a=="timeout"){ui_alert("您的登陆已超时，请重新登陆",function(){window.location.replace(G_CTX_PATH+"/")})}else{if(c!="undefined"){c()}}}function formatDate(a,j,i){var b=new Date(a);var e=b.getFullYear();var d=b.getMonth()+1;var f=b.getDate();var g=b.getHours();var c=b.getMinutes();var h=b.getSeconds();d=d<10?("0"+d):d;f=f<10?("0"+f):f;g=g<10?("0"+g):g;c=c<10?("0"+c):c;h=h<10?("0"+h):h;return e+"-"+d+"-"+f+" "+g+":"+c+":"+h}function updatePagerIcons(b){var a={"ui-icon-seek-first":"icon-double-angle-left bigger-140","ui-icon-seek-prev":"icon-angle-left bigger-140","ui-icon-seek-next":"icon-angle-right bigger-140","ui-icon-seek-end":"icon-double-angle-right bigger-140"};$(".ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon").each(function(){var d=$(this);var c=$.trim(d.attr("class").replace("ui-icon",""));if(c in a){d.attr("class","ui-icon "+a[c])}})};