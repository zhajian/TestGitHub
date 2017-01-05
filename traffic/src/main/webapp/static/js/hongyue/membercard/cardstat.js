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
	jQuery(grid_selector)
	.jqGrid(
			{
				url : G_CTX_PATH + "/mms/mcard/statCard",
				datatype : "json",
				mtype : "GET",
				width : "300",
				height : "320",
				colNames : [ '商店编号','商店名称', '虚拟卡数', '实体卡数'],
				colModel : [ {
					name : 'merchantId',
					index : 'merchantId',
					width : 8,
					sortable : false,
					hidden : false
				}, {
					name : 'merchantName',
					index : 'merchantName',
					width : 18,
					sortable : false
				}, {
					name : 'virtualNum',
					index : 'virtualNum',
					width : 8,
					sortable : false
				}, {
					name : 'entityNum',
					index : 'entityNum',
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
				merchantId : $('#merchantId').val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	$("#statCardSearchBtn").on("click", function() {
		query();
	});
	
});