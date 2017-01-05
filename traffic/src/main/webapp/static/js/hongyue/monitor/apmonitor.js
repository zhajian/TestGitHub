jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid(
			{
				url : G_CTX_PATH + "/monitor/list",
				datatype : "json",
				mtype : "GET",
				width : "200",
				height : "320",
				colNames : [ 'Id', '设备名称', '设备状态', '设备人数' ],
				colModel : [ {
					name : 'monitorId',
					index : 'monitorId',
					width : 8,
					sortable : false,
					hidden : true
				}, {
					name : 'apName',
					index : 'apName',
					width : 20,
					sortable : false
				}, {
					name : 'statusStr',
					index : 'statusStr',
					width : 25,
					sortable : false
				}, {
					name : 'num',
					index : 'num',
					width : 8,
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					total : function(obj) {
						var total = obj.total; // 总记录数
						var rowNum = parseInt($("#grid-table").getGridParam(
								"rowNum")); // 每页显示记录数
						return total % rowNum > 0 ? total / rowNum + 1 : total
								/ rowNum;
					},
					page : "page",
					records : "total",
					repeatitems : false
				},
				postData : {
				// apName : $('#apName').val()
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
		$("#grid-table").jqGrid('setGridParam', {
			page : 1
		});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				apName : $('#apName').val(),
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	$("#apSearchBtn").on("click", function() {
		query();
	});
});