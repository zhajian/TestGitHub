<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
	<script type="text/javascript" src="${ctx }/static/js/hongyue/manage/managerole.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/exporting.js"></script>
	<link href="${ctx}/static/ligerui/lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css">
				<script src="${ctx}/static/ligerui/lib/ligerUI/js/core/base.js" type="text/javascript"></script>
				<script src="${ctx}/static/ligerui/lib/ligerUI/js/plugins/ligerTree.js" type="text/javascript"></script>
<div class="row">
	<div class="col-xs-12">
		<div class="page-header clearfix">
			<label class="col-sm-1 control-label">角色名称</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="roleName" >
			</div>
			<!-- <label class="col-sm-1 control-label">角色编码</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="roleCode" >
			</div> -->
			<div class="col-sm-4">
				<a class="btn btn-sm btn-info" href="javascript:;" id="manageroleSearchBtn"><i class="icon-search"></i>点击搜索</a>
			</div>
		</div>
		<div class="btn-group">
  			<a class="btn btn-sm btn-info" href="javascript:;" id="addSysRoleBtn" ><i class="icon-plus"></i>新增角色</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="updateSysRoleBtn" ><i class="icon-edit"></i>编辑角色</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="deleteSysRoleBtn" ><i class="icon-trash"></i>删除角色</a>
		</div>
		<table id="grid-table"></table>
		<div id="grid-pager"></div>
	</div>
</div>

<!-- 模态框（Modal）新增角色 -->
<div class="modal fade" id="addRoleModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="addRoleForm">
   <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增角色</h4>
      </div>
      <!-------------Modal-header End-------------->
      
     <!-------------Modal-body Begin-------------->
      <div class="modal-body"> 
   <input type="hidden" id="checkedAuthIds" name="checkedAuthIds" value="" />
	<div class="form-group">
		<label class="col-sm-2 control-label" for="roleName"><font color="red">*</font>角色名称：</label>
		<div class="col-sm-4">
			<input type="text" id="roleName" name="roleName" class="form-control" value="">
		</div>
	</div>
	<!-- <div class="form-group">
		<label class="col-sm-2 control-label" for="roleCode">*角色编码：</label>
		<div class="col-sm-4">
			<input type="text" id="roleCode" name="roleCode" class="form-control" value="">
		</div>
	</div> -->
	<div class="form-group">
		<label class="col-sm-2 control-label" for="descr">描　　述：</label>
		<div class="col-sm-4">
			<textarea class="form-control" rows="3" id="descr" name="descr"></textarea>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label" for="tree1">权　　限：</label>
		<div class="col-sm-4">
			<ul id="tree1"></ul>
		</div>
	</div>
	</div>
		<div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
        <button type="reset" class="btn btn-sm btn-warning" ><i class="icon-refresh"></i> 重　　置</button>
        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="save"><i class="icon-ok"></i> 确认保存</a>
      </div>
</form>
      </div>
	</div>
</div>
<!-- 模态框（Modal）删除-->
<div class="modal fade" id="deleteRoleModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:30%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="deleteRoleForm">
   <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">提示</h4>
      </div>
      <!-------------Modal-header End-------------->
      
     <!-------------Modal-body Begin-------------->
      <div class="modal-body"> 
   		<div>
   			<span id="deleteRoleName"></span>
   		</div>
   		<input type="hidden" id="deleteRoleId" name="id" class="form-control" value="">
   		</div>
		<div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="delete"><i class="icon-trash"></i> 确　　定</a>
      </div>
</form>
      </div>
	</div>
</div>

<!-- 模态框（Modal）修改角色-->
<div class="modal fade" id="updateRoleModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="updateRoleForm">
   <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">编辑角色</h4>
      </div>
      <!-------------Modal-header End-------------->
      
     <!-------------Modal-body Begin-------------->
      <div class="modal-body"> 
	<div class="form-group">
	 	<input type="hidden" id="newcheckedAuthIds" name="checkedAuthIds" value="" />
		<input type="hidden" id="newroleId" name="roleId" class="form-control" value="">
		<label class="col-sm-2 control-label" for="newroleName"><font color="red">*</font>角色名称：</label>
		<div class="col-sm-4">
			<input type="text" id="newroleName" name="roleName" class="form-control" value="">
		</div>
	</div>
	<!-- <div class="form-group">
		<label class="col-sm-2 control-label" for="newroleCode"><font color="red">*</font>角色名称：</label>
		<div class="col-sm-4">
			<input type="text" id="newroleCode" name="roleCode" class="form-control" value="">
		</div>
	</div> -->
	<div class="form-group">
		<label class="col-sm-2 control-label" for="newdescr">描　　述：</label>
		<div class="col-sm-4">
			<textarea class="form-control" rows="3" id="newdescr" name="descr"></textarea>
		</div>
	</div>
<div class="form-group">
		<label class="col-sm-2 control-label" for="tree2">权　　限：</label>
		<div class="col-sm-4">
			<ul id="tree2"></ul>
		</div>
	</div>
	</div>
		<div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="update"><i class="icon-ok"></i> 确认保存</a>
      </div>
</form>
      </div>
	</div>
</div>



