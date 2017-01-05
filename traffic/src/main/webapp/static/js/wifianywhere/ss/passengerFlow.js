$(function(){
	var dateSelector = function(){
		var curDate = new Date();
		var curYear = curDate.getFullYear();
		var curMonth = curDate.getMonth() + 1;
		var $year = $("#year");
		var $month = $("#month");
		//填充月份
		function setMonth(maxVal){
			$month.find("option:gt(0)").remove();
			for(var i = maxVal; i>= 1; i--){
				var temp = i;
				if(i < 10)
					temp = "0" + i;
				var _option = "<option value='"+temp+"'>"+temp+"</option>";
				$month.append(_option);
			}
		}
		//填充年份
		for(var i = curYear; i >= 2013; i--){
			var _option = "<option value='"+i+"'>"+i+"</option>";
			$year.append(_option);
		}
		$year.on("change", function(){
			if($(this).val() == curYear){
				setMonth(curMonth);
			}else{
				setMonth(12);
			}
		});
	};
	dateSelector();

	
	var options = {
			shadowSize: 0,
			series: {
				lines: { show: true },
				points: { show: true }
			},
		 	xaxis: {
				/* tickLength: 0 */
				ticks: 27
			},
			yaxis: {
				//ticks: 10,
				min: 0,
//		 		max: 2,
				tickDecimals: 0
			},  
	/* 		legend: {
	            noColumns: 0,
	             labelBoxBorderColor: "#000000",
	            position: "ne"
	        }, */
			grid: {
				hoverable: true,
				backgroundColor: { colors: [ "#fff", "#fff" ] },
				borderWidth: 1,
				borderColor:'#555'
			}	
	};
	function plot(params){
		$(".my-flot").empty().html("<div class=\"loading\"><img src=\""+G_CTX_PATH+"/static/images/loading.gif\" /></div>");
		$.ajax({
			   type: "GET",
			   url: G_CTX_PATH + "/wifiUser/passengerFlow",
			   data: params,
			   success: function(msg){
				   $(".my-flot").empty().html("<div id=\"flot-placeholder\"></div>");
				   $('#flot-placeholder').css({'width':'100%' , 'height':'300px'});
				   if(msg.success){
					   $(".dd-item:eq(0) span").text(msg.wifiUserStatisticsModel.yesterdayOnlineNum);
					   $(".dd-item:eq(1) span").text(msg.wifiUserStatisticsModel.thisMonthOnlineNum);
					   $(".dd-item:eq(2) span").text(msg.wifiUserStatisticsModel.lastMonthOnlineNum);
					   $(".dd-item:eq(3) span").text(msg.wifiUserStatisticsModel.allOnlineNum);
					   var _data = msg.passengerFlowModel.data;
					   if(_data == null){
						   $(".my-flot").empty().html("<div class=\"noData\">没有查询到客流统计信息</div>");
						   return;
					   }
					   $(".noData").remove();
						var d = [];
					   $.each(_data, function(i){
						   d.push([parseInt(i, 10), _data[i]]);
					   });
					   var dataset = [{ data: d }];
					 $.plot("#flot-placeholder", dataset, options);
				   }else{
					   ajaxExceptionHandler(xhr);
				   }
			   }
			});
	}
	$("#searchBtn").on("click", function(){
		var year = $("#year option:selected").val();
		var month = $("#month option:selected").val();
		if(year == "" || month == "")
			return;
		var params = {};
		params.month = year + "-" +month;
		if($(".sub_left_menu").length > 0){
			params.merchantId = $(".sub_left_menu .tree_menu a.active").attr("node");
		}
		plot(params);
	});
	click_tree_menu(function(domObj){
		$("#searchBtn").click();
	});
	
//	$(".dd-item:eq(0)").on("click", function(){
//		location.href = G_CTX_PATH + "/wifiUser/visitors/show?queryTime=2";
//	});
//	$(".dd-item:eq(1)").on("click", function(){
//		location.href = G_CTX_PATH + "/wifiUser/visitors/show?queryTime=3";
//	});
//	$(".dd-item:eq(2)").on("click", function(){
//		location.href = G_CTX_PATH + "/wifiUser/visitors/show?queryTime=4";
//	});
//	$(".dd-item:eq(3)").on("click", function(){
//		location.href = G_CTX_PATH + "/wifiUser/visitors/show";
//	});
//	
	(function(){
		var curDate = new Date();
		var curYear = curDate.getFullYear();
		var curMonth = curDate.getMonth() + 1;
		if(curMonth < 10){
			curMonth = "0" + curMonth;
		}
		$("#year").find("option[value="+curYear+"]").attr("selected", "selected");
		$("#year").change();
		$("#month").find("option[value="+curMonth+"]").attr("selected", "selected");
		var params = {};
		params.month = curYear + "-" + curMonth;
		if($(".sub_left_menu").length > 0){
			params.merchantId = $(".sub_left_menu .tree_menu a.active").attr("node");
		}
		plot(params);
	})();
});