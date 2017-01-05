<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>

	<script type="text/javascript" src="${ctx }/static/js/hongyue/manage/manageauth.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/exporting.js"></script>
	
<!-- PAGE CONTENT BEGINS -->
<div class="row">
	<div class="col-xs-12">
		<div class="page-header clearfix">
			<label class="col-sm-1 control-label">权限名称</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="authName" >
			</div>
			<!-- <label class="col-sm-1 control-label">权限编码</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="authCode" >
			</div> -->
			<div class="col-sm-4">
				<a class="btn btn-sm btn-info" href="javascript:;" id="manageauthSearchBtn"><i class="icon-search"></i>点击搜索</a>
			</div>
		</div>
		<div class="btn-group">
  			<a class="btn btn-sm btn-info" href="javascript:;" id="addSysAuthBtn" ><i class="icon-plus"></i>新增权限</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="updateSysAuthBtn" ><i class="icon-edit"></i>编辑权限</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="deleteSysAuthBtn" ><i class="icon-trash"></i>删除权限</a>
		</div>
		<table id="grid-table"></table>
		<div id="grid-pager"></div>
	</div>
</div>
<!-- 模态框（Modal）新增权限-->
<div class="modal fade" id="addAuthModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="addAuthForm">
   <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增权限</h4>
      </div>
      <!-------------Modal-header End-------------->
      
      <!-------------Modal-body Begin-------------->
      <div class="modal-body">
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="authName"><font color="red">*</font>权限名称：</label>
		<div class="col-sm-4">
			<input type="text" id="authName" name="authName" class="form-control" value="">
		</div>
		<label class="col-sm-2 control-label"  for="orderId"><font color="red">*</font>排序编号：</label>
		<div class="col-sm-4">
			<input type="text" id="orderId" name="orderId" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="checkedAuthIds">所属权限：</label>
		<div class="col-sm-4">
			<select name="fid" class="form-control"
				id="checkedAuthIds">
			</select>
		</div>
		<label class="col-sm-2 control-label"  for="authIcon">显示图标：</label>
		<div class="col-sm-4">
			<input type="text" id="authIcon" name="authIcon" maxlength="50" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="authUri">访问路径：</label>
		<div class="col-sm-10">
			<input type="text" id="authUri" name="authUri" maxlength="100" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="descr">描　　述：</label>
		<div class="col-sm-10">
			<textarea class="form-control" rows="3" id="descr" name="descr" maxlength="200"></textarea>
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
<div class="modal fade" id="deleteAuthModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:30%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="deleteAuthForm">
   		<!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">提示</h4>
      </div>
      <!-------------Modal-header End-------------->
      
      <!-------------Modal-body Begin-------------->
      <div class="modal-body">
   		<div>
   			<span id="deleteAuthName"></span>
   		</div>
   		<input type="hidden" id="deleteAuthId" name="authId" class="form-control" value="">
   		</div>
   		<div class="modal-footer">
			<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
	        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="delete"><i class="icon-ok"></i> 确　　定</a>
		</div>
</form>
      </div>
	</div>
</div>

<!-- 模态框（Modal）修改权限 -->
<div class="modal fade" id="updateAuthModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
   <form class="form-horizontal clearfix" id="updateAuthForm">
   <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">编辑权限</h4>
      </div>
      <!-------------Modal-header End-------------->
      
      <!-------------Modal-body Begin-------------->
      <div class="modal-body">
	<div class="form-group">
		<input type="hidden" id="newauthId" name="authId" class="form-control" value="">
		<input type="hidden" id="newfid" name="fid" class="form-control"  value=""/>
		<label class="col-sm-2 control-label"  for="newauthName"><font color="red">*</font>模块名称：</label>
		<div class="col-sm-4">
			<input type="text" id="newauthName" name="authName" class="form-control" value="">
		</div>
		<label class="col-sm-2 control-label"  for="orderId"><font color="red">*</font>排序编号：</label>
		<div class="col-sm-4">
			<input type="text" id="neworderId" name="orderId" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="neworderId">所属权限：</label>
		<div class="col-sm-4">
			<input type="text" id="fatherName" maxlength="11" class="form-control" value="" readonly="readonly">
		</div>
		<label class="col-sm-2 control-label"  for="newauthIcon">显示图标：</label>
		<div class="col-sm-4">
			<input type="text" id="newauthIcon" name="authIcon" maxlength="50" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newauthUri">访问路径：</label>
		<div class="col-sm-10">
			<input type="text" id="newauthUri" name="authUri" maxlength="100" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newdescr">描　　述：</label>
		<div class="col-sm-10">
			<textarea class="form-control" rows="3" id="newdescr" name="descr" maxlength="200"></textarea>
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



