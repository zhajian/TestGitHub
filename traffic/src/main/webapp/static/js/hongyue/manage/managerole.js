jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : G_CTX_PATH + "/manage/role/sysroletables",
						datatype : "json",
						mtype : "GET",
						width : "300",
						height : "320",
						// width:'auto',
						// height: 'auto',
						// autowidth:true,
						colNames : [ '角色id','角色名称',  '不可修改', '角色状态'],
						colModel : [ {
							name : 'roleId',
							index : 'roleId',
							width : 8,
							sortable : false,
							hidden : true
						}, {
							name : 'roleName',
							index : 'roleName',
							width : 8,
							sortable : false
						}, {
							name : 'isFinalStr',
							index : 'isFinalStr',
							width : 25,
							sortable : false
						}, {
							name : 'isDelete',
							index : 'isDelete',
							width : 8,
							sortable : false,
							formatter:zhuangtai
						}],
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

	function zhuangtai(cellvalue, options, rowObject){
		var s= "正常";
	  	if(cellvalue==1){//删除
	  		s= "删除";
	  	}
		return s;
	}
	function query() {
		$("#grid-table").jqGrid('setGridParam', {
			page : 1
		});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				roleName : $('#roleName').val(),
//				roleCode : $('#roleCode').val(),
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	$("#manageroleSearchBtn").on("click", function() {
		query();
	});
	var roleAuth=[];
	var manager = null;
	$("#addSysRoleBtn").on("click", function() {
		Hg.getJson("/sys/role/show/0/add",{},function(data) {
			if (data.success) {
				Hg.getJson("/sys/role/authList",{roleId:0},function(data){//清除权限树
					roleAuth=data.list;
					getAuthList("tree1");//权限树
				}); 
				$('#addRoleForm')[0].reset();
				$('#addRoleModal').modal();
				Hg.refRepeatSubmit("addRoleForm");
			} else {
				Hg.refreshSubmitToken("addRoleForm");
				ui_error(data.data.substring(32,39));
			}
		});
	});
	function checkAuth(authId){//检查角色
		for(var i=0;i<roleAuth.length;i++){
			if(roleAuth[i].authId==authId){//角色有这个权限
				return true;
			}else{//角色没有这个权限
				continue;
			}
		}
		return false;
	}
	function getAuthList(treeId){
		var datavalue=[];
		Hg.getJson("/sys/auth/list",{merchantApp:9},function(data){
			 datas = data.rows;
			 for (var i=0;i<datas.length;i++){
				 if(checkAuth(datas[i].authId)){
					 if (datas[i].fid==0) {
				 		datavalue.push({authId:datas[i].authId,authName:datas[i].authName,fid:datas[i].fid,isExpand:true,ischecked: true });
					 }else{
						datavalue.push({authId:datas[i].authId,authName:datas[i].authName,fid:datas[i].fid,isExpand:false,ischecked: true });
					 }
				 }else{
					 if (datas[i].fid==0) {
					 	datavalue.push({authId:datas[i].authId,authName:datas[i].authName,fid:datas[i].fid,isExpand:true});
					 }else{
						datavalue.push({authId:datas[i].authId,authName:datas[i].authName,fid:datas[i].fid,isExpand:false});
					 }
				 }
			 }
			$("#"+treeId).ligerTree({
				 data:datavalue,
		         idFieldName :'authId',
		         textFieldName : 'authName',
		         parentIDFieldName :'fid'
			});
			manager = $("#"+treeId).ligerGetTreeManager();
//			$("#tree1").ligerTree({
//				data:datavalue,
//				idFieldName :'authId',
//				textFieldName : 'authName',
//				parentIDFieldName :'fid'
//			});
//			manager = $("#tree1").ligerGetTreeManager();
//			$("#tree2").ligerTree({
//				data:datavalue,
//				idFieldName :'authId',
//				textFieldName : 'authName',
//				parentIDFieldName :'fid'
//			});
//			manager = $("#tree2").ligerGetTreeManager();
		});
	}
	function getChecked()
    {//获取选中的权限
        var notes = manager.getChecked();
        var text = "";
        for (var i = 0; i < notes.length; i++)
        {
             
            text += notes[i].data.authId + ",";
        }
        return text;
    }
	// 用户名称格式自定验证方法
	$.validator.addMethod("rolename", function(value, element) {
		var reg = /^[a-zA-Z\u4e00-\u9fa5]{2,20}$/;
		return this.optional(element) || reg.test(value);
	}, "输入2~20位英文或中文姓名！");
	// 格式自定验证方法
	$.validator.addMethod("rolecode", function(value, element) {
		var reg = /[A-Za-z0-9_]{4,10}/;
		return this.optional(element) || reg.test(value);
	}, "请输入4-10位字母、数字 _ 组成的字符串！");
	
	// 表单校验
	$('#addRoleForm').validate({
		rules : {
			roleName : {
				required : true,
				rolename : true
			}
//	,
//			roleCode : {
//				required : true,
//				rolecode : true
//			}
		}
	});
	$("#addRoleForm [tag=save]").click(function() {
		if (!$('#addRoleForm').validate().form())
			return false;
		var text=getChecked();
		$("#checkedAuthIds").val(text);
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#addRoleForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/role/add",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("保存成功", function() {
						$('#addRoleModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("addRoleForm");
						ui_error(data.data);
					});
				}
			},
			complete : function(xhr, textStatus) {
				_this.addClass("btn-primary").removeClass("disabled");
			}
		});
	});
	//删除
	$("#deleteSysRoleBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
			$('#deleteRoleName').html("确认删除角色【"+ret.roleName+"】吗？"); 
			$('#deleteRoleId').val(ret.roleId); 
			$('#deleteRoleModal').modal();
			Hg.refRepeatSubmit("deleteRoleForm");
		} else {
			alert("请选择要删除的行");
		}
	});
	$("#deleteRoleForm [tag=delete]").click(function() {
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#deleteRoleForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/role/delete",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("删除成功", function() {
						$('#deleteRoleModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("deleteRoleForm");
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
	
	
//	function sysRoleEdit(id) {
//		Hg.getJson("/sys/role/show/"+id+"/edit",{},function(data) {
//			if (data.success) {
//				fillValue(data);
//				var roleId=data.sysRole.roleId;
//				Hg.getJson("/sys/role/authList",{roleId:roleId},function(data){
//					roleAuth=data.list;
//					getAuthList();//权限树
//				}); 
//				$("#div_btn1").hide();//确认按钮隐藏 
//				$("#div_btn2").show();//修改按钮显示 
//				
//				$('#create').modal('show');
//				
//			} else {
//				Hg.refreshSubmitToken("sysRole_form");
//				ui_error(data.data.substring(32,39));
//			}
//		});
//	};
//	
	
	//更新
	$("#updateSysRoleBtn").on("click", function() {
		var id = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
		if (id) {
			var ret = jQuery("#grid-table").jqGrid('getRowData', id);
			if(ret.roleId){
				var params = {roleId : ret.roleId};
				$.ajax({
					type : "POST",
					url : G_CTX_PATH + "/sys/role/show/"+ret.roleId+"/edit",
					data : params,
					success : function(data, textStatus, xhr) {
						if (data.success) {
							Hg.getJson("/sys/role/authList",{roleId:data.sysRole.roleId},function(data2){
							roleAuth=data2.list;
							getAuthList("tree2");//权限树
						}); 
//							alert("sysRole="+data.sysRole.roleName+"==="+data.sysRole.roleCode+"=="+data.sysRole.authIds);
							$('#updateRoleModal').modal();
							Hg.refRepeatSubmit("updateRoleForm");
							$('#newroleId').val(data.sysRole.roleId); 
							$('#newroleName').val(data.sysRole.roleName); 
//							$('#newroleCode').val(data.sysRole.roleCode); 
							$('#newdescr').val(data.sysRole.descr); 
						} else {
							ajaxExceptionHandler(xhr, function() {
								Hg.refreshSubmitToken("updateRoleForm");
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
	$('#updateRoleForm').validate({
		rules : {
			roleName : {
				required : true,
				rolename : true
			}
//	,
//			roleCode : {
//				required : true,
//				rolecode : true
//			}
		}
	});
	//修改
	$("#updateRoleForm [tag=update]").click(function() {
		if (!$('#updateRoleForm').validate().form())
			return false;
		var text=getChecked();
		$("#newcheckedAuthIds").val(text);
		var _this = $(this);
		_this.addClass("disabled").removeClass("btn-primary");
		var params = $('#updateRoleForm').serializeArray();
		$.ajax({
			type : "POST",
			url : G_CTX_PATH + "/sys/role/edit",
			data : params,
			success : function(data, textStatus, xhr) {
				if (data.success) {
					ui_alert("修改成功", function() {
						$('#updateRoleModal').modal("hide");
						query();
					});
				} else {
					ajaxExceptionHandler(xhr, function() {
						Hg.refreshSubmitToken("updateRoleForm");
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