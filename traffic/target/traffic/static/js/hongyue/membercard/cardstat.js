jQuery(function(d){var a="#grid-table";var b="#grid-pager";d.post(G_CTX_PATH+"/merchant/list",function(e){d("#merchantId").append("<option value=''>----请选择商户----</option>");d(e.rows).each(function(){var f=d("<option value='"+this.merchantId+"'>"+this.merchantName+"</option>");d("#merchantId").append(f)})});jQuery(a).jqGrid({url:G_CTX_PATH+"/mms/mcard/statCard",datatype:"json",mtype:"GET",width:"300",height:"320",colNames:["商店编号","商店名称","虚拟卡数","实体卡数"],colModel:[{name:"merchantId",index:"merchantId",width:8,sortable:false,hidden:false},{name:"merchantName",index:"merchantName",width:18,sortable:false},{name:"virtualNum",index:"virtualNum",width:8,sortable:false},{name:"entityNum",index:"entityNum",width:8,sortable:false}],jsonReader:{root:"rows",total:function(f){var e=f.total;var g=parseInt(d("#grid-table").getGridParam("rowNum"));return e%g>0?e/g+1:e/g},page:"page",records:"total",repeatitems:false},postData:{},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:b,altRows:true,multiboxonly:true,loadComplete:function(){var e=this;setTimeout(function(){updatePagerIcons(e)},0)},autowidth:true});function c(){d("#grid-table").jqGrid("setGridParam",{page:1});d("#grid-table").jqGrid("setGridParam",{postData:{merchantId:d("#merchantId").val()},datatype:"json"}).trigger("reloadGrid")}d("#statCardSearchBtn").on("click",function(){c()})});