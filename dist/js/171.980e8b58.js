"use strict";(self["webpackChunkjuridico_frontend"]=self["webpackChunkjuridico_frontend"]||[]).push([[171],{171:function(t,a,s){s.r(a),s.d(a,{default:function(){return f}});var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("b-container",{attrs:{fluid:""}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-10"},[s("div",{attrs:{align:"left"}},[s("b-form-group",{staticClass:"m-0",attrs:{label:"Gráfico de Linha","label-size":"lg"}})],1)]),s("div",{staticClass:"col-2"},[s("div",{attrs:{align:"center"}},[s("button",{directives:[{name:"show",rawName:"v-show",value:!t.locationDash,expression:"!locationDash"}],on:{click:function(a){return t.goTo("/dashboard")}}},[t._v("Dashboard")])])]),s("hr")]),s("div",{staticClass:"row lineChart",attrs:{id:"app"}},[s("LineChart",{staticClass:"lineChart",attrs:{chartData:t.testData}}),t.imgData?s("img",{staticStyle:{width:"300px"},attrs:{src:t.imgData}}):t._e()],1)])},r=[],i=s(8935),o=s(1709),n=s(4125),l=s(6135);i["default"].use(o.ZP),n.kL.register(...n.zX);var c=(0,o.aZ)({name:"GraficoLinha",components:{LineChart:l.wW},props:{locationDash:Boolean},methods:{goTo(t){this.$router.push(t)}},setup(){const t={labels:["1º","2","3","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],label:"Processos por dia",datasets:[{data:[5,35,50,30,42,62,34,25,62,34,25,42,54,34,25,52,62,34,25,42,54,34,34,25,54,34,25,42,62,34,25,25,42,62,34,25,62,34],backgroundColor:["#1452FF"]}]};return{testData:t}}}),u=c,d=s(1001),h=(0,d.Z)(u,e,r,!1,null,null,null),f=h.exports}}]);
//# sourceMappingURL=171.980e8b58.js.map