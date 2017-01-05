jQuery(function($) {
	
	// 获取当前时间 
	var getCurrentDateTime = function(AddDayCount) {
		var date = new Date();
		date.setDate(date.getDate()+AddDayCount);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		month = (month < 10 ? "0" + month : month);
		day = (day < 10 ? "0" + day : day);
		var curDate = year.toString() + '-' + month.toString() + '-' + day.toString();
		return curDate;
	};
	
	//给日期框默认值
	$("#peopleNearStart").val(getCurrentDateTime(-1).substring(0, 8) + "01");
	$("#peopleNearEnd").val(getCurrentDateTime(-1));
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/wifiUser/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['设备ID','设备信息','附近人群数','时间'],
		colModel:[
			{name:'apId',index:'id',width:8, sortable: false},
			{name:'apName',index:'apName',width:15, sortable: false},
			{name:'guestNum',index:'guestNum',width:15, sortable: false},
			{name:'dateTime',index:'dateTime',width:15, sortable: false}
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
			merchantId : $('#merchantId').val(),
			peopleNearStart : $('#peopleNearStart').val(),
			peopleNearEnd : $('#peopleNearEnd').val()
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
				merchantId : $('#merchantId').val(),
				peopleNearStart : $('#peopleNearStart').val(),
				peopleNearEnd : $('#peopleNearEnd').val(),
				apName : $('#apName').val(),
				guestNumStr : $('#guestNumStr').val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	
	click_tree_menu(function(domObj){
		$("#merchantId").val(domObj.attr("node"));
		query();
	});
	
	$("#peopleNearSearchBtn").on("click", function(){
		query();
	});
	

});

