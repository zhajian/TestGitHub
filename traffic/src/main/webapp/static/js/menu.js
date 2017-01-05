$(document).ready(function() {
	var openNode = $(".sidebar .nav a[href='"+requestUri+"']").parent().addClass("active").parents("li").addClass("active open");
//	var breadText = $(".sidebar .nav li[class='active open']").find("a:first").text();
//	if (breadText.length >0 ) {
//		$(".breadcrumb").append("<li>"+breadText+"</li>");
//	}
	if(openNode.length > 0){
		$(".breadcrumb").empty().html("<li><i class=\"" + openNode.find("i").attr("class") + " home-icon\"></i><span>" + openNode.find("a:first span").text() + "</span></li>");
		var breadText = $(".sidebar .nav a[href='"+requestUri+"']").text();
		if (breadText.length >0 ) {
			$(".breadcrumb").append("<li>"+breadText+"</li>");
		}
	}else{
		var bread = $(".sidebar .nav a[href='"+requestUri+"']");
		$(".breadcrumb").empty().html("<li><i class=\"" + bread.find("i").attr("class") + " home-icon\"></i>"+bread.text()+"</li>");
	}
	$(".sidebar .nav a").click(function() {
		click_nav_menu($(this));
	})
	$('.ul_table .tbody input[type=checkbox]').removeAttr('checked');
	$('.ul_table').delegate('.tbody input[type=checkbox]', 'click', function() {
		$(this).closest('.tbody').toggleClass('selected');
		if (this.checked)
			ul_table.display_bar(1);
		//display action toolbar when a message is selected
		else {
			ul_table.display_bar($('.ul_table input[type=checkbox]:checked').length);
			//determine number of selected messages and display/hide action toolbar accordingly
		}
	});

	$('#id-toggle-all').removeAttr('checked').on('click', function() {
		if (this.checked) {
			ul_table.select_all();
		} else
			ul_table.select_none();
	});
//	breadcrumb="";
//	current_node = get_cookie("current_node");
//	$(".sidebar .nav a[node='" + current_node + "']").parents("li").each(function(){
//		$(this).addClass("active open");		
//		breadcrumb='<li>'+$(this).find("a:first").text()+'</li>'+breadcrumb;					
//	})	
//	$(".breadcrumb").append(breadcrumb);		
}); 