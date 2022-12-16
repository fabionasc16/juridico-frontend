"use strict";(self["webpackChunkjuridico_frontend"]=self["webpackChunkjuridico_frontend"]||[]).push([[740],{9143:function(e,a,t){t.d(a,{Z:function(){return d}});var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("b-modal",{attrs:{id:"modal-excluir",title:"Excluir","hide-footer":""}},[t("p",{staticClass:"my-4"},[e._v("Deseja excluir "+e._s(e.pergunta)+"?")]),t("b-button",{staticClass:"mr-2",on:{click:function(a){return e.$bvModal.hide("modal-excluir")}}},[e._v("Fechar")]),e._t("buttons")],2)],1)},o=[],i=t(8935),r=i["default"].extend({props:["pergunta"],methods:{}}),l=r,n=t(1001),c=(0,n.Z)(l,s,o,!1,null,null,null),d=c.exports},8887:function(e,a,t){t.r(a),t.d(a,{default:function(){return w}});var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container fluid"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-12",staticStyle:{"margin-top":"20px"}},[t("b-form-group",{staticClass:"titulo m-0",attrs:{label:"Consulta de Responsáveis","label-size":"lg"}},[t("hr")])],1)]),t("notifications",{attrs:{notifications:e.Notificacao}}),e.alert?t("div",[t("ReturnMessage",{attrs:{message:e.Message,fechaAlert:e.fechaAlert}})],1):e._e(),e.loading?t("div",[t("LoadingSpinner")],1):e._e(),t("b-form",{staticClass:"mb-5",on:{submit:function(a){return a.preventDefault(),e.search.apply(null,arguments)}}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-3"},[t("b-form-group",{staticClass:"font",attrs:{label:"CPF:"}},[t("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],attrs:{placeholder:"Digite seu CPF ",type:"text"},model:{value:e.form.cpf_responsavel,callback:function(a){e.$set(e.form,"cpf_responsavel",a)},expression:"form.cpf_responsavel"}})],1)],1),t("div",{staticClass:"col-4"},[t("b-form-group",{staticClass:"font",attrs:{label:"Nome:"}},[t("b-form-input",{attrs:{placeholder:"Digite seu Nome",type:"text"},model:{value:e.form.nome_responsavel,callback:function(a){e.$set(e.form,"nome_responsavel",a)},expression:"form.nome_responsavel"}})],1)],1),t("div",{staticClass:"col-2 justify-content-center"},[t("b-form-group",{staticClass:"font text-white",attrs:{label:"Consultar"}},[t("b-button",{staticClass:"h2",attrs:{type:"submit"}},[t("b-icon-search",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.topleft",value:"Consultar",expression:"'Consultar'",modifiers:{hover:!0,topleft:!0}}]})],1)],1)],1)])]),t("div",{staticClass:"card p-0 m-0"},[t("div",{staticClass:"card-header",attrs:{align:"right"}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-1 text-blue h2 p0m0",attrs:{align:"center",label:"Responsáveis Cadastrados"}},[t("b-icon-journal-text")],1),e._m(0),t("div",{staticClass:"col-1 position-relative",attrs:{align:"center"}},[t("b-form-group",{staticClass:"btn text-primary position-absolute top-50 start-50 translate-middle",attrs:{label:""}},[t("div",{staticClass:"h3"},[t("b-icon-plus-circle",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-cadastro-responsavel",modifiers:{"modal-cadastro-responsavel":!0}},{name:"b-tooltip",rawName:"v-b-tooltip.hover.topleft",value:"Adicionar Responsável",expression:"'Adicionar Responsável'",modifiers:{hover:!0,topleft:!0}}],staticClass:"mr-3"})],1)])],1)])]),t("div",[t("b-table-lite",{staticClass:"m-0",attrs:{small:"",striped:"",hover:"","head-variant":"dark","current-page":e.currentPage,"per-page":e.perPage,"no-border-collapse":e.noCollapse,items:e.items,fields:e.fields},scopedSlots:e._u([{key:"cell(botaoAction)",fn:function(a){return[t("b-dropdown",{staticClass:"p0m0",attrs:{variant:"dark",size:"sm"},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v(" ≡"),t("span",{staticClass:"sr-only"})]},proxy:!0}],null,!0)},[t("b-list-group-item",{staticClass:"btn-light btn-outline-dark m-0 p-1",attrs:{block:""},on:{click:function(t){return e.editarResponsavel(a.item.id_responsavel)}}},[e._v(" Editar ")]),t("b-list-group-item",{staticClass:"btn-light btn-outline-dark m-0 p-1",attrs:{block:""},on:{click:function(t){return e.visualizarResponsavel(a.item.id_responsavel)}}},[e._v(" Visualizar ")]),t("b-list-group-item",{staticClass:"btn-light text-dark btn-outline-danger m-0 p-1",attrs:{block:""},on:{click:function(t){return e.abrirModal("modal-excluir",a.item.id_responsavel,a.item.nome_responsavel)},listarResponsaveis:function(a){return e.listarResponsaveis(e.currentPage)}}},[e._v(" Excluir ")])],1)]}}])})],1),t("div",{staticClass:"card-footer m-0 px-1 pt-1"},[t("div",{staticClass:"col-12 m-0 px-1 pt-1"},[t("b-pagination",{directives:[{name:"show",rawName:"v-show",value:e.totalRows,expression:"totalRows"}],attrs:{pills:"",align:"right",size:"sm","total-rows":e.totalRows,"per-page":e.perPage},on:{change:e.listarResponsaveis},model:{value:e.currentPage,callback:function(a){e.currentPage=a},expression:"currentPage"}})],1)]),t("div",[e._v("  "),t("b",[e._v("Total Registros:")]),e._v(" "+e._s(e.totalRows))])]),t("b-modal",{attrs:{id:"modal-cadastro-responsavel",size:"lg",centered:"",title:"Cadastro do Responsável","hide-footer":""}},[t("ModalCadastroResponsavel",{attrs:{tipo:"cadastrar"},on:{listarResponsaveis:function(a){return e.listarResponsaveis(e.currentPage)}},scopedSlots:e._u([{key:"buttons",fn:function(){return[t("b-button",{staticClass:"bordered",on:{click:function(a){return e.$bvModal.hide("modal-cadastro-responsavel")}}},[e._v("Fechar")])]},proxy:!0}])})],1),t("b-modal",{attrs:{id:"modal-editar-responsavel",size:"lg",centered:"",title:"Editar Responsável","hide-footer":""}},[t("ModalCadastroResponsavel",{attrs:{tipo:"editar",id:e.idResponsavel},on:{listarResponsaveis:function(a){return e.listarResponsaveis(e.currentPage)}},scopedSlots:e._u([{key:"buttons",fn:function(){return[t("b-button",{staticClass:"bordered",on:{click:function(a){return e.$bvModal.hide("modal-editar-responsavel")}}},[e._v("Fechar")])]},proxy:!0}])})],1),t("b-modal",{attrs:{id:"modal-visualizar-responsavel",size:"lg",centered:"",title:"Visualizar Responsável","hide-footer":""}},[t("ModalCadastroResponsavel",{attrs:{tipo:"visualizar",id:e.idResponsavel},scopedSlots:e._u([{key:"buttons",fn:function(){return[t("b-button",{staticClass:"bordered",on:{click:function(a){return e.$bvModal.hide("modal-visualizar-responsavel")}}},[e._v("Fechar")])]},proxy:!0}])})],1),t("ModalExcluir",{attrs:{pergunta:"o responsável "+e.nomeResponsavelModal},scopedSlots:e._u([{key:"buttons",fn:function(){return[t("b-button",{staticClass:"bordered",attrs:{variant:"danger"},on:{click:function(a){return e.excluir(e.idResponsavel)}}},[e._v("Excluir")])]},proxy:!0}])})],1)},o=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"col-10 mt-1",attrs:{align:"start"}},[t("div",{staticClass:"row position-relative"},[t("h5",[e._v("Responsáveis Cadastrados")])])])}],i=(t(1539),t(4916),t(5306),t(8862),t(8935)),r=t(784),l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"card"},[t("div",{staticClass:"col-12"},[t("notifications",{attrs:{notifications:e.Notificacao}}),e.alert?t("div",[t("ReturnMessage",{attrs:{message:e.Message,fechaAlert:e.fechaAlert}})],1):e._e(),e.loading?t("div",[t("LoadingSpinner")],1):e._e(),t("b-form",{on:{submit:function(a){return a.preventDefault(),e.submit.apply(null,arguments)}}},[t("div",{staticClass:"row mt-3"},[t("b-form-group",{staticClass:"font col-sm-5 col-md-5 col-lg-5"},[t("label",[e._v("CPF"),t("span",{staticClass:"text-danger"},[e._v("*")]),e._v(":")]),t("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],attrs:{placeholder:"Digite seu CPF ",type:"text",required:"",disabled:e.disabledAll},model:{value:e.form.cpfResponsavel,callback:function(a){e.$set(e.form,"cpfResponsavel",a)},expression:"form.cpfResponsavel"}})],1),t("b-form-group",{staticClass:"font col-sm-7 col-md-7 col-lg-7"},[t("label",[e._v("Nome completo"),t("span",{staticClass:"text-danger"},[e._v("*")]),e._v(":")]),t("b-form-input",{attrs:{placeholder:"Digite seu Nome Completo",type:"text",required:"",disabled:e.disabledAll},model:{value:e.form.nomeResponsavel,callback:function(a){e.$set(e.form,"nomeResponsavel",a)},expression:"form.nomeResponsavel"}})],1)],1),t("div",{staticClass:"row"},[t("b-form-group",{staticClass:"font col-sm-5 col-md-5 col-lg-5"},[t("label",[e._v("Telefone"),t("span",{staticClass:"text-danger"},[e._v("*")]),e._v(":")]),t("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"(##) #####-####",expression:"'(##) #####-####'"}],attrs:{placeholder:"(00) 00000-0000",type:"text",required:"",disabled:e.disabledAll},model:{value:e.form.telefone,callback:function(a){e.$set(e.form,"telefone",a)},expression:"form.telefone"}})],1),t("b-form-group",{staticClass:"font col-sm-7 col-md-7 col-lg-7"},[t("label",[e._v("Email"),t("span",{staticClass:"text-danger"},[e._v("*")]),e._v(":")]),t("b-form-input",{attrs:{placeholder:"Digite seu Email",type:"email",required:"",disabled:e.disabledAll},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}})],1)],1),t("div",{staticClass:"row"},[t("b-form-group",{staticClass:"font col-sm-5 col-md-5 col-lg-5"},[t("label",[e._v("Registro OAB:"),t("span",{staticClass:"text-danger"},[e._v("*")]),e._v(":")]),t("b-form-input",{attrs:{placeholder:"Digite seu Registro OAB",type:"text",required:"",disabled:e.disabledAll},model:{value:e.form.registroOAB,callback:function(a){e.$set(e.form,"registroOAB",a)},expression:"form.registroOAB"}})],1)],1),t("div",{staticClass:"py-2 mt-10",attrs:{align:"right"}},[e._t("buttons"),e.disabledAll?e._e():t("b-button",{staticClass:"bordered ml-2",attrs:{type:"submit",variant:"success"}},[e._v("Salvar")])],2)])],1)])])},n=[],c=t(8161),d=t(9728),u=t(7054),p=t(4753),f=t(6038),m=t(3403),v=t(355),g=i["default"].extend({directives:{mask:c.mask},mixins:[v.Z],components:{HeaderPage:r.Z,BIconSearch:u.Lln,BIconJournalPlus:u.Wf7,BIconPlusCircle:u.HON,BIconInfoCircle:u.gjx,Notifications:d.Z,ReturnMessage:p.Z,LoadingSpinner:m.Z},props:["id","tipo"],data:function(){return{disabledAll:!1,rows:100,currentPage:1,stickyHeader:!0,noCollapse:!0,show:!1,form:{},Notificacao:[],Message:[],loading:!1,alert:!1,isLoading:!1}},mounted:function(){this.isLoading=!1,"editar"==this.tipo&&this.carregarDados(),"visualizar"==this.tipo&&(this.carregarDados(),this.disabledAll=!0)},methods:{submit:function(){var e=this,a=this.id?"put":"post",t="responsaveis";this.validarCampos()?(console.log("JSON: ",JSON.stringify(this.form)),this.loading=!0,f.Z.salvar(t,this.form,a,this.form.idResponsavel).then((function(t){"put"==a?e.adicionarAlert("success","Atualização realizada com sucesso!"):e.adicionarAlert("success","Cadastro realizado com sucesso!")})).catch((function(a){"Network Error"===a.message?e.adicionarAlert("alert","Sem conexão de rede. Verifique sua conexão!"):a&&a.response&&a.response.data&&a.response.data.message?e.adicionarAlert("alert",a.response.data.message):e.adicionarAlert("alert","Houve um erro ao salvar. Verifique o formulário e tente novamente!")})).finally((function(){e.loading=!1}))):this.adicionarAlert("alert","Realize as validações exibidas no topo desta página!")},carregarDados:function(){var e=this;this.loading=!0,f.Z.get("responsaveis/id",this.id).then((function(a){e.form.idResponsavel=a.data.id_responsavel,e.form.nomeResponsavel=a.data.nome_responsavel,e.form.cpfResponsavel=a.data.cpf_responsavel,e.form.telefone=a.data.telefone,e.form.email=a.data.email,e.form.registroOAB=a.data.registro_oab})).catch((function(a){e.adicionarAlert("alert","Houve um erro ao carregar os dados. Tente novamente!")})).finally((function(){e.loading=!1}))},validarCampos:function(){var e=this;return this.Notificacao=[],this.form.nomeResponsavel||this.adicionarNotificacao("danger","Nome é obrigatório!"),this.form.cpfResponsavel||this.adicionarNotificacao("danger","CPF é obrigatório!"),this.form.cpfResponsavel&&!v.Z.methods.validarCpf(this.form.cpfResponsavel)&&this.adicionarNotificacao("danger","CPF inválido!"),!(this.Notificacao.length>0)||(window.scrollTo(0,0),this.adicionarAlert("alert","Realize as validações exibidas no topo desta página!"),setTimeout((function(){e.Notificacao=[]}),1e4),!1)},adicionarAlert:function(e,a){this.Message=[],this.Message.push({type:e,message:a}),this.alert=!0},adicionarNotificacao:function(e,a){this.Notificacao.push({type:e,message:a})},fechaAlert:function(){this.alert=!1,"success"==this.Message[0].type&&(this.$bvModal.hide("modal-cadastro-responsavel"),this.$bvModal.hide("modal-editar-responsavel"),this.$emit("listarResponsaveis"))}}}),h=g,b=t(1001),C=(0,b.Z)(h,l,n,!1,null,null,null),_=C.exports,R=[{key:"botaoAction",label:"Ações",sortable:!1},{key:"nome_responsavel",label:"Nome",sortable:!0},{key:"cpf_responsavel",label:"CPF",sortable:!0}],x=t(9143),k=i["default"].extend({directives:{mask:c.mask},components:{HeaderPage:r.Z,BIconSearch:u.Lln,BIconJournalText:u.kEx,BIconPlusCircle:u.HON,BIconInfoCircle:u.gjx,Notifications:d.Z,ModalCadastroResponsavel:_,ReturnMessage:p.Z,LoadingSpinner:m.Z,ModalExcluir:x.Z},data:function(){return{idResponsavel:null,nomeResponsavelModal:"",rows:100,currentPage:1,totalRows:null,perPage:10,items:[],pageOptions:[5,10,15,{value:100,text:"Show a lot"}],form:{},fields:R,stickyHeader:!0,noCollapse:!0,Notificacao:[],Message:[],loading:!1,alert:!1}},mounted:function(){this.listarResponsaveis(this.currentPage)},methods:{abrirModal:function(e,a,t){this.idResponsavel=a,this.nomeResponsavelModal=t,this.$bvModal.show(e)},editarResponsavel:function(e){this.idResponsavel=e,this.$bvModal.show("modal-editar-responsavel")},visualizarResponsavel:function(e){this.idResponsavel=e,this.$bvModal.show("modal-visualizar-responsavel")},listarResponsaveis:function(e){var a=this;this.loading=!0;var t={};f.Z.post3("responsaveis/list","?currentPage=".concat(e),t).then((function(e){a.items=e.data.data,a.perPage=e.data.perPage,a.totalRows=e.data.total})).catch((function(e){return console.log(e),a.Notificacao.push({type:"danger",message:"Não foi possível carregar a listagem!"}),!1})).finally((function(){a.loading=!1}))},search:function(){var e=this,a=this.form.cpf_responsavel?this.form.cpf_responsavel.replace(/[^\d]+/g,""):"",t={cpfResponsavel:a,nomeResponsavel:this.form.nome_responsavel?this.form.nome_responsavel:""};console.log("busca ",JSON.stringify(t)),f.Z.post("responsaveis/list",t).then((function(a){e.items=a.data.data,e.perPage=a.data.perPage,e.totalRows=a.data.total})).catch((function(a){if(a.message.length>0)return e.Notificacao.push({type:"danger",message:a.response.data.message}),!1})).finally((function(){e.loading=!1}))},excluir:function(e){var a=this;this.$bvModal.hide("modal-excluir"),f.Z["delete"]("responsaveis",e).then((function(e){a.loading=!0,a.adicionarAlert("success","Exclusão realizada com sucesso!"),a.listarResponsaveis(a.currentPage)})).catch((function(e){a.adicionarAlert("alert","Ocorreu um erro ao excluir registro!")})).finally((function(){a.loading=!1}))},adicionarAlert:function(e,a){this.Message=[],this.Message.push({type:e,message:a}),this.alert=!0},adicionarNotificacao:function(e,a){this.Notificacao.push({type:e,message:a})},fechaAlert:function(){this.alert=!1}}}),y=k,A=(0,b.Z)(y,s,o,!1,null,null,null),w=A.exports},355:function(e,a,t){t(4916),t(5306);var s={methods:{validarCpf:function(e){if("string"!=typeof e)return!1;if(e=e.replace(/[^\d]+/g,""),""==e)return!1;if(11!=e.length||"00000000000"==e||"11111111111"==e||"22222222222"==e||"33333333333"==e||"44444444444"==e||"55555555555"==e||"66666666666"==e||"77777777777"==e||"88888888888"==e||"99999999999"==e)return!1;for(var a=0,t=0;t<9;t++)a+=parseInt(e.charAt(t))*(10-t);var s=11-a%11;if(10!=s&&11!=s||(s=0),s!=parseInt(e.charAt(9)))return!1;a=0;for(var o=0;o<10;o++)a+=parseInt(e.charAt(o))*(11-o);return s=11-a%11,10!=s&&11!=s||(s=0),s==parseInt(e.charAt(10))}}};a["Z"]=s}}]);
//# sourceMappingURL=740-legacy.b609b103.js.map