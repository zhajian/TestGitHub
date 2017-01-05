/**
 * 我的帐户js
 */
$(function(){

	// 用户名称格式自定验证方法
	$.validator.addMethod("verifyName", function(value, element){
		var reg = /^[a-zA-Z\u4e00-\u9fa5]{2,20}$/;
		return this.optional(element) || reg.test(value);
	},"输入2~20位英文或中文姓名！");	

	// 手机号格式自定验证方法
	$.validator.addMethod("isMobile", function(value, element){
		var reg = /^1\w{10}$/;
		return this.optional(element) || reg.test(value);
	},"手机号格式不正确！");
	
	// 密码格式自定验证方法
	$.validator.addMethod("isPassword", function(value, element){
		var reg = /[A-Za-z0-9]{6,10}/;
		return this.optional(element) || reg.test(value);
	},"请输入6-10位字母、数字组成的字符串！");
	
	//表单校验
	$('#linkInfoForm').validate({
		rules:{
			linkPerson: { required: true, verifyName: true},
			linkTelephone: { required: true, isMobile: true}
		}
	});
	
	Hg.refRepeatSubmit("linkInfoForm");
	$("#linkInfoForm [tag=save]").click(function(){
		if(!$('#linkInfoForm').validate().form()) 
			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#linkInfoForm').serializeArray();
		$.ajax({
		   type: "POST",
		   url: G_CTX_PATH + "/merchant/updateMerchantInfo",
		   data : params,
		   success: function(data, textStatus, xhr){
			   if (data.success) {
				   ui_alert("联系信息已更新",function(){});
				} else {
					ajaxExceptionHandler(xhr, function(){
						Hg.refreshSubmitToken("linkInfoForm");
						ui_error(data.data);
					});
				}
		   },
		   complete: function(xhr, textStatus) {
			   _this.addClass("btn-primary").removeClass("disabled");
		   }
		});
	});
	
	//表单校验
	$('#passwordForm').validate({
		rules:{
			plainPwd: { required: true,rangelength:[6,10], isPassword: true},
			newPwd: { required: true,rangelength:[6,10], isPassword: true},
			repeartNewPwd: { required: true,rangelength:[6,10], equalTo: "#newPwd"}
		},
        messages: {
        	repeartNewPwd: {
                equalTo: "两次输入密码不一致"
            }
        }
	});

	Hg.refRepeatSubmit("passwordForm");
	$("#passwordForm [tag=save]").click(function(){
		if(!$('#passwordForm').validate().form()) 
			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#passwordForm').serializeArray();
		$.ajax({
		   type: "POST",
		   url: G_CTX_PATH + "/merchant/updatePassword",
		   data : params,
		   success: function(data, textStatus, xhr){
			   if (data.success) {
				    ui_alert("密码已更新",function(){});
					$('#passwordForm :password').val("");
				} else {
					ajaxExceptionHandler(xhr, function(){
						Hg.refreshSubmitToken("passwordForm");
						ui_error(data.data);
					});
				}
		   },
		   complete: function(xhr, textStatus) {
			   _this.addClass("btn-primary").removeClass("disabled");
		   }
		});
	});
});
