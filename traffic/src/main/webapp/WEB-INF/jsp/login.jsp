<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<meta charset="utf-8" />
<title>伴办运维管理平台</title>
<link type="image/x-icon" href="${ctx}/favicon.ico" rel="shortcut icon">
<link rel="stylesheet" href="${ctx}/static/css/style.css" />
<link href="${ctx}/static/css/page/master.css" rel="stylesheet" type="text/css" />
</head>
<body class="body_bj1">
	<div class="top_DivBox">
	  <div class="DivBox_main"> <img src="${ctx}/static/images/logo1.png" width="361" height="45" /> </div>
	  <form id="loginForm" action="${ctx}/login" method="post">
		  <div class="DengLu">
		    <dl>
		      <dt class="dt1">账　号：</dt>
		      <dd class="dd1">
		        <input id="username" name="username" maxlength="30" type="text" />
		      </dd>
		      <dt  class="dt2">密　码：</dt>
		      <dd  class="dd2">
		        <input id="password" name="password" type="password" />
		      </dd>
		     <%--  <dt  class="dt3">验证码：</dt>
		      <dd class="dd4"><input type="text" id="captcha" name="captcha" class="input" /></dd>
		      <dd class="dd5"><img src="${ctx}/captchaImage" id="captchaImage"/>&nbsp;<a href="#" onclick="changeCaptcha()">看不清?换一张</a></dd> --%>
			    <dd class="wrong" id="errorMsg">
					<c:choose>
						<%-- <c:when
							test="${shiroLoginFailure eq 'com.hongguaninfo.hgdf.wadp.shiro.CaptchaException'}">
							<div style='color: red'>验证码错误，请重试.</div>
						</c:when> --%>
						<c:when
							test="${shiroLoginFailure eq 'org.apache.shiro.authc.UnknownAccountException'}">
							<div style='color: red'>该用户不存在.</div>
						</c:when>
						<c:when
							test="${shiroLoginFailure eq 'org.apache.shiro.authc.IncorrectCredentialsException'}">
							<div style='color: red'>请检查您输入的账号和密码.</div>
						</c:when>
						<c:when test="${shiroLoginFailure ne null}">
							<div style='color: red'>登录认证错误，请重试.</div>
						</c:when>
					</c:choose>
				</dd>
		      <dd class="dd3">
		        <input name="" type="button" class="btn" onclick="login();"/>
		      </dd>
		    </dl>
		  </div>
	  </form>
	</div>
	<div class="bottom">${_footer }</div>
	<!--[if !IE]><!-->
	<script type="text/javascript">
			window.jQuery || document.write("<script src='${ctx}/static/js/jquery-2.1.0.min.js'>" + "<" + "/script>");</script>
	<!--<![endif]-->
	<!--[if IE]>
	<script type="text/javascript">
	        window.jQuery || document.write("<script src='${ctx}/static/js/jquery-1.11.0.min.js'>"+"<"+"/script>");</script>
	<![endif]-->
	<script src="${ctx}/static/js/main.js"></script>
	<script src="${ctx}/static/js/common.js"></script>
	<script type="text/javascript">
		/* function changeCaptcha() {  
		    $('#captchaImage').hide().attr('src', '${ctx}/captchaImage?' + Math.floor(Math.random()*100) ).fadeIn();  
		    event.cancelBubble=true;  
		} */
		function login() {
			var username = $.trim($("#username").val());
			var password = $.trim($("#password").val());
			/* var captcha = $.trim($("#captcha").val()); */
			if(username.length == 0){
				$("#errorMsg").html("<div style='color: red'>请输入帐号</div>");
			}else if(password.length == 0){
				$("#errorMsg").html("<div style='color: red'>请输入密码</div>");
			}
			/* else if(captcha.length == 0){
				$("#errorMsg").html("<div style='color: red'>请输入验证码</div>");
			} */
			else{
				sendForm("loginForm", G_CTX_PATH + "/login");
			}
		}
		//$("#password,#captcha").keydown(function(event) {
		$("#password").keydown(function(event) {
			if (event.keyCode == 13) {
				login();
			}
		});
	</script>
</body>
</html>