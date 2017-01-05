/**
 * 短信发送记录页面js
 */
jQuery(function($) {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/merchantSms/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320", 
		colNames:['短信主题','短信内容', '目标客户数','发送状态', '创建时间'],
		colModel:[
			{name:'title',index:'title', width:70, sortable: false},
			{name:'content',index:'content',width:50, sortable: false, hidden: true},
			{name:'customerNum',index:'customerNum',width:50, sortable: false},
			{name:'status',index:'status', width:30, sortable: false, formatter: setIcon},
			{name:'createTime',index:'createTime', width:50, sortable: false, sorttype:"date",formatter: formatDate}
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
				var dialog = null;
				var $td = $("#grid-table > tbody > tr:gt(0)").find("td:eq(0)");
				$td.attr("title", "");
				$td.bind({
					mouseover: function (){
						dialog = showSmsDialog($(this).next("td").first().text(), $(this)[0]);
					},
					mouseout: function (){
						if(dialog != null){
							dialog.close();
						}
					},
				});
			}, 0);
		},
		autowidth: true
	});

	function showSmsDialog(text, dom){
		var dialog = $.dialog({
			title : false,
			content : "<div style='width:250px;word-wrap:break-word;'>"+text+"</div>",
			follow : dom
		});
		$(".d-close").hide();
		return dialog;
	}
	
	function setIcon( cellvalue, options, cell ) {
		if(cellvalue == 1) {
			return "<i class=\"icon-ok\"></i>";
		} else {
			return "<i class=\"icon-remove\"></i>";
		}
	}
});
