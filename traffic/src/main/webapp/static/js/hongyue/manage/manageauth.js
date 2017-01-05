jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : G_CTX_PATH + "/sys/auth/list",
						datatype : "json",
						mtype : "GET",
						width : "300",
						height : "320",
						// width:'auto',
						// height: 'auto',
						// autowidth:true,
						colNames : [ '权限编号','权限名称', '权限类型', 'url', '图标','层级', '排序ID','不可修改', '父模块','描述'],
						colModel : [ {
							name : 'authId',
							index : 'authId',
							width : 8,
							sortable : false,
							hidden : true
						}, {
							name : 'authName',
							index : 'authName',
							width : 6,
							sortable : false
						}, {
							name : 'authTypeStr',
							index : 'authTypeStr',
							width : 6,
							sortable : false,
							hidden : true
						}, {
							name : 'authUri',
							index : 'authUri',
							width : 20,
							sortable : false
						}, {
							name : 'authIcon',
							index : 'authIcon',
							width : 5,
							sortable : false,
							hidden : true
						}, {
							name : 'levelId',
							index : 'levelId',
							width : 8,
							sortable : false,
							hidden : true
						}, {
							name : 'orderId',
							index : 'orderId',
							width : 12,
							sortable : false,
							hidden : true
						}, {
							name : 'isFinalStr',
							index : 'isFinalStr',
							width : 5,
							sortable : false
						}, {
							name : 'fName',
							index : 'fName',
							width : 6,
							sortable : false
						}, {
							name : 'descr',
							index : 'descr',
							width : 20,
							sortable : false
						} ],
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
		$("#grid-table").jqGrid('setGridParam', {
			page : 1
		});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				authName : $('#authName').val(),
//				authCode : $('#authCode').val(),
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}

	// click_tree_menu(function(domObj){
	// $("#merchantId").val(domObj.attr("node"));
	// query();
	// });

	$("#manageauthSearchBtn").on("click", function() {
		query();
	});

	// ****************************监控详情******************************

	$.post(G_CTX_PATH + "/manage/role/authList", function(data) {
		$("#checkedAuthIds").append("<option value=''>----请选择父节点----</option>");
		// 遍历data集合，
		$(data).each(
				function() {
//					alert("2222   "+this.authId);
					var option = $("<option value='" + this.authId + "'>"
							+ this.authName + "</option>");
					$("#checkedAuthIds").append(option);
				});
//		$("#newcheckedRoleIds").append("<option value=''>----请选择角色----</option>");
		// 遍历data集合，
//		$(data).each(
//				function() {
//					var option = $("<option value='" + this.roleId + "'>"
//							+ this.roleName + "</option>");
//					$("#newcheckedRoleIds").append(option);
//				});
		
	});

	$("#addSysAuthBtn").on("click", function() {
		$('#addAuthForm')[0].reset();
		$('#addAuthModal').modal();
		Hg.refRepeatSubmit("addAuthForm");
	});

	// 用户名称格式自定验证方法
	$.validator.addMethod("verifyName", function(value, element) {
		var reg = /^[a-zA-Z\u4e00-\u9fa5]{2,20}$/;
		return this.optional(element) || reg.test(value);
	}, "输入2~20位英文或中文姓名！");

	// 手机号格式自定验证方法
	$.validator.addMethod("isMobile", function(value, element) {
		var reg = /^1\w{10}$/;
		return this.optional(element) || reg.test(value);
	}, "手机号格式不正确！");

	// 密码格式自定验证方法
	$.validator.addMethod("isPassword", function(value, element) {
		var reg = /[A-Za-z0-9]{6,10}/;
		return this.optional(element) || reg.test(value);
	}, "请输入6-10位字母、数字组成的字符串！");
	// 密码格式自定验证方法
	$.validator.addMethod("zhengshu", function(value, element) {
		var reg = /^[1-9]{1}[0-9]{0,9}/;
		return this.optional(element) || reg.test(value);
	}, "请输入大于1的整数");
	// 表单校验
	$('#addAuthForm').validate({
		rules : {
			authName : {
				required : true,
				verifyName : true
			},
			orderId : {
				required : true,
				zhengshu : true
			}
		}
	});

	$("#addAuthForm [tag=save]").click(function() {
		if (!$('#addAuthForm').validate().form())
			return false;
		if($('#checkedAuthIds').val()==''){
			alert("请选择父节点");
			return false;
		}
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#addAuthForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/auth/add",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("保存成功", function() {
						$('#addAuthModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("addAuthForm");
						ui_error(data.data);
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
	$("#deleteSysAuthBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
			$('#deleteAuthName').html("确认删除权限【"+ret.authName+"】吗？"); 
			$('#deleteAuthId').val(ret.authId); 
			$('#deleteAuthModal').modal();
			Hg.refRepeatSubmit("deleteAuthForm");
		} else {
			alert("请选择要删除的行");
		}
	});
	$("#deleteAuthForm [tag=delete]").click(function() {
//		if (!$('#deleteUserForm').validate().form())
//			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#deleteAuthForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/auth/delete",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("删除成功", function() {
						$('#deleteAuthModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("deleteAuthForm");
						ui_error(data.data);
						query();
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
	
	$("#updateSysAuthBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
			if(ret.authId){
				var params = {authId : ret.authId};
				$.ajax({
					type : "POST",
					url : G_CTX_PATH + "/sys/auth/list",
					data : params,
					success : function(data, textStatus, xhr) {
						if (data.success) {
							$('#updateAuthModal').modal();
							Hg.refRepeatSubmit("updateAuthForm");
							$('#newauthId').val(data.rows[0].authId); 
							$('#newfid').val(data.rows[0].fid); 
							$('#fatherName').val(data.rows[0].fName); 
							$('#newauthName').val(data.rows[0].authName); 
							$('#neworderId').val(data.rows[0].orderId); 
							$('#newauthIcon').val(data.rows[0].authIcon); 
							$('#newauthUri').val(data.rows[0].authUri); 
							$('#newdescr').val(data.rows[0].descr); 
						} else {
							ajaxExceptionHandler(xhr, function() {
								Hg.refreshSubmitToken("updateAuthForm");
								ui_error(data.data);
								query();
							});
						}
					},
					complete : function(xhr, textStatus) {
						//_this.addClass("btn-primary").removeClass("disabled");
					}
				});
			}
		} else {
			alert("请选择要修改的行");
		}
	});
	
	// 表单校验
	$('#updateAuthForm').validate({
		rules : {
			authName : {
				required : true,
				verifyName : true
			},
			orderId : {
				required : true,
				zhengshu : true
			}
		}
	});
	//修改
	$("#updateAuthForm [tag=update]").click(function() {
		if (!$('#updateAuthForm').validate().form())
			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#updateAuthForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/auth/edit",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("修改成功", function() {
						$('#updateAuthModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("updateAuthForm");
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