<template>
  <div>
    <b-container>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Processos" label-size="lg">
          <hr />
        </b-form-group>

        <!-- FORMULÁRIO DE CONSULTA DO PROCESSO -->
        <b-form>
          <!-- 1ª LINHA (3 CAIXAS + ÍCONE) -->
          <div class="row">
            <!-- 1ª LINHA (3 CAIXAS) -->
            <div class="col-10">
              <div class="row">
                <b-form-group label="Nº Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3">
                  <b-form-input size="md" type="text" v-model="form.nProcesso" v-mask="'######/####-##'"></b-form-input>
                </b-form-group>

                <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
                  <b-form-input size="md" type="text" v-model="form.assunto" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Caixa SIGED:" append="m" class="font col-sm-4 col-md-4 col-lg-4">
                  <b-form-input size="md" type="text" v-model="form.caixaSIGED" v-mask=""></b-form-input>
                </b-form-group>
              </div>
            </div>
            <!-- ÍCONE DA LUPA -->
            <div class="col-2">
              <div class="justify-content-center">
                <b-form-group label="Consultar" class="font text-white">
                  <b-icon-search v-b-tooltip.hover.topleft="'Consultar'" type="button" @click="submit" font-scale="2"
                    style="color: gray;"></b-icon-search>
                </b-form-group>
              </div>
            </div>
          </div>

            <!-- 2ª LINHA (2 BOTÕES) -->
          <div class="row" align-h="between">
            <div class="col-6">
              <b-form-checkbox switch class="font">
                Consultar Nº de Processo Externo
              </b-form-checkbox>
            </div>
            <div class="col-6">
              <b-form-checkbox v-model="form.maisDetalhes" @change="exibeMaisDetalhes()" switch class="font text-end">
                + Filtros
              </b-form-checkbox>
            </div>
          </div>

            <!-- 3ª LINHA (CAMPOS OCULTOS) -->
          <div class="row">
            <div class="col-12">
              <div class="row">
                <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.tipoProcesso" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Status:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.status" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.orgaoDemandante" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.classificacao" v-mask=""></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </b-form>

        <!-- CARD DA TABELA DO PROCESSO -->
        <div class="card p-0 m-0">
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-Plus -->
              <div class="col-1" align="center">
                <b-icon-journal-plus font-scale="2" class="text-blue" label="Processos Cadastrados">
                </b-icon-journal-plus>
              </div>
              <!-- TÍTULO -->
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Processos Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center">
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <b-icon-plus-circle v-b-modal.modal-cadastro-processo v-b-tooltip.hover.topleft="'Adicionar Processo'"
                    font-scale="2"></b-icon-plus-circle>
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- TABELA -->
          <div>
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark" :current-page="currentPage"
              :per-page="perPage" :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="items"
              :fields="fields">

              <!-- BOTÕES DA ÚLTIMA COLUNA -->
              <template v-slot:cell(botaoAction)="data">

                <!-- BOTÃO DROPDOWN -->
                <b-dropdown variant="dark" class="p0m0" size="sm">
                  <!-- CONFIG. ICON HAMBURGUER -->
                  <template #button-content>
                    &#x2261;<span class="sr-only"></span>
                  </template>

                  <!-- ITENS DO DROPDOWN -->
                  <b-list-group-item block class="btn-light text-dark btn-outline-success m-0 p-1">
                    Finalizar
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-detalhes-processo class="btn-light btn-outline-dark m-0 p-1">
                    Detalhar
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-tramitacoes-processo class="btn-light btn-outline-dark m-0 p-1">
                    Tramitações
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-reiterar-processo class="btn-light btn-outline-dark m-0 p-1">
                    Reiterar
                  </b-list-group-item>
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1">
                    Duplicar
                  </b-list-group-item>
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1">
                    Excluir
                  </b-list-group-item>

                </b-dropdown>
              </template>
            </b-table-lite>
          </div>
          <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-footer m-0 px-1 pt-1">
            <div class="col-12 m-0 px-1 pt-1">
              <!-- PAGINAÇÃO -->
              <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows" :per-page="perPage">
              </b-pagination>
            </div>
          </div>
        </div>

        <!-- MODAL -->
        <!-- CADASTRO DO PROCESSO -->
        <b-modal id="modal-cadastro-processo" size="lg" centered title="Cadastro do Processo">
          <div class="card">
            <!-- TELA DE CADASTRO -->
            <div class="col-12">
              <b-form>
                <notifications :notifications="this.Notificacao"></notifications>
                <b-form-group class="titulo m-0 p-0" label="Informações de entrada do processo" label-size="lg">
                  <hr />
                </b-form-group>

                <div class="row">
                  <b-form-group label="Nº Procedimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nProcedimento"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Nº Expediente:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nExpediente"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Tipo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.tipoProcesso">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="administrativo">Administrativo</b-form-select-option>
                      <b-form-select-option value="extraJudicial">Extra-Judicial</b-form-select-option>
                      <b-form-select-option value="judicial">Judicial</b-form-select-option>
                      <b-form-select-option value="orgaoControle">Órgãos de Controle</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Prazo total:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.qtdDiasPrazo" required></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select size="sm" v-model="form.orgaoDemandante">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="DPE">DPE</b-form-select-option>
                      <b-form-select-option value="DelPolicia">Delegacia de Polícia</b-form-select-option>
                      <b-form-select-option value="FVS">FVS</b-form-select-option>
                      <b-form-select-option value="SPA">SPA</b-form-select-option>
                      <b-form-select-option value="TCE">TCE</b-form-select-option>
                      <b-form-select-option value="MPC">MPC</b-form-select-option>
                      <b-form-select-option value="MPE">MPE</b-form-select-option>
                      <b-form-select-option value="MPF">MPF</b-form-select-option>
                      <b-form-select-option value="MPT">MPT</b-form-select-option>
                      <b-form-select-option value="TCU">TCU</b-form-select-option>
                      <b-form-select-option value="Minist.Saude">Ministério da Saúde</b-form-select-option>
                      <b-form-select-option value="CRM">CRM</b-form-select-option>
                      <b-form-select-option value="CEMA">CEMA</b-form-select-option>
                      <b-form-select-option value="DPU">DPU</b-form-select-option>
                      <b-form-select-option value="CasaCivil">Casa Civil</b-form-select-option>
                      <b-form-select-option value="ALEAM">ALEAM</b-form-select-option>
                      <b-form-select-option value="SEINFRA">SEINFRA</b-form-select-option>
                      <b-form-select-option value="Serv.Social">Serviço Social</b-form-select-option>
                      <b-form-select-option value="SEJUSC">SEJUSC</b-form-select-option>
                      <b-form-select-option value="SESAI">SESAI</b-form-select-option>
                      <b-form-select-option value="HPSPlataoAraujo">HPS Platão Araújo</b-form-select-option>
                      <b-form-select-option value="HPS28Agosto">HPS 28 de Agosto</b-form-select-option>
                      <b-form-select-option value="PGE">PGE</b-form-select-option>
                      <b-form-select-option value="CGE">CGE</b-form-select-option>
                      <b-form-select-option value="CGJ">CGJ</b-form-select-option>
                      <b-form-select-option value="CGU">CGU</b-form-select-option>
                      <b-form-select-option value="ALEAMcpiSaude">ALEAM - CPI da Saúde</b-form-select-option>
                      <b-form-select-option value="PeticaoADV">Petição Advogado</b-form-select-option>
                      <b-form-select-option value="CamaraDepFed">Camara dos Deputados Federais</b-form-select-option>
                      <b-form-select-option value="PolFed">Polícia Federal</b-form-select-option>
                      <b-form-select-option value="ComiteCriseCOVID">Comitê de Crise - COVID 19</b-form-select-option>
                      <b-form-select-option value="CamaraMunManaus">Câmara Municipal de Manaus</b-form-select-option>
                      <b-form-select-option value="ConselhoTutelar">Conselho Tutelar</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataProcesso"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataRecebimento"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">
                    <b-form-input type="text" v-model="form.assunto"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                    <b-form-select size="sm" v-model="form.classificacao">
                      <b-form-select-option value="class1">Classificação 1</b-form-select-option>
                      <b-form-select-option value="class2">Classificação 2</b-form-select-option>
                      <b-form-select-option value="class3">Classificação 3</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <div class="row">
                  <div class="col-7">
                    <div class="row">
                      <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Responsável:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-select size="sm" v-model="form.responsavel">
                          <b-form-select-option value="resp.Heleno">Heleno</b-form-select-option>
                          <b-form-select-option value="resp.Viviane">Viviane</b-form-select-option>
                          <b-form-select-option value="resp.Natacha">Natacha</b-form-select-option>
                          <b-form-select-option value="resp.Alice">Alice</b-form-select-option>
                          <b-form-select-option value="resp.Milena">Milena</b-form-select-option>
                          <b-form-select-option value="resp.Fabrício">Fabrício</b-form-select-option>
                          <b-form-select-option value="resp.Davi">Davi</b-form-select-option>
                          <b-form-select-option value="resp.Lara">Lara</b-form-select-option>
                          <b-form-select-option value="resp.Joao">João</b-form-select-option>
                          <b-form-select-option value="resp.Jessica">Jéssica</b-form-select-option>
                          <b-form-select-option value="resp.Carlos">Carlos</b-form-select-option>
                          <b-form-select-option value="resp.CamilaNogueira">Camila Nogueira</b-form-select-option>
                          <b-form-select-option value="resp.Karol">Karol</b-form-select-option>
                          <b-form-select-option value="resp.Louise">Louise</b-form-select-option>
                          <b-form-select-option value="resp.Sabrina">Sabrina</b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                      </b-form-group>
                    </div>

                    <!--
                      <div class="py-2">
                        <b-button class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                        <b-button type="button" variant="success" @click="submit">Salvar</b-button>
                      </div>
      -->
                  </div>

                  <!--
                        <b-form-group label="Requer SIGED?" class="font col-sm-12 col-md-12 col-lg-12">
                          <b-form-select v-model="form.requerSIGED" @change="exibirCampoSIGED()">
                            <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                            <b-form-select-option value="sim">Sim</b-form-select-option>
                            <b-form-select-option value="nao">Não</b-form-select-option>
                          </b-form-select>
                        </b-form-group>
      -->

                  <!-- ÁREA DO SIGED -->
                  <div class="col-5">
                    <div class="row">
                      <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                        class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                      </b-form-checkbox>

                      <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                        v-show="exibirRegistroSIGED">
                        <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.nSIGED" required>
                        </b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                        label-size="lg">
                        <hr />
                      </b-form-group>
                      <div class="col-12">
                        <div class="row">
                          <b-form-group label="Data Processo:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="date" v-model="form.dataCadSIGED"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.permanencia"></b-form-input>
                          </b-form-group>
                        </div>
                        <div class="row">
                          <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.caixaAtual"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.tramitacao"></b-form-input>
                          </b-form-group>
                        </div>
                        <!--
                          <div class="row">
                              <b-button type="button" variant="info" @click="modalDetalhes">Detalhes</b-button>
                          </div>
        -->
                      </div>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>

          <!-- MODAL FOOTER -->
          <template #modal-footer>
            <!-- BOTÕES  -->
            <div class="m-0 p-0">
              <b-button class="mr-2" variant="secondary" @click="show = false">Voltar</b-button>
              <b-button type="submit" variant="success">Salvar</b-button>
            </div>
          </template>
        </b-modal>
        <!-- DETALHES DO PROCESSO -->
        <b-modal id="modal-detalhes-processo" size="lg" centered title="Detalhes do Processo">
          <div class="card">
            <!-- TELA DE DETALHES -->
            <div class="col-12">
              <b-form>


                <notifications :notifications="this.Notificacao"></notifications>
                <b-form-group class="titulo" label="Informações do processo" label-size="lg">
                  <hr />
                </b-form-group>

                <div class="row">
                  <b-form-group label="Nº Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nProcedimento" placeholder="111111/1111-11"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Tipo do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.tipoProcesso">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="administrativo">Administrativo</b-form-select-option>
                      <b-form-select-option value="extraJudicial">Extra-Judicial</b-form-select-option>
                      <b-form-select-option active value="judicial">Judicial</b-form-select-option>
                      <b-form-select-option value="orgaoControle">Órgãos de Controle</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Monitora Prazo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.monitoraPrazo" @change="exibirCampoPrazo()">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="sim">Sim</b-form-select-option>
                      <b-form-select-option value="nao">Não</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Prazo total:" class="font col-sm-3 col-md-3 col-lg-3"
                    v-show="exibirRegistroPrazo">
                    <b-form-input type="text" v-model="form.qtdDiasPrazo" required></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select size="sm" v-model="form.orgaoDemandante">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="ministerioPublico">Ministerio Publico</b-form-select-option>
                      <b-form-select-option value="tribunalContas">Tribunal de Contas</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataProcesso"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataRecebimento"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">
                    <b-form-input type="text" v-model="form.assunto"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                    <b-form-select size="sm" v-model="form.classificacao">
                      <b-form-select-option value="class1">Classificação 1</b-form-select-option>
                      <b-form-select-option value="class2">Classificação 2</b-form-select-option>
                      <b-form-select-option value="class3">Classificação 3</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <div class="row">
                  <div class="col-7">
                    <div class="row">
                      <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Advogado Responsável:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-input type="text" v-model="form.responsavel" required></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Observação:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                      </b-form-group>
                    </div>

                    <!--
                      <div class="py-2">
                        <b-button class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                        <b-button type="button" variant="success" @click="submit">Salvar</b-button>
                      </div>
      -->
                  </div>

                  <!--
                        <b-form-group label="Requer SIGED?" class="font col-sm-12 col-md-12 col-lg-12">
                          <b-form-select v-model="form.requerSIGED" @change="exibirCampoSIGED()">
                            <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                            <b-form-select-option value="sim">Sim</b-form-select-option>
                            <b-form-select-option value="nao">Não</b-form-select-option>
                          </b-form-select>
                        </b-form-group>
      -->

                  <div class="col-5">
                    <div class="row">
                      <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                        class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                      </b-form-checkbox>

                      <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                        v-show="exibirRegistroSIGED">
                        <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.nSIGED" required>
                        </b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                        label-size="lg">
                        <hr />
                      </b-form-group>
                      <div class="col-12">
                        <div class="row">
                          <b-form-group label="Data Processo:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="date" v-model="form.dataCadSIGED"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.permanencia"></b-form-input>
                          </b-form-group>
                        </div>
                        <div class="row">
                          <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.caixaAtual"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.tramitacao"></b-form-input>
                          </b-form-group>
                        </div>
                        <!--
                          <div class="row">
                              <b-button type="button" variant="info" @click="modalDetalhes">Detalhes</b-button>
                          </div>
        -->
                      </div>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>

          <template #modal-footer>
            <!-- MODAL FOOTER -->
            <div class="py-2">
              <!-- BOTÕES  -->
              <b-button class="mr-2" variant="secondary" @click="show = false">Voltar</b-button>
              <b-button type="submit" variant="success">Salvar</b-button>
            </div>
          </template>
        </b-modal>
        <!-- REITERAR PROCESSO -->
        <b-modal id="modal-reiterar-processo" size="lg" centered title="Reiterar Processo">
          <div class="card">
            <!-- TELA DE CADASTRO -->
            <div class="col-12">
              <b-form>
                <notifications :notifications="this.Notificacao"></notifications>
                <b-form-group class="titulo m-0 p-0" label="Informações do processo" label-size="lg">
                  <hr />
                </b-form-group>

                <div class="row">
                  <b-form-group label="Nº Procedimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nProcedimento"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Nº Expediente:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nExpediente"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Tipo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.tipoProcesso">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="administrativo">Administrativo</b-form-select-option>
                      <b-form-select-option value="extraJudicial">Extra-Judicial</b-form-select-option>
                      <b-form-select-option value="judicial">Judicial</b-form-select-option>
                      <b-form-select-option value="orgaoControle">Órgãos de Controle</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Prazo total:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.qtdDiasPrazo" required></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select size="sm" v-model="form.orgaoDemandante">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="DPE">DPE</b-form-select-option>
                      <b-form-select-option value="DelPolicia">Delegacia de Polícia</b-form-select-option>
                      <b-form-select-option value="FVS">FVS</b-form-select-option>
                      <b-form-select-option value="SPA">SPA</b-form-select-option>
                      <b-form-select-option value="TCE">TCE</b-form-select-option>
                      <b-form-select-option value="MPC">MPC</b-form-select-option>
                      <b-form-select-option value="MPE">MPE</b-form-select-option>
                      <b-form-select-option value="MPF">MPF</b-form-select-option>
                      <b-form-select-option value="MPT">MPT</b-form-select-option>
                      <b-form-select-option value="TCU">TCU</b-form-select-option>
                      <b-form-select-option value="Minist.Saude">Ministério da Saúde</b-form-select-option>
                      <b-form-select-option value="CRM">CRM</b-form-select-option>
                      <b-form-select-option value="CEMA">CEMA</b-form-select-option>
                      <b-form-select-option value="DPU">DPU</b-form-select-option>
                      <b-form-select-option value="CasaCivil">Casa Civil</b-form-select-option>
                      <b-form-select-option value="ALEAM">ALEAM</b-form-select-option>
                      <b-form-select-option value="SEINFRA">SEINFRA</b-form-select-option>
                      <b-form-select-option value="Serv.Social">Serviço Social</b-form-select-option>
                      <b-form-select-option value="SEJUSC">SEJUSC</b-form-select-option>
                      <b-form-select-option value="SESAI">SESAI</b-form-select-option>
                      <b-form-select-option value="HPSPlataoAraujo">HPS Platão Araújo</b-form-select-option>
                      <b-form-select-option value="HPS28Agosto">HPS 28 de Agosto</b-form-select-option>
                      <b-form-select-option value="PGE">PGE</b-form-select-option>
                      <b-form-select-option value="CGE">CGE</b-form-select-option>
                      <b-form-select-option value="CGJ">CGJ</b-form-select-option>
                      <b-form-select-option value="CGU">CGU</b-form-select-option>
                      <b-form-select-option value="ALEAMcpiSaude">ALEAM - CPI da Saúde</b-form-select-option>
                      <b-form-select-option value="PeticaoADV">Petição Advogado</b-form-select-option>
                      <b-form-select-option value="CamaraDepFed">Camara dos Deputados Federais</b-form-select-option>
                      <b-form-select-option value="PolFed">Polícia Federal</b-form-select-option>
                      <b-form-select-option value="ComiteCriseCOVID">Comitê de Crise - COVID 19</b-form-select-option>
                      <b-form-select-option value="CamaraMunManaus">Câmara Municipal de Manaus</b-form-select-option>
                      <b-form-select-option value="ConselhoTutelar">Conselho Tutelar</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataProcesso"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="date" v-model="form.dataRecebimento"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">
                    <b-form-input type="text" v-model="form.assunto"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                    <b-form-select size="sm" v-model="form.classificacao">
                      <b-form-select-option value="class1">Classificação 1</b-form-select-option>
                      <b-form-select-option value="class2">Classificação 2</b-form-select-option>
                      <b-form-select-option value="class3">Classificação 3</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <div class="row">
                  <div class="col-7">
                    <div class="row">
                      <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Responsável:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-select size="sm" v-model="form.responsavel">
                          <b-form-select-option value="resp.Heleno">Heleno</b-form-select-option>
                          <b-form-select-option value="resp.Viviane">Viviane</b-form-select-option>
                          <b-form-select-option value="resp.Natacha">Natacha</b-form-select-option>
                          <b-form-select-option value="resp.Alice">Alice</b-form-select-option>
                          <b-form-select-option value="resp.Milena">Milena</b-form-select-option>
                          <b-form-select-option value="resp.Fabrício">Fabrício</b-form-select-option>
                          <b-form-select-option value="resp.Davi">Davi</b-form-select-option>
                          <b-form-select-option value="resp.Lara">Lara</b-form-select-option>
                          <b-form-select-option value="resp.Joao">João</b-form-select-option>
                          <b-form-select-option value="resp.Jessica">Jéssica</b-form-select-option>
                          <b-form-select-option value="resp.Carlos">Carlos</b-form-select-option>
                          <b-form-select-option value="resp.CamilaNogueira">Camila Nogueira</b-form-select-option>
                          <b-form-select-option value="resp.Karol">Karol</b-form-select-option>
                          <b-form-select-option value="resp.Louise">Louise</b-form-select-option>
                          <b-form-select-option value="resp.Sabrina">Sabrina</b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                      </b-form-group>
                    </div>

                    <!--
                      <div class="py-2">
                        <b-button class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                        <b-button type="button" variant="success" @click="submit">Salvar</b-button>
                      </div>
      -->
                  </div>

                  <!--
                        <b-form-group label="Requer SIGED?" class="font col-sm-12 col-md-12 col-lg-12">
                          <b-form-select v-model="form.requerSIGED" @change="exibirCampoSIGED()">
                            <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                            <b-form-select-option value="sim">Sim</b-form-select-option>
                            <b-form-select-option value="nao">Não</b-form-select-option>
                          </b-form-select>
                        </b-form-group>
      -->

                  <!-- ÁREA DO SIGED -->
                  <div class="col-5">
                    <div class="row">
                      <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                        class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                      </b-form-checkbox>

                      <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                        v-show="exibirRegistroSIGED">
                        <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.nSIGED" required>
                        </b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                        label-size="lg">
                        <hr />
                      </b-form-group>
                      <div class="col-12">
                        <div class="row">
                          <b-form-group label="Data Processo:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="date" v-model="form.dataCadSIGED"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.permanencia"></b-form-input>
                          </b-form-group>
                        </div>
                        <div class="row">
                          <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.caixaAtual"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input disabled type="text" v-model="form.tramitacao"></b-form-input>
                          </b-form-group>
                        </div>
                        <!--
                          <div class="row">
                              <b-button type="button" variant="info" @click="modalDetalhes">Detalhes</b-button>
                          </div>
        -->
                      </div>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>

          <!-- MODAL FOOTER -->
          <template #modal-footer>
            <!-- BOTÕES  -->
            <div class="m-0 p-0">
              <b-button class="mr-2" variant="secondary" @click="show = false">Voltar</b-button>
              <b-button type="submit" variant="success">Salvar</b-button>
            </div>
          </template>
        </b-modal>
        <!-- TRAMITAÇÕES DO PROCESSO -->
        <b-modal id="modal-tramitacoes-processo" size="lg" centered title="Tramitações do Processo">
          <ModalTramitacoesProcesso>
          </ModalTramitacoesProcesso>
        </b-modal>
        <!-- //modal -->

      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalTramitacoesProcesso from './Modais/ModalTramitacoesProcesso.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex';
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'


