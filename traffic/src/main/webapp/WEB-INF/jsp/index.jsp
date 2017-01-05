<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<!-- PAGE CONTENT BEGINS -->
<input type="hidden" id="merchantId"
	value="${merchantBasic.merchantId }" />
<input type="hidden" id="merchantChild"
	value="${merchantBasic.childIds }">
<input type="hidden" id="merchantPid" value="${merchantBasic.pId }">
<c:set value="0" var="showFlag"></c:set>
<c:if test="${not empty merchantBasic.childMerchantBasicList }">
	<c:set value="1" var="showFlag"></c:set>
</c:if>
<c:if test="${showFlag == 1 }">
	<div class="col-sm-3">
		<div class="sub_left_menu">
			<div class="well">
				<ul class="tree_menu">
					<li><a class="active" node="${merchantBasic.merchantId }"><i
							class="icon-angle-right level1"></i><span>${merchantBasic.name }</span></a>
						<ul class="tree_menu">
							<c:forEach items="${merchantBasic.childMerchantBasicList }"
								var="merchantBasic">
								<li><a class="" node="${merchantBasic.merchantId }"><i
										class="icon-angle-right level2"></i><span>${merchantBasic.name }</span></a></li>
							</c:forEach>
						</ul></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="col-sm-9"></div>
</c:if>
<div style="width: 20%; float: right;"></div>
<div style="width: 80%; float: left;"></div>

<script type="text/javascript">
	$(function() {
		window.location.href="${ctx}/manage/role/showmanageuser";
	});
</script>

<script type="text/javascript"
	src="${ctx }/static/js/wifianywhere/ss/index.js"></script>

<!-- PAGE CONTENT ENDS -->
