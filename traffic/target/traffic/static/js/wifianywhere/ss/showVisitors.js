jQuery(function(e){var a="#grid-table";var c="#grid-pager";jQuery(a).jqGrid({url:G_CTX_PATH+"/wifiUser/visitors",datatype:"json",mtype:"GET",width:"300",height:"320",colNames:["用户ID","认证方式","微信号","手机号码","最近登陆时间","最近三个月累计登陆"],colModel:[{name:"userId",index:"userId",width:30,sortable:false},{name:"userType",index:"userType",width:30,sortable:false,formatter:b},{name:"qq",index:"qq",width:50,sortable:false},{name:"mobile",index:"customerNum",width:30,sortable:false},{name:"lastLogin",index:"lastLogin",width:50,sortable:false,formatter:formatDate},{name:"loginCount",index:"loginCount",sortable:false,width:50}],jsonReader:{root:"rows",total:function(g){var f=g.total;var h=parseInt(e("#grid-table").getGridParam("rowNum"));return f%h>0?f/h+1:f/h},page:"page",records:"total",repeatitems:false},postData:{startTime:e("#startTime").val(),endTime:e("#endTime").val()},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:c,altRows:true,multiboxonly:true,loadComplete:function(){var f=this;setTimeout(function(){updatePagerIcons(f)},0)},autowidth:true});function b(g,h,f){if(g=="1"){return"短信"}else{if(g=="2"){return"APP"}else{if(g=="3"){return"微信"}}}}function d(){e("#grid-table").jqGrid("setGridParam",{page:1});e("#grid-table").jqGrid("setGridParam",{postData:{startTime:e("#startTime").val(),endTime:e("#endTime").val(),userType:e("#userType").val(),merchantId:e("#merchantId").val()},datatype:"json"}).trigger("reloadGrid")}click_tree_menu(function(f){e("#merchantId").val(f.attr("node"));d()});e("#searchBtn").on("click",function(){d()})});