<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<!-- PAGE CONTENT BEGINS -->
<div class="row">
	<div class="col-xs-12">
		<div class="page-header clearfix">
			<label class="col-sm-1 control-label" for="loginName">姓　　名</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="username" >
			</div>
			<label class="col-sm-1 control-label" for="loginName">登录账号</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="loginname" >
			</div>
			<div class="col-sm-4">
				<a class="btn btn-sm btn-info" href="javascript:;" id="manageuserSearchBtn"><i class="icon-search"></i>点击搜索</a>
			</div>
		</div>
		<div class="btn-group">
			<!-- <a class="btn btn-sm btn-info" href="javascript:;" id="healthBtn" >租户门店</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="conCountBtn" >租户用户</a> -->
  			<a class="btn btn-sm btn-info" href="javascript:;" id="addSysUserBtn"><i class="icon-plus"></i>新增用户</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="updateSysUserBtn"><i class="icon-edit"></i>编辑用户</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="updateSysUserPwdBtn"><i class="icon-lock"></i>重置密码</a>
  			<a class="btn btn-sm btn-info" href="javascript:;" id="deleteSysUserBtn"><i class="icon-trash"></i>删除用户</a>
  			
		</div>
		<table id="grid-table"></table>
		<div id="grid-pager"></div>
	</div>
</div>
<!-- 模态框（Modal）新增用户 -->
<div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
      <form class="form-horizontal clearfix" id="addUserForm">
      <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增用户</h4>
      </div>
      <!-------------Modal-header End-------------->
      
      <!-------------Modal-body Begin-------------->
      <div class="modal-body">
		<div class="form-group">
			<label class="col-sm-2 control-label" for="loginName"><font color="red">*</font>登录账号：</label>
			<div class="col-sm-4">
				<input type="text" id="loginName" name="loginName" class="form-control" value="">
			</div>
			<label class="col-sm-2 control-label" for="plainPassword"><font color="red">*</font>初始密码：</label>
			<div class="col-sm-4">
				<input type="password" id="plainPassword" name="plainPassword" maxlength="11" class="form-control"  value="">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label" for="userName"><font color="red">*</font>姓　　名：</label>
			<div class="col-sm-4">
				<input type="text" id="userName" name="userName" maxlength="11" class="form-control"  value="">
			</div>
			<label class="col-sm-2 control-label" for="engName">英 文 名：</label>
			<div class="col-sm-4">
				<input type="text" id="engName" name="engName" maxlength="11" class="form-control"  value="">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label" for="sex">性　　别：</label>
			<div class="col-sm-4">
				<select name="sex" class="form-control">
					<option value='1' id="male">男</option>
					<option value='0' id="female">女</option>
				</select>
			</div>
			<label class="col-sm-2 control-label" for="birthday">出生日期：</label>
			<div class="col-sm-4">
				<input type="text" id="birthday" readonly="readonly" class="form-control"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"  for="mobile"><font color="red">*</font>手机号码：</label>
			<div class="col-sm-4">
				<input type="text" id="mobile" name="mobile" maxlength="11" class="form-control"  value="">
			</div>
			<label class="col-sm-2 control-label"  for="telephone">联系电话：</label>
			<div class="col-sm-4">
				<input type="text" id="telephone" name="telephone" maxlength="11" class="form-control"  value="">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"  for="email">电子邮件：</label>
			<div class="col-sm-4">
				<input type="text" id="email" name="email" maxlength="11" class="form-control"  value="">
			</div>
			<label class="col-sm-2 control-label"  for="address">联系地址：</label>
			<div class="col-sm-4">
				<input type="text" id="address" name="address" maxlength="11" class="form-control"  value="">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"  for="checkedRoleIds">用户角色：</label>
			<div class="col-sm-4">
				<select name="checkedRoleIds" class="form-control"
					id="checkedRoleIds">
				<!-- 	<option value="">----请选择角色----</option> -->
				</select>
			</div>
		</div>
	</div>
	<!-------------Modal-body End-------------->
	<!-------------Modal-footer Begin-------------->
	<div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
        <button type="reset" class="btn btn-sm btn-warning" ><i class="icon-refresh"></i> 重　　置</button>
<!--         <input class="btn btn-sm btn-warning" type="reset" value="重　　置">  -->
        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="save"><i class="icon-ok"></i> 保存用户</a>
	</div>
	<!-------------Modal-footer End-------------->
	</form>
      </div>
	</div>
