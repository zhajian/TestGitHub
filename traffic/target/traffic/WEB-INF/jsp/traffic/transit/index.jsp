<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>上海市浦东公交辅助决策分析示范应用系统</title>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<meta name="description" content="top menu &amp; navigation" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="${ctx}/static/assets/css/bootstrap.css" />
<link rel="stylesheet" href="${ctx}/static/assets/css/font-awesome.css" />

<!-- text fonts -->
<link rel="stylesheet" href="${ctx}/static/assets/css/ace-fonts.css" />

<!-- ace styles -->
<link rel="stylesheet" href="${ctx}/static/assets/css/ace.css"
	class="ace-main-stylesheet" id="main-ace-style" />

<link rel="stylesheet" href="${ctx}/static/assets/css/style.css" />

</head>

<body class="no-skin">
	<!-- #section:basics/navbar.layout -->
	<div id="navbar" class="navbar navbar-default navbar-collapse h-navbar">
		<script type="text/javascript">
			try {
				ace.settings.check('navbar', 'fixed')
			} catch (e) {
			}
		</script>

		<div class="navbar-container" id="navbar-container">
			<div class="navbar-header pull-left">
				<!-- #section:basics/navbar.layout.brand -->
				<a href="#" class="navbar-brand"> <small> <i
						class="fa fa-globe"></i> 上海市浦东公交辅助决策分析应用系统 </small> </a>

				<!-- /section:basics/navbar.layout.brand -->
				<button class="pull-right navbar-toggle collapsed" type="button"
					data-toggle="collapse" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span> <span class="icon-bar"></span>

					<span class="icon-bar"></span> <span class="icon-bar"></span>
				</button>

				<!-- /section:basics/navbar.toggle -->
			</div>
			
			<div class="pull-right">数据更新于最新一天</div>

			<!-- #section:basics/navbar.dropdown -->

			<!-- /section:basics/navbar.dropdown -->
			<!-- 
				<nav role="navigation" class="navbar-menu pull-right collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li>
							<a href="#">
								<i class="ace-icon fa fa-home"></i>
								首　页
							</a>
						</li>
						<li>
							<a href="#">
								公交客流分析
							</a>
						</li>
						<li>
							<a href="#">
								公交枢纽分析
							</a>
						</li>
						<li>
							<a href="#">
								公交专用道分析
							</a>
						</li>
						<li>
							<a href="#">
								公交运营分析
							</a>
						</li>
					</ul>

				</nav>
				 -->
		</div>
		<!-- /.navbar-container -->
	</div>

	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try {
				ace.settings.check('main-container', 'fixed')
			} catch (e) {
			}
		</script>

		<!-- #section:basics/sidebar.horizontal -->
		<div id="sidebar" class="sidebar h-sidebar navbar-collapse collapse">
			<script type="text/javascript">
				try {
					ace.settings.check('sidebar', 'fixed')
				} catch (e) {
				}
			</script>

			<ul class="nav nav-list">
				<li class="active open hover highlight">
					<a href="index.jsp">
						<i class="menu-icon fa fa-home"></i>
						<span class="menu-text">首　页</span>
					</a>
					<b class="arrow"></b>
				</li>

				<li class="hover highlight">
					<a href="index2.jsp" >
						<i class="menu-icon glyphicon glyphicon-tasks"></i>
						<span class="menu-text">
							公交走廊分析
						</span>
