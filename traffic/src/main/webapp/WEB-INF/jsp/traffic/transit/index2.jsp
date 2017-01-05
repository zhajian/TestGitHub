<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>上海市浦东公交辅助决策分析示范应用系统</title>
		<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
		<meta name="description" content="top menu &amp; navigation" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="${ctx}/static/assets/css/bootstrap.css" />
		<link rel="stylesheet" href="${ctx}/static/assets/css/font-awesome.css" />
		<link rel="stylesheet" href="${ctx}/static/assets/css/datepicker.css" />

		<!-- page specific plugin styles -->

		<!-- text fonts -->
		<link rel="stylesheet" href="${ctx}/static/assets/css/ace-fonts.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="${ctx}/static/assets/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />

		<!-- ace settings handler -->
		<script src="${ctx}/static/assets/js/ace-extra.js"></script>
		
		<script type="text/javascript" src="${ctx}/static/gis/swfobject.js"></script>
		<script type="text/javascript">
		    // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
		    var swfVersionStr = "13.0.0";
		    // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
		    var xiSwfUrlStr = "expressInstall.swf";
		    var flashvars = {};
		    var params = {};
		    params.quality = "high";
		    params.bgcolor = "#ffffff";
		    params.allowscriptaccess = "sameDomain";
		    params.allowfullscreen = "true";
		    params.base=".";
		    var attributes = {};
		    attributes.id = "index";
		    attributes.name = "index";
		    attributes.align = "middle";
		    swfobject.embedSWF(
		        "${ctx}/static/gis/index.swf?config=config-line.xml", "flashContent", 
		        "100%", "100%", 
		        swfVersionStr, xiSwfUrlStr, 
		        flashvars, params, attributes);
		    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
		    swfobject.createCSS("#flashContent", "display:block;text-align:left;");
		</script>

	</head>

	<body class="no-skin">
		<div id="navbar" class="navbar navbar-default    navbar-collapse       h-navbar">
		<script type="text/javascript">
			try{ace.settings.check('navbar' , 'fixed')}catch(e){}
		</script>

		<div class="navbar-container" id="navbar-container">
			<div class="navbar-header pull-left">
				<!-- #section:basics/navbar.layout.brand -->
				<a href="#" class="navbar-brand">
					<small>
						<i class="fa fa-globe"></i>
						上海市浦东公交辅助决策分析应用系统
					</small>
				</a>

				<!-- /section:basics/navbar.layout.brand -->

				<!-- /section:basics/navbar.layout.brand -->
				<button class="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>
				</button>

				<!-- /section:basics/navbar.toggle -->
			</div>
		</div><!-- /.navbar-container -->
	</div>

	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed')}catch(e){}
		</script>

		<!-- #section:basics/sidebar.horizontal -->
		<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
			</script>

			<ul class="nav nav-list">
				<li class="hover highlight">
					<a href="${ctx}/normal/index">
						<i class="menu-icon fa fa-home"></i>
						<span class="menu-text">首　页</span>
					</a>
					<b class="arrow"></b>
				</li>
				
				<li class="hover highlight">
					<a href="${ctx}/normal/index3" >
						<i class="menu-icon fa fa-tachometer"></i>
						<span class="menu-text">
							路段运行分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>

				<li class="active open hover highlight">
					<a href="${ctx}/normal/index2" >
						<i class="menu-icon glyphicon glyphicon-tasks"></i>
						<span class="menu-text">
							公交走廊分析
						</span>
<!-- 							<b class="arrow fa fa-angle-down"></b> -->
					</a>
					<b class="arrow"></b>
				</li>
				
<!-- 				<li class="hover highlight">
					<a href="index3.jsp" >
						<i class="menu-icon glyphicon glyphicon-road"></i>
						<span class="menu-text">
							公交枢纽分析
						</span>
					</a>
					<b class="arrow"></b>
				</li> -->
				
<%-- 				<li class="hover highlight">
					<a href="${ctx}/normal/index4" >
						<i class="menu-icon fa fa-leaf"></i>
						<span class="menu-text">
							公交专用道分析
						</span>
					</a>
					<b class="arrow"></b>
				</li> --%>

			</ul><!-- /.nav-list -->

			<!-- #section:basics/sidebar.layout.minimize -->

			<!-- /section:basics/sidebar.layout.minimize -->
			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
			</script>
		</div>

		<!-- /section:basics/sidebar.horizontal -->
		<div class="main-content">
			<div class="main-content-inner">
				<div class="page-content">
					
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div class="hidden">
								<button data-target="#sidebar2" type="button" class="pull-left menu-toggler navbar-toggle">
									<span class="sr-only">Toggle sidebar</span>

									<i class="ace-icon fa fa-dashboard white bigger-125"></i>
								</button>

								<div id="sidebar2" class="sidebar responsive">
									<ul class="nav nav-list">
										<li class="open">
											<a href="#" class="dropdown-toggle">
												<i class="menu-icon glyphicon glyphicon-align-justify"></i>
												<span class="menu-text"> 浦东南路公交客流 </span>
												<b class="arrow fa fa-angle-down"></b>
											</a>
					
											<b class="arrow"></b>
					
											<ul class="submenu">
												<li class="active" id="menu_1">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														客流趋势
													</a>
													<b class="arrow"></b>
												</li>
					
												<li class="" id="menu_2">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														线路客流
													</a>
													<b class="arrow"></b>
												</li>
					
												<li class="" id="menu_3">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														站点客流
													</a>
													<b class="arrow"></b>
												</li>
											</ul>
										</li>
