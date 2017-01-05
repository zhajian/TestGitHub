$(function(){
	setTimeout("refresh()",0);
	var time_go = 0,
		start = 5;
	time_go = setInterval("autoPlay()", 5000);
	$(window).resize(function(){
		widthAuto();
	});
/*	$('.get-login').click(function(){
		alert("发送验证码");
		time(this);
	});*/
/*	setInterval(function(){
		start >= 0 ? (
			$(".login").children("p").html('正在登陆'+' '+start),
			start--
		) : clearInterval;window.location.href = "${ctx}/portals";
		
	},1000);*/

});


//自动播放
function autoPlay() {
	var i = $("li.active").index();
	i++;
	i > 3 ? i = 0 : 0;
	$(".nav > li").eq(i).addClass("active").siblings().removeClass("active");
	$(".pic > li").eq(i).show().siblings().hide();
}
//屏幕自适应
function widthAuto(){
	var Height = $(".pic>li").height();
	console.log(Height)
	Height < 314 ? $(".slider").css({height:Height}) : 0;
}
//刷新重置
function  refresh(){
	var H = $(".pic").find("img").height();console.log(H)
	H< 314 ? $(".slider").css({height:H}) : 0;
}

