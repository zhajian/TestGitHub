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
        "${ctx}/static/gis/index.swf?config=config-main.xml", "flashContent", 
        "100%", "100%", 
        swfVersionStr, xiSwfUrlStr, 
        flashvars, params, attributes);
    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
    swfobject.createCSS("#flashContent", "display:block;text-align:left;");
</script>


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
					<a href="${ctx}/normal/index">
						<i class="menu-icon fa fa-home"></i>
						<span class="menu-text">首　页页</span>
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
														<!--<i class="fa fa-usd green"></i> -->
														<div class="boxchart-overlay green">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${allLines }</span> <span class="title">示范区公交营运线路数</span>
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
														<span class="value">${allStations }</span> <span class="title">示范区公交站点数</span>
													</div>
												</div>
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<div class="boxchart-overlay blue">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${sumNum }</span> <span class="title">示范区公交营运线路总里程</span>
													</div>
												</div>
						
												<div class="col-lg-12 col-sm-12 col-xs-12 col-xxs-12">
													<div class="smallstat">
														<div class="boxchart-overlay red">
															<div class="infobox-dark">
																<span class="sparkline" data-values="3,5,2,3,6,5,8,4"></span>
															</div>
														</div>
														<span class="value">${transitNum }</span> <span class="title">示范区公交专用道总里程数(车道总里程)</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							
								<div class="col-sm-8">
									<div class="widget-box">
										<div class="widget-header"><h5 class="widget-title">线路布局</h5></div>
										<div class="panel-body" style="height: 350px;padding: 0px;">
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
								<!-- /.col -->
								
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="widget-box">
										<div class="widget-header">
											<h5 class="widget-title">陆家嘴客流趋势(刷客客流)</h5>
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
										<div class="widget-header"><h5 class="widget-title">浦东南路客流趋势(刷客客流)</h5>
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
										<div class="widget-header"><h5 class="widget-title">陆家嘴区域客流构成(刷卡客流)</h5></div>
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
										<div class="widget-header"><h5 class="widget-title">浦东南路客流分析(刷卡客流)</h5></div>
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
			click();
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
	</script>

	<script type="text/javascript">
	var time = '20160301';

	function click() {
		$.post(G_CTX_PATH + "/normal/getAreaPFByHour", 
				{time:time}, 
				function(data) {
					if(data.success) {
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
													 '9H', '10H', '11H', '12H', '13H', '14H', '15H',
													 '16H','17H','18H','19H','20H','21H','22H','23H']
										} ],
										yAxis : [ {
											type : 'value',
											name : '小时刷客客流'
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
		
		$.post(G_CTX_PATH + "/normal/getLinePFByHour", 
				{time:time},
				function(data) {
					if(data.success) {
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
													 '9H', '10H', '11H', '12H', '13H', '14H', '15H',
													 '16H','17H','18H','19H','20H','21H','22H','23H']
										} ],
										yAxis : [ {
											type : 'value',
											name : '小时刷卡客流',
										} ],
										series : [ {
											name : '路径客流',
											type : 'line',
											smooth : true,
											itemStyle : {
												normal : {
													areaStyle : {
														type : 'default'
													}
												}
											},
											data : data.yyList
										} ]
									};

									// 为echarts对象加载数据 
									myChart.setOption(option);
								});
					}
				});
	}
	</script>

	<script type="text/javascript">
		require([ 'echarts', 'echarts/chart/pie' ],// 使用柱状图就加载bar模块，按需加载
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('myChart5_1'));
			option = {
				title : {
					text : '到达客流',
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
			            name:'到达客流',
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
			                {value:'${OMETRO}', name:'地铁'},
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
							text : '出发客流',
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
					            name:'出发客流',
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
					        data:['南向北','北向南']
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
					                {value:'${ONN}', name:'南向北'},
					                {value:'${ONS}', name:'北向南'}
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
					        data:['南向北','北向南']
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
					                {value:'${OFFN}', name:'南向北'},
					                {value:'${OFFS}', name:'北向南'}
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
