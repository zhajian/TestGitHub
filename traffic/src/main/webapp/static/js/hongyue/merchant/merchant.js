jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/merchant/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['租户号','租户名称', '租户地址', '租户联系人','联系电话', '租户状态'],
		colModel:[
			{name:'merchantId',index:'merchantId',width:8, sortable: false},
			{name:'merchantName',index:'merchantName',width:18, sortable: false},
			{name:'merchantAddress',index:'merchantAddress',width:25, sortable: false},
			{name:'merchantContacts',index:'merchantContacts', width:8, sortable: false},
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
				merchantName : $('#sn').val(),
				merchantContacts : $('#mac').val(),
				contactNumber : $("#ssid").val(),
				merchantStatus : $("#onOff").val()
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
	
	//租户门店
	$("#healthBtn").on("click", function(){
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		window.location.href=G_CTX_PATH+"/store/show?merchantId="+row.merchantId;
	});
	//租户用户
	$("#conCountBtn").on("click", function(){
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		window.location.href=G_CTX_PATH+"/merchant/showMerchantUser?merchantId="+row.merchantId;
	});
	//新增租户
	$("#createBtn").on("click",function(){
		$('#data_form')[0].reset();
		Hg.refRepeatSubmit("data_form");
		$("input[name=merchantId]").val("");
		$("#div_status").attr("hidden","hidden");
		$('#24healthModal').modal();
	});
	//修改租户
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
		Hg.post("/merchant/getMerchantById",{id:row.merchantId},function(data){
			if(data.success){
				var merchant=data.merchant;
				fillValue(merchant);
				$('#24healthModal').modal();
			}else{
				ui_error(data.data);
			}
		});
	});
	//保存
	$("#save").on('click',function(){
		var merchantId=$("input[name=merchantId]").val();
		var url="/merchant/insert";
		if(merchantId!="")
			url="/merchant/update";
		var merchantName=$("input[name=merchantName").val();
		if(merchantName==""){
			ui_error("请填写租户名");
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
	function fillValue(merchant){
		$("input[name=merchantId]").val(merchant.merchantId);
		$("input[name=merchantName]").val(merchant.merchantName);
		$("input[name=merchantAddress]").val(merchant.merchantAddress);
		$("input[name=merchantContacts]").val(merchant.merchantContacts);
		$("input[name=contactNumber]").val(merchant.contactNumber);
		$("input[name=merchantTitle]").val(merchant.merchantTitle);
		$("input[name=merchantDesc]").val(merchant.merchantDesc);
		$("select[name=merchantStatus]").val(merchant.merchantStatus);
	} 
});