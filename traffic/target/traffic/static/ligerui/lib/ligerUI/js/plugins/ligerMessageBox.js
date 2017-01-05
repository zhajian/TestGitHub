(function(a){a.ligerMessageBox=function(b){return a.ligerui.run.call(null,"ligerMessageBox",arguments,{isStatic:true})};a.ligerDefaults.MessageBox={isDrag:true};a.ligerMethos.MessageBox={};a.ligerui.controls.MessageBox=function(b){a.ligerui.controls.MessageBox.base.constructor.call(this,null,b)};a.ligerui.controls.MessageBox.ligerExtend(a.ligerui.core.UIComponent,{__getType:function(){return"MessageBox"},__idPrev:function(){return"MessageBox"},_extendMethods:function(){return a.ligerMethos.MessageBox},_render:function(){var e=this,j=this.options;var f="";f+='<div class="l-messagebox">';f+='        <div class="l-messagebox-lt"></div><div class="l-messagebox-rt"></div>';f+='        <div class="l-messagebox-l"></div><div class="l-messagebox-r"></div> ';f+='        <div class="l-messagebox-image"></div>';f+='        <div class="l-messagebox-title">';f+='            <div class="l-messagebox-title-inner"></div>';f+='            <div class="l-messagebox-close"></div>';f+="        </div>";f+='        <div class="l-messagebox-content">';f+="        </div>";f+='        <div class="l-messagebox-buttons"><div class="l-messagebox-buttons-inner">';f+="        </div></div>";f+="    </div>";e.messageBox=a(f);a("body").append(e.messageBox);e.messageBox.close=function(){e._removeWindowMask();e.messageBox.remove()};j.width&&e.messageBox.width(j.width);j.title&&a(".l-messagebox-title-inner",e.messageBox).html(j.title);j.content&&a(".l-messagebox-content",e.messageBox).html(j.content);if(j.buttons){a(j.buttons).each(function(k,l){var g=a('<div class="l-messagebox-btn"><div class="l-messagebox-btn-l"></div><div class="l-messagebox-btn-r"></div><div class="l-messagebox-btn-inner"></div></div>');a(".l-messagebox-btn-inner",g).html(l.text);a(".l-messagebox-buttons-inner",e.messageBox).append(g);l.width&&g.width(l.width);l.onclick&&g.click(function(){l.onclick(l,k,e.messageBox)})});a(".l-messagebox-buttons-inner",e.messageBox).append("<div class='l-clear'></div>")}var d=e.messageBox.width();var c=0;a(".l-messagebox-buttons-inner .l-messagebox-btn",e.messageBox).each(function(){c+=a(this).width()});a(".l-messagebox-buttons-inner",e.messageBox).css({marginLeft:parseInt((d-c)*0.5)});e._applyWindowMask();e._applyDrag();e._setImage();var i=0;var h=0;var b=j.width||e.messageBox.width();if(j.left!=null){i=j.left}else{j.left=i=0.5*(a(window).width()-b)}if(j.top!=null){h=j.top}else{j.top=h=0.5*(a(window).height()-e.messageBox.height())+a(window).scrollTop()-10}if(i<0){j.left=i=0}if(h<0){j.top=h=0}e.messageBox.css({left:i,top:h});a(".l-messagebox-btn",e.messageBox).hover(function(){a(this).addClass("l-messagebox-btn-over")},function(){a(this).removeClass("l-messagebox-btn-over")});a(".l-messagebox-close",e.messageBox).hover(function(){a(this).addClass("l-messagebox-close-over")},function(){a(this).removeClass("l-messagebox-close-over")}).click(function(){e.messageBox.close()});e.set(j)},close:function(){var b=this,c=this.options;this.g._removeWindowMask();this.messageBox.remove()},_applyWindowMask:function(){var b=this,c=this.options;a(".l-window-mask").remove();a("<div class='l-window-mask' style='display: block;'></div>").appendTo(a("body"))},_removeWindowMask:function(){var b=this,c=this.options;a(".l-window-mask").remove()},_applyDrag:function(){var b=this,c=this.options;if(c.isDrag&&a.fn.ligerDrag){b.messageBox.ligerDrag({handler:".l-messagebox-title-inner",animate:false})}},_setImage:function(){var b=this,c=this.options;if(c.type){if(c.type=="success"||c.type=="donne"){a(".l-messagebox-image",b.messageBox).addClass("l-messagebox-image-donne").show();a(".l-messagebox-content",b.messageBox).css({paddingLeft:64,paddingBottom:30})}else{if(c.type=="error"){a(".l-messagebox-image",b.messageBox).addClass("l-messagebox-image-error").show();a(".l-messagebox-content",b.messageBox).css({paddingLeft:64,paddingBottom:30})}else{if(c.type=="warn"){a(".l-messagebox-image",b.messageBox).addClass("l-messagebox-image-warn").show();a(".l-messagebox-content",b.messageBox).css({paddingLeft:64,paddingBottom:30})}else{if(c.type=="question"){a(".l-messagebox-image",b.messageBox).addClass("l-messagebox-image-question").show();a(".l-messagebox-content",b.messageBox).css({paddingLeft:64,paddingBottom:40})}}}}}}});a.ligerMessageBox.show=function(b){return a.ligerMessageBox(b)};a.ligerMessageBox.alert=function(f,e,d,c){f=f||"";e=e||f;var b=function(h,g,i){i.close();if(c){c(h,g,i)}};p={title:f,content:e,buttons:[{text:"确定",onclick:b}]};if(d){p.type=d}return a.ligerMessageBox(p)};a.ligerMessageBox.confirm=function(d,c,e){var b=function(g,f,h){h.close();if(e){e(f==0)}};p={type:"question",title:d,content:c,buttons:[{text:"是",onclick:b},{text:"否",onclick:b}]};return a.ligerMessageBox(p)};a.ligerMessageBox.success=function(d,c,b){return a.ligerMessageBox.alert(d,c,"success",b)};a.ligerMessageBox.error=function(d,c,b){return a.ligerMessageBox.alert(d,c,"error",b)};a.ligerMessageBox.warn=function(d,c,b){return a.ligerMessageBox.alert(d,c,"warn",b)};a.ligerMessageBox.question=function(c,b){return a.ligerMessageBox.alert(c,b,"question")}})(jQuery);