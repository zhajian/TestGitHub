jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/connect/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['登陆账号', '连接类型', '终端类型','MAC','IP','上线时间','下线时间'],
		colModel:[
			{name:'loginName',index:'loginName',width:10, sortable: false},
			{name:'connectType',index:'connectType',width:6, sortable: false,
				formatter:function(cellvalue, options, rowObject){
					if(cellvalue==0)
						return "无线";
					return "有线";
				}
			},
			{name:'deviceType',index:'deviceType', width:6, sortable: false,
				formatter:function(cellvalue, options, rowObject){
					if(cellvalue==0)
						return "其他";
					else if(cellvalue==1)
						return "电脑";
					else
						return "移动";
				}
			},
			{name:'mac',index:'mac', width:12, sortable: false},
			{name:'ip',index:'ip', width:10, sortable: false},
			{name:'onTimeStr',index:'onTimeStr', width:15, sortable: false},
			{name:'offTimeStr',index:'offTimeStr', width:15, sortable: false}
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
			repeatitems: false
		},
		postData : {
			
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
		autowidth: true
	});
	
	function query(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				'loginName' : $('#sn').val(),
				'mac' : $('#mac').val(),
				'onTimeStr' : $('#onTimeStr').val(),
				'offTimeStr' : $('#offTimeStr').val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	function reload(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	click_tree_menu(function(domObj){
		$("#merchantId").val(domObj.attr("node"));
		query();
	});
	
	$("#equipmentSearchBtn").on("click", function(){
		query();
	});
	
});