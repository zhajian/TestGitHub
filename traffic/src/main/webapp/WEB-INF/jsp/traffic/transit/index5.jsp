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
		<div id="sidebar" class="sidebar h-sidebar navbar-collapse collapse">
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
				
				<li class="hover highlight">
					<a href="${ctx}/normal/index4" >
						<i class="menu-icon fa fa-leaf"></i>
						<span class="menu-text">
							公交专用道分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>
				
				<li class="active open hover highlight">
					<a href="${ctx}/normal/index5" >
						<i class="menu-icon fa fa-tachometer"></i>
						<span class="menu-text">
							路段运行分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>
				
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
												<span class="menu-text"> 运营车速分析 </span>
												<b class="arrow fa fa-angle-down"></b>
											</a>
					
											<b class="arrow"></b>
					
											<ul class="submenu">
												<li class="active" id="menu_1">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														公交线路运营车速
													</a>
													<b class="arrow"></b>
												</li>
											<!-- 
												<li class="" id="menu_2">
													<a href="#" onclick="menu_click(this)">
														<i class="menu-icon fa fa-caret-right"></i>
														道路路段运营车速
													</a>
													<b class="arrow"></b>
												</li>
											 -->
											</ul>
										</li>
									</ul><!-- /.nav-list -->

									<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
										<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
									</div>
									
								</div><!-- .sidebar -->
							</div>

							<!-- 公交线路运营车速 -->
							<div id="div_menu_1">
								<div class="page-header">
									<h1>运营车速分析 </h1>
								</div><!-- /.page-header -->
								<form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-sm-2 control-label">方向 </label>
										<div class="col-sm-3">
											<select class="form-control" name="dir1">
												<option value="南向北">南向北</option>
												<option value="北向南">北向南</option>
											</select>
										</div>
										<label class="col-sm-2 control-label"> 日期 </label>
										<div class="col-sm-3 input-group" style="float: left;padding-left: 10px;padding-right: 10px;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" name="time1"/>
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<div class="col-sm-2 center">
											<button type="button" class="btn btn-primary btn-sm" onclick="search1()">查　询</button>
										</div>
									</div>
							    </form>
							    
							    <!-- 公交线网总体运营车速 -->
							    <div class="row">
							    	<div class="col-sm-12">
									    <div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">公交专用道各路段运营车速时变</h5></div>
							    			<div class="panel-body">
												<!-- body-content -->
												<div id="myChart1" style="width: 100%;height: 300px;"></div>
											</div>
							    		</div>
						    		</div>
								</div>
							</div>
							
							
							<!-- 道路运营车速 -->
							<!-- 
							<div id="div_menu_2">
								<div class="page-header">
									<h1>总体评价 </h1>
								</div>
								<form class="form-horizontal" role="form">
							    	<div class="form-group">
							    		<label class="col-sm-2 control-label"> 选择日期 </label>
										<div class="col-sm-3 input-group" style="float: left;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" />
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<label class="col-sm-2 control-label"> 选择时段 </label>
										<div class="col-sm-3 input-group" style="float: left;">
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
							    	<div class="col-sm-6" style="padding-right: 0px;">
							    		<div class="widget-box">
											<div class="widget-header"><h5 class="widget-title">道路路段运营车速</h5></div>
											<div class="panel-body">
												
											</div>
										</div>
							    	</div>
							    	<div class="col-sm-6" style="">
							    		<div class="widget-box">
											<div class="widget-header"><h5 class="widget-title">不同道路路等级运营车速</h5></div>
											<div class="panel-body">
												
											</div>
										</div>
							    		
							    	</div>
							    </div>
							    
							    <div class="page-header">
									<h1>道路查询 </h1>
								</div>
								<form class="form-horizontal" role="form">
							    	<div class="form-group">
							    		<label class="col-sm-2 control-label"> 选择日期 </label>
										<div class="col-sm-3 input-group" style="float: left;">
											<input class="form-control date-picker" id="id-date-picker-1" type="text" />
											<span class="input-group-addon">
												<i class="fa fa-calendar bigger-110"></i>
											</span>
										</div>
										<label class="col-sm-2 control-label"> 选择道路 </label>
										<div class="col-sm-3 input-group" style="float: left;">
											<select class="form-control">
												<option></option>
											</select>
										</div>
										<div class="col-sm-2">
											<button type="button" class="btn btn-primary btn-sm">查　询</button>
										</div>
									</div>
							    </form>
							    
							    <div class="row">
							    	<div class="col-sm-12" style="">
							    		<div class="widget-box">
							    			<div class="widget-header"><h5 class="widget-title">道路公交线路运营速度及服务等级</h5></div>
							    			<div class="panel-body" style="padding: 1px;">
												<table id="sample-table-2" class="table table-bordered center no-margin-bottom">
													<thead>
														<tr>
															<th class="center">线路名</th>
															<th class="center">日客流量</th>
														</tr>
													</thead>
														<tr>
															<td>成山路上南路</td>
															<td>1000</td>
														</tr>
														<tr>
															<td>秀海路上南路</td>
															<td>950</td>
														</tr>
														<tr>
															<td>衢州路上南路</td>
															<td>900</td>
														</tr>
														<tr>
															<td>成山路上南路</td>
															<td>1000</td>
														</tr>
														<tr>
															<td>秀海路上南路</td>
															<td>950</td>
														</tr>
														<tr>
															<td>衢州路上南路</td>
															<td>900</td>
														</tr>
														<tr>
															<td>成山路上南路</td>
															<td>1000</td>
														</tr>
														<tr>
															<td>秀海路上南路</td>
															<td>950</td>
														</tr>
														<tr>
															<td>衢州路上南路</td>
															<td>900</td>
														</tr>
														<tr>
															<td>衢州路上南路</td>
															<td>900</td>
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
							    		
							    	</div>
							    </div>
							    
							</div>
							 -->

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
				search1();
			})
		</script>

	<script src="${ctx}/static/echarts/js/echarts.js"></script>

	<script type="text/javascript">
		// 路径配置
		require.config({
			paths : {
				echarts : '${ctx}/static/echarts/js'
			}
		});
	</script>

	<script type="text/javascript">
	function search1() {
		var ttime;
		if($("[name='time1']").val() == "") {
			ttime = getCurrentDateTime(-1);
		} else {
			ttime = $("[name='time1']").val();
		}
		$.post(G_CTX_PATH + "/normal/getBusSpeedPF", 
				{time:ttime,dir:$("[name='dir1']").val()}, 
				function(data) {
					if(data.success) {
						require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
								function(ec) {
									// 基于准备好的dom，初始化echarts图表
									var myChart = ec.init(document.getElementById('myChart1'));
									var option = {
										title : {
											text : '',
											subtext : ''
										},
										tooltip : {
											trigger : 'axis'
										},
										legend : {
											data : ['陆家嘴段','张扬段','塘桥段']
										},
										toolbox : {
											show : true,
											orient:'vertical',
											x:'left',
											y:'center',
											feature :{
												mark:{show:true},
												dataView:{show:true,readOnly:false},
												magicType:{show:false,type:['line','bar']},
												restore:{show:true},
												saveAsImage:{show:true}
											}
										},
										calculable : true,
										xAxis : [ {
											type : 'category',
											name : '时间（小时）',
											boundaryGap : false,
											data : [ '0H','1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H',
													'9H', '10H', '11H', '12H', '13H', '14H', '15H','16H',
													'17H','18H','19H','20H','21H','22H','23H']
										} ],
										yAxis : [ {
											type : 'value',
											name : '区段运营车速'
										} ],
										series : [ {
											name : '陆家嘴段',
											type : 'line',
											smooth : true,
											itemStyle : {
												normal : {
													areaStyle : {
														type : 'default'
													}
												}
											},
											data : data.yList1
										} ,{
											name : '张扬段',
											type : 'line',
											smooth : true,
											itemStyle : {
												normal : {
													areaStyle : {
														type : 'default'
													}
												}
											},
											data : data.yList2
										} ,{
											name : '塘桥段',
											type : 'line',
											smooth : true,
											itemStyle : {
												normal : {
													areaStyle : {
														type : 'default'
													}
												}
											},
											data : data.yList3
										} ]
									};

									// 为echarts对象加载数据 
									myChart.setOption(option);
								});
						}
				});
	}
	</script>

	</body>
</html>
