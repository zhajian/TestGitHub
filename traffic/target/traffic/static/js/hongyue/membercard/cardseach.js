jQuery(function(d){var a="#grid-table";var b="#grid-pager";d.post(G_CTX_PATH+"/merchant/list",function(e){d("#merchantId").append("<option value=''>----请选择商户----</option>");d(e.rows).each(function(){var f=d("<option value='"+this.merchantId+"'>"+this.merchantName+"</option>");d("#merchantId").append(f)})});jQuery(a).jqGrid({url:G_CTX_PATH+"/mms/mcard/seachCardList",datatype:"local",mtype:"GET",width:"300",height:"320",colNames:["商店名称","卡号","有效期","余额","余额抵消券","积分","卡种类","实体/虚拟","状态"],colModel:[{name:"merchantName",index:"merchantName",width:12,sortable:false},{name:"mcardCode",index:"mcardCode",width:10,sortable:false},{name:"effecDateStr",index:"effecDateStr",width:15,sortable:false},{name:"mcardCash",index:"mcardCash",width:8,sortable:false},{name:"mcardOffset",index:"mcardOffset",width:8,sortable:false},{name:"integral",index:"integral",width:8,sortable:false},{name:"ctypeIdStr",index:"ctypeIdStr",width:8,sortable:false},{name:"flagStr",index:"flagStr",width:8,sortable:false},{name:"mcardStatusStr",index:"mcardStatusStr",width:8,sortable:false}],jsonReader:{root:"rows",total:function(f){var e=f.total;var g=parseInt(d("#grid-table").getGridParam("rowNum"));return e%g>0?e/g+1:e/g},page:"page",records:"total",repeatitems:false},postData:{},viewrecords:true,rowNum:10,rowList:[10,20,30],pager:b,altRows:true,multiboxonly:true,loadComplete:function(){var e=this;setTimeout(function(){updatePagerIcons(e)},0)},autowidth:true});function c(){d("#grid-table").jqGrid("setGridParam",{page:1});d("#grid-table").jqGrid("setGridParam",{postData:{merchantId:d("#merchantId").val(),flag:d("#flag").val(),},datatype:"json"}).trigger("reloadGrid")}d("#seachCardSearchBtn").on("click",function(){if(d("#merchantId").val()==null||d("#merchantId").val()==""){alert("请选择商户");return}if(d("#flag").val()==null||d("#flag").val()==""){alert("请选择实体卡/虚拟卡");return}c()});d("#exportCardInfo").on("click",function(){if(d("#merchantId").val()==null||d("#merchantId").val()==""){alert("请选择商户");return}window.location.href=G_CTX_PATH+"/mms/mcard/exportCardInfo?merchantId="+d("#merchantId").val()})});