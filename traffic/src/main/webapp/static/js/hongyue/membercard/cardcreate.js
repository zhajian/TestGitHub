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
	// 密码格式自定验证方法
	$.validator.addMethod("zhengshu", function(value, element) {
		var reg = /^[1-9]{1}[0-9]{0,9}/;
		return this.optional(element) || reg.test(value);
	}, "请输入大于1的整数");
	$.validator.addMethod("notnull", function(value, element) {
		return ($('#merchantId').val()!='');
	}, "请选择商户");
	$.validator.addMethod("effectime", function(value, element) {
		return ($('#effecDate').val()!='');
	}, "请选择有效日期");
	
	// 表单校验
	$('#createCardForm').validate({
		rules : {
			nums : {
				required : true,
				zhengshu : true
			},
			merchantId:{
				required : true,
				notnull : true
			},
			effecDate:{
				required : true,
				effectime : true
			}
		}
	});
//	Hg.refreshSubmitToken("createCardForm");
	Hg.refRepeatSubmit("createCardForm");
	$("#createCardForm [tag=save]").click(function() {
		if (!$('#createCardForm').validate().form())
			return false;
//		if($('#merchantId').val()==''){
//			alert("请选择商户");
//			return false;
//		}
//		if($('#effecDate').val()==''){
//			alert("请选择有效日期");
//			return false;
//		}
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#createCardForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/mms/mcard/createCard",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("生成成功", function() {
					});
					
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("createCardForm");
						ui_error(data.data);
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
	
	
});