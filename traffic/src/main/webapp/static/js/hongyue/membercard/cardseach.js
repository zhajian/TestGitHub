jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	$.post(G_CTX_PATH + "/merchant/list", function(data) {
		$("#merchantId").append("<option value=''>----请选择商户----</option>");
		// 遍历data集合，
		$(data.rows).each(
				function() {
					var option = $("<option value='" + this.merchantId + "'>"
							+ this.merchantName + "</option>");
					$("#merchantId").append(option);
				});
	});
jQuery(grid_selector).jqGrid({
				url : G_CTX_PATH + "/mms/mcard/seachCardList",
				datatype : "local",
				mtype : "GET",
				width : "300",
				height : "320",
				colNames : [ '商店名称','卡号','有效期','余额','余额抵消券','积分','卡种类','实体/虚拟','状态'],
				colModel : [ {
					name : 'merchantName',
					index : 'merchantName',
					width : 12,
					sortable : false
				}, {
					name : 'mcardCode',
					index : 'mcardCode',
					width : 10,
					sortable : false
				}, {
					name : 'effecDateStr',
					index : 'effecDateStr',
					width : 15,
					sortable : false
				}, {
					name : 'mcardCash',
					index : 'mcardCash',
					width : 8,
					sortable : false
				}, {
					name : 'mcardOffset',
					index : 'mcardOffset',
					width : 8,
					sortable : false
				}, {
					name : 'integral',
					index : 'integral',
					width : 8,
					sortable : false
				}, {
					name : 'ctypeIdStr',
					index : 'ctypeIdStr',
					width : 8,
					sortable : false
				}, {
					name : 'flagStr',
					index : 'flagStr',
					width : 8,
					sortable : false
				}, {
					name : 'mcardStatusStr',
					index : 'mcardStatusStr',
					width : 8,
					sortable : false
				}],
				jsonReader : {
					root : "rows",
					total : function(obj) {
						var total = obj.total; // 总记录数
						var rowNum = parseInt($("#grid-table")
								.getGridParam("rowNum")); // 每页显示记录数
						return total % rowNum > 0 ? total / rowNum + 1
								: total / rowNum;
					},
					page : "page",
					records : "total",
					repeatitems : false
				},
				postData : {
				// merchantId : $('#merchantId').val()
				},
				viewrecords : true,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : pager_selector,
				altRows : true,
				multiboxonly : true,
				loadComplete : function() {
					var table = this;
					setTimeout(function() {
						updatePagerIcons(table);
					}, 0);
				},
				autowidth : true
			});
	function query() {
//		if($('#merchantId').val()==null||$('#merchantId').val()==''){
//			alert("");
//			return;
//		}
		$("#grid-table").jqGrid('setGridParam', {
			page : 1
		});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				merchantId : $('#merchantId').val(),
				flag : $('#flag').val(),
			},
//			page : 1,
			datatype : "json"
		}).trigger('reloadGrid');
	}
	$("#seachCardSearchBtn").on("click", function() {
		if($('#merchantId').val()==null||$('#merchantId').val()==''){
			alert("请选择商户");
			return;
		}
		if($('#flag').val()==null||$('#flag').val()==''){
			alert("请选择实体卡/虚拟卡");
			return;
		}
		query();
	});
	$("#exportCardInfo").on("click", function() {
		if($('#merchantId').val()==null||$('#merchantId').val()==''){
			alert("请选择商户");
			return;
		}
//		if($('#flag').val()==null||$('#flag').val()==''){
//			alert("请选择实体卡/虚拟卡");
//			return;
//		}
		window.location.href = G_CTX_PATH+"/mms/mcard/exportCardInfo?merchantId="+$('#merchantId').val();
	});
//	function exportExcel(){
//		var startTimeStr= $('#startTimeStr').val();
//		var endTimeStr=$('#endTimeStr').val();
//		var mobile=$('#mobile').val();
//		var mac=$('#mac').val();
//		var client=$('#client').val();
//		var labelId=$("#label").val();
//		window.location.href = "${ctx}/analysis/stats/exportWifiLogin?startTimeStr="+startTimeStr+"&endTimeStr="+endTimeStr+"&mobile="+mobile+"&mac="+mac+"&client="+client+"&labelId="+labelId;
//	}
});