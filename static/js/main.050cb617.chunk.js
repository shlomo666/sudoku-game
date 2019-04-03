(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(19)},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(11),o=n.n(l),i=(n(18),n(4)),u=n(2),c=n(3),s=n(6),f=n(5),h=n(7),d=(n(8),n(9)),v=n(1),m=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(u.a)(this,e),this.row=[],this.column=[],this.block=[],this.value=t,this.options=[],this.locked=!1,this.fiber=0,this.index=0},b=function(){function e(t){Object(u.a)(this,e),this.dim=t;var n=this.sqrt=Math.pow(t,.5);this.rows=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.columns=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.blocks=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.all=new Array(Math.pow(t,2)).fill(0);for(var r=0;r<t;r++)for(var a=0;a<t;a++){var l=new m;this.rows[r][a]=l,l.row=this.rows[r],this.columns[a][r]=l,l.column=this.columns[a],this.blocks[r-r%n+(a-a%n)/n][r%n*n+a%n]=l,l.block=this.blocks[r-r%n+(a-a%n)/n],this.all[r*t+a]=l,l.options=Object(v.a)(Array(t)),l.index=r*t+a}}return Object(c.a)(e,[{key:"backup",value:function(){this.backupState=this.all.map(function(e){return e.value})}},{key:"rollback",value:function(){var e=this;this.all.map(function(t,n){return t.value=e.backupState[n]})}},{key:"solve",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(this.dim,1),n=arguments.length>1?arguments[1]:void 0;this.backup(),n||this.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0});for(var r=-1,a=1,l={},o=function(){if(r+=a,!(l=e.all[r])||l.locked)return"continue";var n=l.value,o=function(e){return e.value===n},i=t.indexOf(n);do{n=t[++i]}while(i<t.length&&(l.block.some(o)||l.row.some(o)||l.column.some(o)));i<t.length?(l.value=n,a=1):(l.value=0,a=-1)};l;)o();return-1===r&&this.rollback(),r>-1}},{key:"isSolvable",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(this.dim,1);this.backup();for(var n=-1,r=1,a={},l=function(){if(n+=r,!(a=e.all[n])||a.locked)return"continue";var l=a.value,o=function(e){return e.value===l},i=t.indexOf(l);do{l=t[++i]}while(i<t.length&&(a.block.some(o)||a.row.some(o)||a.column.some(o)));i<t.length?(a.value=l,r=1):(a.value=0,r=-1)};a;)l();if(-1===n)return this.rollback(),!1;r=-1,a={};for(var o=function(){if(n+=r,!(a=e.all[n])||a.locked)return"continue";var l=a.value,o=function(e){return e.value===l},i=t.indexOf(l);do{l=t[++i]}while(i<t.length&&(a.block.some(o)||a.row.some(o)||a.column.some(o)));i<t.length?(a.value=l,r=1):(a.value=0,r=-1)};a;)o();return this.rollback(),-1===n&&!0}},{key:"shuffle_test",value:function(){var e=k(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,this.dim);this.all.forEach(function(e){e.locked=!1,e.value=0});var t=g(p(this.dim,1));this.solve(t,!0);var n,r=Math.pow(this.dim,2),a=g(p(r));this.all.forEach(function(e){return e.locked=!0});var l=[];for(n=r-1;n>=e;n--){var o=this.all[a[n]];l.push(o.value),o.locked=!1,o.value=0}n++;for(var i=0;!this.isSolvable(t);)this.all[a[n]].value=l.pop(),i++;i>0&&(console.warn("Shuffle could not stand up to expectations: expected ".concat(e," visibleCells, got down to ").concat(e-i," visible cells")),window.currVisible=e-i)}},{key:"shuffleHard",value:function(){if(9!==this.dim)return this.shuffle();do{this.shuffle();var e=void 0;do{(e=this.getHints()).forEach(function(e){var t=e.cell,n=e.value;return t.value=n})}while(e.length>0)}while(this.all.every(function(e){return e.value>0}));this.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0})}},{key:"shuffle",value:function(){var e=k(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,this.dim);this.all.forEach(function(e){e.locked=!1,e.value=0});var t=g(p(this.dim,1));this.solve(t,!0),this.all.forEach(function(e){return e.locked=!0});var n,r,a,l=Math.pow(this.dim,2),o=g(p(l)),i=l,u=0;do{do{n=(r=this.all[o[u]]).value,r.value=0,r.locked=!1,u++,i--,a=this.isSolvable(t)}while(a&&i>e&&u<l);a||(i++,r.value=n,r.locked=!0)}while(i>e&&u<l);i>e&&(console.warn("Shuffle could not stand up to expectations: expected ".concat(e," visibleCells, got down to ").concat(i," visible cells")),window.currVisible=i)}},{key:"setFibers",value:function(){var e=this;this.all.filter(function(e){return!e.value}).forEach(function(t){var n=parseInt("1".repeat(e.dim),2);t.row.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.column.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.block.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.fiber=n})}},{key:"getHints",value:function(){var e=this;this.setFibers();for(var t=this.all.filter(function(e){return!e.value&&!(e.fiber&e.fiber-1)}).map(function(e){return{cell:e,value:e.fiber.toString(2).length}}),n=function(n){[e.rows,e.columns,e.blocks].forEach(function(e){e.forEach(function(e){var r=e.filter(function(e){return!e.value&&e.fiber&1<<n-1});1===r.length&&t.push({cell:r[0],value:n})})})},r=1;r<=this.dim;r++)n(r);return t}},{key:"getHints_indexes",value:function(){for(var e=this,t=Object(v.a)(this.all.keys()).filter(function(t){return!e.all[t].value&&!(e.all[t].fiber&e.all[t].fiber-1)}).map(function(t){return{index:t,value:e.all[t].fiber.toString(2).length}}),n=function(n){[e.rows,e.columns,e.blocks].forEach(function(r){r.forEach(function(r){var a=r.filter(function(e){return!e.value&&e.fiber&1<<n-1});1===a.length&&t.push({index:e.all.indexOf(a[0]),value:n})})})},r=1;r<=this.dim;r++)n(r);return t}}]),e}();function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Array(e).fill().map(function(e,n){return n+t})}function g(e){for(var t=0;t<e.length;t++){var n=Math.floor(Math.random()*e.length-t)+t,r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e}var y={4:{1:8,2:7,3:6,4:5,5:4},9:{1:40,2:35,3:30,4:25,5:22},16:{1:180,2:160,3:140,4:120,5:115}};function k(e,t){return y[t][e]}b.Cell=m;var E=b;var w=function(e){var t=e.dim,n=e.cell,r=e.onChange;return a.a.createElement("div",{style:{display:"flex"}},Array(t).fill().map(function(e,t){return t}).map(function(e){return a.a.createElement("button",{key:e,className:"Options-Dialog-Button"+(n&&n.options[e]?"":" Options-Dialog-Button-Pressed"),onClick:function(){n&&(n.options[e]=!n.options[e],r())}},e+1)}))};function x(e){return Object(v.a)(Array(e).keys())}function C(e){var t;!function(e){e.all.forEach(function(t){if(t.value)t.fiber=0;else{var n=(1<<e.dim)-1;t.row.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.column.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.block.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.fiber=n}})}(e);do{t=e.all.map(function(e){return e.fiber}),O(e),S(e),j(e)}while(e.all.some(function(e,n){return e.fiber!==t[n]}))}function O(e){var t=e.sqrt,n=e.dim;[[e.rows.flat(),function(e,r,a){return a[e*n+r*t].block.filter(function(n,r){return Math.floor(r/t)!==e%t})}],[e.columns.flat(),function(e,r,a){return a[e*n+r*t].block.filter(function(t){return t.index%n!==e%n})}],[e.blocks.flat(),function(e,r,a){return a[e*n+r*t].row.filter(function(n,r){return Math.floor(r/t)!==e%t})}],[e.blocks.map(function(e){return e.map(function(e,n,r){return r[Math.floor(n/t)+n%t*t]})}).flat(),function(n,r,a){return e.blocks[n][r].column.filter(function(e,r){return Math.floor(r/t)!==Math.floor(n/t)})}]].forEach(function(e,r){var a=Object(d.a)(e,2),l=a[0],o=a[1],i=B(l,t).map(function(e){return e.filter(function(e){return!e.value}).reduce(function(e,t){return e|t.fiber},0)}),u=B(i,t);x(n).map(function(e){return 1<<e}).forEach(function(e){u.forEach(function(t,n){var r=t.map(function(t){return!!(e&t)});if(1===r.filter(function(e){return e}).length){var a=r.indexOf(!0);o(n,a,l).forEach(function(t){return t.fiber=t.fiber&~e})}})})})}function S(e){var t=N.bind(null,2),n=[e.rows,e.columns,e.blocks],r=[new Set,new Set,new Set],a=!1;do{a=!1;for(var l=0;l<n.length;l++){var o=r[l],i=!0,u=!1,c=void 0;try{for(var s,f=n[l][Symbol.iterator]();!(i=(s=f.next()).done);i=!0)for(var h=s.value,d=h.filter(t),v=0;v<d.length;v++)if(!o.has(d[v].index))for(var m=d[v].fiber,b=v+1;b<d.length;b++)if(m===d[b].fiber){o.add(d[v].index).add(d[b].index),a=!0,console.log("reduceFibers2",d[v].index,d[b].index);var p=!0,g=!1,y=void 0;try{for(var k,E=h[Symbol.iterator]();!(p=(k=E.next()).done);p=!0){var w=k.value;w.fiber&&w.fiber!==m&&(w.fiber=w.fiber&~m)}}catch(x){g=!0,y=x}finally{try{p||null==E.return||E.return()}finally{if(g)throw y}}}}catch(x){u=!0,c=x}finally{try{i||null==f.return||f.return()}finally{if(u)throw c}}}}while(a)}function j(e){var t=function(e){return N(2,e)||N(3,e)},n=[e.rows,e.columns,e.blocks],r=[new Set,new Set,new Set],a=!1;do{a=!1;for(var l=0;l<n.length;l++){var o=r[l],i=!0,u=!1,c=void 0;try{for(var s,f=function(){for(var e=s.value,n=e.filter(t),r=0;r<n.length;r++)if(!o.has(n[r].index))for(var l=r+1;l<n.length;l++)if(!o.has(n[l].index))for(var i=l+1;i<n.length;i++)if(!o.has(n[i].index)){var u=n[r].fiber|n[l].fiber|n[i].fiber;if(t({fiber:u})){var c,f=[r,l,i].map(function(e){return n[e].index});f.forEach(o.add.bind(o));var h=u;(c=console).log.apply(c,["reduceFibers3"].concat(Object(v.a)(f)));var d=!0,m=!1,b=void 0;try{for(var p,g=e[Symbol.iterator]();!(d=(p=g.next()).done);d=!0){var y=p.value;y.fiber&&!f.includes(y.index)&&(y.fiber=y.fiber&~h)}}catch(k){m=!0,b=k}finally{try{d||null==g.return||g.return()}finally{if(m)throw b}}a=!0;break}}},h=n[l][Symbol.iterator]();!(i=(s=h.next()).done);i=!0)f()}catch(d){u=!0,c=d}finally{try{i||null==h.return||h.return()}finally{if(u)throw c}}}}while(a)}function N(e,t){var n=0,r=t.fiber;do{n+=1&r}while(n<=e&&(r>>=1));return n===e}function B(e,t){return Object(v.a)(Array(e.length/t).keys()).map(function(n){return e.slice(n*t,(n+1)*t)})}var A=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(s.a)(this,Object(f.a)(t).call(this,e))).state={board:function(){var e=new E(n.props.dim);return e.shuffleHard(),e.all.forEach(function(e){e.state={highlightedCell:!1,highlightedNumber:!1}}),e}(),optionsMode:!1},n.isEnded=!1,n.fullCounter=n.state.board.all.filter(function(e){return e.value}).length,n.focusedCell=null,n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.board,n=t.sqrt;window.board=t;var r=a.a.createElement("div",{className:"App-header"},a.a.createElement("div",null,a.a.createElement("p",{style:this.state.error?{}:{color:"#282c34"}},this.state.error||"something")),a.a.createElement("div",null,a.a.createElement(w,{dim:t.dim,cell:this.focusedCell,onChange:function(){return e.setState(e.state)}})),a.a.createElement("div",null,x(n).map(function(r){return a.a.createElement("div",{style:{display:"flex"}},x(n).map(function(l){return a.a.createElement("div",{className:"Board-Block"},x(n).map(function(o){return a.a.createElement("div",{style:{display:"flex"}},x(n).map(function(a){var i=t.blocks[r*n+l][o*n+a];return!i.value&&i.options.some(function(e){return e})?e.getOptionsCell(i):e.getNumberCell(i)}))}))}))})),a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("button",{className:"Buttons btn-green",onClick:function(){t.solve()?e.setState(e.state):(e.state.error="Cannot be solved!",e.setState(e.state))}},"Solve"),a.a.createElement("button",{className:"Buttons btn-yellow",onClick:function(){t.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0,e.options=Array(t.dim).fill()}),t.all.forEach(function(e){e.state={highlightedCell:!1,highlightedNumber:!1}}),e.setState(e.state)}},"Reset"),a.a.createElement("button",{className:"Buttons btn-red",onClick:function(){e.props.onExit()}},"Exit")),a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("button",{className:"Buttons btn-blue",onClick:function(){e.showHint()}},"Hint"),a.a.createElement("button",{className:"Buttons btn-blue",onClick:function(){C(t),t.all.filter(function(e){return 0===e.value}).forEach(function(e){e.options=e.options.map(function(t,n){return!!(e.fiber&1<<n)})}),e.setState(e.state)}},"Find All Options")));return delete this.state.error,r}},{key:"getNumberCell",value:function(e){var t=this,n=this.state.board;return a.a.createElement("div",{className:"Cell"},a.a.createElement("input",{type:"text",maxLength:"2",readOnly:this.isEnded||e.locked,key:e.index,className:"Cell",style:{backgroundColor:e.locked?"#A7A7B4":e.state.highlightedCell?"rgba(255,255,255,0.8)":"",color:e.state.highlightedNumber?"blue":"",fontWeight:e.state.highlightedNumber?"bolder":"bold"},value:e.value||"",onFocus:function(r){t.focusedCell=e.value?null:e,H(e),M(e,n),t.setState(t.state),e.locked||r.target.setSelectionRange(0,r.target.value.length)},onBlur:function(){q(e),M(e,n),t.setState(t.state)},onChange:function(r){var a=Number(r.target.value||0);t.changeValueOnBoard(a,e,n),t.focusedCell=e.value?null:e}}))}},{key:"changeValueOnBoard",value:function(e,t,n){e>=0&&e<=this.props.dim&&(!!t.value!==!!e&&(this.fullCounter+=e?1:-1,this.fullCounter===Math.pow(n.dim,2)&&(!function(e){return e.rows.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})&&e.columns.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})&&e.blocks.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})}(n)?(this.setState(Object(i.a)({},this.state,{error:"Wrong!"})),this.isEnded=!0):(this.setState(Object(i.a)({},this.state,{error:"You Won!"})),this.isEnded=!0))),t.value=e,this.setState(this.state)),M(t,n)}},{key:"getOptionsCell",value:function(e){var t=this,n=this.state.board,r=Math.floor(30/n.sqrt);return a.a.createElement("div",{className:"Cell"},a.a.createElement("div",{className:"Cell options-container",key:e.index,tabIndex:"0",readOnly:this.isEnded,style:this.focusedCell===e?{color:"blue",backgroundColor:"beige"}:e.state.highlightedCell?{backgroundColor:"rgba(255,255,255,0.8)"}:{},onFocus:function(r){t.focusedCell=e,H(e),M(e,n),t.setState(t.state)},onBlur:function(){q(e),M(e,n),t.setState(t.state)},onKeyUp:function(r){/[0-9]/.test(r.key)&&t.changeValueOnBoard(Number(r.key),e,n)}},e.options.map(function(e,t){return a.a.createElement("div",{className:"options-cell",style:{fontSize:"".concat(4===n.sqrt?r/2|0:r-1,"px"),width:"".concat(r,"px"),height:"".concat(r,"px")}},e?t+1:" ")})))}},{key:"showHint",value:function(){C(this.state.board);var e=function(e){var t=Object(v.a)(e.all.keys()).filter(function(t){return!e.all[t].value&&!(e.all[t].fiber&e.all[t].fiber-1)}).map(function(t){return{index:t,value:e.all[t].fiber.toString(2).length,reason:"The only available option for this cell"}});return x(e.dim).forEach(function(n){var r=n+1,a=1<<n;[[e.rows,"only candidate for ".concat(r," in row")],[e.columns,"only candidate for ".concat(r," in column")],[e.blocks,"only candidate for ".concat(r," in block")]].forEach(function(n){var l=Object(d.a)(n,2),o=l[0],i=l[1];o.forEach(function(n){var l=n.filter(function(e){return!e.value&&e.fiber&a});1===l.length&&t.push({index:e.all.indexOf(l[0]),value:r,reason:i})})})}),t}(this.state.board);console.log(e);var t=Object(d.a)(e,1)[0];if(t){var n=this.state.board,r=n.all[t.index];H(r),this.state.error=t.reason,this.changeValueOnBoard(t.value,r,n),setTimeout(function(){q(r)})}return t}}]),t}(r.Component);function M(e,t){t.all.forEach(function(t){t.state.highlightedNumber=e.value===t.value})}function H(e){e.row.forEach(function(e){return e.state.highlightedCell=!0}),e.column.forEach(function(e){return e.state.highlightedCell=!0})}function q(e){e.row.forEach(function(e){return e.state.highlightedCell=!1}),e.column.forEach(function(e){return e.state.highlightedCell=!1})}var F=function(e){function t(){var e,n;Object(u.a)(this,t);for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(a)))).state={dim:n.props.dim},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=new E(this.state.dim),n=t.sqrt;return a.a.createElement("div",{className:"App-header"},a.a.createElement("button",{className:"Buttons",onClick:function(){var t=Object(i.a)({},e.state,{page:"new game"});e.setState(t),e.props.onChange(t)}},"New Game"),a.a.createElement("button",{className:"Buttons",onClick:function(){var t=Object(i.a)({},e.state,{page:"solver"});e.setState(t),e.props.onChange(t)}},"Solver"),a.a.createElement("select",{className:"Buttons",defaultValue:"9",onInput:function(t){e.setState(Object(i.a)({},e.state,{dim:Number(t.target.value)}))}},a.a.createElement("option",{value:"4"},"4x4"),a.a.createElement("option",{value:"9"},"9x9"),a.a.createElement("option",{value:"16"},"16x16")),a.a.createElement("div",null,V(n).map(function(e){return a.a.createElement("div",{key:"a"+e,style:{display:"flex"}},V(n).map(function(r){return a.a.createElement("div",{key:"b"+r,className:"Board-Block"},V(n).map(function(l){return a.a.createElement("div",{key:"l"+l,style:{display:"flex"}},V(n).map(function(o){var i=t.blocks[e*n+r][l*n+o];return a.a.createElement("input",{key:i.index,type:"text",maxLength:"2",readOnly:!0,className:"Cell-Mini",value:i.value||""})}))}))}))})))}}]),t}(r.Component);function V(e){return Object(v.a)(Array(e).keys())}var W=function(e){function t(){var e,n;Object(u.a)(this,t);for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(a)))).state={board:new E(n.props.dim)},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.board,n=t.sqrt;window.board=t;var r=a.a.createElement("div",{className:"App-header"},a.a.createElement("div",null,a.a.createElement("p",{hidden:!this.state.error},this.state.error)),a.a.createElement("div",null,z(n).map(function(r){return a.a.createElement("div",{style:{display:"flex"}},z(n).map(function(l){return a.a.createElement("div",{className:"Board-Block"},z(n).map(function(o){return a.a.createElement("div",{style:{display:"flex"}},z(n).map(function(i){var u=t.blocks[r*n+l][o*n+i];return a.a.createElement("input",{type:"text",maxLength:"2",className:"Cell",style:{backgroundColor:u.locked?"gray":"",borderColor:u.locked?"gray":""},value:u.value||"",onChange:function(n){var r=Number(n.target.value||0);r>=0&&r<=e.props.dim&&(u.value=r,u.locked=!!u.value,e.setState({board:t}))}})}))}))}))})),a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("button",{className:"Buttons btn-green",onClick:function(){t.solve()?e.setState({board:t}):e.setState({board:t,error:"Cannot be solved!"})}},"Solve"),a.a.createElement("button",{className:"Buttons btn-yellow",onClick:function(){e.setState({board:new E(e.props.dim)})}},"Reset"),a.a.createElement("button",{className:"Buttons btn-red",onClick:function(){e.props.onExit()}},"Exit")));return delete this.state.error,r}}]),t}(r.Component);function z(e){return Object(v.a)(Array(e).keys())}var I=function(e){function t(){var e,n;Object(u.a)(this,t);for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(a)))).state={dim:9,page:"menu"},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},function(e,t){switch(e.page){case"new game":return a.a.createElement(A,{dim:e.dim,onExit:function(){return t(Object(i.a)({},e,{page:"menu"}))}});case"menu":return a.a.createElement(F,{dim:e.dim,onChange:t});case"solver":return a.a.createElement(W,{dim:e.dim,onExit:function(){return t(Object(i.a)({},e,{page:"menu"}))}})}}(this.state,function(t){return e.setState(t)})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.050cb617.chunk.js.map