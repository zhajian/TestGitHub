(function(a,b){a.fn.aceTree=a.fn.ace_tree=function(d){var c={"open-icon":ace.vars.icon+"fa fa-folder-open","close-icon":ace.vars.icon+"fa fa-folder",selectable:true,"selected-icon":ace.vars.icon+"fa fa-check","unselected-icon":ace.vars.icon+"fa fa-times",loadingHTML:"Loading..."};c=a.extend({},c,d);this.each(function(){var e=a(this);e.addClass("tree").attr("role","tree");e.html('<li class="tree-branch hide" data-template="treebranch" role="treeitem" aria-expanded="false">				<div class="tree-branch-header">					<span class="tree-branch-name">						<i class="icon-folder '+c["close-icon"]+'"></i>						<span class="tree-label"></span>					</span>				</div>				<ul class="tree-branch-children" role="group"></ul>				<div class="tree-loader" role="alert">'+c.loadingHTML+'</div>			</div>			<li class="tree-item hide" data-template="treeitem" role="treeitem">				<span class="tree-item-name">				  '+(c["unselected-icon"]==null?"":'<i class="icon-item '+c["unselected-icon"]+'"></i>')+'				  <span class="tree-label"></span>				</span>			</li>');e.addClass(c.selectable==true?"tree-selectable":"tree-unselectable");e.tree(c)});return this}})(window.jQuery);