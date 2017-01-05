jQuery(function($) {
	
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	jQuery(grid_selector).jqGrid({
		url: G_CTX_PATH + "/activity/list",
		datatype: "json",
		mtype: "GET",
		width: "300",
		height: "320",
//		width:'auto',
//	 	height: 'auto',
//	 	autowidth:true,
		colNames:['活动ID', '活动标题', '活动状态','开始时间', '结束时间', '信息阶段', '活动描述', '活动说明', '特别提示'],
		colModel:[
			{name:'id',index:'id',width:12, sortable: false},
			{name:'name',index:'name',width:30, sortable: false},
			{name:'status',index:'status',width:15, sortable: false},
			{name:'beginTime',index:'beginTime', width:35, sortable: false, formatter: formatDate},
			{name:'endTime',index:'endTime', sortable: false, width:35, formatter: formatDate},
			{name:'dataStatusStr',index:'dataStatusStr',width:20, sortable: false},
			{name:'memo',index:'memo',width:20, sortable: false,hidden:true},
			{name:'instruction',index:'instruction',width:20, sortable: false,hidden:true},
			{name:'hint',index:'hint',width:20, sortable: false,hidden:true}
		], 
		jsonReader: {
			root: "rows",
			total: function(obj) {
						var total = obj.total; //总记录数
						var rowNum = parseInt($("#grid-table").getGridParam("rowNum")); //每页显示记录数 
		              	return total % rowNum > 0 ? total / rowNum + 1 : total / rowNum;
		            	},
			page: "page",
			records: "total",
			repeatitems: false
		},
		postData : {
			startTime : $('#startTime').val(),
			endTime : $('#endTime').val()
		},
		viewrecords : true,
		rowNum:10,
		rowList:[10,20,30],
		pager : pager_selector,
		altRows: true,
		//toppager: true,
		
		//multiselect: true,
		//multikey: "ctrlKey",
        multiboxonly: true,

		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				updatePagerIcons(table);
			}, 0);
		},
		autowidth: true
	});
	
	function query(){
		$("#grid-table").jqGrid('setGridParam',{page:1});
		$("#grid-table").jqGrid('setGridParam', {
			postData : {
				startTime : $('#startTime').val(),
				endTime : $('#endTime').val(),
				merchantId : $("#merchantId").val()
			},
			datatype : "json"
		}).trigger('reloadGrid');
	}
	
	click_tree_menu(function(domObj){
		$("#merchantId").val(domObj.attr("node"));
		query();
	});
	
	$("#searchBtn").on("click", function(){
		query();
	});
	
	//****************************修改活动******************************
	$("#editBtn").on("click", function(){
		$("#editOrDetailModal [tag=save]").show();
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
//		if(row.dataStatusStr == '审核通过') {
//			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不允许修改！");
//			return;
//		}
		$('#id1').val(id);
		
		var selectList = $("#status1")[0].options;
		for(var i=0; i<selectList.length; i++) {
			if(row.status == selectList[i].text) {
				selectList[i].selected = true;
				break;
			}
		}
		$('#status1').removeAttr("disabled");
		$('#name1').val(row.name);
		$('#name1').removeAttr("disabled");
		$('#memo1').val(row.memo);
		$('#memo1').removeAttr("disabled");
		$('#instruction1').val(row.instruction);
		$('#instruction1').removeAttr("disabled");
		$('#hint1').val(row.hint);
		$('#hint1').removeAttr("disabled");
		$('#beginTime1').val(row.beginTime);
		$('#beginTime1').removeAttr("disabled");
		$('#endTime1').val(row.endTime);
		$('#endTime1').removeAttr("disabled");
		$('#myModalLabel1').html('修改活动');
		$('#editOrDetailModal').modal();
	});
	
 	//****************************保存修改活动******************************
	$("#editOrDetailModal [tag=save]").click(function(){
		var row = jQuery('#grid-table').jqGrid('getRowData',$("#grid-table").jqGrid('getGridParam',"selrow"));
	
		var selected;
		var selectList = $("#status1")[0].options;
		for(var i=0; i<selectList.length; i++) {
			if(selectList[i].selected) {
				selected = selectList[i].text;
				break;
			}
		}
		
		if(row.name == $.trim($('#name1').val()) && row.memo == $.trim($('#memo1').val()) && row.instruction == $.trim($('#instruction1').val())
				&& row.hint == $.trim($('#hint1').val()) && row.beginTime == $('#beginTime1').val() && row.endTime == $('#endTime1').val()
				) 
		{
			if(row.status == selected) {
				alert("值未变化.");
				$("#editOrDetailModal [tag=close1]").click();
				return;
			} else {
				alert("仅变更了状态");
				$('#dataStatus').attr("disabled","disabled");
			}

		} else {
			alert("有值发生了变化.");
			$('#dataStatus').removeAttr("disabled");
			$('#dataStatus').val(2);
		}
		
		if(!$('#activityForm1').validate().form()) return false;
		var params = $('#activityForm1').serializeArray();	
		$.getJSON(G_CTX_PATH+"/activity/save",params,function(data){
	    if (data.success) {
	    	ui_alert("信息已更新",function(){
	    	});
    		$("#editOrDetailModal [tag=close1]").click();
    		$("#searchBtn").click();
	    } else {
	    	ui_error(data.data);
	    }
	});
	});
	
	//****************************活动详情******************************
	$("#detailBtn").on("click", function(){
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		var row = jQuery('#grid-table').jqGrid('getRowData',id);
		$('#id1').val(id);
		var selectList = $("#status1")[0].options;
		for(var i=0; i<selectList.length; i++) {
			if(row.status == selectList[i].text) {
				selectList[i].selected = true;
				break;
			}
		}
		$('#status1').attr("disabled","disabled");
		$('#name1').val(row.name);
		$('#name1').attr("disabled","disabled");
		$('#memo1').val(row.memo);
		$('#memo1').attr("disabled","disabled");
		$('#instruction1').val(row.instruction);
		$('#instruction1').attr("disabled","disabled");
		$('#hint1').val(row.hint);
		$('#hint1').attr("disabled","disabled");
		$('#beginTime1').val(row.beginTime);
		$('#beginTime1').attr("disabled","disabled");
		$('#endTime1').val(row.endTime);
		$('#endTime1').attr("disabled","disabled");
		$('#endTime1').attr("disabled","disabled");
		$("#editOrDetailModal [tag=save]").hide();
		$('#myModalLabel1').html('活动详情');
		$('#editOrDetailModal').modal();
	});
	
	//****************************删除活动******************************
	$("#deleteBtn").on("click", function(){	
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		if(id == null) {
			ui_error("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择行");
			return;
		}
		$('#warningModal').modal();
	});
	
	$("#warningModal [tag=save2]").click(function(){	
		var id = $("#grid-table").jqGrid('getGridParam',"selrow");
		$.getJSON(G_CTX_PATH+"/activity/delete",{id:id},function(data){
		    if (data.success) {
		    	ui_alert("信息已删除",function(){
		    	});
	    		$("#warningModal [tag=close2]").click();
	    		$("#searchBtn").click();
		    } else {
		    	ui_error(data.data);
		    }
		});
	});
	
	
	//****************************新增活动******************************
	$("#addModal [tag=save],[tag=close]").click(function(){
		var params;
		var merchantId = $("#merchantId").val();
		console.log("当前_merchantId:" + merchantId);
		var str = $(this).attr("tag");
		if(str == 'save') {
			if(!$('#activityForm').validate().form()) return false;
			$("[name='dataStatus']").val(2);
		} else {
			$("[name='dataStatus']").val(1);
			$("[name='merchantId']").val(merchantId);
			$('#alertModal').modal();
			return;
		}
		$("[name='merchantId']").val(merchantId);
		params = $('#activityForm').serializeArray();
		$.getJSON(G_CTX_PATH+"/activity/save",params,function(data){
	    if (data.success) {
	    	ui_alert("信息已添加",function(){
	    	});
    		$("#addModal [tag=close11]").click();
    		$("#searchBtn").click();
	    } else {
	    	ui_error(data.data);
	    }
	});
	});
	
	//****************************新增活动关闭按钮******************************
	$("#alertModal [tag=save3]").click(function(){
		var params = $('#activityForm').serializeArray();
		$.getJSON(G_CTX_PATH+"/activity/save",params,function(data){
	    if (data.success) {
	    	ui_alert("信息已保存",function(){
	    	});
    		$("#alertModal [tag=close4]").click();
    		$("#searchBtn").click();
	    } else {
	    	ui_error(data.data);
	    }
	});
	});
	
	$("#alertModal [tag=close3]").click(function(){
		$("#addModal").modal();
	});
	
	
	$("#hook").on("click", function(){
		$('#activityForm')[0].reset();
		aaa(1);
		
	});
	
	var merchantChlid = $("#merchantChild").val();
	var childList = merchantChlid.split(",");
	
	//设置成员变量childList，控制bootstrap模态框缓存
	function aaa(u) {
		var merchantId = $("#merchantId").val();
		var merchantPid = $("#merchantPid").val();

		if(merchantId == merchantPid) {
			$('#choose')[0].style.display="block";

				var checkDiv = $("#checkDiv");
				//alert(childList.length);
				for(var i=0;i<childList.length;i++) {
				     // 加入复选框
				        var checkBox=document.createElement("input");
				        checkBox.setAttribute("type","checkbox");
				        checkBox.setAttribute("value",childList[i].split("|")[0]);
				        checkBox.setAttribute("name","merchantIds");
				        
				        checkDiv[0].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				        		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				        checkDiv[0].appendChild(checkBox);
				        checkDiv[0].appendChild(document.createTextNode(childList[i].split("|")[1]));
						
		                var br = document.createElement("div");
		                //br.innerHTML = "<br/>";
		                checkDiv[0].appendChild(br);
		                
						
				}
				childList.length = 0;
				$("#addModal").modal();

		} else {
			$('#choose')[0].style.display="none";	
			$("#addModal").modal();
		}
	}
	
	//修改活动功能表单校验
	$('#activityForm1').validate({
		rules:{
			name: { required: true},
			instruction: { required: true},
			beginTime: { required: true},
			endTime: { required: true}
		}
	});
	
	//新增活动功能表单校验
	$('#activityForm').validate({
		rules:{
			name: { required: true},
			instruction: { required: true},
			memo: { required: true},
			hint: { required: true},
			beginTime: { required: true},
			endTime: { required: true},
			merchantIds: { required: true}
		}
	});
	
	var initImageBigFileElement = function(){
		var $displayObj = $('#imageBigView');
		var $hiddenObj = $('#imageBig');
		var folderRootPaht = "wifi/activity/detail";
		var mercImageBaseSize = "none";
		var $myfileupdiv = $("#imageDetailDiv");
		var url = G_CTX_PATH + '/wifi/uploadfile/image.do';
		addFileUpHtml(url,$displayObj,$hiddenObj,folderRootPaht,mercImageBaseSize).appendTo($myfileupdiv);	
	}(jQuery);

	//创建上传提交表单form
	function addFileUpHtml(action,displayObj,hiddenObj,folderRootPaht,mercImageBaseSize){
		var fileId = Math.floor(Math.random() * 100);
		var imagefileupiframe = "imagefileupiframe" + fileId; 
		var $form = $("<form type='post' dataType='json' target='"+imagefileupiframe+"' contentType='application/x-www-form-urlencoded; charset=utf-8' onsubmit='return true'></form>")
			.attr("action",action)
			.attr("method","post")
			.attr("enctype","multipart/form-data");
		
		//文件域/提交按钮/存储位置/切图参数/提交媒介
		var $myimageFile = $("<input type='file' name='imageFile' style='display:none' id='imageFile' />");
		$myimageFile.appendTo($form);
		$("<input type='button' style='float:left' value='浏览' onclick='imageFile.click();' />").appendTo($form);
		$("<input type='submit' value='文件上传' />").appendTo($form);
		var $preImageViewBtn = $("<input type='button' value='预览' class='preImageViewBtn' />");
		$preImageViewBtn.appendTo($form);
		$("<input type='hidden' name='folderRootPaht' value='"+folderRootPaht+"' />").appendTo($form);
		$("<input type='hidden' name='mercImageBaseSize' value='"+mercImageBaseSize+"' />").appendTo($form);
		var $iframeObj = $("<iframe width='0' height='0' id='"+imagefileupiframe+"' name='"+imagefileupiframe+"' frameborder='0' scrolling='no'></iframe>");
		$iframeObj.appendTo($form);
//		$form.validate({});
		$myimageFile.change(function(){
			$(displayObj).val($(this).val());	
		});
		
		
		$iframeObj.load(function(){
			var jsonstr = $(document.getElementById(imagefileupiframe).contentWindow.document.body).text();
			console.log("iframe = "+jsonstr);
			if(jsonstr!=="" && jsonstr.indexOf("root") && jsonstr.indexOf("url")){
				//转json
				jsonstr = $.parseJSON(jsonstr);
				if(jsonstr!==null){
					//取原图数据
					$.each(jsonstr,function(index,obj){
						if("original"===obj.type){
							console.log("iframe 返回结果  original = " + obj.id + " "+ obj.url);
				        	$(hiddenObj).val(obj.id);
				        	var fullpath = obj.root + "/" + obj.url;
				        	$(displayObj).val(fullpath);
				        	$preImageViewBtn.attr("data-url",fullpath);
						}
					});
				}
			}
		});
		
		//修改数据时 - 讲从数据库中取出的值 注入到预览中
		var playVal = displayObj.val();
		console.log("playVal = " + playVal);
		if (playVal != null && playVal != '') {
			var dataUrl = $preImageViewBtn.attr("data-url");
			console.log("dataUrl = " + dataUrl);
			if (dataUrl == null || dataUrl == '') {
				$preImageViewBtn.attr("data-url", playVal);
				console.log("data-url 赋值成功。");
			}
		}
		
		return $form;
	};
	
	
});

