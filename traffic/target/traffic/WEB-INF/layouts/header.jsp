<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div class="navbar-header pull-left">
    <a href="${ctx}/" class="navbar-brand">
    	<small><!-- <img alt="" src="${ctx }/static/images/icon.png">&nbsp; --><i class="icon-globe"></i>&nbsp;办伴运维管理平台</small> 
	</a><!-- /.brand -->
</div><!-- /.navbar-header -->

<div class="navbar-header pull-right" role="navigation">
    <ul class="nav ace-nav">
<%--     	<li class="light-blue"><a><shiro:principal property="storeName"/></a></li> --%>
<!--     	<li class="light-blue"><a><i class="icon-bell"></i> 0</a></li> -->
    	<li class="light-blue"><a><i class="icon-user"></i><shiro:principal property="name"/></a></li>
    	<li class="light-blue"><a href="${ctx}/logout" id="loginOut"><i class="icon-off"></i> 安全退出 </a></li>
    </ul><!-- /.ace-nav -->
</div><!-- /.navbar-header -->