<!-- 										<li class="open">
											<a href="#" class="dropdown-toggle">
												<i class="menu-icon glyphicon glyphicon-align-center"></i>
												<span class="menu-text"> 浦东南路断面客流 </span>
												<b class="arrow fa fa-angle-down"></b>
											</a>
											<b class="arrow"></b>
					
											<ul class="submenu">
												<li class="" id="menu_4">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														断面客流
													</a>
													<b class="arrow"></b>
												</li>
											</ul>
										</li> -->
									</ul><!-- /.nav-list -->

									<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
										<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
									</div>
								</div><!-- .sidebar -->
							</div>

							<!-- 客流趋势 -->
							<div id="div_menu_1">
								<div class="panel panel-primary" style="margin-bottom: 6px;">
								  <div class="panel-heading">历史客流</div>
								  <div class="panel-body">
								    <form class="form-horizontal" role="form">
								    	<div class="form-group">
								    		<label class="col-sm-2 control-label"> 选择日期 </label>
											<div class="col-sm-4 input-daterange input-group" style="float: left;">
												<input type="text" class="form-control" name="start1" />
												<span class="input-group-addon">
													<i class="fa fa-minus"></i>
												</span>
												<input type="text" class="form-control" name="end1" />
											</div>
											<div class="col-sm-2">
												<select class="form-control">
													<option value="0">选择分析周期</option>
													<option value="1">日</option>
													<option value="2">月</option>
												</select>
											</div>
											<div class="col-sm-1">
												<button type="button" class="btn btn-primary btn-sm" onclick="search1()">查　询</button>
											</div>
										</div>
								    </form>
								    
								    <div id="myChart_1" style="width: 100%;height: 260px;"></div>
								    
								  </div>
								</div>
								
								<div class="panel panel-primary">
								  <div class="panel-heading">时变客流</div>
								  <div class="panel-body">
								    <form class="form-horizontal" role="form">
								    	<div class="form-group">
								    		<label class="col-sm-2 control-label"> 选择日期 </label>
											<div class="col-sm-4 input-group" style="float: left;">
												<input class="form-control date-picker" id="id-date-picker-1" type="text" name="start2" />
												<span class="input-group-addon">
													<i class="fa fa-calendar bigger-110"></i>
												</span>
											</div>
											<div class="col-sm-2">
												<button type="button" class="btn btn-primary btn-sm" onclick="search2()">查　询</button>
											</div>
										</div>
								    </form>
								    
								    <div id="myChart_2" style="width: 100%;height: 260px;"></div>
								  </div>
								</div>
							</div>
							
							<!-- 线路客流 -->
							<div id="div_menu_2">
								<div class="page-header">
									<h1>线路客流 </h1>
								</div><!-- /.page-header -->
								<form class="form-horizontal" role="form">
							    	<div class="form-group">
							    		<label class="col-sm-2 control-label"> 选择日期 </label>
										<div class="col-sm-4 input-group" style="float: left;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" name="tTime"/>
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<div class="col-sm-2">
											<button type="button" class="btn btn-primary btn-sm" onclick="search()">查　询</button>
										</div>
									</div>
							    </form>
							    <div class="row">
							    	<div class="col-sm-8" style="padding-right: 0px;">
							    		<div class="widget-box">
											<div class="widget-header"><h5 class="widget-title">公交线路客流</h5></div>
											<div class="panel-body" style="height: 450px;padding: 0px;">
												<div id="flashContent">
										            <p>
										                To view this page ensure that Adobe Flash Player version 
										                13.0.0 or greater is installed. 
										            </p>
										            <script type="text/javascript"> 
										                var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://"); 
										                document.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='" 
										                                + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>" ); 
										            </script> 
										        </div>
										        
										        <noscript>
										            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="index">
										                <param name="movie" value="index.swf" />
										                <param name="quality" value="high" />
										                <param name="bgcolor" value="#ffffff" />
										                <param name="allowScriptAccess" value="sameDomain" />
										                <param name="allowFullScreen" value="true" />
										                <!--[if !IE]>-->
										                <object type="application/x-shockwave-flash" data="index.swf" width="100%" height="100%">
										                    <param name="quality" value="high" />
										                    <param name="bgcolor" value="#ffffff" />
										                    <param name="allowScriptAccess" value="sameDomain" />
										                    <param name="allowFullScreen" value="true" />
										                <!--<![endif]-->
										                <!--[if gte IE 6]>-->
										                    <p> 
										                        Either scripts and active content are not permitted to run or Adobe Flash Player version
										                        13.0.0 or greater is not installed.
										                    </p>
										                <!--<![endif]-->
										                    <a href="http://www.adobe.com/go/getflashplayer">
										                        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash Player" />
										                    </a>
										                <!--[if !IE]>-->
										                </object>
										                <!--<![endif]-->
										            </object>
										        </noscript>
											</div>
										</div>
							    	</div>
							    	<div class="col-sm-4" style="">
							    		<div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">线路刷卡客流排名（每辆）</h5></div>
												<table id="sample-table-xx" class="table table-bordered center no-margin-bottom">
														<thead>
															<tr>
																<th>序号</th>
																<th>线路名</th>
																<th>日客流量/车辆数</th>
															</tr>
														</thead>
														<tbody></tbody>
												</table>
							    		</div>
							    		
							    		<div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">线路刷卡客流排名</h5></div>
												<table id="sample-table-xx2" class="table table-bordered center no-margin-bottom">
														<thead>
															<tr>
																<th>序号</th>
																<th>线路名</th>
																<th>日客流量</th>
															</tr>
														</thead>
														<tbody></tbody>
												</table>
							    		</div>
							    	</div>
							    </div>
							    
							    <!-- 筛选比对条件 -->
							    <div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header">
							    				<h5 class="widget-title">筛选比对条件</h5>
							    				<div class="widget-toolbar no-border">
													<a href="javascript:add_bdxl()"> <i class="glyphicon glyphicon-plus"></i> 添加比对</a>
												</div>
							    			</div>
							    			<div class="panel-body">
												<form class="form-horizontal" role="form">
											    	<div class="form-group">
											    		<label class="col-sm-2 control-label">线路名 </label>
														<div class="col-sm-4">
															<select class="form-control" name="lines1">
																<c:forEach var="linesOption" items="${lines}">
																	<option value="${linesOption.key}">${linesOption.value}</option>
																</c:forEach>
															</select>
														</div>
											    		<label class="col-sm-2 control-label"> 选择日期 </label>
														<div class="col-sm-4 input-daterange input-group" style="float: left; padding-left:10px; padding-right:10px;">
															<input type="text" class="form-control" name="start3" />
															<span class="input-group-addon">
																<i class="fa fa-minus"></i>
															</span>
															<input type="text" class="form-control" name="end3" />
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">周期 </label>
														<div class="col-sm-3">
															<select class="form-control">
																<option value="1">小时</option>
																<option value="2">日</option>
																<option value="3">月</option>
															</select>
														</div>
														
											    		<label class="col-sm-2 control-label">方向 </label>
														<div class="col-sm-3">
															<select class="form-control" name="dir1">
																<option value="0">全部</option>
																<option value="1">上行</option>
																<option value="2">下行</option>
															</select>
														</div>
														<div class="col-sm-2 center">
															<button type="button" class="btn btn-primary btn-sm" onclick="btn_bdxl(1)">查　询</button>
														</div>
													</div>
											    </form>
											    <div id="xlkl_bdxl" class="hidden">
													<div class="page-header" style="padding: 0px;">
														比对线路 <i class="ace-icon fa fa-angle-down icon-on-right"></i>
													</div><!-- /.page-header -->
													<form class="form-horizontal" role="form">
												    	<div class="form-group">
												    		<label class="col-sm-2 control-label">线路名 </label>
															<div class="col-sm-4">
																<select class="form-control" name="lines2">
																	<c:forEach var="linesOption" items="${lines}">
																		<option value="${linesOption.key}">${linesOption.value}</option>
																	</c:forEach>
																</select>
															</div>
												    		<label class="col-sm-2 control-label"> 选择日期 </label>
															<div class="col-sm-4 input-daterange input-group" style="float: left; padding-left:10px; padding-right:10px;">
																<input type="text" class="form-control" name="start4" />
																<span class="input-group-addon">
																	<i class="fa fa-minus"></i>
																</span>
																<input type="text" class="form-control" name="end4" />
															</div>
														</div>
														<div class="form-group">
															<label class="col-sm-2 control-label">周期 </label>
															<div class="col-sm-3">
																<select class="form-control">
																	<option value="1">小时</option>
																	<option value="2">日</option>
																	<option value="3">月</option>
																</select>
															</div>
															
												    		<label class="col-sm-2 control-label">方向 </label>
															<div class="col-sm-3">
																<select class="form-control" name="dir2">
																	<option value="0">全部</option>
																	<option value="1">上行</option>
																	<option value="2">下行</option>
																</select>
															</div>
															<div class="col-sm-2 center">
																<button type="button" class="btn btn-primary btn-sm" onclick="btn_bdxl(2)">查　询</button>
															</div>
														</div>
												    </form>
												</div>
											</div>
							    		</div>
						    		</div>
								</div>
							    
							    <!-- 线路变表 -->
							    <div class="row hidden" id="div_xlbb1">
							    	<div class="col-sm-7">
									    <div class="widget-box">
							    			<div class="widget-header">
							    				<h5 class="widget-title">线路客流分析(刷卡客流)</h5>
							    				<div class="widget-toolbar no-border">
