(this["webpackJsonpgull-react"]=this["webpackJsonpgull-react"]||[]).push([[37],{1231:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a.n(n),c=a(11),i=a(25),s=a(0),l=a.n(s),u=a(109),o=a(34),m=a(51),d=a(873),b=a(22),f=a(872),v=a(10),p=a(870),h=a(315),N=a(877),j=a(20),E=a.n(j),g=d.object().shape({subjectName:d.string().required("Subject Name is required"),units:d.string().required("Unitsis required")});t.default=function(){var e=Object(o.g)(),t=Object(s.useContext)(m.b),a=t.dispatch,n=t.user,d=t.subjects,j=t.token,w=Object(o.i)().id,x=Object(s.useState)(!1),S=Object(i.a)(x,2),y=S[0],C=S[1],O=d.find((function(e){return e.id===w})),k=function(){var e=Object(c.a)(r.a.mark((function e(t){var i,s,l,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=t.subjectName,s=t.units,l={subjectName:i,units:s},u={id:Object(p.a)(),created:Date.now(),user:n.email,isViewed:!1,action:"update",content:{name:i,location:"subject",description:"click to see more information"}},E.a.fire({title:"Do you want to save the changes?",showDenyButton:!0,showCancelButton:!0,confirmButtonText:"Save",denyButtonText:"Don't save"}).then(function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isConfirmed){e.next=12;break}return e.prev=1,C(!0),e.next=5,Object(v.kb)(w,l,u,j)(a);case 5:return e.next=7,E.a.fire("Updated!","Subject has been updated.","success");case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()),C(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:E.a.fire({title:"Confirm to cancel",text:"Are you sure you want to cancel? If you cancel, all information that you have entered will be lost.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(t){t.isConfirmed&&e.push("/subjects/subjects-list")}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return l.a.createElement(s.Fragment,null,l.a.createElement(u.a,{routeSegments:[{name:"Home",path:"/"},{name:"Edit Subject"}]}),O&&l.a.createElement("div",{className:"col-md-8"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header"},l.a.createElement("strong",null,"Please fill all the required (",l.a.createElement("span",{className:"text-danger"},"*"),") fields")),l.a.createElement(f.b,{initialValues:O,validationSchema:g,onSubmit:k},(function(e){var t=e.values,a=e.errors,n=e.touched,r=e.handleChange,c=e.handleBlur,i=e.handleSubmit;e.isSubmitting;return l.a.createElement("form",{className:"needs-validation",onSubmit:i,noValidate:!0},l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"form-row"},l.a.createElement("div",{className:Object(b.a)({"col-md-4 mb-3":!0,"valid-field":!a.subjectName&&n.subjectName,"invalid-field":a.subjectName&&n.subjectName})},l.a.createElement("label",{htmlFor:"courseName"},"Subject Name (",l.a.createElement("span",{className:"text-danger"},"*"),")"),l.a.createElement("input",{type:"text",className:"form-control",id:"subjectName",placeholder:"Subject Name",name:"subjectName",value:t.subjectName,onChange:r,onBlur:c,required:!0}),l.a.createElement("div",{className:"invalid-feedback"},"Subject name is required")),l.a.createElement("div",{className:Object(b.a)({"col-md-4 mb-3":!0,"valid-field":!a.units&&n.units,"invalid-field":a.units&&n.units})},l.a.createElement("label",{htmlFor:"validationCustom202"},"Units (",l.a.createElement("span",{className:"text-danger"},"*"),")"),l.a.createElement("input",{type:"text",className:"form-control",id:"units",placeholder:"Units",name:"units",value:t.units,onChange:r,onBlur:c,required:!0}),l.a.createElement("div",{className:"invalid-feedback"},"Units is required")))),l.a.createElement("div",{className:"card-footer"},l.a.createElement("div",{className:"mc-footer"},l.a.createElement(h.a,{disabled:y,variant:"success",type:"submit",className:"mr-2"},y&&l.a.createElement(N.a,{as:"span",variant:"light",size:"sm",role:"status","aria-hidden":"true",animation:"border",className:"mr-1"}),"Save Changes"),l.a.createElement(h.a,{onClick:B,variant:"danger"},"Cancel"))))})))))}},870:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:21;return crypto.getRandomValues(new Uint8Array(e)).reduce((function(e,t){return e+=(t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_"}),"")}},877:function(e,t,a){"use strict";var n=a(3),r=a(6),c=a(15),i=a.n(c),s=a(0),l=a.n(s),u=a(23),o=l.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.variant,s=e.animation,o=e.size,m=e.children,d=e.as,b=void 0===d?"div":d,f=e.className,v=Object(r.a)(e,["bsPrefix","variant","animation","size","children","as","className"]),p=(a=Object(u.b)(a,"spinner"))+"-"+s;return l.a.createElement(b,Object(n.a)({ref:t},v,{className:i()(f,p,o&&p+"-"+o,c&&"text-"+c)}),m)}));o.displayName="Spinner",t.a=o}}]);
//# sourceMappingURL=37.d7f00929.chunk.js.map