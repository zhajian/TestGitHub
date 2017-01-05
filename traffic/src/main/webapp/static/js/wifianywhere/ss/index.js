$(function(){
	
	click_tree_menu(function(domObj){
		$.ajax({
			   type: "GET",
			   url: G_CTX_PATH + "/merchant/"+domObj.attr("node")+"/storeStats",
			   success: function(data, textStatus, xhr){
				   if(data.success){
					  var wifiUserStatisticsModel = data.wifiUserStatisticsModel;
					  $("#todayCount").text(wifiUserStatisticsModel.todayOnlineNum);
					  $("#yesterdayCount").text(wifiUserStatisticsModel.yesterdayOnlineNum);
					  $("#historyCount").text(wifiUserStatisticsModel.allOnlineNum);
					  if(data.merchantSmsAccount != null){
						  $("#smsTotal").text(data.merchantSmsAccount.total);
						  $("#smsUsedNum").text(data.merchantSmsAccount.usedNum);
					  }else{
						  $("#smsTotal").text(0);
						  $("#smsUsedNum").text(0);
					  }
				   } else {
					   ajaxExceptionHandler(xhr);
				   }
			   }
		});
	});
	
	$("#todayCount").parents(".infobox").on("click", function(){
		location.href = G_CTX_PATH + "/wifiUser/visitors/show?queryTime=1";
	});
	$("#yesterdayCount").parents(".infobox").on("click", function(){
		location.href = G_CTX_PATH + "/wifiUser/visitors/show?queryTime=2";
	});
	$("#historyCount").parents(".infobox").on("click", function(){
		location.href = G_CTX_PATH + "/wifiUser/visitors/show";
	});
	
//	alert("-------------------");
	
	var merId = $("#merchantId").val();	
	var satistTime = $("#satistTime").val();
	
//	init(merId,satistTime);
	
	function init(merId,satistTime) {
		$.post(G_CTX_PATH + "/equipment/getOperationData", {merchantId:merId,satistTime:satistTime}, function(
				data) {
			if (data.success) {
				obj = data.basic;
				obj_list = data.list;
				
				$("#countUsers").text(obj.countUsers);
				$("#onAp").text(obj.onAps);
				$("#offAp").text(obj.offAps);
				$("#onLines").text(obj.onLines);

				$('#statistReport').highcharts({
			        chart: {
			            type: 'area'
			        },
			        title: {
			            text: '24小时上网人数分布'
			        },
			        xAxis: {
			            categories: ['0', '1', '2', '3', '4', '5','6', '7', '8', '9', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23'],
			            tickmarkPlacement: 'on',
			            title: {
			                text: '小时数'
			            }
			        },
			        yAxis: {
			        	allowDecimals: false,
			            title: {
			                text: '在线用户数'
			            },
			            labels: {
			                formatter: function() {
			                    return this.value;
			                }
			            }
			        },

			        plotOptions: {
			            area: {
			                stacking: 'normal',
			                lineColor: '#90EE90',
			                lineWidth: 1,
			                marker: {
			                    lineWidth: 1,
			                    lineColor: '#90EE90'
			                }
			            }
			        },
			        series: [ {
			            name: '上网人数',
			            
			            events: {  
			                click: function(e) {  
//			                    alert(e.point.x); // X轴值
//			                    alert(this.data[e.point.x].y); // Y轴值
			            		$("#formx2 input[name=startTimee]").val(satistTime);
			            		$("#formx2 input[name=endTimee]").val(satistTime);
			            		document.formx2.submit();
			                }  
			            },
			            
			            data:obj_list
//			            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 30, 30,12,6,10,3,19,22,15,27,30,30,17,0]
			        }]
			    });
			}
		});
		
	}
	
	$("#staistSearchBtn").on("click", function(){
		
		var merId = $("#merchantId").val();	
		var satistTime = $("#satistTime").val();
		
		init(merId,satistTime);
		
	});
	
});