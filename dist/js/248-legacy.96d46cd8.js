(self["webpackChunkticados2"]=self["webpackChunkticados2"]||[]).push([[248],{8183:function(t,e,o){"use strict";o.d(e,{Z:function(){return u}});var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("b-container",{staticStyle:{padding:"1% 3% 1% 2%"},attrs:{fluid:""}},[o("b-row",[o("div",{staticClass:"animate__animated animate__fadeIn slower col-12"},[o("h2",[t._v(t._s(t.titulo))]),o("p",{staticStyle:{color:"grey","font-size":"0.9em"}},[t._v(" "+t._s(t.descricao)+" ")]),o("hr")])])],1)},r=[],n=o(8935),s=n["default"].extend({props:{titulo:String,descricao:String}}),i=s,c=o(3736),l=(0,c.Z)(i,a,r,!1,null,null,null),u=l.exports},7719:function(t,e,o){"use strict";o.d(e,{Z:function(){return u}});var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",t._l(t.notifications,(function(e){return o("div",{key:e.message,class:t.getNotificationClass(e.type)},[t._v(" "+t._s(e.message)+" ")])})),0)},r=[],n=o(8935),s=n["default"].extend({props:{notifications:Array},methods:{getNotificationClass:function(t){return"alert alert-"+t}}}),i=s,c=o(3736),l=(0,c.Z)(i,a,r,!1,null,null,null),u=l.exports},9248:function(t,e,o){"use strict";o.r(e),o.d(e,{default:function(){return g}});var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("header-page",{attrs:{titulo:"Registro de Entrada",descricao:"Adicione novos pacientes ao sistema"}}),o("b-container",[o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[o("b-form",[o("notifications",{attrs:{notifications:this.Notificacao}}),o("b-form-group",{staticClass:"titulo",attrs:{label:"Informações de entrada do paciente","label-size":"lg"}},[o("hr")]),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Número do Prontuário:"}},[o("b-form-input",{attrs:{type:"text"},model:{value:t.form.numProntuario,callback:function(e){t.$set(t.form,"numProntuario",e)},expression:"form.numProntuario"}})],1),o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Status:"}},[o("b-form-select",{staticStyle:{color:"blue"},attrs:{size:"sm",disabled:""},model:{value:t.form.statusRegistro,callback:function(e){t.$set(t.form,"statusRegistro",e)},expression:"form.statusRegistro"}},[o("b-form-select-option",{attrs:{value:"1"}},[t._v("Não Identificado")])],1)],1)],1),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Data de entrada na unidade:"}},[o("b-form-input",{attrs:{type:"date"},model:{value:t.form.dataEntrada,callback:function(e){t.$set(t.form,"dataEntrada",e)},expression:"form.dataEntrada"}})],1),o("b-form-group",{staticClass:"font col-sm-2 col-md-2 col-lg-2",attrs:{label:"Hora de entrada:"}},[o("b-form-input",{attrs:{type:"time"},model:{value:t.form.horaEntrada,callback:function(e){t.$set(t.form,"horaEntrada",e)},expression:"form.horaEntrada"}})],1),o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Entrada através de:"}},[o("b-form-select",{on:{change:function(e){return t.exibirCampo()}},model:{value:t.form.entradaAtraves,callback:function(e){t.$set(t.form,"entradaAtraves",e)},expression:"form.entradaAtraves"}},[o("b-form-select-option",{attrs:{value:"null"}},[t._v("-- Selecione --")]),o("b-form-select-option",{attrs:{value:"terceiros"}},[t._v("Terceiros")]),o("b-form-select-option",{attrs:{value:"meios_proprios"}},[t._v("Meios próprios")]),o("b-form-select-option",{attrs:{value:"samu"}},[t._v("SAMU")]),o("b-form-select-option",{attrs:{value:"policia"}},[t._v("Polícia")])],1)],1),o("b-form-group",{directives:[{name:"show",rawName:"v-show",value:t.exibirRegistro,expression:"exibirRegistro"}],staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Registro No.:"}},[o("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.numRegistroExterno,callback:function(e){t.$set(t.form,"numRegistroExterno",e)},expression:"form.numRegistroExterno"}})],1)],1),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Sexo:"}},[o("b-form-select",{attrs:{size:"sm"},model:{value:t.form.sexo,callback:function(e){t.$set(t.form,"sexo",e)},expression:"form.sexo"}},[o("b-form-select-option",{attrs:{value:"masculino"}},[t._v("Masculino")]),o("b-form-select-option",{attrs:{value:"feminino"}},[t._v("Feminino")]),o("b-form-select-option",{attrs:{value:"não_especificado"}},[t._v("Não especificado")])],1)],1)],1),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-8 col-md-8 col-lg-8",attrs:{label:"Vestimentas que usava:"}},[o("b-form-input",{attrs:{type:"text"},model:{value:t.form.vestimentas,callback:function(e){t.$set(t.form,"vestimentas",e)},expression:"form.vestimentas"}})],1)],1),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-8 col-md-8 col-lg-8",attrs:{label:"Condições em que se encontrava:"}},[o("b-form-textarea",{attrs:{rows:"3","max-rows":"6"},model:{value:t.form.condicoesEncontrada,callback:function(e){t.$set(t.form,"condicoesEncontrada",e)},expression:"form.condicoesEncontrada"}})],1)],1),o("b-form-group",{staticClass:"titulo",attrs:{label:"Pessoa de Contato:","label-size":"lg"}},[o("hr")]),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-6 col-md-6 col-lg-6",attrs:{label:"Nome:"}},[o("b-form-input",{attrs:{type:"text"},model:{value:t.form.nomeContato,callback:function(e){t.$set(t.form,"nomeContato",e)},expression:"form.nomeContato"}})],1),o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Grau de parentesco:"}},[o("b-form-select",{attrs:{size:"sm"},model:{value:t.form.grauParentescoSelected,callback:function(e){t.$set(t.form,"grauParentescoSelected",e)},expression:"form.grauParentescoSelected"}},t._l(t.optionsGrauParentesco,(function(e){return o("b-form-select-option",{key:e.value,attrs:{value:e.value}},[t._v(" "+t._s(e.texto)+" ")])})),1)],1)],1),o("div",{staticClass:"row"},[o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"Telefone:"}},[o("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"(##)#####-####",expression:"'(##)#####-####'"}],attrs:{type:"text",placeholder:"Exemplo: (99)9999-9999"},model:{value:t.form.telefoneContato,callback:function(e){t.$set(t.form,"telefoneContato",e)},expression:"form.telefoneContato"}})],1),o("b-form-group",{staticClass:"font col-sm-3 col-md-3 col-lg-3",attrs:{label:"CPF:"}},[o("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],attrs:{placeholder:"Exemplo: 000.000.000-00",type:"text"},model:{value:t.form.cpfContato,callback:function(e){t.$set(t.form,"cpfContato",e)},expression:"form.cpfContato"}})],1)],1),o("div",{staticClass:"py-2"},[o("b-button",{staticClass:"mr-2",attrs:{variant:"secondary"},on:{click:function(e){return t.voltar()}}},[t._v("Voltar")]),o("b-button",{attrs:{type:"button",variant:"success"},on:{click:t.submit}},[t._v("Salvar")])],1)],1)],1)])])],1)},r=[],n=o(3019),s=(o(7042),o(8935)),i=o(8161),c=o(7719),l=o(8183),u=[{texto:"-- Selecione --",value:"null"},{texto:"Mãe",value:"Mãe"},{texto:"Pai",value:"Pai"},{texto:"Avô(ó)",value:"Avô(ó)"},{texto:"Filho(a)",value:"Filo(a)"},{texto:"Neto(a)",value:"Neto(a)"},{texto:"Tio(a)",value:"Tio(a)"},{texto:"Primo(a)",value:"Primo(a)"},{texto:"Irmão(ã)",value:"Irmão(ã)"},{texto:"Sobrinho(a)",value:"Sobrinho(a)"},{texto:"Companheiro(a)",value:"Companheiro(a)"},{texto:"Conjuge",value:"Conjuge"},{texto:"Nenhum",value:"Nenhum"}],f=o(4665),m=s["default"].extend({directives:{mask:i.mask},components:{Notifications:c.Z,HeaderPage:l.Z},data:function(){return{form:{numProntuario:"",statusRegistro:"1",dataEntrada:"",horaEntrada:"",entradaAtraves:"",numRegistroExterno:"",sexo:"",vestimentas:"",condicoesEncontrada:"",nomeContato:"",telefoneContato:"",cpfContato:"",grauParentescoSelected:""},exibirRegistro:!1,Notificacao:[],optionsGrauParentesco:u}},mounted:function(){this.form.dataEntrada=this.defaultData()},methods:(0,n.Z)((0,n.Z)({},(0,f.nv)(["insereRegistro"])),{},{defaultData:function(){var t=new Date,e=("0"+(t.getMonth()+1)).slice(-2),o=("0"+t.getDate()).slice(-2),a=t.getFullYear();return a+"-"+e+"-"+o},exibirCampo:function(){this.form.numRegistroExterno="","samu"==this.form.entradaAtraves||"policia"==this.form.entradaAtraves?this.exibirRegistro=!0:this.exibirRegistro=!1},submit:function(){this.$router.push("/listaRegistroEntrada")},voltar:function(){this.$router.push("/")},validarCamposObrigatorios:function(){var t=this;return this.form.numProntuario||this.Notificacao.push({type:"danger",message:"Número de Prontuário é obrigatório!"}),this.form.dataEntrada||this.Notificacao.push({type:"danger",message:"Data de entrada é obrigatório!"}),(this.form.entradaAtraves&&"samu"==this.form.entradaAtraves&&!this.form.numRegistroExterno||this.form.entradaAtraves&&"policia"==this.form.entradaAtraves&&!this.form.numRegistroExterno)&&this.Notificacao.push({type:"danger",message:"Registro No. é obrigatório!"}),this.form.horaEntrada||this.Notificacao.push({type:"danger",message:"Hora de entrada é obrigatório!"}),this.form.entradaAtraves||this.Notificacao.push({type:"danger",message:"Entrada através é obrigatório!"}),this.form.sexo||this.Notificacao.push({type:"danger",message:"Sexo é obrigatório!"}),this.form.vestimentas||this.Notificacao.push({type:"danger",message:"Vestimentas é obrigatório!"}),this.form.condicoesEncontrada||this.Notificacao.push({type:"danger",message:"Condições em que se encontrava é obrigatório!"}),!(this.Notificacao.length>0)||(setTimeout((function(){t.Notificacao=[]}),5e3),!1)}})}),d=m,p=o(3736),v=(0,p.Z)(d,a,r,!1,null,null,null),g=v.exports},8161:function(t,e,o){var a,r,n;t=o.nmd(t);var s=o(7964)["default"];o(1703),o(8309),o(9653),o(2707),o(4916),o(7601),o(1539),o(4747),o(7941),function(o,i){"object"==s(e)&&"object"==s(t)?t.exports=i():(r=[],a=i,n="function"===typeof a?a.apply(e,r):a,void 0===n||(t.exports=n))}(0,(function(){return function(t){function e(a){if(o[a])return o[a].exports;var r=o[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,a){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p=".",e(e.s=10)}([function(t,e){t.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(t){return t.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(t){return t.toLocaleLowerCase()}},"!":{escape:!0}}},function(t,e,o){"use strict";function a(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e}var r=o(2),n=o(0),s=o.n(n);e.a=function(t,e){var n=e.value;if((Array.isArray(n)||"string"==typeof n)&&(n={mask:n,tokens:s.a}),"INPUT"!==t.tagName.toLocaleUpperCase()){var i=t.getElementsByTagName("input");if(1!==i.length)throw new Error("v-mask directive requires 1 input, found "+i.length);t=i[0]}t.oninput=function(e){if(e.isTrusted){var s=t.selectionEnd,i=t.value[s-1];for(t.value=o.i(r.a)(t.value,n.mask,!0,n.tokens);s<t.value.length&&t.value.charAt(s-1)!==i;)s++;t===document.activeElement&&(t.setSelectionRange(s,s),setTimeout((function(){t.setSelectionRange(s,s)}),0)),t.dispatchEvent(a("input"))}};var c=o.i(r.a)(t.value,n.mask,!0,n.tokens);c!==t.value&&(t.value=c,t.dispatchEvent(a("input")))}},function(t,e,o){"use strict";var a=o(6),r=o(5);e.a=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments[3];return Array.isArray(e)?o.i(r.a)(a.a,e,s)(t,e,n,s):o.i(a.a)(t,e,n,s)}},function(t,e,o){"use strict";function a(t){t.component(c.a.name,c.a),t.directive("mask",s.a)}Object.defineProperty(e,"__esModule",{value:!0});var r=o(0),n=o.n(r),s=o(1),i=o(7),c=o.n(i);o.d(e,"TheMask",(function(){return c.a})),o.d(e,"mask",(function(){return s.a})),o.d(e,"tokens",(function(){return n.a})),o.d(e,"version",(function(){return l}));var l="0.11.1";e.default=a,"undefined"!=typeof window&&window.Vue&&window.Vue.use(a)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),r=o(0),n=o.n(r),s=o(2);e.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return n.a}}},directives:{mask:a.a},data:function(){return{lastValue:null,display:this.value}},watch:{value:function(t){t!==this.lastValue&&(this.display=t)},masked:function(){this.refresh(this.display)}},computed:{config:function(){return{mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(t){t.isTrusted||this.refresh(t.target.value)},refresh:function(t){this.display=t;t=o.i(s.a)(t,this.mask,this.masked,this.tokens);t!==this.lastValue&&(this.lastValue=t,this.$emit("input",t))}}}},function(t,e,o){"use strict";function a(t,e,o){return e=e.sort((function(t,e){return t.length-e.length})),function(a,r){for(var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=0;s<e.length;){var i=e[s];s++;var c=e[s];if(!(c&&t(a,c,!0,o).length>i.length))return t(a,i,n,o)}return""}}e.a=a},function(t,e,o){"use strict";function a(t,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments[3];t=t||"",e=e||"";for(var r=0,n=0,s="";r<e.length&&n<t.length;){var i=e[r],c=a[i],l=t[n];c&&!c.escape?(c.pattern.test(l)&&(s+=c.transform?c.transform(l):l,r++),n++):(c&&c.escape&&(r++,i=e[r]),o&&(s+=i),l===i&&n++,r++)}for(var u="";r<e.length&&o;){i=e[r];if(a[i]){u="";break}u+=i,r++}return s+u}e.a=a},function(t,e,o){var a=o(8)(o(4),o(9),null,null);t.exports=a.exports},function(t,e){t.exports=function(t,e,o,a){var r,n=t=t||{},i=s(t.default);"object"!==i&&"function"!==i||(r=t,n=t.default);var c="function"==typeof n?n.options:n;if(e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),o&&(c._scopeId=o),a){var l=c.computed||(c.computed={});Object.keys(a).forEach((function(t){var e=a[t];l[t]=function(){return e}}))}return{esModule:r,exports:n,options:c}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{directives:[{name:"mask",rawName:"v-mask",value:t.config,expression:"config"}],attrs:{type:"text"},domProps:{value:t.display},on:{input:t.onInput}})},staticRenderFns:[]}},function(t,e,o){t.exports=o(3)}])}))},3019:function(t,e,o){"use strict";o.d(e,{Z:function(){return n}});o(7941),o(2526),o(7327),o(1539),o(5003),o(4747),o(9337);function a(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function r(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function n(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){a(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}}}]);
//# sourceMappingURL=248-legacy.96d46cd8.js.map