$(function(){
	$( "#slider" ).css('width', '630px').slider({
		value:0,
		range: "min",
		min: 0,
		max: 0,
		step: 1,
		slide: function( event, ui ) {
			var val = parseInt(ui.value);
			$("#sliderVal").text(val);
			$("#sendSmsForm #customerNum").val(val);
			setSmsNum();
			
		}
	});
	
	// 购买短信提示
	$("#buySms").click(function(){
		ui_alert("购买短信数量，请在工作时间内拨打客服热线：" + _service_tel + "，将有专人为您服务。", function(){});
	});
	
	$("#sendSmsForm :radio").click(function(){
	   $("#sliderVal").text(0);
	   $("#sendSmsForm #customerNum").val(0);
	   $( "#slider" ).slider( "option", "value", 0 );
		$.ajax({
		   type: "GET",
		   url: G_CTX_PATH + "/wifiUser/visitorCount",
		   data: {
			   customerType : $(this).val(),
			   merchantId : $("#merchantId").val()
		   },
		   success: function(data, textStatus, xhr){
			   if (data.success) {
				   $("#slider").slider( "option", "max", data.total );
				   $("#sliderMax").text(data.total);
				}else{
					ajaxExceptionHandler(xhr);
				}
		   }
		});
	});
	
	$("#sendSmsForm :radio:first").click();
	
	Hg.refRepeatSubmit("sendSmsForm");//防止表单重复提交
	
	// 表单校验
	$('#sendSmsForm').validate({
		rules:{
			title: { required: true ,rangelength:[1,15]},
			content: { required: true ,rangelength:[1,122]},
			sign: { required: true ,rangelength:[1,10]}
		}
	});
	
	// 表单提交
	$("#sendSmsForm [tag=save]").click(function(){
		if(!$('#sendSmsForm').validate().form()) return false;
		var cutomerNum = parseInt($("#sendSmsForm #customerNum").val());
		if(cutomerNum == 0){
			ui_error("请设置目标客户数量");
			return false;
		}
/*		if(customerNum > 5000){
			ui_error("一次最多只能发送5000条");
			return false;
		}
		if(customerNum > parseInt($("#smsTotal").text())){
			ui_error("目标客户数量超出帐户剩余短信数量");
			return false;
		}*/
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		$.ajax({
		   type: "POST",
		   url: G_CTX_PATH + "/merchantSms/doSend",
		   data : $("#sendSmsForm").serialize(),
		   success: function(data, textStatus, xhr){
			   if (data.success) {
				   ui_alert("短信已提交至短信通道进行发送，您可通过经营分析-短信记录模块查看短信发送情况",function(){
						//window.location.reload();
					   location.href = G_CTX_PATH + "/merchantSms/toSend";
					});
				} else {
					ajaxExceptionHandler(xhr, function(){
						Hg.refreshSubmitToken("sendSmsForm");
						ui_error(data.data);
					});
				}
		   },
		   complete: function(xhr, textStatus) {
			   _this.addClass("btn-primary").removeClass("disabled");
		   }
		});
	});
	
	// 试发短信
	$("#sendSmsForm [tag=trySend]").click(function(){
		if(!$('#sendSmsForm').validate().form()) return false;
		var reg = /^(1\d{10})$/;
		var mobile = $("#trySendMobile").val();
		if($.trim(mobile).length == 0){
			$("#trySendMobile").after("<label for=\"trySendMobile\" generated=\"true\" class=\"error\">请输入手机号</label>");
			return false;
		}
		if(!reg.test(mobile)){
			$("#trySendMobile").after("<label for=\"trySendMobile\" generated=\"true\" class=\"error\">手机号格式错误</label>");
			return false;
		}
		$("#trySendMobile").siblings("label").remove();
		
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = {
				"title" : $("#title").val(),
				"sign" : $("#sign").val(),
				"content" : $("#content").val(),
				"mobiles" : $("#trySendMobile").val()
		};
		$.ajax({
		   type: "POST",
		   url: G_CTX_PATH + "/merchantSms/tryToSend",
		   data : params,
		   success: function(data, textStatus, xhr){
			   if (data.success) {
				   $("#trySendMobile").val("");
					ui_alert("短信已发送，请查收",function(){});
				} else {
					ajaxExceptionHandler(xhr, function(){
						Hg.refreshSubmitToken("sendSmsForm");
						ui_error(data.data);
					});
				}
		   },
		   complete: function(xhr, textStatus) {
			   _this.addClass("btn-primary").removeClass("disabled");
		   }
		});
	});
	
	// 计算短信内容长度
	function calSmsContentlen(){
		var contentLen = $("#content").val().length;
		var signLen = $("#sign").val().length;
		if(signLen > 0){
			signLen += 2;
		}
		return contentLen + signLen;
	}
	
	// 计算短信发送数量
	function setSmsNum(){
		var customerNum = $("#sendSmsForm #customerNum").val();
		var contentLen = calSmsContentlen();
		//console.log(contentLen);
		var expend = 0;
		if(contentLen > 0 && contentLen <= 70){
			expend = customerNum;
		}else if(contentLen > 70){
			expend = customerNum * 2;
		}
		$("#expend").text(expend);
	}
	
	// 计算剩余可输入字数
	function setRemainderWordCount(){
		var len = $("#content").val().length;
		//var len = calSmsContentlen();
		var num = 122 - len;
		if(num < 0){
			num = 0;
		}
		$("#prompt").html(num);
	}
	
	$("#sign, #content").on("keyup", function(){
		setRemainderWordCount();
		setSmsNum();
	});
	
	// 左侧树型菜单点击事件
	click_tree_menu(function($obj){
		$("#merchantId").val($obj.attr("node"));
		$("#sendSmsForm :radio:checked").click();
	});
	
	setRemainderWordCount();
	
	 $("input[name=customerType]").click(function(){
		  $("#expend").text($("#sendSmsForm #customerNum").val());
		 });
	
});