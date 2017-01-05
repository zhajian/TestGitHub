jQuery(function(d){var e="#grid-table";var g="#grid-pager";jQuery(e).jqGrid({url:G_CTX_PATH+"/activity/list",datatype:"json",mtype:"GET",width:"300",height:"320",colNames:["活动ID","活动标题","活动状态","开始时间","结束时间","信息阶段","活动描述","活动说明","特别提示"],colModel:[{name:"id",index:"id",width:12,sortable:false},{name:"name",index:"name",width:30,sortable:false},{name:"status",index:"status",width:15,sortable:false},{name:"beginTime",index:"beginTime",width:35,sortable:false,formatter:formatDate},{name:"endTime",index:"endTime",sortable:false,width:35,formatter:formatDate},{name:"dataStatusStr",index:"dataStatusStr",width:20,sortable:false},{name:"memo",index:"memo",width:20,sortable:false,hidden:true},{name:"instruction",index:"instruction",width:20,sortable:false,hidden:true},{name:"hint",index:"hint",width:20,sortable:false,hidden:true}],jsonReader:{root:"rows",total:function(k){var j=k.total;var l=parseInt(d("#grid-table").getGridParam("rowNum"));return j%l>0?j/l+1:j/l},page:"page",records:"total",repeatitems:false},postData:{startTime:d("#startTime").val(),endTime:d("#endTime").val()},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:g,altRows:true,multiboxonly:true,loadComplete:function(){var j=this;setTimeout(function(){updatePagerIcons(j)},0)},autowidth:true});function f(){d("#grid-table").jqGrid("setGridParam",{page:1});d("#grid-table").jqGrid("setGridParam",{postData:{startTime:d("#startTime").val(),endTime:d("#endTime").val(),merchantId:d("#merchantId").val()},datatype:"json"}).trigger("reloadGrid")}click_tree_menu(function(j){d("#merchantId").val(j.attr("node"));f()});d("#searchBtn").on("click",function(){f()});d("#editBtn").on("click",function(){d("#editOrDetailModal [tag=save]").show();var m=d("#grid-table").jqGrid("getGridParam","selrow");if(m==null){ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");return}var l=jQuery("#grid-table").jqGrid("getRowData",m);d("#id1").val(m);var k=d("#status1")[0].options;for(var j=0;j<k.length;j++){if(l.status==k[j].text){k[j].selected=true;break}}d("#status1").removeAttr("disabled");d("#name1").val(l.name);d("#name1").removeAttr("disabled");d("#memo1").val(l.memo);d("#memo1").removeAttr("disabled");d("#instruction1").val(l.instruction);d("#instruction1").removeAttr("disabled");d("#hint1").val(l.hint);d("#hint1").removeAttr("disabled");d("#beginTime1").val(l.beginTime);d("#beginTime1").removeAttr("disabled");d("#endTime1").val(l.endTime);d("#endTime1").removeAttr("disabled");d("#myModalLabel1").html("修改活动");d("#editOrDetailModal").modal()});d("#editOrDetailModal [tag=save]").click(function(){var n=jQuery("#grid-table").jqGrid("getRowData",d("#grid-table").jqGrid("getGridParam","selrow"));var l;var k=d("#status1")[0].options;for(var j=0;j<k.length;j++){if(k[j].selected){l=k[j].text;break}}if(n.name==d.trim(d("#name1").val())&&n.memo==d.trim(d("#memo1").val())&&n.instruction==d.trim(d("#instruction1").val())&&n.hint==d.trim(d("#hint1").val())&&n.beginTime==d("#beginTime1").val()&&n.endTime==d("#endTime1").val()){if(n.status==l){alert("值未变化.");d("#editOrDetailModal [tag=close1]").click();return}else{alert("仅变更了状态");d("#dataStatus").attr("disabled","disabled")}}else{alert("有值发生了变化.");d("#dataStatus").removeAttr("disabled");d("#dataStatus").val(2)}if(!d("#activityForm1").validate().form()){return false}var m=d("#activityForm1").serializeArray();d.getJSON(G_CTX_PATH+"/activity/save",m,function(o){if(o.success){ui_alert("信息已更新",function(){});d("#editOrDetailModal [tag=close1]").click();d("#searchBtn").click()}else{ui_error(o.data)}})});d("#detailBtn").on("click",function(){var m=d("#grid-table").jqGrid("getGridParam","selrow");if(m==null){ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");return}var l=jQuery("#grid-table").jqGrid("getRowData",m);d("#id1").val(m);var k=d("#status1")[0].options;for(var j=0;j<k.length;j++){if(l.status==k[j].text){k[j].selected=true;break}}d("#status1").attr("disabled","disabled");d("#name1").val(l.name);d("#name1").attr("disabled","disabled");d("#memo1").val(l.memo);d("#memo1").attr("disabled","disabled");d("#instruction1").val(l.instruction);d("#instruction1").attr("disabled","disabled");d("#hint1").val(l.hint);d("#hint1").attr("disabled","disabled");d("#beginTime1").val(l.beginTime);d("#beginTime1").attr("disabled","disabled");d("#endTime1").val(l.endTime);d("#endTime1").attr("disabled","disabled");d("#endTime1").attr("disabled","disabled");d("#editOrDetailModal [tag=save]").hide();d("#myModalLabel1").html("活动详情");d("#editOrDetailModal").modal()});d("#deleteBtn").on("click",function(){var j=d("#grid-table").jqGrid("getGridParam","selrow");if(j==null){ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");return}d("#warningModal").modal()});d("#warningModal [tag=save2]").click(function(){var j=d("#grid-table").jqGrid("getGridParam","selrow");d.getJSON(G_CTX_PATH+"/activity/delete",{id:j},function(k){if(k.success){ui_alert("信息已删除",function(){});d("#warningModal [tag=close2]").click();d("#searchBtn").click()}else{ui_error(k.data)}})});d("#addModal [tag=save],[tag=close]").click(function(){var l;var k=d("#merchantId").val();console.log("当前_merchantId:"+k);var j=d(this).attr("tag");if(j=="save"){if(!d("#activityForm").validate().form()){return false}d("[name='dataStatus']").val(2)}else{d("[name='dataStatus']").val(1);d("[name='merchantId']").val(k);d("#alertModal").modal();return}d("[name='merchantId']").val(k);l=d("#activityForm").serializeArray();d.getJSON(G_CTX_PATH+"/activity/save",l,function(m){if(m.success){ui_alert("信息已添加",function(){});d("#addModal [tag=close11]").click();d("#searchBtn").click()}else{ui_error(m.data)}})});d("#alertModal [tag=save3]").click(function(){var j=d("#activityForm").serializeArray();d.getJSON(G_CTX_PATH+"/activity/save",j,function(k){if(k.success){ui_alert("信息已保存",function(){});d("#alertModal [tag=close4]").click();d("#searchBtn").click()}else{ui_error(k.data)}})});d("#alertModal [tag=close3]").click(function(){d("#addModal").modal()});d("#hook").on("click",function(){d("#activityForm")[0].reset();a(1)});var h=d("#merchantChild").val();var c=h.split(",");function a(l){var p=d("#merchantId").val();var k=d("#merchantPid").val();if(p==k){d("#choose")[0].style.display="block";var o=d("#checkDiv");for(var n=0;n<c.length;n++){var j=document.createElement("input");j.setAttribute("type","checkbox");j.setAttribute("value",c[n].split("|")[0]);j.setAttribute("name","merchantIds");o[0].innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";o[0].appendChild(j);o[0].appendChild(document.createTextNode(c[n].split("|")[1]));var m=document.createElement("div");o[0].appendChild(m)}c.length=0;d("#addModal").modal()}else{d("#choose")[0].style.display="none";d("#addModal").modal()}}d("#activityForm1").validate({rules:{name:{required:true},instruction:{required:true},beginTime:{required:true},endTime:{required:true}}});d("#activityForm").validate({rules:{name:{required:true},instruction:{required:true},memo:{required:true},hint:{required:true},beginTime:{required:true},endTime:{required:true},merchantIds:{required:true}}});var b=function(){var k=d("#imageBigView");var o=d("#imageBig");var n="wifi/activity/detail";var m="none";var l=d("#imageDetailDiv");var j=G_CTX_PATH+"/wifi/uploadfile/image.do";i(j,k,o,n,m).appendTo(l)}(jQuery);function i(p,n,k,q,m){var o=Math.floor(Math.random()*100);var s="imagefileupiframe"+o;var v=d("<form type='post' dataType='json' target='"+s+"' contentType='application/x-www-form-urlencoded; charset=utf-8' onsubmit='return true'></form>").attr("action",p).attr("method","post").attr("enctype","multipart/form-data");var u=d("<input type='file' name='imageFile' style='display:none' id='imageFile' />");u.appendTo(v);d("<input type='button' style='float:left' value='浏览' onclick='imageFile.click();' />").appendTo(v);d("<input type='submit' value='文件上传' />").appendTo(v);var t=d("<input type='button' value='预览' class='preImageViewBtn' />");t.appendTo(v);d("<input type='hidden' name='folderRootPaht' value='"+q+"' />").appendTo(v);d("<input type='hidden' name='mercImageBaseSize' value='"+m+"' />").appendTo(v);var l=d("<iframe width='0' height='0' id='"+s+"' name='"+s+"' frameborder='0' scrolling='no'></iframe>");l.appendTo(v);u.change(function(){d(n).val(d(this).val())});l.load(function(){var w=d(document.getElementById(s).contentWindow.document.body).text();console.log("iframe = "+w);if(w!==""&&w.indexOf("root")&&w.indexOf("url")){w=d.parseJSON(w);if(w!==null){d.each(w,function(x,z){if("original"===z.type){console.log("iframe 返回结果  original = "+z.id+" "+z.url);d(k).val(z.id);var y=z.root+"/"+z.url;d(n).val(y);t.attr("data-url",y)}})}}});var j=n.val();console.log("playVal = "+j);if(j!=null&&j!=""){var r=t.attr("data-url");console.log("dataUrl = "+r);if(r==null||r==""){t.attr("data-url",j);console.log("data-url 赋值成功。")}}return v}});