<!-- 								    				<a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a> -->
												</div>
							    			</div>
							    			<div class="panel-body">
												<div id="myChart_3" style="width: 100%;height: 260px;"></div>
											</div>
							    		</div>
						    		</div>
						    		<div class="col-sm-5">
									    <div class="widget-box">
							    			<div class="widget-header">
							    				<h5 class="widget-title">小时站点分布</h5>
							    				<div class="widget-toolbar no-border">
<!-- 								    				<a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a> -->
													<select id="s1">
														<option>0</option>
														<option>1</option>
														<option>2</option>
														<option>3</option>
														<option>4</option>
														<option>5</option>
														<option>6</option>
														<option>7</option>
														<option>8</option>
														<option>9</option>
														<option>10</option>
														<option>11</option>
														<option>12</option>
														<option>13</option>
														<option>14</option>
														<option>15</option>
														<option>16</option>
														<option>17</option>
														<option>18</option>
														<option>19</option>
														<option>20</option>
														<option>21</option>
														<option>22</option>
														<option>23</option>
													</select>
												</div>
							    			</div>
							    			<div class="panel-body">
												<div id="myChart_31" style="width: 100%;height: 260px;"></div>
											</div>
							    		</div>
						    		</div>
								</div>
								
								<!-- 客流趋势及对比分析 -->
								<div class="row hidden" id="div_xlbb2">
							    	<div class="col-sm-7">
									    <div class="widget-box">
									    	<div class="widget-header">
							    				<h5 class="widget-title">对比分析</h5>
							    				<div class="widget-toolbar no-border">
<!-- 								    				<a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a> -->
												</div>
							    			</div>
							    			<div class="panel-body">
												<div id="myChart_4" style="width: 100%;height: 260px;"></div>
											</div>
							    		</div>
						    		</div>
						    		<div class="col-sm-5">
									    <div class="widget-box">
							    			<div class="widget-header">
							    				<h5 class="widget-title">小时站点分布</h5>
							    				<div class="widget-toolbar no-border">
<!-- 								    				<a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a> -->
													<select id="s2">
														<option>0</option>
														<option>1</option>
														<option>2</option>
														<option>3</option>
														<option>4</option>
														<option>5</option>
														<option>6</option>
														<option>7</option>
														<option>8</option>
														<option>9</option>
														<option>10</option>
														<option>11</option>
														<option>12</option>
														<option>13</option>
														<option>14</option>
														<option>15</option>
														<option>16</option>
														<option>17</option>
														<option>18</option>
														<option>19</option>
														<option>20</option>
														<option>21</option>
														<option>22</option>
														<option>23</option>
													</select>
												</div>
							    			</div>
							    			<div class="panel-body">
												<div id="myChart_41" style="width: 100%;height: 260px;"></div>
											</div>
							    		</div>
						    		</div>
								</div>
							
							</div>
							
							<!-- 站点客流 -->
							<div id="div_menu_3">
								<div class="page-header">
									<h1>站点客流 </h1>
								</div><!-- /.page-header -->
								<form class="form-horizontal" role="form">
							    	<div class="form-group">
							    		<label class="col-sm-2 control-label"> 选择日期 </label>
										<div class="col-sm-4 input-group" style="float: left;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" name="ttTime"/>
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<div class="col-sm-2">
											<button type="button" class="btn btn-primary btn-sm" onclick="search3()">查　询</button>
										</div>
									</div>
							    </form>
							    
							    <div class="row">
							    	<div class="col-sm-8" style="padding-right: 0px;">
							    		<div class="widget-box">
											<div class="widget-header"><h5 class="widget-title">公交站点客流</h5></div>
											<div class="panel-body" style="padding: 0px;">
												<iframe src="${ctx}/static/BusStationFlow.jsp" width="100%" height="438px" border=0></iframe>
