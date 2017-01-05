(function(a){a.fn.ligerComboBox=function(b){return a.ligerui.run.call(this,"ligerComboBox",arguments)};a.fn.ligerGetComboBoxManager=function(){return a.ligerui.run.call(this,"ligerGetComboBoxManager",arguments)};a.ligerDefaults.ComboBox={resize:true,isMultiSelect:false,isShowCheckBox:false,columns:null,selectBoxWidth:null,selectBoxHeight:120,onBeforeSelect:false,onSelected:null,initValue:null,initText:null,valueField:"id",textField:"text",valueFieldID:null,slide:false,split:";",data:null,tree:null,treeLeafOnly:true,condition:null,grid:null,onStartResize:null,onEndResize:null,hideOnLoseFocus:true,hideGridOnLoseFocus:false,url:null,emptyText:"（空）",addRowButton:"新增",addRowButtonClick:null,triggerIcon:null,onSuccess:null,onError:null,onBeforeOpen:null,onButtonClick:null,render:null,absolute:true,cancelable:true,css:null,parms:null,renderItem:null,autocomplete:false,highLight:false,readonly:false,ajaxType:"post",alwayShowInTop:false,valueFieldCssClass:null};a.ligerDefaults.ComboBoxString={Search:"搜索"};a.ligerMethos.ComboBox=a.ligerMethos.ComboBox||{};a.ligerui.controls.ComboBox=function(c,b){a.ligerui.controls.ComboBox.base.constructor.call(this,c,b)};a.ligerui.controls.ComboBox.ligerExtend(a.ligerui.controls.Input,{__getType:function(){return"ComboBox"},_extendMethods:function(){return a.ligerMethos.ComboBox},_init:function(){a.ligerui.controls.ComboBox.base._init.call(this);var b=this.options;if(b.columns){b.isShowCheckBox=true}if(b.isMultiSelect){b.isShowCheckBox=true}},_render:function(){var b=this,c=this.options;b.data=c.data;b.inputText=null;b.select=null;b.textFieldID="";b.valueFieldID="";b.valueField=null;if(this.element.tagName.toLowerCase()=="input"){this.element.readOnly=true;b.inputText=a(this.element);b.textFieldID=this.element.id}else{if(this.element.tagName.toLowerCase()=="select"){a(this.element).hide();b.select=a(this.element);c.isMultiSelect=false;c.isShowCheckBox=false;c.cancelable=false;b.textFieldID=this.element.id+"_txt";b.inputText=a('<input type="text" readonly="true"/>');b.inputText.attr("id",b.textFieldID).insertAfter(a(this.element))}}if(b.inputText[0].name==undefined){b.inputText[0].name=b.textFieldID}b.valueField=null;if(c.valueFieldID){b.valueField=a("#"+c.valueFieldID+":input,[name="+c.valueFieldID+"]:input").filter("input:hidden");if(b.valueField.length==0){b.valueField=a('<input type="hidden"/>')}b.valueField[0].id=b.valueField[0].name=c.valueFieldID}else{b.valueField=a('<input type="hidden"/>');b.valueField[0].id=b.valueField[0].name=b.textFieldID+"_val"}if(c.valueFieldCssClass){b.valueField.addClass(c.valueFieldCssClass)}if(b.valueField[0].name==undefined){b.valueField[0].name=b.valueField[0].id}if(c.initValue!=null){b.valueField[0].value=c.initValue}b.valueField.attr("data-ligerid",b.id);b.link=a('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');if(c.triggerIcon){b.link.find("div:first").addClass(c.triggerIcon)}b.selectBox=a('<div class="l-box-select" style="display:none"><div class="l-box-select-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table"></table></div></div>');b.selectBox.table=a("table:first",b.selectBox);b.selectBoxInner=b.selectBox.find(".l-box-select-inner:first");b.wrapper=b.inputText.wrap('<div class="l-text l-text-combobox"></div>').parent();b.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');b.wrapper.append(b.link);b.textwrapper=b.wrapper.wrap('<div class="l-text-wrapper"></div>').parent();if(c.absolute){b.selectBox.appendTo("body").addClass("l-box-select-absolute")}else{b.textwrapper.append(b.selectBox)}b.textwrapper.append(b.valueField);b.inputText.addClass("l-text-field");if(c.isShowCheckBox&&!b.select){a("table",b.selectBox).addClass("l-table-checkbox")}else{c.isShowCheckBox=false;a("table",b.selectBox).addClass("l-table-nocheckbox")}b.link.hover(function(){if(c.disabled||c.readonly){return}this.className="l-trigger-hover"},function(){if(c.disabled||c.readonly){return}this.className="l-trigger"}).mousedown(function(){if(c.disabled||c.readonly){return}this.className="l-trigger-pressed"}).mouseup(function(){if(c.disabled||c.readonly){return}this.className="l-trigger-hover"}).click(function(){if(c.disabled||c.readonly){return}if(b.trigger("buttonClick")==false){return false}if(b.trigger("beforeOpen")==false){return false}b._toggleSelectBox(b.selectBox.is(":visible"))});b.inputText.click(function(){if(c.disabled||c.readonly){return}if(b.trigger("beforeOpen")==false){return false}b._toggleSelectBox(b.selectBox.is(":visible"))}).blur(function(){if(c.disabled){return}b.wrapper.removeClass("l-text-focus")}).focus(function(){if(c.disabled||c.readonly){return}b.wrapper.addClass("l-text-focus")});b.wrapper.hover(function(){if(c.disabled||c.readonly){return}b.wrapper.addClass("l-text-over")},function(){if(c.disabled||c.readonly){return}b.wrapper.removeClass("l-text-over")});b.resizing=false;b.selectBox.hover(null,function(d){if(c.hideOnLoseFocus&&b.selectBox.is(":visible")&&!b.boxToggling&&!b.resizing){b._toggleSelectBox(true)}});b.bulidContent();b.set(c);if(c.selectBoxWidth){b.selectBox.width(c.selectBoxWidth)}else{b.selectBox.css("width",b.wrapper.css("width"))}if(c.grid){b.bind("show",function(){if(!b.grid){b.setGrid(c.grid);b.set("SelectBoxHeight",c.selectBoxHeight)}})}b.updateSelectBoxPosition();a(document).bind("click.combobox",function(f){var d=(f.target||f.srcElement).tagName.toLowerCase();if(d=="html"||d=="body"){b._toggleSelectBox(true)}})},destroy:function(){if(this.wrapper){this.wrapper.remove()}if(this.selectBox){this.selectBox.remove()}this.options=null;a.ligerui.remove(this)},clear:function(){this._changeValue("","");a("a.l-checkbox-checked",this.selectBox).removeClass("l-checkbox-checked");a("td.l-selected",this.selectBox).removeClass("l-selected");a(":checkbox",this.selectBox).each(function(){this.checked=false});this.trigger("clear")},_setSelectBoxHeight:function(b){if(!b){return}var c=this,d=this.options;if(d.grid){c.grid&&c.grid.set("height",c.getGridHeight(b))}else{var e=a("tr",c.selectBox.table).length;if(!d.selectBoxHeight&&e<8){d.selectBoxHeight=e*30}if(d.selectBoxHeight){if(e<8){c.selectBoxInner.height("auto")}else{c.selectBoxInner.height(d.selectBoxHeight)}}}},_setCss:function(b){if(b){this.wrapper.addClass(b)}},_setCancelable:function(c){var b=this,d=this.options;if(!c&&b.unselect){b.unselect.remove();b.unselect=null}if(!c&&!b.unselect){return}b.unselect=a('<div class="l-trigger l-trigger-cancel"><div class="l-trigger-icon"></div></div>').hide();b.wrapper.hover(function(){b.unselect.show()},function(){b.unselect.hide()});if(!d.disabled&&!d.readonly&&d.cancelable){b.wrapper.append(b.unselect)}b.unselect.hover(function(){this.className="l-trigger-hover l-trigger-cancel"},function(){this.className="l-trigger l-trigger-cancel"}).click(function(){b.clear()})},_setDisabled:function(b){if(b){this.wrapper.addClass("l-text-disabled")}else{this.wrapper.removeClass("l-text-disabled")}},_setReadonly:function(b){if(b){this.wrapper.addClass("l-text-readonly")}else{this.wrapper.removeClass("l-text-readonly")}},_setLable:function(b){var c=this,d=this.options;if(b){if(c.labelwrapper){c.labelwrapper.find(".l-text-label:first").html(b+":&nbsp")}else{c.labelwrapper=c.textwrapper.wrap('<div class="l-labeltext"></div>').parent();c.labelwrapper.prepend('<div class="l-text-label" style="float:left;display:inline;">'+b+":&nbsp</div>");c.textwrapper.css("float","left")}if(!d.labelWidth){d.labelWidth=a(".l-text-label",c.labelwrapper).outerWidth()}else{a(".l-text-label",c.labelwrapper).outerWidth(d.labelWidth)}a(".l-text-label",c.labelwrapper).width(d.labelWidth);a(".l-text-label",c.labelwrapper).height(c.wrapper.height());c.labelwrapper.append('<br style="clear:both;" />');if(d.labelAlign){a(".l-text-label",c.labelwrapper).css("text-align",d.labelAlign)}c.textwrapper.css({display:"inline"});c.labelwrapper.width(c.wrapper.outerWidth()+d.labelWidth+2)}},_setWidth:function(c){var b=this,d=this.options;if(c>20){b.wrapper.css({width:c});b.inputText.css({width:c-20});if(!d.selectBoxWidth){b.selectBox.css({width:c})}}},_setHeight:function(c){var b=this;if(c>10){b.wrapper.height(c);b.inputText.height(c-2)}},_setResize:function(b){var d=this,e=this.options;if(e.columns){return}if(b&&a.fn.ligerResizable){var c=e.selectBoxHeight?"e":"se,s,e";d.selectBox.ligerResizable({handles:c,onStartResize:function(){d.resizing=true;d.trigger("startResize")},onEndResize:function(){d.resizing=false;if(d.trigger("endResize")==false){return false}},onStopResize:function(g,f){if(d.grid){if(g.newWidth){d.selectBox.width(g.newWidth)}if(g.newHeight){d.set({selectBoxHeight:g.newHeight})}d.grid.refreshSize();d.trigger("endResize");return false}return true}});d.selectBox.append("<div class='l-btn-nw-drop'></div>")}},findTextByValue:function(e){var b=this,f=this.options;if(e==null){return""}var d="";var c=function(j){var g=e.toString().split(f.split);for(var h=0;h<g.length;h++){if(g[h]==j){return true}}return false};a(b.data).each(function(h,j){var k=j[f.valueField];var g=j[f.textField];if(c(k)){d+=g+f.split}});if(d.length>0){d=d.substr(0,d.length-1)}return d},findValueByText:function(f){var c=this,e=this.options;if(!f&&f==""){return""}var d=function(j){var g=f.toString().split(e.split);for(var h=0;h<g.length;h++){if(g[h]==j){return true}}return false};var b="";a(c.data).each(function(h,j){var k=j[e.valueField];var g=j[e.textField];if(d(g)){b+=k+e.split}});if(b.length>0){b=b.substr(0,b.length-1)}return b},insertItem:function(d,b){var c=this,e=this.options;c.data=c.data||[];c.data.splice(b,0,d);c.setData(c.data)},addItem:function(c){var b=this,d=this.options;b.insertItem(c,(b.data||[]).length)},_setValue:function(e,h){var d=this,f=this.options;h=d.findTextByValue(e);if(f.tree){d.selectValueByTree(e)}else{if(!f.isMultiSelect){d._changeValue(e,h);a("tr[value='"+e+"'] td",d.selectBox).addClass("l-selected");a("tr[value!='"+e+"'] td",d.selectBox).removeClass("l-selected")}else{d._changeValue(e,h);if(e!=null){var b=e.toString().split(f.split);a("table.l-table-checkbox :checkbox",d.selectBox).each(function(){this.checked=false});for(var c=0;c<b.length;c++){a("table.l-table-checkbox tr[value="+b[c]+"] :checkbox",d.selectBox).each(function(){this.checked=true})}}}}},selectValue:function(b){this._setValue(b)},bulidContent:function(){var b=this,c=this.options;this.clearContent();if(b.select){b.setSelect()}else{if(c.tree){b.setTree(c.tree)}}},reload:function(){var b=this,c=this.options;if(c.url){b.set("url",c.url)}else{if(b.grid){b.grid.reload()}}},_setUrl:function(b){if(!b){return}var d=this,e=this.options;var c=a.isFunction(e.parms)?e.parms():e.parms;a.ajax({type:e.ajaxType,url:b,data:c,cache:false,dataType:"json",success:function(f){d.setData(f);d.trigger("success",[f])},error:function(f,g){d.trigger("error",[f,g])}})},setUrl:function(b){return this._setUrl(b)},setParm:function(b,e){if(!b){return}var d=this;var c=d.get("parms");if(!c){c={}}c[b]=e;d.set("parms",c)},clearContent:function(){var b=this,c=this.options;a("table",b.selectBox).html("");b.inputText.val("");b.valueField.val("")},setSelect:function(){var b=this,c=this.options;this.clearContent();a("option",b.select).each(function(e){var g=a(this).val();var d=a(this).html();var f=a("<tr><td index='"+e+"' value='"+g+"' text='"+d+"'>"+d+"</td>");a("table.l-table-nocheckbox",b.selectBox).append(f);a("td",f).hover(function(){a(this).addClass("l-over")},function(){a(this).removeClass("l-over")})});a("td:eq("+b.select[0].selectedIndex+")",b.selectBox).each(function(){if(a(this).hasClass("l-selected")){b.selectBox.hide();return}a(".l-selected",b.selectBox).removeClass("l-selected");a(this).addClass("l-selected");if(b.select[0].selectedIndex!=a(this).attr("index")&&b.select[0].onchange){b.select[0].selectedIndex=a(this).attr("index");b.select[0].onchange()}var d=parseInt(a(this).attr("index"));b.select[0].selectedIndex=d;b.select.trigger("change");b.selectBox.hide();var e=a(this).attr("value");var f=a(this).html();if(c.render){b.inputText.val(c.render(e,f))}else{b.inputText.val(f)}});b._addClickEven()},_setData:function(b){this.setData(b)},setData:function(k){var m=this,b=this.options;if(!k||!k.length){k=[]}if(m.data!=k){m.data=k}this.clearContent();if(b.columns){m.selectBox.table.headrow=a("<tr class='l-table-headerow'><td width='18px'></td></tr>");m.selectBox.table.append(m.selectBox.table.headrow);m.selectBox.table.addClass("l-box-select-grid");for(var e=0;e<b.columns.length;e++){var o=a("<td columnindex='"+e+"' columnname='"+b.columns[e].name+"'>"+b.columns[e].header+"</td>");if(b.columns[e].width){o.width(b.columns[e].width)}m.selectBox.table.headrow.append(o)}}var f=[];if(b.emptyText&&!m.emptyRow){m.emptyRow={};m.emptyRow[b.textField]=b.emptyText;m.emptyRow[b.valueField]=null;k.splice(0,0,m.emptyRow)}for(var l=0;l<k.length;l++){var c=k[l][b.valueField];var h=k[l][b.textField];if(!b.columns){f.push("<tr value='"+c+"'>");if(b.isShowCheckBox){f.push("<td style='width:18px;'  index='"+l+"' value='"+c+"' text='"+h+"' ><input type='checkbox' /></td>")}var d=h;if(b.renderItem){d=b.renderItem.call(m,{data:k[l],value:c,text:h,key:m.inputText.val()})}else{if(b.autocomplete&&b.highLight){d=m._highLight(h,m.inputText.val())}}f.push("<td index='"+l+"' value='"+c+"' text='"+h+"' align='left'>"+d+"</td></tr>")}else{f.push("<tr value='"+c+"'><td style='width:18px;'  index='"+l+"' value='"+c+"' text='"+h+"' ><input type='checkbox' /></td>");for(var e=0;e<b.columns.length;e++){var n=b.columns[e].name;f.push("<td>"+k[l][n]+"</td>")}f.push("</tr>")}}if(!b.columns){if(b.isShowCheckBox){a("table.l-table-checkbox",m.selectBox).append(f.join(""))}else{a("table.l-table-nocheckbox",m.selectBox).append(f.join(""))}}else{m.selectBox.table.append(f.join(""))}if(b.addRowButton&&b.addRowButtonClick&&!m.addRowButton){m.addRowButton=a('<div class="l-box-select-add"><a href="javascript:void(0)" class="link"><div class="icon"></div></a></div>');m.addRowButton.find(".link").append(b.addRowButton).click(b.addRowButtonClick);m.selectBoxInner.after(m.addRowButton)}m.set("selectBoxHeight",b.selectBoxHeight);if(b.isShowCheckBox&&a.fn.ligerCheckBox){a("table input:checkbox",m.selectBox).ligerCheckBox()}a(".l-table-checkbox input:checkbox",m.selectBox).change(function(){if(this.checked&&m.hasBind("beforeSelect")){var g=null;if(a(this).parent().get(0).tagName.toLowerCase()=="div"){g=a(this).parent().parent()}else{g=a(this).parent()}if(g!=null&&m.trigger("beforeSelect",[g.attr("value"),g.attr("text")])==false){m.selectBox.slideToggle("fast");return false}}if(!b.isMultiSelect){if(this.checked){a("input:checked",m.selectBox).not(this).each(function(){this.checked=false;a(".l-checkbox-checked",a(this).parent()).removeClass("l-checkbox-checked")});m.selectBox.slideToggle("fast")}}m._checkboxUpdateValue()});a("table.l-table-nocheckbox td",m.selectBox).hover(function(){a(this).addClass("l-over")},function(){a(this).removeClass("l-over")});m._addClickEven();if(!b.autocomplete){m.updateStyle()}},setTree:function(b){var c=this,d=this.options;this.clearContent();c.selectBox.table.remove();if(b.checkbox!=false){b.onCheck=function(){var e=c.treeManager.getChecked();var f=[];var g=[];a(e).each(function(h,j){if(d.treeLeafOnly&&j.data.children){return}f.push(j.data[d.valueField]);g.push(j.data[d.textField])});c._changeValue(f.join(d.split),g.join(d.split))}}else{b.onSelect=function(e){if(c.trigger("BeforeSelect"[e])==false){return}if(d.treeLeafOnly&&e.data.children){return}var f=e.data[d.valueField];var g=e.data[d.textField];c._changeValue(f,g)};b.onCancelSelect=function(e){c._changeValue("","")}}b.onAfterAppend=function(g,e){if(!c.treeManager){return}var f=null;if(d.initValue){f=d.initValue}else{if(c.valueField.val()!=""){f=c.valueField.val()}}c.selectValueByTree(f)};c.tree=a("<ul></ul>");a("div:first",c.selectBox).append(c.tree);c.tree.ligerTree(b);c.treeManager=c.tree.ligerGetTreeManager()},selectValueByTree:function(d){var c=this,e=this.options;if(d!=null){var f="";var b=d.toString().split(e.split);a(b).each(function(g,h){c.treeManager.selectNode(h.toString());f+=c.treeManager.getTextByID(h);if(g<b.length-1){f+=e.split}});c._changeValue(d,f)}},setGrid:function(b){var l=this,d=this.options;if(l.grid){return}d.hideOnLoseFocus=d.hideGridOnLoseFocus?true:false;this.clearContent();l.selectBox.addClass("l-box-select-lookup");l.selectBox.table.remove();var c=a("div:first",l.selectBox);var q=a("<div></div>").appendTo(c);var m=a("<div></div>").appendTo(c);l.conditionPanel=q;if(d.condition){var i=a.extend({labelWidth:60,space:20,width:d.selectBoxWidth},d.condition);l.condition=q.ligerForm(i)}else{q.remove()}b=a.extend({columnWidth:120,alternatingRow:false,frozen:true,rownumbers:true,allowUnSelectRow:true},b,{width:"100%",height:l.getGridHeight(),inWindow:false,parms:d.parms,isChecked:function(p){var g=l.getValue();if(!g){return false}if(!d.valueField||!p[d.valueField]){return false}return a.inArray(p[d.valueField].toString(),g.split(d.split))!=-1}});l.grid=l.gridManager=m.ligerGrid(b);l.grid.bind("afterShowData",function(){l.updateSelectBoxPosition()});var n=[],h=function(){var g=[],p=[];a(n).each(function(r,s){g.push(s[d.valueField]);p.push(s[d.textField])});if(b.checkbox){l.selected=n}else{if(n.length){l.selected=n[0]}else{l.selected=null}}l._changeValue(g.join(d.split),p.join(d.split));l.trigger("gridSelect",{value:g.join(d.split),text:p.join(d.split),data:n})},o=function(p){for(var g=n.length-1;g>=0;g--){if(n[g][d.valueField]==p[d.valueField]){n.splice(g,1)}}},f=function(p){for(var g=n.length-1;g>=0;g--){if(n[g][d.valueField]==p[d.valueField]){return}}n.push(p)};if(b.checkbox){var e=function(g,p){g&&f(p);!g&&o(p)};l.grid.bind("CheckAllRow",function(g){a(l.grid.rows).each(function(p){e(g,p)});h()});l.grid.bind("CheckRow",function(g,p){e(g,p);h()})}else{l.grid.bind("SelectRow",function(g){n=[g];h();l._toggleSelectBox(true)});l.grid.bind("UnSelectRow",function(){n=[];h()})}l.bind("show",function(){l.grid.refreshSize()});l.bind("clear",function(){n=[];l.grid.selecteds=[];l.grid._showData()});if(d.condition){var k=a('<li style="margin-right:9px"><div></div></li>');var j=a('<li style="margin-right:9px;float:right"><div></div></li>');a("ul:first",q).append(k).append(j).after('<div class="l-clear"></div>');a("div",k).ligerButton({text:d.Search,width:40,click:function(){var g=l.condition.toConditions();l.grid.setParm(b.conditionParmName||"condition",a.ligerui.toJSON(g));l.grid.reload()}});a("div",j).ligerButton({text:"关闭",width:40,click:function(){l.selectBox.hide()}})}l.grid.refreshSize()},getGridHeight:function(b){var c=this,d=this.options;b=b||c.selectBox.height();b-=c.conditionPanel.height();return b},_getValue:function(){return a(this.valueField).val()},getValue:function(){return this._getValue()},getSelected:function(){return this.selected},getText:function(){return this.inputText.val()},setText:function(b){this.inputText.val(b)},updateStyle:function(){var b=this,c=this.options;c.initValue=b._getValue();b._dataInit()},_dataInit:function(){var b=this,d=this.options;var c=null;if(d.initValue!=null&&d.initText!=null){b._changeValue(d.initValue,d.initText)}if(d.initValue!=null){c=d.initValue;if(d.tree){if(c){b.selectValueByTree(c)}}else{if(b.data){var e=b.findTextByValue(c);b._changeValue(c,e)}}}else{if(b.valueField.val()!=""){c=b.valueField.val();if(d.tree){if(c){b.selectValueByTree(c)}}else{if(b.data){var e=b.findTextByValue(c);b._changeValue(c,e)}}}}if(!d.isShowCheckBox){a("table tr",b.selectBox).find("td:first").each(function(){if(c!=null&&c==a(this).attr("value")){a(this).addClass("l-selected")}else{a(this).removeClass("l-selected")}})}else{a(":checkbox",b.selectBox).each(function(){var h=null;var g=a(this);if(g.parent().get(0).tagName.toLowerCase()=="div"){h=g.parent().parent()}else{h=g.parent()}if(h==null){return}a(".l-checkbox",h).removeClass("l-checkbox-checked");g[0].checked=false;var f=(c||"").toString().split(d.split);a(f).each(function(j,k){if(c!=null&&k==h.attr("value")){a(".l-checkbox",h).addClass("l-checkbox-checked");g[0].checked=true}})})}},_changeValue:function(e,c){var b=this,d=this.options;b.valueField.val(e);if(d&&d.render){b.inputText.val(d.render(e,c))}else{b.inputText.val(c)}b.selectedValue=e;b.selectedText=c;b.inputText.trigger("change").focus();b.trigger("selected",[e,c])},_checkboxUpdateValue:function(){var d=this,e=this.options;var b="";var c="";a("input:checked",d.selectBox).each(function(){var f=null;if(a(this).parent().get(0).tagName.toLowerCase()=="div"){f=a(this).parent().parent()}else{f=a(this).parent()}if(!f){return}b+=f.attr("value")+e.split;c+=f.attr("text")+e.split});if(b.length>0){b=b.substr(0,b.length-1)}if(c.length>0){c=c.substr(0,c.length-1)}d._changeValue(b,c)},_addClickEven:function(){var b=this,c=this.options;a(".l-table-nocheckbox td",b.selectBox).click(function(){var e=a(this).attr("value");var d=parseInt(a(this).attr("index"));var f=a(this).attr("text");if(b.hasBind("beforeSelect")&&b.trigger("beforeSelect",[e,f])==false){if(c.slide){b.selectBox.slideToggle("fast")}else{b.selectBox.hide()}return false}if(a(this).hasClass("l-selected")){if(c.slide){b.selectBox.slideToggle("fast")}else{b.selectBox.hide()}return}a(".l-selected",b.selectBox).removeClass("l-selected");a(this).addClass("l-selected");if(b.select){if(b.select[0].selectedIndex!=d){b.select[0].selectedIndex=d;b.select.trigger("change")}}if(c.slide){b.boxToggling=true;b.selectBox.hide("fast",function(){b.boxToggling=false})}else{b.selectBox.hide()}b._changeValue(e,f)})},updateSelectBoxPosition:function(){var c=this,e=this.options;if(e&&e.absolute){var b=a(document).height();if(e.alwayShowInTop||Number(c.wrapper.offset().top+1+c.wrapper.outerHeight()+c.selectBox.height())>b&&b>Number(c.selectBox.height()+1)){c.selectBox.css({left:c.wrapper.offset().left,top:c.wrapper.offset().top-1-c.selectBox.height()})}else{c.selectBox.css({left:c.wrapper.offset().left,top:c.wrapper.offset().top+1+c.wrapper.outerHeight()})}}else{var f=c.wrapper.offset().top-a(window).scrollTop();var d=c.selectBox.height()+textHeight+4;if(f+d>a(window).height()&&f>d){c.selectBox.css("marginTop",-1*(c.selectBox.height()+textHeight+5))}}},_toggleSelectBox:function(c){var d=this,e=this.options;var f=d.wrapper.height();d.boxToggling=true;if(c){if(e.slide){d.selectBox.slideToggle("fast",function(){d.boxToggling=false})}else{d.selectBox.hide();d.boxToggling=false}}else{d.updateSelectBoxPosition();if(e.slide){d.selectBox.slideToggle("fast",function(){d.boxToggling=false;if(!e.isShowCheckBox&&a("td.l-selected",d.selectBox).length>0){var g=(a("td.l-selected",d.selectBox).offset().top-d.selectBox.offset().top);a(".l-box-select-inner",d.selectBox).animate({scrollTop:g})}})}else{d.selectBox.show();d.boxToggling=false;if(!d.tree&&!d.grid&&!e.isShowCheckBox&&a("td.l-selected",d.selectBox).length>0){var b=(a("td.l-selected",d.selectBox).offset().top-d.selectBox.offset().top);a(".l-box-select-inner",d.selectBox).animate({scrollTop:b})}}}d.isShowed=d.selectBox.is(":visible");d.trigger("toggle",[c]);d.trigger(c?"hide":"show")},_highLight:function(d,c){if(!d){return d}var b=d.indexOf(c);if(b==-1){return d}return d.substring(0,b)+"<span class='l-highLight'>"+c+"</span>"+d.substring(c.length+b)},_setAutocomplete:function(c){var b=this,d=this.options;if(!c){return}b.inputText.removeAttr("readonly");var e=b.inputText.val();b.inputText.keyup(function(){setTimeout(function(){if(e==b.inputText.val()){return}d.initValue="";b.valueField.val("");if(d.url){b.setParm("key",b.inputText.val());b.set("url",d.url);b.selectBox.show()}else{if(d.grid){b.grid.setParm("key",b.inputText.val());b.grid.reload()}}e=b.inputText.val()},1)})}});a.ligerui.controls.ComboBox.prototype.setValue=a.ligerui.controls.ComboBox.prototype.selectValue;a.ligerui.controls.ComboBox.prototype.setInputValue=a.ligerui.controls.ComboBox.prototype._changeValue})(jQuery);