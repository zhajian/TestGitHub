jQuery(function($) {
	
	var merId = $("#merchantId").val();	
	var satistTime = $("#satistTime").val();
	
	init(merId,satistTime);
	
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
			            text: '整体运营情况'
			        },
			        xAxis: {
			            categories: ['0', '1', '2', '3', '4', '5','6', '7', '8', '9', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23'],
			            tickmarkPlacement: 'on',
			            title: {
			                text: '小时数'
			            }
			        },
			        yAxis: {
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