export default Vue.extend({
  directives: { mask },
  data() {
    return {
      rows: 100,
      currentPage: 1,
      stickyHeader: true,
      noCollapse: true,
      show: false as boolean,
      form: {
        nProcedimento: "" as string,
        assunto: "" as string,
        caixaSIGED: "" as string,
        tipoProcesso: "" as string,
        status: "" as string,
        orgaoDemandante: "" as string,
        classificacao: "" as string,
        qtdDiasPrazo: "" as string,
        dataProcesso: "" as string,
        dataRecebimento: "" as string,
        horaRecebimento: "" as string,
        objeto: "" as string,
        responsavel: "" as string,
        observacao: "" as string,
        nSIGED: "" as string,
        dataCadSIGED: "" as string,
        permanencia: "" as string,
        caixaAtual: "" as string,
        tramitacao: "" as string,
        requerSIGED: false as boolean,
        monitoraPrazo: "" as string,
        maisDetalhes: false as boolean,
      },
      exibirMaisDetalhes: false as boolean,
      exibirRegistroPrazo: false as boolean,
      exibirRegistroSIGED: false as boolean,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      fields: [   //NOMES DAS COLUNAS
        {
          key: 'nProcessoExterno',
          label: 'Nº Externo',
          sortable: true
        },
        {
          key: 'nProcessoSIGED',
          label: 'Nº SIGED',
          sortable: true
        },
        {
          key: 'tipoProcesso',
          label: 'Tipo Processo',
          sortable: true,
        },
        {
          key: 'status',
          label: 'status',
          sortable: true,
        },
        {
          key: 'assunto',
          label: 'Assunto',
          sortable: true,
        },
        {
          key: 'orgaoDemandante',
          label: 'Órgão Demandante',
          sortable: true,
        },
        {
          key: 'classificacao',
          label: 'Classificação',
          sortable: true,
        },
        {
          key: 'caixaSIGED',
          label: 'Caixa SIGED',
          sortable: true,
        },
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
      ],
      items: [    //DADOS DA TABELA
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
        { isActive: true, nProcessoExterno: "017101/2019-20", nProcessoSIGED: "017101/2019-20", tipoProcesso: 'zxcv', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'COMPRAS' }
      ]
    };
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    submit() {
      alert("enviar");
    },
    exibeMaisDetalhes(): void {
      if (
        this.form.maisDetalhes === true
      ) {
        this.exibirMaisDetalhes = true;
      } else {
        this.exibirMaisDetalhes = false;
      }
    },
    exibirCampoPrazo(): void {
      if (
        this.form.monitoraPrazo == "sim"
      ) {
        this.exibirRegistroPrazo = true;
      } else {
        this.exibirRegistroPrazo = false;
      }
    },
    exibirCampoSIGED(): void {
      if (
        this.form.requerSIGED === true
      ) {
        this.exibirRegistroSIGED = true;
      } else {
        this.exibirRegistroSIGED = false;
      }
    },
    voltar(): void {
      this.$router.push("/");
    }
  },
  components: {
    HeaderPage,
    ModalTramitacoesProcesso,
    BIconSearch,
    BIconJournalPlus,
    BIconPlusCircle,
    BIconInfoCircle,
    Notifications,
  }
});
</script>

<style scope>
.p0m0 {
  margin: 0;
  padding: 0;
}

.root .row {
  min-height: 0vh;
}

.row {
  min-height: 0vh;
}

.font {
  font-family: "Mulish", sans-serif;
}

.titulo {
  color: #293258;
  margin-top: 20px;
  font-family: "Mulish", sans-serif;
}

.custom-select-sm {
  height: calc(2em + 0.5rem + 2px);
}
</style>