<!-- 							<b class="arrow fa fa-angle-down"></b> -->
					</a>
					<b class="arrow"></b>
				</li>
				
				<li class="hover highlight">
					<a href="index3.jsp" >
						<i class="menu-icon glyphicon glyphicon-road"></i>
						<span class="menu-text">
							公交枢纽分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>
				
				<li class="hover highlight">
					<a href="index4.jsp" >
						<i class="menu-icon fa fa-leaf"></i>
						<span class="menu-text">
							公交专用道分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>
				
				<li class="hover highlight">
					<a href="index5.jsp" >
						<i class="menu-icon fa fa-tachometer"></i>
						<span class="menu-text">
							公交运行分析
						</span>
					</a>
					<b class="arrow"></b>
				</li>
				
			</ul><!-- /.nav-list -->

			<!-- #section:basics/sidebar.layout.minimize -->

			<!-- /section:basics/sidebar.layout.minimize -->
			<script type="text/javascript">
				try {
					ace.settings.check('sidebar', 'collapsed')
				} catch (e) {
				}
			</script>
		</div>

		<!-- /section:basics/sidebar.horizontal -->
		<div class="main-content">
			<div class="main-content-inner">
				<div class="page-content">

					<div class="row">
						<div class="col-xs-12">

							<div class="row">
								<div class="col-sm-4">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">总体分析</h5></div>
										<div class="panel-body">
											<div class="row">
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<div class="boxchart-overlay blue">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${sumNum }</span> <span class="title">线路总里程</span>
													</div>
												</div>
						
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<div class="boxchart-overlay red">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${transitNum }</span> <span class="title">公交专用道里程</span>
													</div>
												</div>
						
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<!--<i class="fa fa-usd green"></i> -->
														<div class="boxchart-overlay green">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${allLines }</span> <span class="title">线路数</span>
													</div>
												</div>
						
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<!--<div class="piechart-overlay blue">
															<div class="easy-pie-chart percentage" data-percent="61"
																data-size="39">
																<span class="percent">61</span>%
															</div>
														</div>-->
														<div class="boxchart-overlay yellow">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${allStations }</span> <span class="title">站点数</span>
													</div>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">线路布局</h5></div>
										<div class="panel-body">
											<div id="myMap" style="width: 100%;height: 320px;"></div>
										</div>
									</div>
								</div>
								<!-- /.col -->

							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="widget-box">
										<div class="widget-header">
											<h5 class="widget-title">区域客流趋势</h5>
											<div class="widget-toolbar no-border">
												<ul class="nav nav-tabs" id="myTab">
													<li class="active"><a data-toggle="tab" href="#h1">24H</a>
													</li>
													<li><a data-toggle="tab" href="#m1">Month</a></li>
													<li><a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a></li>
												</ul>
											</div>
										</div>
										<div class="panel-body" style="padding: 0px;">
											<div class="tab-content no-border" style="padding: 0px;">
												<div id="h1" class="tab-pane active">
													<div id="myChart3_1" style="width: 100%;height: 260px;"></div>
												</div>
												<div id="m1" class="tab-pane">
													<div id="myChart3_2" style="width: 100%;height: 260px;"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">路径客流趋势</h5>
											<div class="widget-toolbar no-border">
												<ul class="nav nav-tabs" id="myTab">
													<li class="active"><a data-toggle="tab" href="#h2">24H</a>
													</li>
													<li><a data-toggle="tab" href="#m2">Month</a></li>
													<li><a href="#" data-action="close"> <i class="ace-icon fa fa-times"></i> </a></li>
												</ul>
											</div>
										</div>
										<div class="panel-body" style="padding: 0px;">
											<div class="tab-content no-border" style="padding: 0px;">
												<div id="h2" class="tab-pane in active">
													<div id="myChart4_1" style="width: 100%;height: 260px;"></div>
												</div>
												<div id="m2" class="tab-pane">
													<div id="myChart4_2" style="width: 100%;height: 260px;"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">区域客流</h5></div>
										<div class="panel-body">
											<div class="row">
												<div class="col-sm-6">
													<div id="myChart5_1" style="width: 100%;height: 260px;"></div>
												</div>
												<div class="col-sm-6">
													<div id="myChart5_2" style="width: 100%;height: 260px;"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">线路客流</h5></div>
										<div class="panel-body">
											<div class="row">
												<div class="col-sm-6">
													<div id="myChart6_1" style="width: 100%;height: 260px;"></div>
												</div>
												<div class="col-sm-6">
													<div id="myChart6_2" style="width: 100%;height: 260px;"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
						<!-- /.page-content -->

					</div>
				</div>

			</div>
		</div>
		<!-- /.main-content -->

		<div class="footer">
			<div class="footer-inner">
				<!-- #section:basics/footer -->
				<div class="footer-content">
					<span class="bigger-120"> <span class="blue bolder"></span>
						上海市浦东交通 &copy; 2016 </span> &nbsp; &nbsp; <span class="action-buttons">
						<a href="#"> <i
							class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
					</a> <a href="#"> <i
							class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
					</a> <a href="#"> <i
							class="ace-icon fa fa-rss-square orange bigger-150"></i> </a> </span>
				</div>

				<!-- /section:basics/footer -->
			</div>
		</div>

		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i> </a>
	</div>
	<!-- /.main-container -->

	<!-- basic scripts -->

	<!--[if !IE]> -->
	<script type="text/javascript">
		window.jQuery
				|| document.write("<script src='${ctx}/static/assets/js/jquery.js'>"
						+ "<"+"/script>");
	</script>

	<!-- <![endif]-->

	<script type="text/javascript">
		if ('ontouchstart' in document.documentElement)
			document.write("<script src='${ctx}/static/assets/js/jquery.mobile.custom.js'>"
					+ "<"+"/script>");
	</script>
	<script src="${ctx}/static/assets/js/bootstrap.js"></script>
	
	<script src="${ctx}/static/assets/js/ace/ace.widget-box.js"></script>

	<script src="${ctx}/static/assets/js/jquery.easypiechart.js"></script>
	<script src="${ctx}/static/assets/js/jquery.sparkline.js"></script>


	<script type="text/javascript">
		jQuery(function($) {
			$('.easy-pie-chart.percentage')
					.each(
							function() {
								var $box = $(this).closest('.infobox');
								var barColor = $(this).data('color')
										|| (!$box.hasClass('infobox-dark') ? $box
												.css('color')
												: 'rgba(255,255,255,0.95)');
								var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)'
										: '#FFFFFF';
								var size = parseInt($(this).data('size')) || 50;
								$(this)
										.easyPieChart(
												{
													barColor : barColor,
													trackColor : trackColor,
													scaleColor : false,
													lineCap : 'butt',
													lineWidth : parseInt(size / 10),
													animate : /msie\s*(8|7|6)/
															.test(navigator.userAgent
																	.toLowerCase()) ? false
															: 1000,
													size : size
												});
							});

			$('.sparkline').each(
					function() {
						var $box = $(this).closest('.infobox');
						var barColor = !$box.hasClass('infobox-dark') ? $box
								.css('color') : '#FFF';
						$(this).sparkline('html', {
							tagValuesAttribute : 'data-values',
							type : 'bar',
							barColor : barColor,
							chartRangeMin : $(this).data('min') || 0
						});
					});

		});
	</script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
		jQuery(function($) {
			var $sidebar = $('.sidebar').eq(0);
			if (!$sidebar.hasClass('h-sidebar'))
				return;

			$(document)
					.on(
							'settings.ace.top_menu',
							function(ev, event_name, fixed) {
								if (event_name !== 'sidebar_fixed')
									return;

								var sidebar = $sidebar.get(0);
								var $window = $(window);

								//return if sidebar is not fixed or in mobile view mode
								var sidebar_vars = $sidebar.ace_sidebar('vars');
								if (!fixed
										|| (sidebar_vars['mobile_view'] || sidebar_vars['collapsible'])) {
									$sidebar.removeClass('lower-highlight');
									//restore original, default marginTop
									ace.helper.removeStyle(sidebar,
											'margin-top')

									$window.off('scroll.ace.top_menu')
									return;
								}

								var done = false;
								$window
										.on(
												'scroll.ace.top_menu',
												function(e) {

													var scroll = $window
															.scrollTop();
													scroll = parseInt(scroll / 4);//move the menu up 1px for every 4px of document scrolling
													if (scroll > 17)
														scroll = 17;

													if (scroll > 16) {
														if (!done) {
															$sidebar
																	.addClass('lower-highlight');
															done = true;
														}
													} else {
														if (done) {
															$sidebar
																	.removeClass('lower-highlight');
															done = false;
														}
													}

													sidebar.style['marginTop'] = (17 - scroll)
															+ 'px';
												}).triggerHandler(
												'scroll.ace.top_menu');

							}).triggerHandler(
							'settings.ace.top_menu',
							[ 'sidebar_fixed',
									$sidebar.hasClass('sidebar-fixed') ]);

			$(window).on(
					'resize.ace.top_menu',
					function() {
						$(document).triggerHandler(
								'settings.ace.top_menu',
								[ 'sidebar_fixed',
										$sidebar.hasClass('sidebar-fixed') ]);
					});

		});
	</script>

	<script src="${ctx}/static/echarts/js/echarts.js"></script>

	<script type="text/javascript">
		// 路径配置
		require.config({
			paths : {
				echarts : '${ctx}/static/echarts/js'
			}
		});
		require([ 'echarts', 'echarts/chart/map' ], function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('myMap'));
			option = {
				title : {
					text : 'iphone销量',
					subtext : '纯属虚构',
					x : 'center'
				},
				tooltip : {
					trigger : 'item'
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : [ 'iphone3', 'iphone4', 'iphone5' ]
				},
				dataRange : {
					min : 0,
					max : 2500,
					x : 'left',
					y : 'bottom',
					text : [ '高', '低' ], // 文本，默认为数值文本
					calculable : true
				},
				toolbox : {
					show : true,
					orient : 'vertical',
					x : 'right',
					y : 'center',
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				roamController : {
					show : true,
					x : 'right',
					mapTypeControl : {
						'china' : true
					}
				},
				series : [ {
					name : 'iphone3',
					type : 'map',
					mapType : 'china',
					roam : false,
					itemStyle : {
						normal : {
							label : {
								show : true
							}
						},
						emphasis : {
							label : {
								show : true
							}
						}
					},
					data : [ {
						name : '北京',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '天津',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '上海',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '重庆',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '河北',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '河南',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '云南',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '辽宁',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '黑龙江',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '湖南',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '安徽',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '山东',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '新疆',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '江苏',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '浙江',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '江西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '湖北',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '广西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '甘肃',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '山西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '内蒙古',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '陕西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '吉林',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '福建',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '贵州',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '广东',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '青海',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '西藏',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '四川',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '宁夏',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '海南',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '台湾',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '香港',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '澳门',
						value : Math.round(Math.random() * 1000)
					} ]
				}, {
					name : 'iphone4',
					type : 'map',
					mapType : 'china',
					itemStyle : {
						normal : {
							label : {
								show : true
							}
						},
						emphasis : {
							label : {
								show : true
							}
						}
					},
					data : [ {
						name : '北京',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '天津',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '上海',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '重庆',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '河北',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '安徽',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '新疆',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '浙江',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '江西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '山西',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '内蒙古',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '吉林',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '福建',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '广东',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '西藏',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '四川',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '宁夏',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '香港',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '澳门',
						value : Math.round(Math.random() * 1000)
					} ]
				}, {
					name : 'iphone5',
					type : 'map',
					mapType : 'china',
					itemStyle : {
						normal : {
							label : {
								show : true
							}
						},
						emphasis : {
							label : {
								show : true
							}
						}
					},
					data : [ {
						name : '北京',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '天津',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '上海',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '广东',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '台湾',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '香港',
						value : Math.round(Math.random() * 1000)
					}, {
						name : '澳门',
						value : Math.round(Math.random() * 1000)
					} ]
				} ]
			};

			// 为echarts对象加载数据 
			myChart.setOption(option);
		});
	</script>


	<script type="text/javascript">
		// 路径配置
		require.config({
			paths : {
				echarts : '${ctx}/static/echarts/js'
			}
		});
	</script>

	<script type="text/javascript">
		require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('myChart3_1'));
			var option = {
				title : {
					text : '',
					subtext : ''
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : []
				},
				toolbox : {
					show : false,
					feature : {}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : [ '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H',
							'9H', '10H', '11H', '12H', '13H', '14H', '15H' ]
				} ],
				yAxis : [ {
					type : 'value'
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
					data : [ 30, 55, 10, 20, 40, 80, 160, 210, 90, 120, 150,
							180, 270, 50, 90 ]
				} ]
			};

			// 为echarts对象加载数据 
			myChart.setOption(option);
		});
	</script>

	<script type="text/javascript">
		require([ 'echarts', 'echarts/chart/line' ],// 使用柱状图就加载bar模块，按需加载
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('myChart4_1'));
			var option = {
				title : {
					text : '',
					subtext : ''
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : []
				},
				toolbox : {
					show : false,
					feature : {}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : [ '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H',
							'9H', '10H', '11H', '12H', '13H', '14H', '15H' ]
				} ],
				yAxis : [ {
					type : 'value'
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
					data : [ 30, 55, 10, 20, 40, 80, 160, 210, 90, 120, 150,
							180, 270, 50, 90 ]
				} ]
			};

			// 为echarts对象加载数据 
			myChart.setOption(option);
		});
	</script>

	<script type="text/javascript">
		require([ 'echarts', 'echarts/chart/pie' ],// 使用柱状图就加载bar模块，按需加载
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('myChart5_1'));
			option = {
				title : {
					text : '吸引客流',
					x : 'center'
				},
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['地铁','公交']
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : true,
			    series : [
			        {
			            name:'吸引客流',
			            type:'pie',
			            radius : ['50%', '70%'],
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
			            data:[
			                {value:'${OMETRO}',name:'地铁'},
			                {value:'${OBUS}', name:'公交'}
			            ]
			        }
			    ]
			};
                    
			// 为echarts对象加载数据 
			myChart.setOption(option);
		});
	</script>

	<script type="text/javascript">
		require(
				[ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],// 使用柱状图就加载bar模块，按需加载
				function(ec) {
					// 基于准备好的dom，初始化echarts图表
					var myChart = ec.init(document.getElementById('myChart5_2'));
					option = {
						title : {
							text : '产生客流',
							x : 'center'
						},
					    tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:['地铁','公交']
					    },
					    toolbox: {
					        show : false
					    },
					    calculable : true,
					    series : [
					        {
					            name:'吸引客流',
					            type:'pie',
					            radius : ['50%', '70%'],
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
					            data:[
					                {value:'${DMETRO}', name:'地铁'},
					                {value:'${DBUS}', name:'公交'}
					            ]
					        }
					    ]
					};
					// 为echarts对象加载数据 
					myChart.setOption(option);
				});
	</script>

	<script type="text/javascript">
		require(
				[ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
				function(ec, theme) {
					// 基于准备好的dom，初始化echarts图表
					var myChart = ec.init(document.getElementById('myChart6_1'), theme);
					option = {
						title : {
							text : '沿线上客总量',
							x : 'center'
						},
					    tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:['N','S']
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
					            data:[
					                {value:'${ONN}', name:'N'},
					                {value:'${ONS}', name:'S'}
					            ]
					        }
					    ]
					};
					
					// 为echarts对象加载数据 
					myChart.setOption(option);
				});
	</script>

	<script type="text/javascript">
		require(
				[ 'echarts', 'echarts/theme/infographic', 'echarts/chart/pie' ],
				function(ec, theme) {
					// 基于准备好的dom，初始化echarts图表
					var myChart = ec.init(document.getElementById('myChart6_2'), theme);
					option = {
						title : {
							text : '沿线下客总量',
							x : 'center'
						},
					    tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:['N','S']
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
					            data:[
					                {value:'${OFFN}', name:'N'},
					                {value:'${OFFS}', name:'S'}
					            ]
					        }
					    ]
					};
					
					// 为echarts对象加载数据 
					myChart.setOption(option);
				});
	</script>

</body>
</html>
