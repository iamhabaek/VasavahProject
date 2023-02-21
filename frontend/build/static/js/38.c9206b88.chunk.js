(this["webpackJsonpgull-react"]=this["webpackJsonpgull-react"]||[]).push([[38],{1227:function(e,a,t){"use strict";t.r(a);var r=t(4),l=t.n(r),n=t(11),s=t(25),c=t(0),i=t.n(c),m=t(109),d=t(872),o=t(51),u=t(873),b=t(34),f=t(22),N=t(947),v=t(10),h=t(315),p=t(877),E=t(20),g=t.n(E),j=u.object().shape({firstName:u.string().required("First Name is required"),lastName:u.string().required("Last Name is required"),birthDate:u.string().required("Birth Date is required"),email:u.string().email().required("Email is required"),address:u.string().required("Address is required"),phone:u.string().required("Phone number is required"),subjects:u.array().required("Subjects is required"),gender:u.string().required("Gender is required")});a.default=function(){var e=Object(c.useContext)(o.b),a=e.subjects,t=(e.user,e.dispatch),r=e.token,u=Object(c.useState)(!1),E=Object(s.a)(u,2),q=E[0],x=E[1],O=Object(b.g)(),y=a.map((function(e){return{value:e.id,label:e.subjectName}})),_=[{value:"Male",label:"Male"},{value:"Female",label:"Female"}],w=function(){var e=Object(n.a)(l.a.mark((function e(a){var n,s,c,i,m,d,o,u,b,f,N;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.firstName,s=a.lastName,c=a.birthDate,i=a.address,m=a.phone,d=a.subjects,o=a.gender,u=a.email,b=[],d.map((function(e){b.push(e)})),f="".concat(n," ").concat(s),N={teacherName:f,address:i,email:u,phone:m,subjects:b,gender:o,birthDate:c,created:Date.now()},x(!0),e.next=8,Object(v.L)(N,r)(t);case 8:x(!1);case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),k=function(){var e=Object(n.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.a.fire({title:"Confirm to cancel",text:"Are you sure you want to cancel? If you cancel, all information that you have entered will be lost.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){e.isConfirmed&&O.push("/teachers/teachersList")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.a.createElement(c.Fragment,null,i.a.createElement(m.a,{routeSegments:[{name:"Home",path:"/"},{name:"Teachers List",path:"/teachers/teachersList"},{name:"Add Teacher"}]}),i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-header"},i.a.createElement("strong",null,"Please fill all the required (",i.a.createElement("span",{className:"text-danger"},"*"),") fields")),i.a.createElement(d.b,{initialValues:{firstName:"",lastName:"",gender:"",address:"",phone:"",subjects:"",email:"",birthDate:""},validationSchema:j,onSubmit:w},(function(e){var a=e.values,t=e.errors,r=e.touched,l=e.handleChange,n=e.handleBlur,s=e.handleSubmit;return i.a.createElement("form",{className:"needs-validation",onSubmit:s,noValidate:!0},i.a.createElement("div",{className:"card-body"},i.a.createElement("div",{className:"form-row"},i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.firstName&&r.firstName})},i.a.createElement("label",{htmlFor:"firstName",className:"ul-form__label"},"First Name (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{type:"text",className:"form-control",id:"firstName",placeholder:"First Name",name:"firstName",value:a.firstName,onChange:l,onBlur:n,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"First name is required")),i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.lastName&&r.lastName})},i.a.createElement("label",{htmlFor:"firstName",className:"ul-form__label"},"Last Name (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{type:"text",className:"form-control",id:"lastName",placeholder:"Last Name",name:"lastName",value:a.lastName,onChange:l,onBlur:n,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Last name is required"))),i.a.createElement("div",{className:"custom-separator"}),i.a.createElement("div",{className:"form-row"},i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.birthDate&&r.birthDate})},i.a.createElement("label",{htmlFor:"birthDate",className:"ul-form__label"},"Birth Date (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{className:"form-control",type:"date",name:"birthDate",onChange:l,value:a.birthDate}),i.a.createElement("div",{className:"invalid-feedback"},t.birthDate)),i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.address&&r.address})},i.a.createElement("label",{htmlFor:"address",className:"ul-form__label"},"Address (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{type:"text",className:"form-control",id:"address",placeholder:"Address",name:"address",value:a.address,onChange:l,onBlur:n,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Address is required"))),i.a.createElement("div",{className:"custom-separator"}),i.a.createElement("div",{className:"form-row"},i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.phone&&r.phone})},i.a.createElement("label",{htmlFor:"phone",className:"ul-form__label"},"Phone number (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{type:"text",className:"form-control",id:"phone",placeholder:"Phone number",name:"phone",value:a.phone,onChange:l,onBlur:n,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Phone number is required")),i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.email&&r.email})},i.a.createElement("label",{htmlFor:"phone",className:"ul-form__label"},"Email Address (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement("input",{type:"email",className:"form-control",id:"email",placeholder:"Email Address",name:"email",value:a.email,onChange:l,onBlur:n,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},t.email))),i.a.createElement("div",{className:"custom-separator"}),i.a.createElement("div",{className:"form-row"},i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.gender&&r.gender})}," ",i.a.createElement("label",{className:"ul-form__label"},"Gender (",i.a.createElement("span",{className:"text-danger"},"*"),")"),_.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement(d.a,{className:"mr-1",type:"radio",name:"gender",value:e.value,checked:a.gender===e.value}),i.a.createElement("label",{className:"ul-form__label",htmlFor:"gender"},e.label))})),i.a.createElement("div",{className:"invalid-feedback"},"Gender is required")),i.a.createElement("div",{className:Object(f.a)({"form-group col-md-6":!0,"invalid-field":t.subjects&&r.subjects})},i.a.createElement("label",{htmlFor:"subjects",className:"ul-form__label"},"Subjects (",i.a.createElement("span",{className:"text-danger"},"*"),")"),i.a.createElement(d.a,{name:"subjects",component:N.a,options:y,value:a.subjects,required:!0}),i.a.createElement("div",{className:"invalid-feedback"},"Subjects is required")))),i.a.createElement("div",{className:"card-footer"},i.a.createElement("div",{className:"mc-footer"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-lg-12 "},i.a.createElement(h.a,{disabled:q,className:"mr-2",variant:"info",type:"submit"},q&&i.a.createElement(p.a,{as:"span",variant:"light",size:"sm",role:"status","aria-hidden":"true",animation:"border",className:"mr-1"}),"Submit"),i.a.createElement(h.a,{onClick:k,variant:"danger"},"Cancel"))))))}))))}},877:function(e,a,t){"use strict";var r=t(3),l=t(6),n=t(15),s=t.n(n),c=t(0),i=t.n(c),m=t(23),d=i.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.variant,c=e.animation,d=e.size,o=e.children,u=e.as,b=void 0===u?"div":u,f=e.className,N=Object(l.a)(e,["bsPrefix","variant","animation","size","children","as","className"]),v=(t=Object(m.b)(t,"spinner"))+"-"+c;return i.a.createElement(b,Object(r.a)({ref:a},N,{className:s()(f,v,d&&v+"-"+d,n&&"text-"+n)}),o)}));d.displayName="Spinner",a.a=d},947:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var r=t(25),l=t(0),n=t.n(l),s=t(875),c=t(872);function i(e){var a=Object(c.c)(e.field.name),t=Object(r.a)(a,3),l=(t[0],t[1]),i=t[2],m=i.setValue,d=i.setTouched;console.log(l),console.log(e.options);return n.a.createElement(s.a,Object.assign({},e,{value:null===l||void 0===l?void 0:l.value,isMulti:!0,onChange:function(e){m(e)},onBlur:d}))}}}]);
//# sourceMappingURL=38.c9206b88.chunk.js.map