jQuery(function(d){var a="#grid-table";var b="#grid-pager";jQuery(a).jqGrid({url:G_CTX_PATH+"/monitor/list",datatype:"json",mtype:"GET",width:"200",height:"320",colNames:["Id","设备名称","设备状态","设备人数"],colModel:[{name:"monitorId",index:"monitorId",width:8,sortable:false,hidden:true},{name:"apName",index:"apName",width:20,sortable:false},{name:"statusStr",index:"statusStr",width:25,sortable:false},{name:"num",index:"num",width:8,sortable:false}],jsonReader:{root:"rows",total:function(f){var e=f.total;var g=parseInt(d("#grid-table").getGridParam("rowNum"));return e%g>0?e/g+1:e/g},page:"page",records:"total",repeatitems:false},postData:{},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:b,altRows:true,multiboxonly:true,loadComplete:function(){var e=this;setTimeout(function(){updatePagerIcons(e)},0)},autowidth:true});function c(){d("#grid-table").jqGrid("setGridParam",{page:1});d("#grid-table").jqGrid("setGridParam",{postData:{apName:d("#apName").val(),},datatype:"json"}).trigger("reloadGrid")}d("#apSearchBtn").on("click",function(){c()})});