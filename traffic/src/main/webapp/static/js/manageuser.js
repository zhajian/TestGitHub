jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : G_CTX_PATH + "/manage/role/dataTables",
						// url: G_CTX_PATH + "/merchant/list",
						datatype : "json",
						mtype : "GET",
						width : "300",
						height : "320",
						// width:'auto',
						// height: 'auto',
						// autowidth:true,
						colNames : [ '用户id','姓名', '英文名', '登录账号', '性别', '手机号码', '联系电话',
								'email' ],
						colModel : [ {
							name : 'userId',
							index : 'userId',
							width : 8,
							sortable : false,
							hidden : true
						}, {
							name : 'userName',
							index : 'userName',
							width : 8,
							sortable : false
						}, {
							name : 'engName',
							index : 'engName',
							width : 18,
							sortable : false
						}, {
							name : 'loginName',
							index : 'loginName',
							width : 25,
							sortable : false
						}, {
							name : 'sexStr',
							index : 'sexStr',
							width : 8,
							sortable : false
						}, {
							name : 'mobile',
							index : 'mobile',
							width : 12,
							sortable : false
						}, {
							name : 'telephone',
							index : 'telephone',
							width : 8,
							sortable : false
						}, {
							name : 'email',
							index : 'email',
							width : 8,
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
				userName : $('#username').val(),
				loginName : $('#loginname').val(),
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}

	// click_tree_menu(function(domObj){
	// $("#merchantId").val(domObj.attr("node"));
	// query();
	// });

	$("#manageuserSearchBtn").on("click", function() {
		query();
	});

	// ****************************监控详情******************************

	$.post(G_CTX_PATH + "/manage/role/ajaxList", function(data) {
		$("#checkedRoleIds").append("<option value=''>----请选择角色----</option>");
		// 遍历data集合，
		$(data).each(
				function() {
					var option = $("<option value='" + this.roleId + "'>"
							+ this.roleName + "</option>");
					$("#checkedRoleIds").append(option);
				});
//		$("#newcheckedRoleIds").append("<option value=''>----请选择角色----</option>");
		// 遍历data集合，
		$(data).each(
				function() {
					var option = $("<option value='" + this.roleId + "'>"
							+ this.roleName + "</option>");
					$("#newcheckedRoleIds").append(option);
				});
		
	});

	$("#addSysUserBtn").on("click", function() {
		$('#addUserForm')[0].reset();
		$('#addUserModal').modal();
		Hg.refRepeatSubmit("addUserForm");
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
	// 表单校验
	$('#addUserForm').validate({
		rules : {
			loginName : {
				required : true,
				verifyName : true
			},
			userName : {
				required : true,
				verifyName : true
			},
			plainPassword : {
				required : true,
				isPassword : true
			},
			mobile : {
				required : true,
				isMobile : true
			}
		}
	});

	$("#addUserForm [tag=save]").click(function() {
		if (!$('#addUserForm').validate().form())
			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#addUserForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/manage/role/addUser",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("保存成功", function() {
						$('#addUserModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("addUserForm");
						ui_error(data.data);
//						$('#addUserModal').modal("hide");
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
//	$("#deleteSysUserBtn").on("click", function() {
//	jQuery("#deleteSysUserBtn").click(function() {
	$("#deleteSysUserBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
//			alert("loginName=" + ret.loginName+"  userId="+ret.userId );
			$('#deleteUserLoginName').html("确认删除用户【"+ret.userName+"】吗？"); 
			$('#deleteUserId').val(ret.userId); 
			$('#deleteUserModal').modal();
			Hg.refRepeatSubmit("deleteUserForm");
		} else {
			alert("请选择要删除的行");
		}
	});
	$("#deleteUserForm [tag=delete]").click(function() {
//		if (!$('#deleteUserForm').validate().form())
//			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#deleteUserForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/manage/role/deleteUser",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("删除成功", function() {
						$('#deleteUserModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("deleteUserForm");
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
	
	$("#updateSysUserBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
			if(ret.userId){
				var params = {userId : ret.userId};
				$.ajax({
					type : "POST",
					url : G_CTX_PATH + "/manage/role/getUserById",
					data : params,
					success : function(data, textStatus, xhr) {
						if (data.success) {
							$('#updateUserModal').modal();
							Hg.refRepeatSubmit("updateUserForm");
//							$('#deleteUserLoginName').html(ret.userId+"==="+ret.userName); 
							$('#newuserId').val(data.sysuser.userId); 
							$('#newloginName').val(data.sysuser.loginName); 
							$('#newuserName').val(data.sysuser.userName); 
							$('#newengName').val(data.sysuser.engName); 
							$('#newsex').val(data.sysuser.sex); 
							$('#newbirthday').val(data.sysuser.birthday); 
							$('#newmobile').val(data.sysuser.mobile); 
							$('#newtelephone').val(data.sysuser.telephone); 
							$('#newemail').val(data.sysuser.email); 
							$('#newaddress').val(data.sysuser.address); 
//							$('#checkedRoleIds').val(data.sysuser.checkedRoleIds); 
							$('#newcheckedRoleIds').val(data.sysuser.authIds); 
						} else {
							ajaxExceptionHandler(xhr, function() {
								Hg.refreshSubmitToken("updateUserForm");
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
	$('#updateUserForm').validate({
		rules : {
			userName : {
				required : true,
				verifyName : true
			},
			mobile : {
				required : true,
				isMobile : true
			}
		}
	});
	//修改
	$("#updateUserForm [tag=update]").click(function() {
		if (!$('#updateUserForm').validate().form())
			return false;
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#updateUserForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/manage/role/updateUser",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("修改成功", function() {
						$('#updateUserModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("updateUserForm");
						ui_error(data.data);
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
	//修改密码
	$("#updateSysUserPwdBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
//			alert("loginName=" + ret.loginName+"  userId="+ret.userId );
			$('#newpwduserId').val(ret.userId); 
			$('#updateUserPwdModal').modal();
			Hg.refRepeatSubmit("updateUserPwdForm");
		} else {
			alert("请选择要修改的行");
		}
	});
	
//	// 密码格式自定验证方法
//	$.validator.addMethod("isPasswordsame", function(value, element) {
//		var reg = /[A-Za-z0-9]{6,10}/;
//		return this.optional(element) || reg.test(value);
//	}, "请输入6-10位字母、数字组成的字符串！");
	// 表单校验
	// 表单校验
	$('#updateUserPwdForm').validate({
		rules : {
			plainPassword : {
				required : true,
				isPassword : true
			}
		}
	});
	//修改
	$("#updateUserPwdForm [tag=updatepwd]").click(function() {
		if (!$('#updateUserPwdForm').validate().form())
			return false;
		var pwd1=$('#newplainPassword').val();
		var pwd2=$('#new2plainPassword').val();
		if(pwd1!=pwd2){
			alert("密码不一致!");
			return;
		}
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#updateUserPwdForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/manage/role/updatePwdUser",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("修改密码成功", function() {
						$('#updateUserPwdModal').modal("hide");
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("updateUserPwdForm");
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