(this["webpackJsonpgull-react"]=this["webpackJsonpgull-react"]||[]).push([[15],{1215:function(e,t,a){"use strict";var n=a(3),r=a(6),c=a(15),s=a.n(c),l=a(0),i=a.n(l),m=a(23),o=i.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.variant,l=e.pill,o=e.className,d=e.as,u=void 0===d?"span":d,p=Object(r.a)(e,["bsPrefix","variant","pill","className","as"]),f=Object(m.b)(a,"badge");return i.a.createElement(u,Object(n.a)({ref:t},p,{className:s()(o,f,l&&f+"-pill",c&&f+"-"+c)}))}));o.displayName="Badge",o.defaultProps={pill:!1},t.a=o},1254:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a.n(n),c=a(11),s=a(25),l=a(0),i=a.n(l),m=a(51),o=a(879),d=a(34),u=a(1215),p=a(865),f=a(880),b=a(898),E=function(e){e.subjects;var t=e.teachers,a=e.classrooms,n=e.classroomSlots,r=e.handleApprove,c=(e.search,e.handleDeny);return i.a.createElement(f.a,null,i.a.createElement(o.a,{lg:12,md:12,sm:8,xs:12,className:"mb-4"},i.a.createElement("div",{className:"card border-0"},i.a.createElement("div",{className:"card-body border-0"},i.a.createElement("table",{className:"table "},i.a.createElement("thead",null,i.a.createElement("tr",{className:"ul-widget6__tr--sticky-th"},["ROOM","TEACHER","SUBJECT","COURSE","YEAR LEVEL","DAYS","DATE APPLIED","STATUS","ACTIONS"].map((function(e,t){return i.a.createElement("th",{key:t,scope:"col",className:"border-0 text-primary"},e)})))),i.a.createElement("tbody",null,n&&n.map((function(e){return i.a.createElement("tr",{key:e.id},i.a.createElement("td",{className:"border-0"},i.a.createElement("span",null,a.find((function(t){return t.id===e.resourceId}))&&a.find((function(t){return t.id===e.resourceId})).title)),i.a.createElement("td",{className:"border-0"}," ",t.find((function(t){return t.id===e.teacher}))&&t.find((function(t){return t.id===e.teacher})).teacherName),i.a.createElement("td",{className:"border-0"},i.a.createElement("span",null,e.subject.label)),i.a.createElement("td",{className:"border-0"},e.course.label),i.a.createElement("td",{className:"border-0"},e.yearLevel.label),i.a.createElement("td",{className:"border-0"},i.a.createElement("div",{className:"d-flex flex-column"},e.days.map((function(e){return i.a.createElement("span",null,e)})))),i.a.createElement("td",{className:"border-0"}," ",Object(b.default)(e.created,"yyyy/MM/dd HH:mm: a")),i.a.createElement("td",{className:"border-0"},i.a.createElement(u.a,{variant:e.isApproved?"success":"warning"},e.isApproved?"Approved":"Pending")),i.a.createElement("td",{className:"border-0"},i.a.createElement(p.a,null,i.a.createElement(p.a.Toggle,{className:" mr-3 mb-3 toggle-hidden bg-white border-none d-flex flex-column"},i.a.createElement("span",{className:"_dot _inline-dot bg-primary mb-1"}),i.a.createElement("span",{className:"_dot _inline-dot bg-primary mb-1"}),i.a.createElement("span",{className:"_dot _inline-dot bg-primary"})),i.a.createElement(p.a.Menu,null,i.a.createElement(p.a.Item,{onClick:function(t){return r(e.id)},className:"dropdown-item cursor-pointer"},"Approve"),i.a.createElement(p.a.Item,{onClick:function(t){return c(e.id)},className:"dropdown-item cursor-pointer"},"Deny")))))}))))),0===n.length&&i.a.createElement("div",{className:"mx-auto border border-light rounded p-3 pb-0 mb-5"},i.a.createElement("p",{className:"text-center text-muted"},"No slots to approve")))))},N=a(315),v=a(877),x=a(161),h=function(e){e.subjects;var t=e.teachers,a=e.classrooms,n=e.classroomSlots,r=e.handleApprove,c=e.search,s=e.loading,l=e.handleDeny;return i.a.createElement("div",null,i.a.createElement(f.a,null,i.a.createElement(o.a,{lg:12,md:12,sm:8,xs:12,className:"mb-4"},i.a.createElement("div",{className:"row"},n&&n.filter((function(e){return""===c?e:e.name.toLowerCase().includes(c)})).map((function(e){return i.a.createElement("div",{key:e.id,className:"app-card text-sm col-lg-4 col-sm-4"},i.a.createElement("div",{className:" border-none shadow card"},i.a.createElement("div",{className:"clearFix"},i.a.createElement("div",{className:"".concat(!1===e.isApproved?" text-warning":"text-success"," float-left p-2")},i.a.createElement("strong",null,e.isApproved))),i.a.createElement("div",{className:".d-block mx-auto mw-100 text-center p-3"},t.find((function(t){return t.id===e.teacher}))&&t.find((function(t){return t.id===e.teacher})).photoURL?i.a.createElement(x.a,{round:!0,size:80,src:t.find((function(t){return t.id===e.teacher})).photoURL}):i.a.createElement(x.a,{size:80,round:!0,name:t.find((function(t){return t.id===e.teacher}))&&t.find((function(t){return t.id===e.teacher})).teacherName})),i.a.createElement("div",{style:{backgroundColor:"#E7E5F1"},className:".d-block mw-100 "},i.a.createElement("p",{className:"font-weight-bold text-15 text-center p-2"},t.find((function(t){return t.id===e.teacher}))&&t.find((function(t){return t.id===e.teacher})).teacherName)),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-bold "},"Date applied:"),i.a.createElement("span",{className:"text-12"},Object(b.default)(new Date(e.created),"MM/dd/yyyy HH:mm a"))),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-bold "},"Room:"),i.a.createElement("span",{className:"text-12"},a.find((function(t){return t.id===e.resourceId}))&&a.find((function(t){return t.id===e.resourceId})).title)),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-semibold "},"Subject:"),i.a.createElement("span",{className:"text-12"},e.subject.label)),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-semibold "},"Course:"),i.a.createElement("span",{className:"text-12"},e.course.label)),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-semibold "},"Year Level:"),i.a.createElement("span",{className:"text-12"},e.yearLevel.label)),i.a.createElement("div",{className:"d-flex flex-row justify-content-between py-2 px-2 align-items-center"},i.a.createElement("span",{className:"text-12 font-weight-semibold "},"Days:"),i.a.createElement("div",{className:"d-flex flex-column"},e.days.map((function(e,t){return i.a.createElement("span",{key:t},e,", ")})))),!1===e.isApproved&&i.a.createElement("div",{className:"card-footer"},i.a.createElement("div",{className:"mc-footer"},i.a.createElement("div",{className:"d-flex flex-row justify-content-center align-items-center mt-3"},i.a.createElement(N.a,{disabled:s,variant:"success",type:"submit",className:"btn-sm mr-2",onClick:function(t){return r(e.id)}},s&&i.a.createElement(v.a,{as:"span",variant:"light",size:"sm",role:"status","aria-hidden":"true",animation:"border",className:"ml-2"}),"Approve"),i.a.createElement(N.a,{variant:"warning",type:"submit",className:"btn-sm",onClick:function(t){return l(e.id)}},"Deny"))))))}))))),0===n.length&&i.a.createElement("div",{className:"mx-auto p-3 pb-0 mb-5"},i.a.createElement("p",{className:"text-center text-muted"},"No slots to approve")))},y=a(109),g=a(10),w=a(20),j=a.n(w);t.default=function(){var e=Object(l.useContext)(m.b),t=e.classroomSlots,a=e.dispatch,n=(e.user,e.token),u=e.teachers,p=e.subjects,f=e.classrooms,b=Object(l.useState)(""),N=Object(s.a)(b,2),v=N[0],x=(N[1],Object(l.useState)(!0)),w=Object(s.a)(x,2),O=w[0],k=w[1],A=Object(l.useState)(!1),C=Object(s.a)(A,2),S=C[0],D=C[1],P=Object(l.useState)(!1),_=Object(s.a)(P,2),L=_[0],R=_[1],I=Object(l.useState)(!1),T=Object(s.a)(I,2),B=T[0],H=T[1],M=(Object(d.g)(),function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return R(!0),e.next=3,Object(g.N)(t,{isApproved:!0},n)(a);case 3:R(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),z=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j.a.fire({title:"Confirm to Deny",text:"Are you sure you want to deny? ",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(function(){var e=Object(c.a)(r.a.mark((function e(c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.isConfirmed){e.next=3;break}return e.next=3,Object(g.W)(t,n)(a);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(e){return e?t.filter((function(e){return!0===e.isApproved})):t.filter((function(e){return!1===e.isApproved}))};return i.a.createElement(l.Fragment,null,i.a.createElement(y.a,{routeSegments:[{name:"Home",path:"/"},{name:"Slot Application List"}]}),i.a.createElement(o.a,{lg:12,md:12,sm:8,xs:12,className:"mb-4"},i.a.createElement("div",{className:"ul-widget__head border-0"},i.a.createElement("div",{className:"ul-widget__head-label"})),i.a.createElement("div",{className:"col-xl-12 my-5"},i.a.createElement("div",{className:"form-group"},i.a.createElement("input",{className:"mr-2",type:"checkbox",onChange:function(){return H(!B)},name:"checked",defaultChecked:B}),i.a.createElement("label",null,"Completed Applications")),i.a.createElement("div",{className:"text-right form-group"},i.a.createElement("label",{className:"text-dark"},"View By: "),i.a.createElement("div",{className:"btn-group ml-1"},i.a.createElement("button",{title:"ListView",onClick:function(){k(!1),D(!0)},className:S?"btn btn-primary btn-sm":"btn btn-outline-primary btn-sm"},i.a.createElement("i",{className:"i-Newspaper"})),i.a.createElement("button",{title:"Widgets",onClick:function(){D(!1),k(!0)},className:O?"btn btn-primary btn-sm":"btn btn-outline-primary btn-sm"},i.a.createElement("i",{className:"i-Split-Four-Square-Window"}))))),S&&i.a.createElement(l.Suspense,{fallback:i.a.createElement(y.c,null)},i.a.createElement(E,{teachers:u,subjects:p,classrooms:f,search:v,classroomSlots:U(B),handleApprove:M,handleDeny:z,loading:L})),O&&i.a.createElement(h,{teachers:u,subjects:p,classrooms:f,classroomSlots:U(B),search:v,handleApprove:M,handleDeny:z,loading:L})))}},877:function(e,t,a){"use strict";var n=a(3),r=a(6),c=a(15),s=a.n(c),l=a(0),i=a.n(l),m=a(23),o=i.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.variant,l=e.animation,o=e.size,d=e.children,u=e.as,p=void 0===u?"div":u,f=e.className,b=Object(r.a)(e,["bsPrefix","variant","animation","size","children","as","className"]),E=(a=Object(m.b)(a,"spinner"))+"-"+l;return i.a.createElement(p,Object(n.a)({ref:t},b,{className:s()(f,E,o&&E+"-"+o,c&&"text-"+c)}),d)}));o.displayName="Spinner",t.a=o},879:function(e,t,a){"use strict";var n=a(3),r=a(6),c=a(15),s=a.n(c),l=a(0),i=a.n(l),m=a(23),o=["xl","lg","md","sm","xs"],d=i.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,l=e.as,d=void 0===l?"div":l,u=Object(r.a)(e,["bsPrefix","className","as"]),p=Object(m.b)(a,"col"),f=[],b=[];return o.forEach((function(e){var t,a,n,r=u[e];if(delete u[e],null!=r&&"object"===typeof r){var c=r.span;t=void 0===c||c,a=r.offset,n=r.order}else t=r;var s="xs"!==e?"-"+e:"";null!=t&&f.push(!0===t?""+p+s:""+p+s+"-"+t),null!=n&&b.push("order"+s+"-"+n),null!=a&&b.push("offset"+s+"-"+a)})),f.length||f.push(p),i.a.createElement(d,Object(n.a)({},u,{ref:t,className:s.a.apply(void 0,[c].concat(f,b))}))}));d.displayName="Col",t.a=d},880:function(e,t,a){"use strict";var n=a(3),r=a(6),c=a(15),s=a.n(c),l=a(0),i=a.n(l),m=a(23),o=i.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.fluid,l=e.as,o=void 0===l?"div":l,d=e.className,u=Object(r.a)(e,["bsPrefix","fluid","as","className"]),p=Object(m.b)(a,"container"),f="string"===typeof c?"-"+c:"-fluid";return i.a.createElement(o,Object(n.a)({ref:t},u,{className:s()(d,c?""+p+f:p)}))}));o.displayName="Container",o.defaultProps={fluid:!1},t.a=o}}]);
//# sourceMappingURL=15.7832a209.chunk.js.map