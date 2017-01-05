if(typeof he!=="object"&&typeof require==="function"){var he=require("he")}var toMarkdown=function(l){var h=[{patterns:"p",replacement:function(j,i,p){return p?"\n\n"+p+"\n":""}},{patterns:"br",type:"void",replacement:"\n"},{patterns:"h([1-6])",replacement:function(s,j,q,t){var p="";for(var r=0;r<j;r++){p+="#"}return"\n\n"+p+" "+t+"\n"}},{patterns:"hr",type:"void",replacement:"\n\n* * *\n"},{patterns:"a",replacement:function(q,j,r){var i=j.match(n("href")),p=j.match(n("title"));return i?"["+r+"]("+i[1]+(p&&p[1]?' "'+p[1]+'"':"")+")":q}},{patterns:["b","strong"],replacement:function(j,i,p){return p?"**"+p+"**":""}},{patterns:["i","em"],replacement:function(j,i,p){return p?"_"+p+"_":""}},{patterns:"code",replacement:function(j,i,p){return p?"`"+he.decode(p)+"`":""}},{patterns:"img",type:"void",replacement:function(r,i,s){var q=i.match(n("src")),j=i.match(n("alt")),p=i.match(n("title"));return"!["+(j&&j[1]?j[1]:"")+"]("+q[1]+(p&&p[1]?' "'+p[1]+'"':"")+")"}}];for(var k=0,m=h.length;k<m;k++){if(typeof h[k].patterns==="string"){l=e(l,{tag:h[k].patterns,replacement:h[k].replacement,type:h[k].type})}else{for(var f=0,g=h[k].patterns.length;f<g;f++){l=e(l,{tag:h[k].patterns[f],replacement:h[k].replacement,type:h[k].type})}}}function e(j,q){var r=q.type==="void"?"<"+q.tag+"\\b([^>]*)\\/?>":"<"+q.tag+"\\b([^>]*)>([\\s\\S]*?)<\\/"+q.tag+">",p=new RegExp(r,"gi"),i="";if(typeof q.replacement==="string"){i=j.replace(p,q.replacement)}else{i=j.replace(p,function(v,u,t,s){return q.replacement.call(this,v,u,t,s)})}return i}function n(i){return new RegExp(i+"\\s*=\\s*[\"']?([^\"']*)[\"']?","i")}l=l.replace(/<pre\b[^>]*>`([\s\S]*?)`<\/pre>/gi,function(j,p){var i=he.decode(p);i=i.replace(/^\t+/g,"  ");i=i.replace(/\n/g,"\n    ");return"\n\n    "+i+"\n"});l=l.replace(/^(\s{0,3}\d+)\. /g,"$1\\. ");var o=/<(ul|ol)\b[^>]*>(?:(?!<ul|<ol)[\s\S])*?<\/\1>/gi;while(l.match(o)){l=l.replace(o,function(i){return c(i)})}function c(i){i=i.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi,function(r,p,s){var j=s.split("</li>");j.splice(j.length-1,1);for(k=0,m=j.length;k<m;k++){if(j[k]){var q=(p==="ol")?(k+1)+".  ":"*   ";j[k]=j[k].replace(/\s*<li[^>]*>([\s\S]*)/i,function(t,u){u=u.replace(/^\s+/,"");u=u.replace(/\n\n/g,"\n\n    ");u=u.replace(/\n([ ]*)+(\*|\d+\.) /g,"\n$1    $2 ");return q+u})}}return j.join("\n")});return"\n\n"+i.replace(/[ \t]+\n|\s+$/g,"")}var b=/<blockquote\b[^>]*>((?:(?!<blockquote)[\s\S])*?)<\/blockquote>/gi;while(l.match(b)){l=l.replace(b,function(i){return a(i)})}function a(i){i=i.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi,function(p,j){j=j.replace(/^\s+|\s+$/g,"");j=d(j);j=j.replace(/^/gm,"> ");j=j.replace(/^(>([ \t]{2,}>)+)/gm,"> >");return j});return i}function d(i){i=i.replace(/^[\t\r\n]+|[\t\r\n]+$/g,"");i=i.replace(/\n\s+\n/g,"\n\n");i=i.replace(/\n{3,}/g,"\n\n");return i}return d(l)};if(typeof exports==="object"){exports.toMarkdown=toMarkdown};