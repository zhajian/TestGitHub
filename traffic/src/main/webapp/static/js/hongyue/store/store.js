jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/store/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['门店号','门店名称', '门店地址', '门店联系人','联系电话', '门店状态'],
		colModel:[
			{name:'storeId',index:'storeId',width:8, sortable: false},
			{name:'storeName',index:'storeName',width:18, sortable: false},
			{name:'storeAddress',index:'storeAddress',width:25, sortable: false},
			{name:'storeContacts',index:'storeContacts', width:8, sortable: false},
			{name:'contactNumber',index:'contactNumber', width:12, sortable: false},
			{name:'statusStr',index:'statusStr',width:8, sortable: false},
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
			storeStatus : $("#onOff").val()
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
				storeName : $('#sn').val(),
				storeContacts : $('#mac').val(),
				contactNumber : $("#ssid").val(),
				storeStatus : $("#onOff").val()
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
	function reload(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	//新增门店
	$("#healthBtn").on("click", function(){
		$('#data_form')[0].reset();
		Hg.refRepeatSubmit("data_form");
		$("input[name=storeId]").val("");
		$("#div_status").attr("hidden","hidden");
		$('#24healthModal').modal();
	});
	//修改门店
	$("#updateBtn").on("click",function(){
		$('#data_form')[0].reset();
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		Hg.refRepeatSubmit("data_form");
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		$("#div_status").removeAttr("hidden");
		Hg.post("/store/getStoreById",{id:row.storeId},function(data){
			if(data.success){
				var store=data.store;
				fillValue(store);
				$('#24healthModal').modal();
			}else{
				ui_error(data.data);
			}
		});
	});
	//保存
	$("#save").on('click',function(){
		var storeId=$("input[name=storeId]").val();
		var url="/store/insert";
		if(storeId!="")
			url="/store/update";
		var storeName=$("input[name=storeName").val();
		if(storeName==""){
			ui_error("请填写门店名");
			return;
		}
		var contactNumber=$("input[name=contactNumber").val();
		if(contactNumber==""){
			ui_error("请填联系方式");
			return;
		}
		Hg.post(url,$("#data_form").serializeArray(),function(data){
			if (data.success) {
				ui_alert("保存成功！",function() {
					reload();
				});
			}else{
				Hg.refreshSubmitToken("data_form");
				ui_error(data.data);
			}
			$('#24healthModal').modal("hide");
		});
	});
	//填充值
	function fillValue(store){
		$("input[name=storeId]").val(store.storeId);
		$("input[name=storeName]").val(store.storeName);
		$("input[name=storeAddress]").val(store.storeAddress);
		$("input[name=storeContacts]").val(store.storeContacts);
		$("input[name=contactNumber]").val(store.contactNumber);
		$("input[name=storeDesc]").val(store.storeDesc);
		$("select[name=storeStatus]").val(store.storeStatus);
	} 
	
});