</div>
<!-- 模态框（Modal）删除-->
<div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:30%;">
		<div class="modal-content">
		<form class="form-horizontal clearfix" id="deleteUserForm">
		<!-------------Modal-header Begin-------------->
		<div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">提示</h4>
		</div>
      	<!-------------Modal-header End-------------->
      	<!-------------Modal-body Begin-------------->
      	<div class="modal-body">
   		<div>
   			<span id="deleteUserLoginName"></span>
   		</div>
   		<input type="hidden" id="deleteUserId" name="deleteUserId" class="form-control" value="">
		</div>
		<!-------------Modal-body End-------------->
		<div class="modal-footer">
			<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
	        <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="delete"><i class="icon-ok"></i> 确　　定</a>
		</div>
		</form>
		</div>
	</div>
</div>

<!-- 模态框（Modal）修改用户 -->
<div class="modal fade" id="updateUserModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:60%;">
	<div class="modal-content">
	<form class="form-horizontal clearfix" id="updateUserForm">
	<!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">编辑用户</h4>
      </div>
      <!-------------Modal-header End-------------->
      <!-------------Modal-body Begin-------------->
      	<div class="modal-body">
	<div class="form-group">
		<input type="hidden" id="newuserId" name="userId" class="form-control" value="">
		<label class="col-sm-2 control-label"  for="newloginName"><font color="red">*</font>登录账号：</label>
		<div class="col-sm-4">
			<input type="text" id="newloginName" name="loginName" class="form-control" value="" readonly="readonly">
		</div>
		<label class="col-sm-2 control-label"  for="newuserName"><font color="red">*</font>姓　　名：</label>
		<div class="col-sm-4">
			<input type="text" id="newuserName" name="userName" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newengName">英 文 名：</label>
		<div class="col-sm-4">
			<input type="text" id="newengName" name="engName" maxlength="11" class="form-control"  value="">
		</div>
		<label class="col-sm-2 control-label" for="newsex">性　　别：</label>
		<div class="col-sm-4">
			<select name="sex" class="form-control" id="newsex">
				<option value='1'>男</option>
				<option value='0'>女</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label" for="newbirthday">出生日期：</label>
		<div class="col-sm-4 input-group">
			<input type="text" id="newbirthday" readonly="readonly" class="form-control"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})">
		</div>
		<label class="col-sm-2 control-label"  for="newmobile"><font color="red">*</font>手机号码：</label>
		<div class="col-sm-4">
			<input type="text" id="newmobile" name="mobile" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newtelephone">联系电话：</label>
		<div class="col-sm-4">
			<input type="text" id="newtelephone" name="telephone" maxlength="11" class="form-control"  value="">
		</div>
		<label class="col-sm-2 control-label"  for="newemail">电子邮件：</label>
		<div class="col-sm-4">
			<input type="text" id="newemail" name="email" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newaddress">联系地址：</label>
		<div class="col-sm-4">
			<input type="text" id="newaddress" name="address" maxlength="11" class="form-control"  value="">
		</div>
		<label class="col-sm-2 control-label"  for="newcheckedRoleIds">用户角色：</label>
		<div class="col-sm-4">
			<select name="checkedRoleIds" class="form-control"
				id="newcheckedRoleIds">
			</select>
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
<!-- 模态框（Modal）修改登录密码-->
<div class="modal fade" id="updateUserPwdModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:60%;">
      <div class="modal-content">
      <form class="form-horizontal clearfix" id="updateUserPwdForm">
      <!-------------Modal-header Begin-------------->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">重置密码</h4>
      </div>
      <!-------------Modal-header End-------------->
      <!-------------Modal-body Begin-------------->
	<div class="modal-body">
	<div class="form-group">
		<input type="hidden" id="newpwduserId" name="userId" class="form-control" value="">
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="newplainPassword"><font color="red">*</font>新密码：</label>
		<div class="col-sm-4">
			<input type="password" id="newplainPassword" name="plainPassword" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label"  for="new2plainPassword"><font color="red">*</font>确认密码：</label>
		<div class="col-sm-4">
			<input type="password" id="new2plainPassword" name="plain2Password" maxlength="11" class="form-control"  value="">
		</div>
	</div>
	</div>
	<div class="modal-footer">
	  <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="icon-remove"></i> 关　　闭</button>
	  <a href="javascript:;" class="btn btn-sm btn-primary" role="button" tag="updatepwd"><i class="icon-ok"></i> 确认保存</a>
	</div>
	</form>
      </div>
	</div>
</div>




	<script type="text/javascript" src="${ctx }/static/js/hongyue/manage/manageuser.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx }/static/js/exporting.js"></script>
	