jQuery(function(d){var a="#grid-table";var b="#grid-pager";jQuery(a).jqGrid({url:G_CTX_PATH+"/smsAccountHistory/list",datatype:"local",mtype:"GET",width:"300",height:"320",colNames:["id","租户名称","充值条数","有效期","创建时间"],colModel:[{name:"merchantId",index:"merchantId",width:25,sortable:false,hidden:true},{name:"merchantName",index:"merchantName",width:25,sortable:false},{name:"accountNum",index:"accountNum",width:25,sortable:false},{name:"effecDateStr",index:"effecDateStr",width:25,sortable:false},{name:"crtDateStr",index:"crtDateStr",width:25,sortable:false}],jsonReader:{root:"rows",total:function(f){var e=f.total;var g=parseInt(d("#grid-table").getGridParam("rowNum"));return e%g>0?e/g+1:e/g},page:"page",records:"total",repeatitems:false,subgrid:{repeatitems:false}},postData:{},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:b,altRows:true,multiboxonly:true,loadComplete:function(){var e=this;setTimeout(function(){updatePagerIcons(e)},0)},autowidth:true,});function c(){d("#grid-table").jqGrid("setGridParam",{page:1});d("#grid-table").jqGrid("setGridParam",{postData:{merchantId:d("#onOff").val()},datatype:"json"}).trigger("reloadGrid")}Hg.post("/merchant/all",{},function(g){var h="";var f=g.rows;for(var e=0;e<f.length;e++){h+='<option value="'+f[e].merchantId+'">'+f[e].merchantName+"</option>"}d("#onOff").append(h)});d("#msmAccountHistorySearchBtn").on("click",function(){c()})});