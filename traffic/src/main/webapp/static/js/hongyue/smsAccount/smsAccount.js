jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/smsAccount/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:["id",'租户名称','短信数量', '有效期', '状态'],
		colModel:[
		    {name:'merchantId',index:'merchantId',width:25, sortable: false,hidden:true},
			{name:'merchantName',index:'merchantName',width:25, sortable: false},
			{name:'smsTotal',index:'smsTotal',width:25, sortable: false},
			{name:'effecDateStr',index:'effecDateStr', width:25, sortable: false},
			{name:'statusStr',index:'statusStr',width:25, sortable: false}
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
		subGrid : true,
		subGridRowExpanded: showChildGrid
	});
	
	function query(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				/*storeName : $('#sn').val(),
				storeContacts : $('#mac').val(),
				contactNumber : $("#ssid").val(),*/
				merchantId : $("#onOff").val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	
	
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
	//新增
	$("#createBtn").on("click", function(){
		$("input[name=smsTotal]").removeAttr("readonly");
		$("#div_hidden").attr("hidden",true);
		$("#merchant").removeAttr("disabled");
		$('#data_form')[0].reset();
		Hg.refRepeatSubmit("data_form");
		$('#24healthModal').modal();
	});
	//修改
	$("#updateBtn").on("click",function(){
		$("#div_hidden").removeAttr("hidden");
		$("input[name=smsTotal]").attr("readonly",true);
		$('#data_form')[0].reset();
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		Hg.refRepeatSubmit("data_form");
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		$("#merchant").attr("disabled","true");
		$("input[name=flag]").val(row.merchantId);
		Hg.post("/smsAccount/getByMerchantId",{id:row.merchantId},function(data){
			 fillValue(data.data);
		});
		$('#24healthModal').modal();
	});
	//增加短信属性
	$("#addBtn").on("click",function(){
		Hg.refRepeatSubmit("data_add_form");
		$("input[name=smsTotal").removeAttr("readonly");
		$('#data_add_form')[0].reset();
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		$("#merchant_id").val(row.merchantId);
		$('#add').modal();
	});
	//保存
	$("#save").on('click',function(){
		var flag=$("input[name=flag]").val();
		var param=$("#data_form").serializeArray();
		var url="/smsAccount/insert";
		if(flag!=""){
			url="/smsAccount/update";
			param.push({
				name:"merchantId",
				value:flag
			});
		}
		var merchantId=$("#merchant").val();
		if(merchantId==-1){
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择租户");
			return;
		}
		var smsTotal=$("input[name=smsTotal]").val();
		if(smsTotal==""){
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输入短信条数");
			return;
		}
		
		Hg.post(url,param,function(data){
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
	//增加短信
	$("#msg_save").on('click',function(){
		var smsTotal=$("#add_smsTotal").val();
		if(smsTotal==""){
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输入短信条数");
			return;
		}
		Hg.post("/smsAccount/add",$("#data_add_form").serializeArray(),function(data){
			if (data.success) {
				ui_alert("保存成功！",function() {
					reload();
				});
			}else{
				Hg.refreshSubmitToken("data_add_form");
				ui_error(data.data);
			}
			$('#add').modal("hide");
		});
	});
	//填充值
	function fillValue(data){
		$("select[name=merchantId").val(data.merchantId);
		$("input[name=smsTotal").val(data.smsTotal);
		$("input[name=effecDate").val(data.effecDateStr);
		$("select[name=status]").val(data.status);
		var list=data.list;
		for(var i=0;i<list.length;i++){
			switch (list[i].smsType) {
			case 2:
				$("#select_pay").val(list[i].status);
				break;
			case 3:
				$("#select_give").val(list[i].status);
				break;
			case 4:
				$("#select_convert").val(list[i].status);
				break;
			case 5:
				$("#select_insert").val(list[i].status);
				break;

			default:
				$("#select_consume").val(list[i].status);
				break;
			}
		}
	} 
	//查询租户
	Hg.post("/merchant/all",{},function(data){
		var str="";
		var list=data.rows;
		for(var i=0;i<list.length;i++){
			str+='<option value="'+list[i].merchantId+'">'+list[i].merchantName+'</option>';
		}
		$("#onOff").append(str);
		$("#merchant").append(str);
	});
	function showChildGrid(parentRowID,parentRowKey){
		var begin='<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
		var end='</table>';
		var dataHtml="";
		Hg.post("/smsSetting/list",{id:parentRowKey},function(data){
			var data=data.rows;
			for(var i=0;i<data.length;i++){
				dataHtml+='<tr>'+
					            '<td>'+data[i].smsTypeStr+'</td>'+
					            '<td>'+data[i].statusStr+'</td>'+
				            '</tr>';
			}
			$("#" + parentRowID).append(begin+dataHtml+end);
		});
	}
});