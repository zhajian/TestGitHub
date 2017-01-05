jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/wifiUser/visitors",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',	   
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['用户ID', '认证方式', '微信号', '手机号码','最近登陆时间', '最近三个月累计登陆'],
		colModel:[
			{name:'userId',index:'userId',width:30, sortable: false},
			{name:'userType',index:'userType',width:30, sortable: false, formatter: formatUserType},
			{name:'qq',index:'qq',width:50, sortable: false},
			{name:'mobile',index:'customerNum',width:30, sortable: false},
			{name:'lastLogin',index:'lastLogin', width:50, sortable: false, formatter: formatDate},
			{name:'loginCount',index:'loginCount', sortable: false, width:50}
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
			startTime : $('#startTime').val(),
			endTime : $('#endTime').val()
		},
		viewrecords : true,
		rowNum:10,
		rowList:[10,20,30],
		pager : pager_selector,
		altRows: true,
		//toppager: true,
		
		//multiselect: true,
		//multikey: "ctrlKey",
        multiboxonly: true,

		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				updatePagerIcons(table);
			}, 0);
		},
		autowidth: true
	});
	
	// 设定jqGrid随窗口变化而自适应  
	/*$(window).resize(function(){                                         
		$("#grid-table").setGridWidth($(window).width());                
	  });*/                                                                

	function formatUserType( cellvalue, options, cell ){
		if(cellvalue == "1"){
			return "短信";
		}else if(cellvalue == "2"){
			return "APP";
		}else if(cellvalue == "3"){
			return "微信";
		}
	}

	function query(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				startTime : $('#startTime').val(),
				endTime : $('#endTime').val(),
				userType : $('#userType').val(),
				merchantId : $("#merchantId").val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	
	click_tree_menu(function(domObj){
			$("#merchantId").val(domObj.attr("node"));
			query();
		});

	$("#searchBtn").on("click", function(){
		query();
	});
});