jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/equipment/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['设备ID', '设备SN', 'Mac地址','网关ID', '设备信息', 'SSID', '在线人数', '开启状态'],
		colModel:[
			{name:'id',index:'id',width:8, sortable: false},
			{name:'serialNumber',index:'serialNumber',width:15, sortable: false},
			{name:'mac',index:'mac',width:15, sortable: false},
			{name:'gwId',index:'gwId', width:18, sortable: false},
			{name:'name',index:'name', width:20, sortable: false},
			{name:'ssid',index:'ssid',width:18, sortable: false},
			{name:'countUserOnline',index:'countUserOnline',width:10, sortable: false},
			{name:'lastHeartbeatTimeStr',index:'lastHeartbeatTimeStr',width:12, sortable: false}
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
			merchantId : $('#merchantId').val()
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
				serialNumber : $('#sn').val(),
				mac : $('#mac').val(),
				ssid : $("#ssid").val(),
				name : $("#name").val(),
				onOff : $("#onOff").val()
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
	
	//****************************监控详情******************************
	$("#healthBtn").on("click", function(){
		var healthData = [];
		var pingTime;
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		
		$.getJSON(G_CTX_PATH + "/equipment/get24healthData/"+id, {}, function(
				data) {
			if (data.success) {
				obj = data.basic;
				obj_health = data.data;
				
				var id = $("#grid-table").jqGrid('getGridParam',"selrow");
				var row = jQuery('#grid-table').jqGrid('getRowData',id);
				
				$("#b_merchantName").text(obj.merchantName);
				$("#b_sn").text(obj.serialNumber);
				$("#b_mac").text(obj.mac);
				$("#b_gwId").text(obj.gwId);
				$("#b_name").text(obj.name);
				$("#b_ssid").text(obj.ssid);
				$("#b_lastHeartTime").text(obj.lastHeartbeatTimeStr);
				$("#b_onOff").text(row.lastHeartbeatTimeStr);
				
				$.each(obj_health, function(){
					var _data = this.pingNum;
					healthData.push(_data);
				});
//				alert(healthData);
				$('#container').highcharts({
			        title: {
			            text: '路由器工作频率走势',
			            x: -20 //center
			        },
			        xAxis: {
			                title: {
			                text:obj.pingTime + "日整点时间"
			            },
			            categories: ['0', '1', '2', '3', '4', '5','6', '7', '8', '9', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23']
			        },
			        yAxis: {
			               floor: 0,
			            ceiling: 60,
			            plotBands: [{ // mark the weekend
			                color: '#90EE90',
			                from: (0,30),
			                to: (0, 60)
			            }],
			            allowDecimals: false,
			            title: {
			                text: '频率'
			            },
			            plotLines: [{
			                value: 10,
			                width: 1,
			                color: '#808080'
			            }]
			        },

			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: '路由器工作频率',
			            data: healthData
			            //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 30, 30,30,30,30,30,30,30,30,30,30,30,17,0]
			        }]
			    });
			}
		});	
		$('#24healthModal').modal();
	});
	
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
	
	var conCountGrid_selector = "#conCountGrid-table";
	var conCountPager_selector = "#conCountGrid-pager";
	
	//****************************上网统计******************************
	$("#conCountBtn").on("click", function(){
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}

		
		//给日期框默认值
		$("#conCountStart").val(getCurrentDateTime(-1).substring(0, 8) + "01");
		$("#conCountEnd").val(getCurrentDateTime(-1));
		conCountQuery(id);
		
		jQuery(conCountGrid_selector).jqGrid({
			url: G_CTX_PATH + "/equipment/conCount",
			datatype: "json",
			mtype: "GET",
//			width: "1000",
			height: "320",
			colNames:['日期', '上网人次', '上网用户数'],
			colModel:[
				{name:'dateTime',index:'dateTime', sortable: false,key:true},
				{name:'yesterdayNum',index:'yesterdayNum', sortable: false},
				{name:'countUserNum',index:'yesterdayUserNum', sortable: false}
			], 
			jsonReader: {
				root: "rows",
				total: function(obj) {
							var total = obj.total; //总记录数
							var rowNum = parseInt($("#conCountGrid-table").getGridParam("rowNum")); //每页显示记录数 
			              	return total % rowNum > 0 ? total / rowNum + 1 : total / rowNum;
			            	},
				page: "page",
				records: "total",
				repeatitems: false
			},
			postData : {
				id : id,
				conCountStartTime : $("#conCountStart").val(),
				conCountEndTime : $("#conCountEnd").val()
			}, 
			viewrecords : true,
			rowNum:10,
			rowList:[10,20,30],
			pager : conCountPager_selector,
			altRows: true,
	        multiboxonly: true,

			loadComplete : function() {
				var table = this;
				setTimeout(function(){
					updatePagerIcons(table);
				}, 0);
			},
            autowidth: false,  
            ondblClickRow: function(id){   
        		$("[name='startTimee']").val(id);
        		$("[name='endTimee']").val(id);
        		document.formx1.submit();
            }  
		});
		doResize();
		$('#conCountModal').modal();
	});
	
	//随浏览器大小变化改变gqGird列表宽度
	$(window).resize(doResize);
	
	function doResize() {
		var ss = getPageSize();
		$("#conCountGrid-table").jqGrid('setGridWidth', ss.WinW-350);
		    }

		function getPageSize() {
		var winW, winH;
		if(window.innerHeight) {// all except IE
		winW = window.innerWidth;
		winH = window.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) {// IE 6 Strict Mode
		winW = document.documentElement.clientWidth;
		winH = document.documentElement.clientHeight;
		} else if (document.body) { // other
		winW = document.body.clientWidth;
		winH = document.body.clientHeight;
		}  // for small pages with total size less then the viewport 
		return {WinW:winW, WinH:winH};
		} 
	
	
	$("#conCountSearchBtn").on("click", function(){
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		conCountQuery(id);
	});
	
	function conCountQuery(id){
		$("#conCountGrid-table").jqGrid('setGridParam',{page:1});
		$("#conCountGrid-table").jqGrid('setGridParam', {
			postData : {
				id : id,
				conCountStartTime : $("#conCountStart").val(),
				conCountEndTime : $("#conCountEnd").val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	
//	$("#detailBtn").on("click", function(){
//		var id = $("#conCountGrid-table").jqGrid('getGridParam',"selrow");
//		if(id == null) {
//			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
//			return;
//		}
//		var countTime = id;
//		$("[name='startTimee']").val(countTime);
//		$("[name='endTimee']").val(countTime);
//		document.formx1.submit();
//	});
	

});

