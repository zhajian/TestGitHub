<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<c:forEach items="${auths}" var="auth" varStatus="vs">
	<li>
		<a class="dropdown-toggle" 
		<c:choose>
		<c:when test="${not empty auth.authUri }">href="${ctx }${auth.authUri}"</c:when>
		<c:otherwise>href="#"</c:otherwise>
		</c:choose>
		>
			<i class="${auth.authIcon}"></i>
			<span class="menu-text">${auth.authName}</span>
			<c:if test="${not empty auth.childs}">
			<b class="arrow icon-angle-down"></b>
			</c:if>
		</a>
		
		<c:if test="${not empty auth.childs}">
		<ul class='submenu'>
			<c:forEach items="${auth.childs}" var="childAuth" varStatus="childVs">
				<li>
					<a href="${ctx}${childAuth.authUri}">
						<i class="icon-angle-right"></i>
						<span class="menu-text">${childAuth.authName}</span>
					</a>
				</li>
			</c:forEach>
		</ul>
		</c:if>
	</li>
</c:forEach>