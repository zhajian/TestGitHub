jQuery(function($) {
	Hg.post("/smsAccount/getMyAccountNum",{},function(data){
		$("#myNum").html(data.myNum);
	});
	$("#renewBtn").on("click", function(){
		alert("续费");
	});
});
	/*var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/smsAccountHistory/list",
		datatype: "local",
		mtype: "GET",
		width: "300",
		height: "320",
		colNames:["id",'租户名称','充值条数', '有效期', '创建时间'],
		colModel:[
		    {name:'merchantId',index:'merchantId',width:25, sortable: false,hidden:true},
			{name:'merchantName',index:'merchantName',width:25, sortable: false},
			{name:'accountNum',index:'accountNum',width:25, sortable: false},
			{name:'effecDateStr',index:'effecDateStr', width:25, sortable: false},
			{name:'crtDateStr',index:'crtDateStr',width:25, sortable: false}
		], 
		jsonReader: {
			root: "rows",
			total: function(obj) {
						var total = obj.total; //总记录数
						var rowNum = parseInt($("#grid-table").getGridParam("rowNum")); //每页显示记录数 
		              	return total % rowNum > 0 ? total / rowNum + 1 : total / rowNum;
		            	},
			page: "page",
			records: "total",
			repeatitems: false,
			subgrid : { repeatitems: false}

		},
		postData : {
			//merchantId : $("#onOff").val()
		},
		viewrecords : true,
		rowNum:10,
		rowList:[10,20,30],
		pager : pager_selector,
		altRows: true,
        multiboxonly: true,
        
		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				updatePagerIcons(table);
			}, 0);
		},
		autowidth: true,
	});
	function query(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				merchantId : $("#onOff").val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	Hg.post("/merchant/all",{},function(data){
		var str="";
		var list=data.rows;
		for(var i=0;i<list.length;i++){
			str+='<option value="'+list[i].merchantId+'">'+list[i].merchantName+'</option>';
		}
		$("#onOff").append(str);
	});
	$("#msmAccountHistorySearchBtn").on("click", function(){
		query();
	});
});*/