function initSysOperShow() {
	//-------------------------------------------新增---------------------------------------------------
	
	$("#sysOper_toolbar [tag='add']").click(function(){
		var iconCls = $(this).attr("iconCls");
		var sysOperDetailWin = new HgWin({id:"sysOperDetailWin",title:"添加操作类型",width:500,height:290,iconCls:iconCls,url:"/sys/authoper/sysAuthOperDetail/0"});
	});
	
	
	
	
	
	//-------------------------------------------修改---------------------------------------------------
	$("#sysOper_toolbar [tag='edit']").click(function(){
		var row = $("#sysOper_grid").datagrid("getSelected");
		if (!row) {
			$.messager.alert("提示","请选择一条数据","warning");
			return;
		}
		if (row.isFinal == 1) {
			$.messager.alert("提示","此条数据不可被修改","warning");
			return;
		}
		var id = row.operId;
		var editUrl = "/sys/authoper/sysAuthOperDetail/"+id;	
		var iconCls = $(this).attr("iconCls");
		var sysOperDetailWin = new HgWin({id:"sysOperDetailWin",title:"修改操作类型",width:500,height:290,iconCls:iconCls,url:editUrl});
	});
	
	
	
	
	
	
	
	//-------------------------------------------删除---------------------------------------------------
	$("#sysOper_toolbar [tag='del']").click(function(){
		var row = $("#sysOper_grid").datagrid("getSelected");
		if (!row) {
			$.messager.alert("提示","请选择一条数据","warning");
			return;
		}
		if (row.isFinal == 1) {
			$.messager.alert("提示","此条数据不可被删除","warning");
			return;
		}
		$.messager.confirm("删除确认", "确认删除此条数据?", function(r){
			if (r){
				var id = row.operId;
				Hg.getJson("/sys/authoper/delete",{id:id},function(data){
					if (data.success) {
						$.messager.ok("删除成功!",function(){
							$('#sysOper_grid').datagrid("reload");
						});							
					} else {
						$.messager.alert("删除失败!",data.data);
					}
				});
			}
		});
		
		
	});
	
	
}

initSysOperShow();