"use strict";(self["webpackChunkjuridico_frontend"]=self["webpackChunkjuridico_frontend"]||[]).push([[322],{4322:function(t,a,e){e.r(a),e.d(a,{default:function(){return p}});var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-container",{attrs:{fluid:""}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-10"},[e("div",{attrs:{align:"left"}},[e("b-form-group",{staticClass:"m-0",attrs:{label:"Gráfico de Linha","label-size":"lg"}})],1)]),e("div",{staticClass:"col-2"},[e("div",{attrs:{align:"center"}},[e("button",{directives:[{name:"show",rawName:"v-show",value:!t.locationDash,expression:"!locationDash"}],on:{click:function(a){return t.goTo("/dashboard")}}},[t._v("Dashboard")])])]),e("hr")]),e("div",{staticStyle:{width:"90%"},attrs:{id:"app2"}},[e("LineChart",t._b({},"LineChart",t.lineChartProps,!1)),t.imgData?e("img",{staticStyle:{width:"300px"},attrs:{src:t.imgData}}):t._e()],1)])},o=[],i=e(8935),l=e(1709),s=e(4125),n=e(6135);i["default"].use(l.ZP),s.kL.register(...s.zX);var u=(0,l.aZ)({name:"App",components:{LineChart:n.wW},props:{locationDash:Boolean},methods:{goTo(t){this.$router.push(t)}},setup(){(0,l.iH)(!0);const t=(0,l.iH)(null),a=(0,l.Fl)((()=>({labels:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],datasets:[{label:"Linha 1",data:[50,40,65,55,25,10,20,40,10,10,80,90],fill:!1,backgroundColor:"#A3A500"},{label:"Linha 2",data:[30,65,55,25,65,55,25,40,50,70,80],fill:!1,backgroundColor:"#000000"}]}))),e=(0,l.Fl)((()=>({plugins:{legend:{display:!1}}}))),{lineChartProps:r}=(0,n.tn)({options:e,chartData:a});return{getData:a,lineChartProps:r,imgData:t}}}),c=u,d=e(1001),h=(0,d.Z)(c,r,o,!1,null,null,null),p=h.exports}}]);
//# sourceMappingURL=322.732fdc9b.js.map