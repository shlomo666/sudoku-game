(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(19)},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),l=n.n(o),i=(n(18),n(4)),u=n(1),c=n(2),s=n(6),f=n(5),h=n(7),v=(n(8),n(3)),d=n(9),m=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(u.a)(this,e),this.row=[],this.column=[],this.block=[],this.value=t,this.options=[],this.locked=!1,this.fiber=0,this.index=0},b=function(){function e(t){Object(u.a)(this,e),this.dim=t;var n=this.sqrt=Math.pow(t,.5);this.rows=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.columns=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.blocks=new Array(t).fill().map(function(e){return new Array(t).fill(0)}),this.all=new Array(Math.pow(t,2)).fill(0);for(var a=0;a<t;a++)for(var r=0;r<t;r++){var o=new m;this.rows[a][r]=o,o.row=this.rows[a],this.columns[r][a]=o,o.column=this.columns[r],this.blocks[a-a%n+(r-r%n)/n][a%n*n+r%n]=o,o.block=this.blocks[a-a%n+(r-r%n)/n],this.all[a*t+r]=o,o.options=Object(v.a)(Array(t)),o.index=a*t+r}}return Object(c.a)(e,[{key:"backup",value:function(){this.backupState=this.all.map(function(e){return e.value})}},{key:"rollback",value:function(){var e=this;this.all.map(function(t,n){return t.value=e.backupState[n]})}},{key:"solve",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(this.dim,1),n=arguments.length>1?arguments[1]:void 0;this.backup(),n||this.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0});for(var a=-1,r=1,o={},l=function(){if(a+=r,!(o=e.all[a])||o.locked)return"continue";var n=o.value,l=t.indexOf(n);do{n=t[++l]}while(l<t.length&&(o.block.some(function(e){return e.value===n})||o.row.some(function(e){return e.value===n})||o.column.some(function(e){return e.value===n})));l<t.length?(o.value=n,r=1):(o.value=0,r=-1)};o;)l();return-1===a&&this.rollback(),a>-1}},{key:"isSolvable",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(this.dim,1);this.backup();for(var n=-1,a=1,r={},o=function(){if(n+=a,!(r=e.all[n])||r.locked)return"continue";var o=r.value,l=t.indexOf(o);do{o=t[++l]}while(l<t.length&&(r.block.some(function(e){return e.value===o})||r.row.some(function(e){return e.value===o})||r.column.some(function(e){return e.value===o})));l<t.length?(r.value=o,a=1):(r.value=0,a=-1)};r;)o();if(-1===n)return this.rollback(),!1;a=-1,r={};for(var l=function(){if(n+=a,!(r=e.all[n])||r.locked)return"continue";var o=r.value,l=t.indexOf(o);do{o=t[++l]}while(l<t.length&&(r.block.some(function(e){return e.value===o})||r.row.some(function(e){return e.value===o})||r.column.some(function(e){return e.value===o})));l<t.length?(r.value=o,a=1):(r.value=0,a=-1)};r;)l();return this.rollback(),-1===n&&!0}},{key:"shuffle_test",value:function(){var e=E(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,this.dim);this.all.forEach(function(e){e.locked=!1,e.value=0});var t=g(p(this.dim,1));this.solve(t,!0);var n,a=Math.pow(this.dim,2),r=g(p(a));this.all.forEach(function(e){return e.locked=!0});var o=[];for(n=a-1;n>=e;n--){var l=this.all[r[n]];o.push(l.value),l.locked=!1,l.value=0}n++;for(var i=0;!this.isSolvable(t);)this.all[r[n]].value=o.pop(),i++;i>0&&(console.warn("Shuffle could not stand up to expectations: expected ".concat(e," visibleCells, got down to ").concat(e-i," visible cells")),window.currVisible=e-i)}},{key:"shuffleHard",value:function(){do{this.shuffle();var e=void 0;do{(e=this.getHints()).forEach(function(e){var t=e.cell,n=e.value;return t.value=n})}while(e.length>0)}while(this.all.every(function(e){return e.value>0}));this.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0})}},{key:"shuffle",value:function(){var e=E(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,this.dim);this.all.forEach(function(e){e.locked=!1,e.value=0});var t=g(p(this.dim,1));window.priority=t,this.solve(t,!0),this.all.forEach(function(e){return e.locked=!0});var n,a,r,o=Math.pow(this.dim,2),l=g(p(o)),i=o,u=0;do{do{n=(a=this.all[l[u]]).value,a.value=0,a.locked=!1,u++,i--,r=this.isSolvable(t)}while(r&&i>e&&u<o);r||(i++,a.value=n,a.locked=!0)}while(i>e&&u<o);i>e&&(console.warn("Shuffle could not stand up to expectations: expected ".concat(e," visibleCells, got down to ").concat(i," visible cells")),window.currVisible=i)}},{key:"setFibers",value:function(){var e=this;this.all.filter(function(e){return!e.value}).forEach(function(t){var n=parseInt("1".repeat(e.dim),2);t.row.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.column.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.block.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.fiber=n})}},{key:"getHints",value:function(){var e=this;this.setFibers();for(var t=this.all.filter(function(e){return!e.value&&!(e.fiber&e.fiber-1)}).map(function(e){return{cell:e,value:e.fiber.toString(2).length}}),n=function(n){[e.rows,e.columns,e.blocks].forEach(function(e){e.forEach(function(e){var a=e.filter(function(e){return!e.value&&e.fiber&1<<n-1});1===a.length&&t.push({cell:a[0],value:n})})})},a=1;a<=this.dim;a++)n(a);return t}},{key:"getHints_indexes",value:function(){for(var e=this,t=Object(v.a)(this.all.keys()).filter(function(t){return!e.all[t].value&&!(e.all[t].fiber&e.all[t].fiber-1)}).map(function(t){return{index:t,value:e.all[t].fiber.toString(2).length}}),n=function(n){[e.rows,e.columns,e.blocks].forEach(function(a){a.forEach(function(a){var r=a.filter(function(e){return!e.value&&e.fiber&1<<n-1});1===r.length&&t.push({index:e.all.indexOf(r[0]),value:n})})})},a=1;a<=this.dim;a++)n(a);return t}}]),e}();function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Array(e).fill().map(function(e,n){return n+t})}function g(e){for(var t=0;t<e.length;t++){var n=Math.floor(Math.random()*e.length-t)+t,a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}var k={4:{1:8,2:7,3:6,4:5,5:4},9:{1:40,2:35,3:30,4:25,5:22},16:{1:180,2:160,3:140,4:120,5:103}};function E(e,t){return k[t][e]}b.Cell=m;var y=b,w=function(){function e(t){Object(u.a)(this,e),this.onChange=t,this.visible=!1,this.element=null,this.cell=null}return Object(c.a)(e,[{key:"show",value:function(e){var t=this;this.visible=!0,this.cell=e,this.element=r.a.createElement("div",{style:{display:"flex"}},Array(e.row.length).fill().map(function(e,t){return t}).map(function(n){return r.a.createElement("button",{className:"Options-Dialog-Button"+(e.options[n]?"":" Options-Dialog-Button-Pressed"),onClick:function(){e.options[n]=!e.options[n],t.show(e),t.onChange()}},n+1)})),this.onChange()}},{key:"hide",value:function(){this.visible=!1,this.onChange()}}]),e}(),O=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(s.a)(this,Object(f.a)(t).call(this,e))).state={board:function(){var e=new y(n.props.dim);return e.shuffleHard(),e.all.forEach(function(e){e.state={highlightedCell:!1,highlightedNumber:!1}}),e}(),optionsMode:!1},n.isEnded=!1,n.fullCounter=n.state.board.all.filter(function(e){return e.value}).length,n.choiceDialog=new w(function(){return n.setState(n.state)}),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.board,n=t.sqrt;window.board=t;var a=r.a.createElement("div",{className:"App-header"},r.a.createElement("div",null,r.a.createElement("p",{style:this.state.error?{}:{color:"#282c34"}},this.state.error||"something")),this.state.optionsMode&&this.choiceDialog.visible?r.a.createElement("div",null,this.choiceDialog.element):null,r.a.createElement("div",null,S(n).map(function(a){return r.a.createElement("div",{style:{display:"flex"}},S(n).map(function(o){return r.a.createElement("div",{className:"Board-Block"},S(n).map(function(l){return r.a.createElement("div",{style:{display:"flex"}},S(n).map(function(r){var i=t.blocks[a*n+o][l*n+r];return!i.value&&e.state.optionsMode?e.getOptionsCell(i):e.getNumberCell(i)}))}))}))})),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("button",{className:"Buttons btn-green",onClick:function(){t.solve()?e.setState(e.state):(e.state.error="Cannot be solved!",e.setState(e.state))}},"Solve"),r.a.createElement("button",{className:"Buttons btn-blue",onClick:function(){e.state.optionsMode=!e.state.optionsMode,e.setState(e.state)}},"Toggle Options"),r.a.createElement("button",{className:"Buttons btn-yellow",onClick:function(){t.all.filter(function(e){return!e.locked}).forEach(function(e){return e.value=0}),t.all.forEach(function(e){e.state={highlightedCell:!1,highlightedNumber:!1}}),e.setState(e.state)}},"Reset"),r.a.createElement("button",{className:"Buttons btn-red",onClick:function(){e.props.onExit()}},"Exit")),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("button",{className:"Buttons btn-blue",onClick:function(){e.showHint()}},"Hint"),r.a.createElement("button",{className:"Buttons btn-blue",onClick:function(){!function(e){N(e);var t,n=0;for(;n!==t;)t=n,n=B(e)}(t),t.all.filter(function(e){return 0===e.value}).forEach(function(e){e.options=e.options.map(function(t,n){return!!(e.fiber&1<<n)})}),e.setState(e.state)}},"Find All Options")));return delete this.state.error,a}},{key:"getNumberCell",value:function(e){var t=this,n=this.state.board;return r.a.createElement("div",{className:"Cell"},r.a.createElement("input",{type:"text",maxLength:"2",readOnly:this.isEnded||e.locked,className:"Cell",style:{backgroundColor:e.locked?"#A7A7B4":e.state.highlightedCell?"rgba(255,255,255,0.8)":"",color:e.state.highlightedNumber?"blue":"",fontWeight:e.state.highlightedNumber?"bolder":"bold"},value:e.value||"",onFocus:function(a){x(e),C(e,n),t.setState(t.state),e.locked||a.target.setSelectionRange(0,a.target.value.length)},onBlur:function(){j(e),C(e,n),t.setState(t.state)},onChange:function(a){var r=Number(a.target.value||0);t.changeValueOnBoard(r,e,n)}}))}},{key:"changeValueOnBoard",value:function(e,t,n){e>=0&&e<=this.props.dim&&(!!t.value!==!!e&&(this.fullCounter+=e?1:-1,this.fullCounter===Math.pow(n.dim,2)&&(!function(e){return e.rows.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})&&e.columns.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})&&e.blocks.every(function(t){return new Set(t.map(function(e){return e.value})).size===e.dim})}(n)?(this.setState(Object(i.a)({},this.state,{error:"Wrong!"})),this.isEnded=!0):(this.setState(Object(i.a)({},this.state,{error:"You Won!"})),this.isEnded=!0))),t.value=e,this.setState(this.state)),C(t,n)}},{key:"getOptionsCell",value:function(e){var t=this;this.state.board;return r.a.createElement("div",{className:"Cell"},r.a.createElement("div",{className:"Cell options-container",style:this.choiceDialog.cell===e?{color:"blue",backgroundColor:"beige"}:{},onClick:function(n){t.choiceDialog.show(e),t.setState(t.state)},onBlur:function(){t.setState(t.state)}},e.options.map(function(e,t){return r.a.createElement("div",{className:"options-cell",style:{fontSize:"9px",width:"10px",height:"10px"}},e?t+1:" ")})))}},{key:"showHint",value:function(){N(this.state.board);var e=function(e){var t=Object(v.a)(e.all.keys()).filter(function(t){return!e.all[t].value&&!(e.all[t].fiber&e.all[t].fiber-1)}).map(function(t){return{index:t,value:e.all[t].fiber.toString(2).length,reason:"The only available option for this cell"}});return S(e.dim).forEach(function(n){var a=n+1,r=1<<n;[[e.rows,"only candidate for ".concat(a," in row")],[e.columns,"only candidate for ".concat(a," in column")],[e.blocks,"only candidate for ".concat(a," in block")]].forEach(function(n){var o=Object(d.a)(n,2),l=o[0],i=o[1];l.forEach(function(n){var o=n.filter(function(e){return!e.value&&e.fiber&r});1===o.length&&t.push({index:e.all.indexOf(o[0]),value:a,reason:i})})})}),t}(this.state.board);console.log(e);var t=Object(d.a)(e,1)[0];if(t){var n=this.state.board,a=n.all[t.index];x(a),this.state.error=t.reason,this.changeValueOnBoard(t.value,a,n),setTimeout(function(){j(a)})}return t}}]),t}(a.Component);function C(e,t){t.all.forEach(function(t){t.state.highlightedNumber=e.value===t.value})}function x(e){e.row.forEach(function(e){return e.state.highlightedCell=!0}),e.column.forEach(function(e){return e.state.highlightedCell=!0})}function j(e){e.row.forEach(function(e){return e.state.highlightedCell=!1}),e.column.forEach(function(e){return e.state.highlightedCell=!1})}function S(e){return Object(v.a)(Array(e).keys())}function N(e){e.all.filter(function(e){return!e.value}).forEach(function(t){var n=parseInt("1".repeat(e.dim),2);t.row.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.column.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.block.filter(function(e){return e.value}).forEach(function(e){return n&=~(1<<e.value-1)}),t.fiber=n})}function B(e){var t=e.sqrt,n=e.dim,a=0;return[[e.rows.flat(),function(e,a,r){return r[e*n+a*t].block.filter(function(n,a){return Math.floor(a/t)!==e%t})}],[e.columns.flat(),function(e,a,r){return r[e*n+a*t].block.filter(function(t){return t.index%n!==e%n})}],[e.blocks.flat(),function(e,a,r){return r[e*n+a*t].row.filter(function(n,a){return Math.floor(a/t)!==e%t})}],[e.blocks.map(function(e){return e.map(function(e,n,a){return a[Math.floor(n/t)+n%t*t]})}).flat(),function(n,a,r){return e.blocks[n][a].column.filter(function(e,a){return Math.floor(a/t)!==Math.floor(n/t)})}]].forEach(function(e,r){var o=Object(d.a)(e,2),l=o[0],i=o[1],u=A(l,t).map(function(e){return e.filter(function(e){return!e.value}).reduce(function(e,t){return e|t.fiber},0)}),c=A(u,t);S(n).map(function(e){return 1<<e}).forEach(function(e){c.forEach(function(t,n){var o=t.map(function(t){return!!(e&t)});if(1===o.filter(function(e){return e}).length){console.log({i:n,option:e.toString(2).length,marks:o.toString(),sourceIdx:r}),a++;var u=o.indexOf(!0),c=i(n,u,l);console.log(c.map(function(e){return e.index})),c.forEach(function(t){return t.fiber=t.fiber&~e})}})})}),a}function A(e,t){return Object(v.a)(Array(e.length/t).keys()).map(function(n){return e.slice(n*t,(n+1)*t)})}var M=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={dim:n.props.dim},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=new y(this.state.dim),n=t.sqrt;return r.a.createElement("div",{className:"App-header"},r.a.createElement("button",{className:"Buttons",onClick:function(){var t=Object(i.a)({},e.state,{page:"new game"});e.setState(t),e.props.onChange(t)}},"New Game"),r.a.createElement("button",{className:"Buttons",onClick:function(){var t=Object(i.a)({},e.state,{page:"solver"});e.setState(t),e.props.onChange(t)}},"Solver"),r.a.createElement("select",{className:"Buttons",defaultValue:"9",onInput:function(t){e.setState(Object(i.a)({},e.state,{dim:Number(t.target.value)}))}},r.a.createElement("option",{value:"4"},"4x4"),r.a.createElement("option",{value:"9"},"9x9"),r.a.createElement("option",{value:"16"},"16x16")),r.a.createElement("div",null,H(n).map(function(e){return r.a.createElement("div",{style:{display:"flex"}},H(n).map(function(a){return r.a.createElement("div",{className:"Board-Block"},H(n).map(function(o){return r.a.createElement("div",{style:{display:"flex"}},H(n).map(function(l){var i=t.blocks[e*n+a][o*n+l];return r.a.createElement("input",{type:"text",maxLength:"2",readOnly:!0,className:"Cell-Mini",value:i.value||""})}))}))}))})))}}]),t}(a.Component);function H(e){return Object(v.a)(Array(e).keys())}var D=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={board:new y(n.props.dim)},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.board,n=t.sqrt;window.board=t;var a=r.a.createElement("div",{className:"App-header"},r.a.createElement("div",null,r.a.createElement("p",{hidden:!this.state.error},this.state.error)),r.a.createElement("div",null,V(n).map(function(a){return r.a.createElement("div",{style:{display:"flex"}},V(n).map(function(o){return r.a.createElement("div",{className:"Board-Block"},V(n).map(function(l){return r.a.createElement("div",{style:{display:"flex"}},V(n).map(function(i){var u=t.blocks[a*n+o][l*n+i];return r.a.createElement("input",{type:"text",maxLength:"2",className:"Cell",style:{backgroundColor:u.locked?"gray":"",borderColor:u.locked?"gray":""},value:u.value||"",onChange:function(n){var a=Number(n.target.value||0);a>=0&&a<=e.props.dim&&(u.value=a,u.locked=!!u.value,e.setState({board:t}))}})}))}))}))})),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("button",{className:"Buttons btn-green",onClick:function(){t.solve()?e.setState({board:t}):e.setState({board:t,error:"Cannot be solved!"})}},"Solve"),r.a.createElement("button",{className:"Buttons btn-yellow",onClick:function(){e.setState({board:new y(e.props.dim)})}},"Reset"),r.a.createElement("button",{className:"Buttons btn-red",onClick:function(){e.props.onExit()}},"Exit")));return delete this.state.error,a}}]),t}(a.Component);function V(e){return Object(v.a)(Array(e).keys())}var q=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={dim:9,page:"menu"},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},function(e,t){switch(e.page){case"new game":return r.a.createElement(O,{dim:e.dim,onExit:function(){return t(Object(i.a)({},e,{page:"menu"}))}});case"menu":return r.a.createElement(M,{dim:e.dim,onChange:t});case"solver":return r.a.createElement(D,{dim:e.dim,onExit:function(){return t(Object(i.a)({},e,{page:"menu"}))}})}}(this.state,function(t){return e.setState(t)})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.4b5e5c8d.chunk.js.map