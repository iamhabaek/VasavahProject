(this["webpackJsonpgull-react"]=this["webpackJsonpgull-react"]||[]).push([[42],{1255:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(51),o=a(886),s=(a(27),o.d.create({page:{backgroundColor:"#d11fb6",color:"white"},section:{margin:10,padding:10},body:{paddingTop:35,paddingBottom:65},title:{fontSize:24,textAlign:"center"},header:{fontSize:12,marginBottom:10,marginLeft:0,textAlign:"left",color:"black",fontWeight:"bold"},thead:{display:"flex",flexDirection:"row",border:"1pt solid black",marginHorizontal:25,padding:10,marginTop:20},tbody:{display:"flex",flexDirection:"row",borderBottom:"1pt solid black",borderLeft:"1pt solid black",borderRight:"1pt solid black",marginHorizontal:25,padding:10},th:{fontSize:10,fontWeight:"bold",textAlign:"center",color:"black",width:"22%",margin:0},tr:{fontSize:8,fontWeight:"bold",marginHorizontal:"auto",textAlign:"center",width:"20%",color:"black",margin:0}})),c=function(e){var t=e.classroomSlot,a=e.classrooms,n=e.students,l=e.teachers,c=(e.subjects,t.studentsId),i=t.subject,m=t.teacher,d=t.resourceId,u=t.startTime,f=t.endTime,b=a.find((function(e){return e.id===d})),g=l.find((function(e){return e.id===m})),h=n.filter((function(e){return c.find((function(t){return e.id===t}))}));return r.a.createElement(o.a,null,t&&b&&g&&c&&r.a.createElement(o.c,null,r.a.createElement(o.f,{style:{display:"flex",backgroundColor:"#663399",width:"100%",alignItems:"center",justifyContent:"center",marginBottom:15,padding:20}},r.a.createElement(o.e,{style:{fontSize:20,color:"white",textAlign:"center"}},"INFORMATICS")),r.a.createElement(o.f,{style:{display:"flex",flexDirection:"column",marginHorizontal:25,marginTop:20}},r.a.createElement(o.e,{style:s.header},"Room: ",b&&b.roomName),r.a.createElement(o.e,{style:s.header},"Time: ","".concat(u," - ").concat(f)),r.a.createElement(o.e,{style:s.header},"Teacher: ",g.teacherName),r.a.createElement(o.e,{style:s.header},"Subject: ",i.label)),r.a.createElement(o.f,{style:s.thead},r.a.createElement(o.e,{style:s.th},"Student Name"),r.a.createElement(o.e,{style:s.th},"Address"),r.a.createElement(o.e,{style:s.th},"Phone"),r.a.createElement(o.e,{style:s.th},"Gender"),r.a.createElement(o.e,{style:s.th},"Course"),r.a.createElement(o.e,{style:s.th},"Year Level"),r.a.createElement(o.e,{style:s.th},"Status")),h&&h.map((function(e){return r.a.createElement(o.f,{style:s.tbody},r.a.createElement(o.e,{style:s.tr},e.name),r.a.createElement(o.e,{style:s.tr},e.address),r.a.createElement(o.e,{style:s.tr},e.phone),r.a.createElement(o.e,{style:s.tr},e.gender),r.a.createElement(o.e,{style:s.tr},e.course),r.a.createElement(o.e,{style:s.tr},e.yearLevel),r.a.createElement(o.e,{style:s.tr},e.status))}))))},i=a(109),m=a(34);t.default=function(){var e=Object(n.useContext)(l.b),t=e.classrooms,a=e.students,s=e.classroomSlots,d=e.teachers,u=e.subjects,f=Object(m.i)().id,b=Object(m.g)(),g=function(){setTimeout((function(){b.push("/classrooms/classrooms-assign")}),5e3)},h=s.find((function(e){return e.id===f}));return console.log(h),r.a.createElement(n.Fragment,null,r.a.createElement(i.a,{routeSegments:[{name:"Home",path:"/"},{name:"My Classes",path:"/classrooms/my-classes/"},{name:"Generate"}]}),r.a.createElement(o.b,{document:h&&r.a.createElement(c,{classrooms:t,students:a,classroomSlot:h,teachers:d,subjects:u}),fileName:"Test",className:"mb-10"},(function(e){return e.loading?r.a.createElement("button",{className:"btn btn-primary mb-5"},"Loading document..."):r.a.createElement("button",{className:"btn btn-primary mb-5",onClick:g},"Download PDF!")})),h&&r.a.createElement(c,{classrooms:t,students:a,classroomSlot:h,teachers:d,subjects:u}))}},935:function(e,t){}}]);
//# sourceMappingURL=42.6abc2fac.chunk.js.map