<!-- 												<div id="myChart5_1" style="width: 100%;height: 358px;"></div> -->
											</div>
										</div>
							    	</div>
							    	<div class="col-sm-4" style="">
							    		<div class="widget-box">
								    		<div class="widget-header"><h5 class="widget-title">站点刷卡客流排名（前十）</h5></div>
												<table id="sample-table-xx3" class="table table-bordered center no-margin-bottom">
														<thead>
															<tr>
																<th>序号</th>
																<th>线路名</th>
																<th>方向</th>
																<th>日客流量</th>
															</tr>
														</thead>
														<tbody></tbody>
													</table>
							    		</div>
							    		
							    	</div><!-- col -->
							    </div><!-- row -->
							    
							    <!-- 客流分析筛选 -->
							    <div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">客流分析筛选</h5></div>
							    			<div class="panel-body">
												<form class="form-horizontal" role="form">
											    	<div class="form-group">
											    		<label class="col-sm-1 control-label">线路</label>
														<div class="col-sm-3">
															<select class="form-control" name="lines3" id="lines3">
																<c:forEach var="lineOption" items="${line}">
																	<option value="${lineOption.key}">${lineOption.value}</option>
																</c:forEach>
															</select>
														</div>
														<label class="col-sm-1 control-label">方向 </label>
														<div class="col-sm-3">
															<select class="form-control" id="dir3" name="dir3">
																<option value="上行">上行</option>
																<option value="下行">下行</option>
															</select>
														</div>
														<label class="col-sm-1 control-label">站点 </label>
														<div class="col-sm-3">
															<select class="form-control" id="bs" name="bs"></select>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-1 control-label">类型 </label>
														<div class="col-sm-3">
															<select class="form-control" name="pfType">
																<option value="上客">上客</option>
																<option value="下客">下客</option>
															</select>
														</div>
														<label class="col-sm-1 control-label"> 日期 </label>
														<div class="col-sm-3 input-group" style="float: left;padding-left: 10px;padding-right: 10px;">
															<input class="form-control date-picker" id="id-date-picker-1" type="text" name="tTime1"/>
															<span class="input-group-addon">
																<i class="fa fa-calendar bigger-110"></i>
															</span>
														</div>
														<div class="col-sm-2 center">
															<button type="button" class="btn btn-primary btn-sm" onclick="search4()">查　询</button>
														</div>
													</div>
											    </form>
											</div>
							    		</div>
						    		</div>
								</div>
							    
							    <div class="row">
							    	<div class="col-sm-8" style="padding-right: 0px;">
							    		<div class="widget-box">
											<div class="widget-header"><h5 class="widget-title">站点客流分析(刷卡客流)</h5></div>
											<div class="panel-body">
												<div id="myChart_8" style="width: 100%;height: 260px;"></div>
											</div>
										</div>
							    	</div>
							    	<div class="col-sm-4" style="">
							    		<div class="widget-box">
											<div class="widget-header">
												<h5 class="widget-title">站点客流线路分析(刷卡客流)</h5>
												<div class="widget-toolbar no-border">
													<ul class="nav nav-tabs" id="myTab">
														<li class="active"><a data-toggle="tab" href="#h1">早高峰</a></li>
														<li><a data-toggle="tab" href="#h2">晚高峰</a></li>
													</ul>
												</div>
											</div>
											<div class="panel-body" style="padding: 0px;">
												<div class="tab-content no-border" style="padding: 0px;">
													<div id="h1" class="tab-pane active">
														<div id="myChart_6" style="width: 560px;height: 288px;"></div>
													</div>
 													<div id="h2" class="tab-pane">
														<div id="myChart_7" style="width: 560px;height: 288px;"></div>
													</div>
												</div>
											</div>
										</div>
							    		
							    	</div><!-- col -->
							    </div><!-- row -->
							
							</div>
							
							<!-- 断面客流分析 -->
							<div id="div_menu_4">
								<div class="page-header">
									<h1>断面客流分析 </h1>
								</div><!-- /.page-header -->
								<form class="form-horizontal" role="form">
							    	<div class="form-group">
							    		<label class="col-sm-2 control-label"> 选择日期 </label>
										<div class="col-sm-4 input-group" style="float: left;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" />
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<div class="col-sm-2">
											<button type="button" class="btn btn-primary btn-sm">查　询</button>
										</div>
									</div>
							    </form>
							    
							    <div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">断面客流</h5></div>
							    			<div class="panel-body">
												<!-- body-content -->
											</div>
							    		</div>
						    		</div>
								</div>
								
								<div class="row">
									<div class="col-sm-12">
							    		<div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">断面客流排名</h5></div>
							    			<div class="panel-body" style="padding: 1px;">
												<table id="sample-table-2" class="table table-bordered center no-margin-bottom">
													<thead>
														<tr>
															<th class="center">道路名称</th>
															<th class="center">起始</th>
															<th class="center">结束</th>
															<th class="center">日客流量</th>
														</tr>
													</thead>
														<tr>
															<td>浦东南路</td>
															<td>银城路</td>
															<td>浦东大道</td>
															<td>1000人次</td>
														</tr>
														<tr>
															<td>浦东南路</td>
															<td>浦东大道</td>
															<td>银城路</td>
															<td>1000人次</td>
														</tr>
														<tr>
															<td>浦东南路</td>
															<td>银城路</td>
															<td>浦东大道</td>
															<td>1000人次</td>
														</tr>
														<tr>
															<td>浦东南路</td>
															<td>浦东大道</td>
															<td>银城路</td>
															<td>1000人次</td>
														</tr>
													<tbody>
													</tbody>
												</table>
												<div class="modal-footer no-margin-top">
													<ul class="pagination pull-right no-margin">
														<li class="prev disabled">
															<a href="#">
																<i class="glyphicon glyphicon-backward"></i>
															</a>
														</li>
		
														<li class="active">
															<a href="#">1</a>
														</li>
		
														<li>
															<a href="#">2</a>
														</li>
		
														<li>
															<a href="#">3</a>
														</li>
														
														<li>
															<a href="#">4</a>
														</li>
		
														<li class="next">
															<a href="#">
																<i class="glyphicon glyphicon-forward"></i>
															</a>
														</li>
													</ul>
												</div>
											</div>
							    		</div>
							    		
							    	</div><!-- col -->
							    </div><!-- row -->
							    
							    <!-- 断面客流时变趋势 -->
							    <div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">断面客流时变趋势</h5></div>
							    			<div class="panel-body">
												
											</div>
							    		</div>
						    		</div>
								</div>
								
								<!-- 客流趋势及对比分析 -->
								<div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">客流趋势及对比分析</h5></div>
							    			<div class="panel-body">
												
											</div>
							    		</div>
						    		</div>
								</div>
								
							</div>

							<!-- PAGE CONTENT ENDS -->
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->

		<div class="footer">
			<div class="footer-inner">
				<!-- #section:basics/footer -->
				<div class="footer-content">
					<span class="bigger-120"> <span class="blue bolder"></span>
						上海市浦东公交辅助决策分析应用系统 &copy; 2016 </span> &nbsp; &nbsp; 
						<!-- 
						<span class="action-buttons">
							<a href="#"> <i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i></a> 
							<a href="#"> <i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i></a> 
							<a href="#"> <i class="ace-icon fa fa-rss-square orange bigger-150"></i> </a> 
						</span>
						 -->
				</div>

				<!-- /section:basics/footer -->
			</div>
		</div>

		<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
			<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
		</a>
	</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='${ctx}/static/assets/js/jquery.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='${ctx}/static/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
		</script>
		<script src="${ctx}/static/assets/js/bootstrap.js"></script>
		
		<script src="${ctx}/static/assets/js/ace/ace.widget-box.js"></script>

		<!-- page specific plugin scripts -->

		<!-- ace scripts -->
		<script src="${ctx}/static/assets/js/ace/elements.scroller.js"></script>
		<script src="${ctx}/static/assets/js/ace/elements.wizard.js"></script>
		<script src="${ctx}/static/assets/js/ace/elements.aside.js"></script>
		<script src="${ctx}/static/assets/js/ace/ace.js"></script>
		<script src="${ctx}/static/assets/js/ace/ace.sidebar.js"></script>
		<script src="${ctx}/static/assets/js/ace/ace.sidebar-scroll-1.js"></script>
		<script src="${ctx}/static/assets/js/ace/ace.submenu-hover.js"></script>
		<script src="${ctx}/static/assets/js/date-time/bootstrap-datepicker.js"></script>
		<!-- dataTables -->
		<script src="${ctx}/static/js/dataTables/jquery.dataTables.js"></script>
		<script src="${ctx}/static/js/dataTables/jquery.dataTables.bootstrap.js"></script>
			
		<script src="${ctx}/static/echarts/js/echarts.js"></script>
		
		<script type="text/javascript">
		//路径配置
		require.config({
			paths : {
				echarts : '${ctx}/static/echarts/js'
			}
		});
		</script>
		
		<script language="javascript">
		jQuery(function($) {
			for(i=2;i<5;i++){
				$("#div_menu_"+i).css("display","none");
			}
		});
		
		function menu_click(item){
			for(i=1;i<5;i++){
				$("#menu_"+i).removeClass("active");
			}
			var parentNode = item.parentNode;
			var id = parentNode.id;
			$("#"+id).addClass("active");
			for(i=1;i<5;i++){
				$("#div_menu_"+i).css("display","none");
			}
			$("#div_"+id).css("display","block");
		}
		
		//添加比对线路
		function add_bdxl(){
			$('#xlkl_bdxl').removeClass('hidden');
		}
		//比对线路-点击查询
		function btn_bdxl(line){
			if(line==1){
			if($("[name='start3']").val() == "" || $("[name='end3']").val() == "") {
				alert("请选择完整日期!");
				return;
			}
			$.post(G_CTX_PATH + "/normal/bdxl1", 
					{lineId:$("[name='lines1']").val(),sTime:$("[name='start3']").val(),eTime:$("[name='end3']").val(),dir:$("[name='dir1']").val()}, 
					function(data) {
						if(data.success) {
							require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
									function(ec) {
										// 基于准备好的dom，初始化echarts图表
										var myChart = ec.init(document.getElementById('myChart_3'));
										var option = {
											title : {
												text :  $("[name='lines1']").find("option:selected").text() + '上客客流时变',
												subtext : '',
												x : 'center'
											},
											tooltip : {
												trigger : 'axis'
											},
											legend : {
												data : []
											},
											toolbox : {
				 								show : true,
				 								orient:'vertical',
												x:'left',
												y:'center',
				 								feature : {mark:{show:true},
													dataView:{show:true,readOnly:false},
													magicType:{show:false,type:['line','bar']},
													restore:{show:true},
													saveAsImage:{show:true}}
				 							},
											calculable : true,
											xAxis : [ {
												type : 'category',
												name : '小时',
												boundaryGap : false,
												data : data.xList
											} ],
											yAxis : [ {
												type : 'value',
												name : '小时客流'												
											} ],
											series : [ {
												name : '区域客流',
												type : 'line',
												smooth : true,
												itemStyle : {
													normal : {
														areaStyle : {
															type : 'default'
														}
													}
												},
												data : data.yList
											} ]
										};
		
										// 为echarts对象加载数据 
										myChart.setOption(option);
									});
						}
				});
				s1Click(0);
				$('#div_xlbb1').removeClass("hidden");
			}
			if (line==2) {
				if($("[name='start4']").val() == "" || $("[name='end4']").val() == "") {
					alert("请选择完整日期!");
					return;
				}
				$.post(G_CTX_PATH + "/normal/bdxl2", 
						{lineId:$("[name='lines2']").val(),sTime:$("[name='start4']").val(),eTime:$("[name='end4']").val(),dir:$("[name='dir2']").val()}, 
						function(data) {
							if(data.success) {
								require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
										function(ec) {
											// 基于准备好的dom，初始化echarts图表
											var myChart = ec.init(document.getElementById('myChart_4'));
											var option = {
												title : {
													text :  $("[name='lines2']").find("option:selected").text() + '上客客流时变',
													subtext : '',
													x : 'center'
												},
												tooltip : {
													trigger : 'axis'
												},
												legend : {
													data : []
												},
												toolbox : {
					 								show : true,
					 								orient:'vertical',
													x:'left',
													y:'center',
					 								feature : {mark:{show:true},
														dataView:{show:true,readOnly:false},
														magicType:{show:false,type:['line','bar']},
														restore:{show:true},
														saveAsImage:{show:true}}
					 							},
												calculable : true,
												xAxis : [ {
													type : 'category',
													name : '小时',
													boundaryGap : false,
													data : data.xList
												} ],
												yAxis : [ {
													type : 'value',
													name : '小时客流'
												} ],
												series : [ {
													name : '区域客流',
													type : 'line',
													smooth : true,
													itemStyle : {
														normal : {
															areaStyle : {
																type : 'default'
															}
														}
													},
													data : data.yList
												} ]
											};
			
											// 为echarts对象加载数据 
											myChart.setOption(option);
										});
							}
					});
				s2Click(0);
				$('#div_xlbb2').removeClass("hidden");
			}
		}		
		
		$("#s1").change(function(){
			s1Click($("#s1").find("option:selected").text());
			}); 
		
 		function s1Click(hh) {
 			var hour;
			if(hh < 10) {
				hour = "0" + hh;
			} else {
				hour = hh;
			}
			$.post(G_CTX_PATH + "/normal/getBsPFByHH", 
					{lineName:$("[name='lines1']").find("option:selected").text(),dir:$("[name='dir1']").val(),sTime:$("[name='start3']").val(),eTime:$("[name='end3']").val(),hour:hour}, 
					function(data) {
						if(data.success) {
							require([ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
			 						function(ec, theme) {
			 							// 基于准备好的dom，初始化echarts图表
			 							var myChart = ec.init(document.getElementById('myChart_31'), theme);
			 							option = {
			 								title : {
			 									text : '线路刷卡客流各站点占比',
			 									x : 'center'
			 								},
			 							    tooltip : {
			 							        trigger: 'item',
			 							        formatter: "{b} : {c} ({d}%)"
			 							    },
			 							    legend: {
			 							        orient : 'vertical',
			 							        x : 'left',
			 							       data:data.amX
// 			 							    	   ['N','S']
			 							    },
			 							    toolbox: {
			 							        show : false
			 							    },
			 							    calculable : true,
			 							    series : [
			 							        {
			 							            name:'吸引客流',
			 							            type:'pie',
			 							            radius : '65%',
			 		            					center: ['50%', '60%'],
			 							            itemStyle : {
			 							                normal : {
			 							                    label : {
			 							                        show : false
			 							                    },
			 							                    labelLine : {
			 							                        show : false
			 							                    }
			 							                }
			 							            },
			 							           data:data.amY
// 			 							        	   [{value:'10', name:'N'},{value:'20', name:'S'}]
			 							        }
			 							    ]
			 							};
			 							
			 							// 为echarts对象加载数据 
			 							myChart.setOption(option);
			 						});
						}
					});
		} 
 		
 		$("#s2").change(function(){
			s2Click($("#s2").find("option:selected").text());
			}); 
 		
 		function s2Click(hh) {
 			var hour;
			if(hh < 10) {
				hour = "0" + hh;
			} else {
				hour = hh;
			}
			$.post(G_CTX_PATH + "/normal/getBsPFByHH", 
					{lineName:$("[name='lines2']").find("option:selected").text(),dir:$("[name='dir2']").val(),sTime:$("[name='start4']").val(),eTime:$("[name='end4']").val(),hour:hour}, 
					function(data) {
						if(data.success) {
							require([ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
			 						function(ec, theme) {
			 							// 基于准备好的dom，初始化echarts图表
			 							var myChart = ec.init(document.getElementById('myChart_41'), theme);
			 							option = {
			 								title : {
			 									text : '线路刷卡客流各站点占比',
			 									x : 'center'
			 								},
			 							    tooltip : {
			 							        trigger: 'item',
			 							        formatter: "{b} : {c} ({d}%)"
			 							    },
			 							    legend: {
			 							        orient : 'vertical',
			 							        x : 'left',
			 							       data:data.amX
// 			 							    	   ['N','S']
			 							    },
			 							    toolbox: {
			 							        show : false
			 							    },
			 							    calculable : true,
			 							    series : [
			 							        {
			 							            name:'吸引客流',
			 							            type:'pie',
			 							            radius : '65%',
			 		            					center: ['50%', '60%'],
			 							            itemStyle : {
			 							                normal : {
			 							                    label : {
			 							                        show : false
			 							                    },
			 							                    labelLine : {
			 							                        show : false
			 							                    }
			 							                }
			 							            },
			 							           data:data.amY
// 			 							        	   [{value:'10', name:'N'},{value:'20', name:'S'}]
			 							        }
			 							    ]
			 							};
			 							
			 							// 为echarts对象加载数据 
			 							myChart.setOption(option);
			 						});
						}
					});
		} 
		</script>
		
		<script type="text/javascript">
		//列表加载
		var oTable1;
		var oTable2;
		var oTable3;
		var tTime;
		var ttTime;

		$(function() {
			search1(getCurrentDateTime(-3),getCurrentDateTime(-1));
			search2();
// 			search4();
			
			var getCurrentDateTimes = function(AddDayCount) {
				var date = new Date();
				date.setDate(date.getDate()+AddDayCount);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				month = (month < 10 ? "0" + month : month);
				day = (day < 10 ? "0" + day : day);
				var curDate = year.toString() + '-' + month.toString() + '-' + day.toString();
				return curDate;
			};
			
			//初始化table取时间
			if($("[name='tTime']").val() != "") {
				tTime = $("[name='tTime']").val();
			} else {
				tTime = getCurrentDateTimes(-1);
			}
			
				oTable1 = $('#sample-table-xx').dataTable({
					bAutoWidth : false,
					"aoColumns" : [
							{"bSortable":false, "mData":"rows"},
							{"bSortable":false, "mData":"lineName"},
							{"bSortable":false, "mData":"pf"}
							],
					"aaSorting" : [],
					"bServerSide" : true,
					"ordering": true,
					"sAjaxDataProp" : "rows",
					"sAjaxSource" : "${ctx}/normal/linePFlist",
		
					"fnServerParams" : function(aoData) {
						aoData.push(
							{
							"name" : "targetTime",
							"value" : tTime
							}
						);
					},
		
					"bPaginate" : true, //是否分页。
					"bProcessing" : false, //当datatable获取数据时候是否显示正在处理提示信息。
					"bFilter" : false, //是否使用内置的过滤功能
					"bLengthChange" : false, //是否允许自定义每页显示条数.
					"iDisplayLength" : 3,
					"bInfo" : false,//是否显示列表页脚信息
					"pagingType":"simple"
			});
		
			oTable2 = $('#sample-table-xx2').dataTable({
				bAutoWidth : false,
				"aoColumns" : [
						{"bSortable":false, "mData":"rows"},
						{"bSortable":false, "mData":"lineName"},
						{"bSortable":false, "mData":"pf"}
						],
				"aaSorting" : [],
				"bServerSide" : true,
				"sAjaxDataProp" : "rows",
				"sAjaxSource" : "${ctx}/normal/linePFlist2",
			
				"fnServerParams" : function(aoData) {
					aoData.push(
						{
						"name" : "targetTime",
						"value" : tTime
						}		
					);
				},
			
				"bPaginate" : true, //是否分页。
				"bProcessing" : false, //当datatable获取数据时候是否显示正在处理提示信息。
				"bFilter" : false, //是否使用内置的过滤功能
				"bLengthChange" : false, //是否允许自定义每页显示条数.
				"iDisplayLength" : 3,
				"bInfo" : false,	//是否显示列表页脚信息
				"pagingType":"simple"
			});
			
			//初始化table取时间
			if($("[name='ttTime']").val() != "") {
				ttTime = $("[name='ttTime']").val();
			} else {
				ttTime = getCurrentDateTimes(-1);
			}
			
			oTable3 = $('#sample-table-xx3').dataTable({
				bAutoWidth : false,
				"aoColumns" : [
						{"bSortable":false, "mData":"rows"},
						{"bSortable":false, "mData":"bsName"},
						{"bSortable":false, "mData":"dir"},
						{"bSortable":false, "mData":"pf"}
						],
				"aaSorting" : [],
				"bServerSide" : true,
				"sAjaxDataProp" : "rows",
				"sAjaxSource" : "${ctx}/normal/bsPFlist",

				"fnServerParams" : function(aoData) {
					aoData.push(
						{
						"name" : "targetTime",
						"value" : ttTime
						}
					);
				},

				"bPaginate" : false, //是否分页。
				"bProcessing" : false, //当datatable获取数据时候是否显示正在处理提示信息。
				"bFilter" : false, //是否使用内置的过滤功能
				"bLengthChange" : false, //是否允许自定义每页显示条数.
				"iDisplayLength" : 3,
				"bInfo" : false	//是否显示列表页脚信息
		});

		});
		
		function search() {
			if($("[name='tTime']").val() != "") {
				tTime = $("[name='tTime']").val();
			} else {
				tTime = getCurrentDateTime(-1);
			}
			oTable1.fnDraw();
			oTable2.fnDraw();
		}
		
		function search3() {
			if($("[name='ttTime']").val() != "") {
				ttTime = $("[name='ttTime']").val();
			} else {
				ttTime = getCurrentDateTime(-1);
			}
			oTable3.fnDraw();
		}
		
		// 获取当前时间 
		var getCurrentDateTime = function(AddDayCount) {
			var date = new Date();
			date.setDate(date.getDate()+AddDayCount);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			month = (month < 10 ? "0" + month : month);
			day = (day < 10 ? "0" + day : day);
			var curDate = year.toString() + '-' + month.toString() + '-' + day.toString();
			return curDate;
		};
	

		function search1(sTime,eTime) {
		
		if($("[name='start1']").val() == "" || $("[name='end1']").val() == "") {
			sTime = getCurrentDateTime(-3);
			eTime = getCurrentDateTime(-1);
		} else {
			sTime = $("[name='start1']").val();
			eTime = $("[name='end1']").val();
		}
		
 			$.post(G_CTX_PATH + "/normal/getHistoryPF", 
					{startTime:sTime,endTime:eTime}, 
					function(data) {
						if(data.success) {
							require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
				 					function(ec) {
				 						// 基于准备好的dom，初始化echarts图表
				 						var myChart = ec.init(document.getElementById('myChart_1'));
				 						var option = {
				 							title : {
				 								text : sTime + '至' + eTime + '客流趋势',
				 								subtext : '',
				 								x : 'center'
				 							},
				 							tooltip : {
				 								trigger : 'axis'
				 							},
				 							legend : {
				 								data : []
				 							},
				 							toolbox : {
				 								show : true,
				 								orient:'vertical',
												x:'left',
												y:'center',
				 								feature : {mark:{show:true},
													dataView:{show:true,readOnly:false},
													magicType:{show:false,type:['line','bar']},
													restore:{show:true},
													saveAsImage:{show:true}}
				 							},
				 							calculable : true,
				 							xAxis : [ {
				 								type : 'category',
				 								boundaryGap : false,
				 								name : '日期',
				 								data : data.xList
				 							} ],
				 							yAxis : [ {
				 								type : 'value',
				 								name : '日客流'
				 							} ],
				 							series : [ {
				 								name : '区域客流',
				 								type : 'line',
				 								smooth : true,
				 								itemStyle : {
				 									normal : {
				 										areaStyle : {
				 											type : 'default'
				 										}
				 									}
				 								},
				 								data : data.yList
				 							} ]
				 						};
		
				 						// 为echarts对象加载数据 
				 						myChart.setOption(option);
				 				});
						}
				});
		
		} 
		
		function search2(sTime2) {
			
			if($("[name='start2']").val() != "") {
				sTime2 = $("[name='start2']").val();
			} else {
				sTime2 = getCurrentDateTime(-1);
			}
			
			$.post(G_CTX_PATH + "/normal/getHourPF", 
					{targetTime:sTime2}, 
					function(data) {
						if(data.success) {
							require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
									function(ec) {
										// 基于准备好的dom，初始化echarts图表
										var myChart = ec.init(document.getElementById('myChart_2'));
										var option = {
											title : {
												text : sTime2 + '客流时变趋势', 
												subtext : '',
												x : 'center'
											},
											tooltip : {
												trigger : 'axis'
											},
											legend : {
												data : []
											},
											toolbox : {
				 								show : true,
				 								orient:'vertical',
												x:'left',
												y:'center',
				 								feature : {mark:{show:true},
													dataView:{show:true,readOnly:false},
													magicType:{show:false,type:['line','bar']},
													restore:{show:true},
													saveAsImage:{show:true}}
				 							},
											calculable : true,
											xAxis : [ {
												type : 'category',
												boundaryGap : false,
												name : '小时',
												data : [ '0H','1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H',
														'9H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', 
														'17H', '18H', '19H', '20H', '21H', '22H', '23H' ]
											} ],
											yAxis : [ {
												type : 'value',
												name : '小时客流'
											} ],
											series : [ {
												name : '区域客流',
												type : 'line',
												smooth : true,
												itemStyle : {
													normal : {
														areaStyle : {
															type : 'default'
														}
													}
												},
		/* 												data : [ 30, 55, 10, 20, 40, 80, 160, 210, 90, 120, 150,
														180 ] */
												data : data.yList
											} ]
										};
		
										// 为echarts对象加载数据 
										myChart.setOption(option);
									});
						}
				});
		}
		
			$("#lines3").change(function(){
 			$.post(G_CTX_PATH + "/normal/getBsNameByLineName", 
					{linName:$("[name='lines3']").val(),dir:$("[name='dir3']").val()}, 
					function(data) {
						var options = "";
						if(data.success) {
							for(var i=0;i<data.bsNames.length;i++){
						          options+="<option value='"+data.bsNames[i].bsName+"'>"+data.bsNames[i].bsName+"</option>";        
						        }
							$("#bs option").remove();
							$("#bs").append(options);
						}
					});
				}); 
			
			$("#dir3").change(function(){
	 			$.post(G_CTX_PATH + "/normal/getBsNameByLineName", 
						{linName:$("[name='lines3']").val(),dir:$("[name='dir3']").val()}, 
						function(data) {
							var options = "";
							if(data.success) {
								for(var i=0;i<data.bsNames.length;i++){
							          options+="<option value='"+data.bsNames[i].bsName+"'>"+data.bsNames[i].bsName+"</option>";        
							        }
								$("#bs option").remove();
								$("#bs").append(options);
							}
						});
					}); 
			
			function search4() {
				if($("[name='bs']").val() == "" || $("[name='tTime1']").val() == "") {
					alert("请检查查询条件");
					return;
				}
 				$.post(G_CTX_PATH + "/normal/getBsPF", 
						{lineName:$("[name='lines3']").val(),dir:$("[name='dir3']").val(),bsName:$("[name='bs']").val(),type:$("[name='pfType']").val(),targetTime:$("[name='tTime1']").val()}, 
						function(data) {
							if(data.success) {
								require([ 'echarts', 'echarts/chart/line' ],
										function(ec) {
											// 基于准备好的dom，初始化echarts图表
											var myChart = ec.init(document.getElementById('myChart_8'));
											var option = {
												title : {
													text :$("[name='tTime1']").val() + $("[name='bs']").val() + '刷卡客流时变', 
													subtext : '',
													x : 'center'
												},
												tooltip : {
													trigger : 'axis'
												},
												legend : {
													data : []
												},
												toolbox : {
					 								show : true,
					 								orient:'vertical',
													x:'left',
													y:'center',
					 								feature : {mark:{show:true},
														dataView:{show:true,readOnly:false},
														magicType:{show:false,type:['line','bar']},
														restore:{show:true},
														saveAsImage:{show:true}}
					 							},
												calculable : true,
												xAxis : [ {
													type : 'category',
													name : '小时',
													boundaryGap : false,
													data : [ '0H','1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H',
															'9H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', 
															'17H', '18H', '19H', '20H', '21H', '22H', '23H' ]
												} ],
												yAxis : [ {
													type : 'value',
													name : '小时客流'
												} ],
												series : [ {
													name : '站点客流',
													type : 'line',
													smooth : true,
													itemStyle : {
														normal : {
															areaStyle : {
																type : 'default'
															}
														}
													},
													data : data.yList
												} ]
											};
			
											// 为echarts对象加载数据 
											myChart.setOption(option);
										});
								
				 				require([ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
				 						function(ec, theme) {
				 							// 基于准备好的dom，初始化echarts图表
				 							var myChart = ec.init(document.getElementById('myChart_6'), theme);
				 							option = {
				 								title : {
				 									text : '(7:00~9:00)站点刷卡客流各线路占比',
				 									x : 'center'
				 								},
				 							    tooltip : {
				 							        trigger: 'item',
				 							        formatter: "{b} : {c} ({d}%)"
				 							    },
				 							    legend: {
				 							        orient : 'vertical',
				 							        x : 'left',
				 							        data:data.amX
				 							    },
				 							    toolbox: {
				 							        show : false
				 							    },
				 							    calculable : true,
				 							    series : [
				 							        {
				 							            name:'吸引客流',
				 							            type:'pie',
				 							            radius : '65%',
				 		            					center: ['50%', '60%'],
				 							            itemStyle : {
				 							                normal : {
				 							                    label : {
				 							                        show : false
				 							                    },
				 							                    labelLine : {
				 							                        show : false
				 							                    }
				 							                }
				 							            },
				 							            data:
				 							            	data.amY
// 				 							            	[{value:'500', name:'N'}, {value:'200', name:'S'}]
				 							        }
				 							    ]
				 							};
				 							
				 							// 为echarts对象加载数据 
				 							myChart.setOption(option);
				 						});
				 				
				 				require([ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
				 						function(ec, theme) {
				 							// 基于准备好的dom，初始化echarts图表
				 							var myChart = ec.init(document.getElementById('myChart_7'), theme);
				 							option = {
				 								title : {
				 									text : '(17:00~19:00)站点刷卡客流各线路占比',
				 									x : 'center'
				 								},
				 							    tooltip : {
				 							        trigger: 'item',
				 							        formatter: "{b} : {c} ({d}%)"
				 							    },
				 							    legend: {
				 							        orient : 'vertical',
				 							        x : 'left',
				 							        data:data.pmX
				 							    },
				 							    toolbox: {
				 							        show : false
				 							    },
				 							    calculable : true,
				 							    series : [
				 							        {
				 							            name:'吸引客流',
				 							            type:'pie',
				 							            radius : '65%',
				 		            					center: ['50%', '60%'],
				 							            itemStyle : {
				 							                normal : {
				 							                    label : {
				 							                        show : false
				 							                    },
				 							                    labelLine : {
				 							                        show : false
				 							                    }
				 							                }
				 							            },
				 							            data:data.pmY
				 							        }
				 							    ]
				 							};
				 							
				 							// 为echarts对象加载数据 
				 							myChart.setOption(option);
				 						});
							}
					});
			}
		
		</script>
		
		<script type="text/javascript">
			jQuery(function($) {
			   $('#sidebar2').insertBefore('.page-content').ace_sidebar('collapse', false);
			   $('#navbar').addClass('h-navbar');
			   $('.footer').insertAfter('.page-content');
			   
			   $('.page-content').addClass('main-content');
			   
			   $('.menu-toggler[data-target="#sidebar2"]').insertBefore('.navbar-brand');
			   
			   $(document).on('settings.ace.two_menu', function(e, event_name, event_val) {
				 if(event_name == 'sidebar_fixed') {
					 if( $('#sidebar').hasClass('sidebar-fixed') ) $('#sidebar2').addClass('sidebar-fixed')
					 else $('#sidebar2').removeClass('sidebar-fixed')
				 }
			   }).triggerHandler('settings.ace.two_menu', ['sidebar_fixed' ,$('#sidebar').hasClass('sidebar-fixed')]);
			   
			   $('#sidebar2[data-sidebar-hover=true]').ace_sidebar_hover('reset');
			   $('#sidebar2[data-sidebar-scroll=true]').ace_sidebar_scroll('reset', true);
			   
			   $('#sidebar-collapse').click();
			   
			    //datepicker plugin
				//link
				$('.date-picker').datepicker({
					autoclose: true,
					todayHighlight: true
				})
				//show datepicker when clicking on the icon
				.next().on(ace.click_event, function(){
					$(this).prev().focus();
				});
				
				//or change it into a date range picker
				$('.input-daterange').datepicker({autoclose:true});
				
				
				//to translate the daterange picker, please copy the "examples/daterange-fr.js" contents here before initialization
				$('input[name=date-range-picker]').daterangepicker({
					'applyClass' : 'btn-sm btn-success',
					'cancelClass' : 'btn-sm btn-default',
					locale: {
						applyLabel: 'Apply',
						cancelLabel: 'Cancel',
					}
				})
				.prev().on(ace.click_event, function(){
					$(this).next().focus();
				});
			});
		</script>

	</body>
</html>
