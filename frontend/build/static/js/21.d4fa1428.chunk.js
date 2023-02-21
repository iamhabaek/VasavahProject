(this["webpackJsonpgull-react"]=this["webpackJsonpgull-react"]||[]).push([[21],{1232:function(e,a,t){"use strict";t.r(a);var r,n=t(4),l=t.n(n),c=t(11),s=t(25),i=t(209),o=t(0),u=t.n(o),d=t(109),m=t(34),f=t(872),v=t(51),b=t(873),E=t(22),p=(t(893),t(870)),h=t(911),g=t(10),N=t(20),y=t.n(N),j=t(315),T=t(877),D=t(950),O=t.n(D),q=(t(890),t(875)),C=t(901),k=t.n(C),x=t(949),F=b.object().shape((r={resourceId:b.string().required("Room is required"),startDate:b.string().required("Start Date is required"),endDate:b.string().required("End Date is required"),startTime:b.string().required("Start Time is required"),subject:b.string().required("Subject is required")},Object(i.a)(r,"startTime",b.string().required("Start Time is required")),Object(i.a)(r,"endTime",b.string().required("Eend Time is required")),Object(i.a)(r,"course",b.string().required("Course is required")),Object(i.a)(r,"yearLevel",b.string().required("Year Level is required")),Object(i.a)(r,"days",b.array().required("Days is required")),r));a.default=function(){var e=Object(o.useContext)(v.b),a=e.teachers,t=e.classrooms,r=e.courses,n=e.user,i=e.dispatch,b=e.token,N=Object(o.useState)(!1),D=Object(s.a)(N,2),C=D[0],S=D[1],_=Object(m.g)(),w=a.find((function(e){return e.id===n.uid})),L=function(){y.a.fire({title:"Confirm to cancel",text:"Are you sure you want to cancel? If you cancel, all information that you have entered will be lost.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){e.isConfirmed&&_.push("/classrooms/schedule")}))},I=function(){var e=Object(c.a)(l.a.mark((function e(a){var t,r,c,s,o,u,d,m,f,v,E,h,N,j,T,D,O;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=a.startDate,r=a.endDate,c=a.endTime,s=a.startTime,o=a.resourceId,u=a.course,d=a.subject,m=a.yearLevel,f=a.days,v=k()(t),E=k()(r),!1,h=[],N=v;N<=E;N=k()(N).add(1,"day"))j=k()(N).format("dddd"),h.push(j);if(T=f.every((function(e){return h.includes(e.label)})),console.log(T),console.log(f),!(c.value<s.value||s.value===c.value)){e.next=13;break}y.a.fire("Time selection error please check your selected time"),e.next=28;break;case 13:if(!(t===r||r<t)){e.next=17;break}y.a.fire("Date selection error please check the selected date"),e.next=28;break;case 17:if(!1!==T){e.next=21;break}y.a.fire("Please make sure that your selected dates has correct corresponding days schedule"),e.next=28;break;case 21:return D=[],f.map((function(e){return D.push(e.label)})),O={id:Object(p.a)(),resourceId:o.value,startDate:new Date(t).getTime(),endDate:new Date(r).getTime(),startTime:s.value,endTime:c.value,subject:d,teacher:n.uid,yearLevel:m,course:u,isApproved:!1,days:D,studentsId:[],created:Date.now()},S(!0),e.next=27,Object(g.M)(O,b)(i);case 27:S(!1);case 28:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),V=t.map((function(e){return{label:e.title,value:e.id}})),Y=Object(x.a)(7,21).map((function(e){return e})),M=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((function(e,a){return{label:e,value:a}})),B=r&&r.map((function(e){return{value:e.courseName,label:e.courseName}})),A=w&&w.subjects.map((function(e){return{value:e.value,label:e.label}})),H=["1st Year","2nd Year","3rd Year","4th Year","5th Year"].map((function(e){return{value:e,label:e}}));return u.a.createElement(o.Fragment,null,u.a.createElement(d.a,{routeSegments:[{name:"Home",path:"/"},{name:"Classrooms List",path:"/classrooms/schedule"},{name:"Apply for slot"}]}),w&&u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-header"},u.a.createElement("strong",null,"Please fill all the required (",u.a.createElement("span",{className:"text-danger"},"*"),") fields")),u.a.createElement(f.b,{initialValues:{resourceId:"",startDate:"",endDate:"",startTime:"",endTime:"",teacher:"",subject:"",course:"",yearLevel:"",days:""},validationSchema:F,onSubmit:I},(function(e){var a=e.values,t=e.errors,r=e.touched,n=e.handleSubmit;e.isSubmitting,e.handleChange,e.setFieldValue;return u.a.createElement("form",{className:"needs-validation",onSubmit:n,noValidate:!0},u.a.createElement("div",{className:"card-body"},u.a.createElement("div",{className:"form-row"},u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.resourceId&&r.resourceId})},u.a.createElement("label",{htmlFor:"resourceId",className:"ul-form__label"},"Room (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{name:"resourceId"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:V,value:V.find((function(e){return e.value===a.resourceId})),onChange:function(e){t.setFieldValue("resourceId",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},t.resourceId)),u.a.createElement("div",{className:"form-group col-md-6"}),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.startDate&&r.startDate})},u.a.createElement("label",{htmlFor:"startDate",className:"ul-form__label mr-2"},"Start Date (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement("div",{className:"form-group"},u.a.createElement(f.a,{name:"startDate"},(function(e){e.field;var t=e.form;return u.a.createElement(O.a,{dateFormat:"yyyy/MM/dd",className:"form-control ",placeholderText:"Select Date",selected:a.startDate,onChange:function(e){console.log(e),t.setFieldValue("startDate",e)}})}))),u.a.createElement("div",{className:"invalid-feedback"},t.startDate)),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.endTime&&r.endTime})},u.a.createElement("label",{htmlFor:"endDate",className:"ul-form__label mr-2"},"End Date (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement("div",{className:"form-group"},u.a.createElement(f.a,{name:"endDate"},(function(e){e.field;var t=e.form;return u.a.createElement(O.a,{className:"form-control",dateFormat:"yyyy/MM/dd",placeholderText:"Select Date",selected:a.endDate,onChange:function(e){console.log(e),t.setFieldValue("endDate",e)}})}))),u.a.createElement("div",{className:"invalid-feedback"},t.endDate)),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.startTime&&r.startTime})},u.a.createElement("label",{htmlFor:"startTime",className:"ul-form__label"},"Start Time (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{name:"startTime"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:Y,value:Y.find((function(e){return e.value===a.startTime})),onChange:function(e){t.setFieldValue("startTime",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},"Start Time is required")),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.endTime&&r.endTime})},u.a.createElement("label",{htmlFor:"endTime",className:"ul-form__label"},"End Time"),u.a.createElement(f.a,{name:"endTime"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:Y,value:Y.find((function(e){return e.value===a.endTime})),onChange:function(e){t.setFieldValue("endTime",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},"End Time is required")),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.subject&&r.subject})},u.a.createElement("label",{htmlFor:"subject",className:"ul-form__label"},"Subject (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{name:"subject"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:A,value:A.find((function(e){return e.value===a.subject})),onChange:function(e){t.setFieldValue("subject",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},"Subject is required")),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.course&&r.course})},u.a.createElement("label",{htmlFor:"course",className:"ul-form__label"},"Course (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{name:"course"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:B,value:B.find((function(e){return e.value===a.course})),onChange:function(e){t.setFieldValue("course",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},"Course is required")),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.yearLevel&&r.yearLevel})},u.a.createElement("label",{htmlFor:"yearLevel",className:"ul-form__label"},"Year Level (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{name:"yearLevel"},(function(e){e.field;var t=e.form;return u.a.createElement(q.a,{options:H,value:H.find((function(e){return e.value===a.yearLevel})),onChange:function(e){t.setFieldValue("yearLevel",e)}})})),u.a.createElement("div",{className:"invalid-feedback"},"Year Level is required")),u.a.createElement("div",{className:Object(E.a)({"form-group col-md-6":!0,"invalid-field":t.day&&r.day})},u.a.createElement("label",{htmlFor:"days",className:"ul-form__label"},"Days (",u.a.createElement("span",{className:"text-danger"},"*"),")"),u.a.createElement(f.a,{disabled:!a.startDate&&!a.startDate,name:"days",component:h.a,options:M,value:a.days,required:!0}),u.a.createElement("div",{className:"invalid-feedback"},"Days is required"))),u.a.createElement("div",{className:"custom-separator"})),u.a.createElement("div",{className:"card-footer"},u.a.createElement("div",{className:"mc-footer"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-lg-12 "},u.a.createElement(j.a,{disabled:C,className:"btn btn-primary mr-2",type:"submit"},C&&u.a.createElement(T.a,{as:"span",size:"sm",variant:"light",role:"status","aria-hidden":"true",className:"mr-1",animation:"border"}),"Submit"),u.a.createElement(j.a,{onClick:L,variant:"danger"},"Cancel"))))))}))))}},893:function(e,a,t){"use strict";var r=t(0),n=t.n(r),l=t(875);a.a=function(e){var a=e.onChange,t=e.options,r=e.value,c=e.className;return n.a.createElement("div",{className:c},n.a.createElement(l.a,{value:function(e,a){return e?e.find((function(e){return e.value===a})):""}(t,r),onChange:function(e){a(e)},options:t}))}},911:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var r=t(25),n=t(0),l=t.n(n),c=t(875),s=t(872);function i(e){var a=Object(s.c)(e.field.name),t=Object(r.a)(a,3),n=(t[0],t[1]),i=t[2],o=i.setValue,u=i.setTouched;return l.a.createElement(c.a,Object.assign({},e,{value:null===n||void 0===n?void 0:n.value,isMulti:!0,onChange:function(e){o(e)},onBlur:u}))}},949:function(e,a,t){"use strict";t.d(a,"a",(function(){return u}));var r=t(902),n=t(903),l=t(904),c=t(936),s=t(885),i=t(905),o=t(898),u=function(e,a){for(var t,u=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;return Object(r.default)(Object(n.default)(Object(l.default)(Object(c.a)(e,i),s),t),a)},d=u(new Date,e),m=u(new Date,a+1),f=[],v=d;Object(i.default)(v,m);)f.push({label:Object(o.default)(v,"h:mm a"),value:v.getHours()}),t=v,v=Object(s.default)(t,60);return f}}}]);
//# sourceMappingURL=21.d4fa1428.chunk.js.map