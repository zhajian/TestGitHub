(function(a){a.fn.ligerTab=function(b){return a.ligerui.run.call(this,"ligerTab",arguments)};a.fn.ligerGetTabManager=function(){return a.ligerui.run.call(this,"ligerGetTabManager",arguments)};a.ligerDefaults.Tab={height:null,heightDiff:0,changeHeightOnResize:false,contextmenu:true,dblClickToClose:false,dragToMove:false,showSwitch:false,showSwitchInTab:false,onBeforeOverrideTabItem:null,onAfterOverrideTabItem:null,onBeforeRemoveTabItem:null,onAfterRemoveTabItem:null,onBeforeAddTabItem:null,onAfterAddTabItem:null,onBeforeSelectTabItem:null,onAfterSelectTabItem:null,onCloseOther:null,onCloseAll:null,onClose:null,onReload:null};a.ligerDefaults.TabString={closeMessage:"关闭当前页",closeOtherMessage:"关闭其他",closeAllMessage:"关闭所有",reloadMessage:"刷新"};a.ligerMethos.Tab={};a.ligerui.controls.Tab=function(c,b){a.ligerui.controls.Tab.base.constructor.call(this,c,b)};a.ligerui.controls.Tab.ligerExtend(a.ligerui.core.UIComponent,{__getType:function(){return"Tab"},__idPrev:function(){return"Tab"},_extendMethods:function(){return a.ligerMethos.Tab},_render:function(){var c=this,e=this.options;if(e.height){c.makeFullHeight=true}c.tab=a(this.element);c.tab.addClass("l-tab");if(e.contextmenu&&a.ligerMenu){c.tab.menu=a.ligerMenu({width:100,items:[{text:e.closeMessage,id:"close",click:function(){c._menuItemClick.apply(c,arguments)}},{text:e.closeOtherMessage,id:"closeother",click:function(){c._menuItemClick.apply(c,arguments)}},{text:e.closeAllMessage,id:"closeall",click:function(){c._menuItemClick.apply(c,arguments)}},{text:e.reloadMessage,id:"reload",click:function(){c._menuItemClick.apply(c,arguments)}}]})}c.tab.content=a('<div class="l-tab-content"></div>');a("> div",c.tab).appendTo(c.tab.content);c.tab.content.appendTo(c.tab);c.tab.links=a('<div class="l-tab-links"><ul style="left: 0px; "></ul><div class="l-tab-switch"></div></div>');c.tab.links.prependTo(c.tab);c.tab.links.ul=a("ul",c.tab.links);var b=a("> div[lselected=true]",c.tab.content);var d=b.length>0;c.selectedTabId=b.attr("tabid");a("> div",c.tab.content).each(function(j,l){var f=a('<li class=""><a></a><div class="l-tab-links-item-left"></div><div class="l-tab-links-item-right"></div></li>');var h=a(this);if(h.attr("title")){a("> a",f).html(h.attr("title"));h.attr("title","")}var g=h.attr("tabid");if(g==undefined){g=c.getNewTabid();h.attr("tabid",g);if(h.attr("lselected")){c.selectedTabId=g}}f.attr("tabid",g);if(!d&&j==0){c.selectedTabId=g}var n=h.attr("showClose");if(n){f.append("<div class='l-tab-links-item-close'></div>")}a("> ul",c.tab.links).append(f);if(!h.hasClass("l-tab-content-item")){h.addClass("l-tab-content-item")}if(h.find("iframe").length>0){var k=a("iframe:first",h);if(k[0].readyState!="complete"){if(h.find(".l-tab-loading:first").length==0){h.prepend("<div class='l-tab-loading' style='display:block;'></div>")}var m=a(".l-tab-loading:first",h);k.bind("load.tab",function(){m.hide()})}}});c.selectTabItem(c.selectedTabId);if(e.height){if(typeof(e.height)=="string"&&e.height.indexOf("%")>0){c.onResize();if(e.changeHeightOnResize){a(window).resize(function(){c.onResize.call(c)})}}else{c.setHeight(e.height)}}if(c.makeFullHeight){c.setContentHeight()}a("li",c.tab.links).each(function(){c._addTabItemEvent(a(this))});c.tab.bind("dblclick.tab",function(j){if(!e.dblClickToClose){return}c.dblclicking=true;var i=(j.target||j.srcElement);var h=i.tagName.toLowerCase();if(h=="a"){var g=a(i).parent().attr("tabid");var f=a(i).parent().find("div.l-tab-links-item-close").length?true:false;if(f){c.removeTabItem(g)}}c.dblclicking=false});c.set(e)},_setShowSwitch:function(c){var b=this,d=this.options;if(c){if(!a(".l-tab-switch",b.tab.links).length){a("<div class='l-tab-switch'></div>").appendTo(b.tab.links)}a(b.tab).addClass("l-tab-switchable");a(".l-tab-switch",b.tab).click(function(){b.toggleSwitch(this)})}else{a(b.tab).removeClass("l-tab-switchable");a("body > .l-tab-windowsswitch").remove()}},_setShowSwitchInTab:function(d){var c=this,e=this.options;if(e.showSwitch&&d){a(c.tab).removeClass("l-tab-switchable");a(".l-tab-switch",c.tab).remove();var b=a("<li class='l-tab-itemswitch'><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div></li>");b.appendTo(c.tab.links.ul);b.click(function(){c.toggleSwitch(this)})}else{a(".l-tab-itemswitch",c.tab.ul).remove()}},toggleSwitch:function(b){var c=this,f=this.options;if(a("body > .l-tab-windowsswitch").length){a("body > .l-tab-windowsswitch").remove();return}if(b==null){return}var e=a("<div class='l-tab-windowsswitch'></div>").appendTo("body");var h=c.tab.links.ul.find(">li");var d=c.getSelectedTabItemID();h.each(function(k,l){var j=a("<a href='javascript:void(0)'></a>");j.text(a(l).find("a").text());var g=a(l).attr("tabid");if(g==null){return}if(g==d){j.addClass("selected")}j.attr("tabid",g);e.append(j)});e.css({top:a(b).offset().top+a(b).height(),left:a(b).offset().left-e.width()});e.bind("click",function(j){var i=(j.target||j.srcElement);if(i.tagName.toLowerCase()=="a"){var g=a(i).attr("tabid");c.selectTabItem(g);c.moveToTabItem(g);a("body > .l-tab-windowsswitch").remove();return}})},_applyDrag:function(d){var c=this,e=this.options;c.droptip=c.droptip||a("<div class='l-tab-drag-droptip' style='display:none'><div class='l-drop-move-up'></div><div class='l-drop-move-down'></div></div>").appendTo("body");var b=a(d).ligerDrag({revert:true,animate:false,proxy:function(){var f=a(this).find("a").html();c.dragproxy=a("<div class='l-tab-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div></div>").appendTo("body");c.dragproxy.append(f);return c.dragproxy},onRendered:function(){this.set("cursor","pointer")},onStartDrag:function(h,g){if(!a(d).hasClass("l-selected")){return false}if(g.button==2){return false}var f=g.srcElement||g.target;if(a(f).hasClass("l-tab-links-item-close")){return false}},onDrag:function(h,g){if(c.dropIn==null){c.dropIn=-1}var i=c.tab.links.ul.find(">li");var f=i.index(h.target);i.each(function(m,o){if(f==m){return}var j=m>f;if(c.dropIn!=-1&&c.dropIn!=m){return}var p=a(this).offset();var k={top:p.top,bottom:p.top+a(this).height(),left:p.left-10,right:p.left+10};if(j){k.left+=a(this).width();k.right+=a(this).width()}var n=g.pageX||g.screenX;var l=g.pageY||g.screenY;if(n>k.left&&n<k.right&&l>k.top&&l<k.bottom){c.droptip.css({left:k.left+5,top:k.top-9}).show();c.dropIn=m;c.dragproxy.find(".l-drop-icon").removeClass("l-drop-no").addClass("l-drop-yes")}else{c.dropIn=-1;c.droptip.hide();c.dragproxy.find(".l-drop-icon").removeClass("l-drop-yes").addClass("l-drop-no")}})},onStopDrag:function(g,f){if(c.dropIn>-1){var i=c.tab.links.ul.find(">li:eq("+c.dropIn+")").attr("tabid");var h=a(g.target).attr("tabid");setTimeout(function(){c.moveTabItem(h,i)},0);c.dropIn=-1;c.dragproxy.remove()}c.droptip.hide();this.set("cursor","default")}});return b},_setDragToMove:function(c){if(!a.fn.ligerDrag){return}var b=this,d=this.options;if(c){if(b.drags){return}b.drags=b.drags||[];b.tab.links.ul.find(">li").each(function(){b.drags.push(b._applyDrag(this))})}},moveTabItem:function(i,c){var b=this;var h=b.tab.links.ul.find(">li[tabid="+i+"]");var f=b.tab.links.ul.find(">li[tabid="+c+"]");var e=b.tab.links.ul.find(">li").index(h);var d=b.tab.links.ul.find(">li").index(f);if(e<d){f.after(h)}else{f.before(h)}},setTabButton:function(){var c=this,d=this.options;var e=0;a("li",c.tab.links.ul).each(function(){e+=a(this).width()+2});var b=c.tab.width();if(e>b){if(!a(".l-tab-links-left",c.tab).length){c.tab.links.append('<div class="l-tab-links-left"><span></span></div><div class="l-tab-links-right"><span></span></div>');c.setTabButtonEven()}return true}else{c.tab.links.ul.animate({left:0});a(".l-tab-links-left,.l-tab-links-right",c.tab.links).remove();return false}},setTabButtonEven:function(){var b=this,c=this.options;a(".l-tab-links-left",b.tab.links).hover(function(){a(this).addClass("l-tab-links-left-over")},function(){a(this).removeClass("l-tab-links-left-over")}).click(function(){b.moveToPrevTabItem()});a(".l-tab-links-right",b.tab.links).hover(function(){a(this).addClass("l-tab-links-right-over")},function(){a(this).removeClass("l-tab-links-right-over")}).click(function(){b.moveToNextTabItem()})},moveToPrevTabItem:function(v){var u=this,o=this.options;var m=a("> li",u.tab.links.ul),s=a(".l-tab-links-right",u.tab),h=a(".l-tab-links-left",u.tab);if(!s.length||!h.length){return false}var n=s.offset(),w=h.offset();var b=null,j=0;var k=w.left+h.outerWidth();for(var t=0,r=m.length;t<r;t++){var q=a(m[t]);var f=q.offset();var e=f.left,c=f.left+q.outerWidth();if(v!=null){if(e<k&&q.attr("tabid")==v){b=q;break}}else{if(e<k&&c>=k){b=q;break}}j+=q.outerWidth()+parseInt(q.css("marginLeft"))+parseInt(q.css("marginRight"))}if(b==null){return false}var d=j-h.outerWidth();u.tab.links.ul.animate({left:-1*d});return true},moveToNextTabItem:function(b){var t=this,e=this.options;var k=a("> li",t.tab.links.ul),c=a(".l-tab-links-right",t.tab),n=a(".l-tab-links-left",t.tab);if(!c.length||!n.length){return false}var r=c.offset(),u=n.offset();var v=null,h=0;for(var s=0,m=k.length;s<m;s++){var f=a(k[s]);h+=f.outerWidth()+parseInt(f.css("marginLeft"))+parseInt(f.css("marginRight"));var q=f.offset();var d=q.left,o=q.left+f.outerWidth();if(b!=null){if(o>r.left&&f.attr("tabid")==b){v=f;break}}else{if(d<=r.left&&o>r.left){v=f;break}}}if(v==null){return false}var j=h-(r.left-u.left)+parseInt(v.css("marginLeft"))+parseInt(v.css("marginRight"));t.tab.links.ul.animate({left:-1*j});return true},moveToTabItem:function(b){var c=this,d=this.options;if(!c.moveToPrevTabItem(b)){c.moveToNextTabItem(b)}},getTabItemCount:function(){var b=this,c=this.options;return a("li",b.tab.links.ul).length},getSelectedTabItemID:function(){var b=this,c=this.options;return a("li.l-selected",b.tab.links.ul).attr("tabid")},removeSelectedTabItem:function(){var b=this,c=this.options;b.removeTabItem(b.getSelectedTabItemID())},overrideSelectedTabItem:function(b){var c=this,d=this.options;c.overrideTabItem(c.getSelectedTabItemID(),b)},overrideTabItem:function(l,o){var f=this,d=this.options;if(f.trigger("beforeOverrideTabItem",[l])==false){return false}var b=o.tabid;if(b==undefined){b=f.getNewTabid()}var c=o.url;var i=o.content;var h=o.target;var n=o.text;var j=o.showClose;var m=o.height;if(f.isTabItemExist(b)){return}var e=a("li[tabid="+l+"]",f.tab.links.ul);var k=a(".l-tab-content-item[tabid="+l+"]",f.tab.content);if(!e||!k){return}e.attr("tabid",b);k.attr("tabid",b);if(a("iframe",k).length==0&&c){k.html("<iframe frameborder='0'></iframe>")}else{if(i){k.html(i)}}a("iframe",k).attr("name",b);if(j==undefined){j=true}if(j==false){a(".l-tab-links-item-close",e).remove()}else{if(a(".l-tab-links-item-close",e).length==0){e.append("<div class='l-tab-links-item-close'></div>")}}if(n==undefined){n=b}if(m){k.height(m)}a("a",e).text(n);a("iframe",k).attr("src",c);f.trigger("afterOverrideTabItem",[l])},setHeader:function(b,c){a("li[tabid="+b+"] a",this.tab.links.ul).text(c)},selectTabItem:function(b){var c=this,d=this.options;if(c.trigger("beforeSelectTabItem",[b])==false){return false}c.selectedTabId=b;a("> .l-tab-content-item[tabid="+b+"]",c.tab.content).show().siblings().hide();a("li[tabid="+b+"]",c.tab.links.ul).addClass("l-selected").siblings().removeClass("l-selected");c.trigger("afterSelectTabItem",[b])},moveToLastTabItem:function(){var d=this,e=this.options;var f=0;a("li",d.tab.links.ul).each(function(){f+=a(this).width()+2});var c=d.tab.width();if(f>c){var b=a(".l-tab-links-right",d.tab.links).width();d.tab.links.ul.animate({left:-1*(f-c+b+2)})}},isTabItemExist:function(b){var c=this,d=this.options;return a("li[tabid="+b+"]",c.tab.links.ul).length>0},addTabItem:function(q){var h=this,d=this.options;if(h.trigger("beforeAddTabItem",[q])==false){return false}var b=q.tabid;if(b==undefined){b=h.getNewTabid()}var c=q.url;var i=q.content;var o=q.text;var j=q.showClose;var n=q.height;if(h.isTabItemExist(b)){h.selectTabItem(b);return}var e=a("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>");var l=a("<div class='l-tab-content-item'><div class='l-tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>");var m=a("div:first",l);var f=a("iframe:first",l);if(h.makeFullHeight){var k=h.tab.height()-h.tab.links.height();l.height(k)}e.attr("tabid",b);l.attr("tabid",b);if(c){f.attr("name",b).attr("id",b).attr("src",c).bind("load.tab",function(){m.hide();if(q.callback){q.callback()}})}else{f.remove();m.remove()}if(i){l.html(i)}else{if(q.target){l.append(q.target)}}if(j==undefined){j=true}if(j==false){a(".l-tab-links-item-close",e).remove()}if(o==undefined){o=b}if(n){l.height(n)}a("a",e).text(o);if(a(".l-tab-itemswitch",h.tab.links.ul).length){e.insertBefore(a(".l-tab-itemswitch",h.tab.links.ul))}else{h.tab.links.ul.append(e)}h.tab.content.append(l);h.selectTabItem(b);if(h.setTabButton()){h.moveToTabItem(b)}h._addTabItemEvent(e);if(d.dragToMove&&a.fn.ligerDrag){h.drags=h.drags||[];e.each(function(){h.drags.push(h._applyDrag(this))})}h.toggleSwitch();h.trigger("afterAddTabItem",[q])},_addTabItemEvent:function(b){var c=this,d=this.options;b.click(function(){var e=a(this).attr("tabid");c.selectTabItem(e)});c.tab.menu&&c._addTabItemContextMenuEven(b);a(".l-tab-links-item-close",b).hover(function(){a(this).addClass("l-tab-links-item-close-over")},function(){a(this).removeClass("l-tab-links-item-close-over")}).click(function(){var e=a(this).parent().attr("tabid");c.removeTabItem(e)})},removeTabItem:function(c){var f=this,h=this.options;if(f.trigger("beforeRemoveTabItem",[c])==false){return false}var e=a("li[tabid="+c+"]",f.tab.links.ul).hasClass("l-selected");if(e){a(".l-tab-content-item[tabid="+c+"]",f.tab.content).prev().show();a("li[tabid="+c+"]",f.tab.links.ul).prev().addClass("l-selected").siblings().removeClass("l-selected")}var b=a(".l-tab-content-item[tabid="+c+"]",f.tab.content);var d=a("iframe",b);if(d.length){var i=d[0];i.src="about:blank";i.contentWindow.document.write("");a.browser.msie&&CollectGarbage();d.remove()}b.remove();a("li[tabid="+c+"]",f.tab.links.ul).remove();f.setTabButton();f.trigger("afterRemoveTabItem",[c])},addHeight:function(e){var c=this,d=this.options;var b=c.tab.height()+e;c.setHeight(b)},setHeight:function(b){var c=this,d=this.options;c.tab.height(b);c.setContentHeight()},setContentHeight:function(){var c=this,d=this.options;var b=c.tab.height()-c.tab.links.height();c.tab.content.height(b);a("> .l-tab-content-item",c.tab.content).height(b)},getNewTabid:function(){var b=this,c=this.options;b.getnewidcount=b.getnewidcount||0;return"tabitem"+(++b.getnewidcount)},getTabidList:function(c,b){var e=this,f=this.options;var d=[];a("> li",e.tab.links.ul).each(function(){if(a(this).attr("tabid")&&a(this).attr("tabid")!=c&&(!b||a(".l-tab-links-item-close",this).length>0)){d.push(a(this).attr("tabid"))}});return d},removeOther:function(b,f){var d=this,e=this.options;var c=d.getTabidList(b,true);a(c).each(function(){d.removeTabItem(this)})},reload:function(b){var f=this,i=this.options;var d=a(".l-tab-content-item[tabid="+b+"]");var h=a(".l-tab-loading:first",d);var e=a("iframe:first",d);var c=a(e).attr("src");h.show();e.attr("src",c).unbind("load.tab").bind("load.tab",function(){h.hide()})},removeAll:function(e){var c=this,d=this.options;var b=c.getTabidList(null,true);a(b).each(function(){c.removeTabItem(this)})},onResize:function(){var b=this,c=this.options;if(!c.height||typeof(c.height)!="string"||c.height.indexOf("%")==-1){return false}if(b.tab.parent()[0].tagName.toLowerCase()=="body"){var d=a(window).height();d-=parseInt(b.tab.parent().css("paddingTop"));d-=parseInt(b.tab.parent().css("paddingBottom"));b.height=c.heightDiff+d*parseFloat(b.height)*0.01}else{b.height=c.heightDiff+(b.tab.parent().height()*parseFloat(c.height)*0.01)}b.tab.height(b.height);b.setContentHeight()},_menuItemClick:function(c){var b=this,d=this.options;if(!c.id||!b.actionTabid){return}switch(c.id){case"close":if(b.trigger("close")==false){return}b.removeTabItem(b.actionTabid);b.actionTabid=null;break;case"closeother":if(b.trigger("closeother")==false){return}b.removeOther(b.actionTabid);break;case"closeall":if(b.trigger("closeall")==false){return}b.removeAll();b.actionTabid=null;break;case"reload":if(b.trigger("reload",[{tabid:b.actionTabid}])==false){return}b.selectTabItem(b.actionTabid);b.reload(b.actionTabid);break}},_addTabItemContextMenuEven:function(b){var c=this,d=this.options;b.bind("contextmenu",function(f){if(!c.tab.menu){return}c.actionTabid=b.attr("tabid");c.tab.menu.show({top:f.pageY,left:f.pageX});if(a(".l-tab-links-item-close",this).length==0){c.tab.menu.setDisabled("close")}else{c.tab.menu.setEnabled("close")}return false})}})})(jQuery);