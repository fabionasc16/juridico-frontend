<template>
  <b-container fluid style="padding: 5% 3% 3% 2%;">
    <div class="animate__animated animate__fadeIn slower">
      <h2>Cadastro de pacientes</h2>
      <p style="color: grey; font-size: 0.9em">Adicione novos pacientes ao sistema</p>
      <hr>
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit">

            <b-form-group
              class="titulo"
              label="Informações de entrada do paciente"
              label-size="lg"
            >
            <hr>
            </b-form-group>

            <div class="row">
              <b-form-group label="Data de entrada na unidade:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="date" v-model="form.dataEntrada" required></b-form-input>
              </b-form-group>

              <b-form-group label="Hora de entrada:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="time" v-model="form.horaEntrada" required></b-form-input>
              </b-form-group>

              <b-form-group label="Entrada através:" class="font col-sm-3 col-md-3 col-lg-3">
                  <b-form-select v-model="form.entradaAtraves">
                      <b-form-select-option value="samu">SAMU</b-form-select-option>
                      <b-form-select-option value="policia">Policia</b-form-select-option>
                  </b-form-select>
              </b-form-group>

              <b-form-group label="B.O.:" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirbo">
                  <b-form-input type="text" v-model="form.boletim"></b-form-input>
              </b-form-group>

            </div>

            <b-form-group
              class="titulo"
              label="Informações do paciente"
              label-size="lg"
            >
            <hr>
            </b-form-group>

            <div class="row">
              <b-form-group label="Nome:" class="font col-sm-6 col-md-6 col-lg-6">
                <b-form-input type="text" v-model="form.nomePaciente"></b-form-input>
              </b-form-group>

              <b-form-group label="Nome da mãe:" class="font col-sm-6 col-md-6 col-lg-6">
                <b-form-input type="text" v-model="form.nomeMae"></b-form-input>
              </b-form-group>

              <b-form-group label="Data de nascimento:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="date" v-model="form.dataNascimento"></b-form-input>
              </b-form-group>

              <b-form-group label="RG:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="text" v-model="form.rg"></b-form-input>
              </b-form-group>

              <b-form-group label="CPF:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="text" v-model="form.cpf" v-mask="'###.###.###-##'"></b-form-input>
              </b-form-group>

              <b-form-group label="CNS:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="text" v-model="form.cns" v-mask="'###.####.####.####'"></b-form-input>
              </b-form-group>
            </div>

            <b-form-group
              class="titulo"
              label="Características do paciente"
              label-size="lg"
            >
            <hr>
            </b-form-group>

            <div class="row">
              <b-form-group label="Nacionalidade:" class="font col-sm-2 col-md-2 col-lg-2">
                <b-form-select v-model="form.nacionalidade">
                      <b-form-select-option value="brasileiro">Brasileiro</b-form-select-option>
                      <b-form-select-option value="estrangeiro">Estrangeiro</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group label="Sexo:" class="font col-sm-2 col-md-2 col-lg-2">
                <b-form-select size="sm" v-model="form.sexo">
                  <b-form-select-option value="masculino">Masculino</b-form-select-option>
                  <b-form-select-option value="feminino">Feminino</b-form-select-option>
                  <b-form-select-option value="intersexual">Intersexual</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group label="Raça/Etnia:" class="font col-sm-2 col-md-2 col-lg-2">
                  <b-form-select size="sm" v-model="form.raca">
                  <b-form-select-option value="">Amarela (asiática)</b-form-select-option>
                  <b-form-select-option value="">Branca</b-form-select-option>
                  <b-form-select-option value="">Indígena</b-form-select-option>
                  <b-form-select-option value="">Negra</b-form-select-option>
                  <b-form-select-option value="">Parda</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group label="Cor dos olhos:" class="font col-sm-2 col-md-2 col-lg-2">
                <b-form-select size="sm" v-model="form.corOlhos">
                      <b-form-select-option value="">Castanhos claros</b-form-select-option>
                      <b-form-select-option value="">Castanhos escuros</b-form-select-option>
                      <b-form-select-option value="">Azul</b-form-select-option>
                      <b-form-select-option value="">Verde</b-form-select-option>
                      <b-form-select-option value="">Preto</b-form-select-option>
                      <b-form-select-option value="">Cinzento</b-form-select-option>
                      <b-form-select-option value="">Desiguais na cor</b-form-select-option>
                </b-form-select>
              </b-form-group>
          </div>

            <div class="row">
              <b-form-group label="Cor dos cabelos:" class="font col-sm-2 col-md-2 col-lg-2">
                  <b-form-select size="sm" v-model="form.corCabelo">
                      <b-form-select-option value="">Pretos</b-form-select-option>
                      <b-form-select-option value="">Castanhos escuros</b-form-select-option>
                      <b-form-select-option value="">Castanhos claros</b-form-select-option>
                      <b-form-select-option value="">Loiro claro</b-form-select-option>
                      <b-form-select-option value="">Loiro escuro</b-form-select-option>
                      <b-form-select-option value="">Ruivo</b-form-select-option>
                      <b-form-select-option value="">Grisalhos parcial</b-form-select-option>
                      <b-form-select-option value="">Grisalhos total</b-form-select-option>
                      <b-form-select-option value="">Calvo parcial</b-form-select-option>
                      <b-form-select-option value="">Calvo total</b-form-select-option>
                      <b-form-select-option value="">Tingido</b-form-select-option>
                </b-form-select>             
              </b-form-group>

              <b-form-group label="Tipo do cabelo:" class="font col-sm-2 col-md-2 col-lg-2">
                  <b-form-select size="sm" v-model="form.tipoCabelo">
                      <b-form-select-option value="">Liso</b-form-select-option>
                      <b-form-select-option value="">Ondulado</b-form-select-option>
                      <b-form-select-option value="">Encaracolado</b-form-select-option>
                      <b-form-select-option value="">Raspado</b-form-select-option>
                      <b-form-select-option value="">Calvo</b-form-select-option>
                </b-form-select> 
              </b-form-group>

              <b-form-group label="Corte do cabelo:" class="font col-sm-2 col-md-2 col-lg-2">
                <b-form-select size="sm" v-model="form.corteCabelo">
                      <b-form-select-option value="">Curto</b-form-select-option>
                      <b-form-select-option value="">Médio</b-form-select-option>
                      <b-form-select-option value="">Longo</b-form-select-option>
                </b-form-select> 
              </b-form-group>

              <b-form-group label="Biotipo:" class="font col-sm-2 col-md-2 col-lg-2">
                <b-form-select size="sm" v-model="form.biotipo">
                      <b-form-select-option value="">Magro</b-form-select-option>
                      <b-form-select-option value="">Sobrepeso</b-form-select-option>
                      <b-form-select-option value="">Troncudo</b-form-select-option>
                </b-form-select> 
              </b-form-group>
            </div>

            <div class="row">
                
              <b-form-group label="Estatura aproximada:" append="m" class="font col-sm-2 col-md-2 col-lg-2" description="Em metros">
                <b-form-input type="text" v-model="form.estaturaAproximada" v-mask="'#.##'"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Peso aproximado:" class="font col-sm-2 col-md-2 col-lg-2" description="Em quilos">
                <b-form-input type="text" v-model="form.pesoAproximado"></b-form-input>
              </b-form-group>

              <b-form-group label="Idade aproximada:" class="font col-sm-2 col-md-2 col-lg-2" description="Em anos">
                <b-form-input type="text" v-model="form.idadeAproximada"></b-form-input>
              </b-form-group>

              <b-form-group style="margin-top:40px" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-checkbox-group>
                  <b-form-checkbox value="barba" v-model="form.barba">Barba</b-form-checkbox>
                  <b-form-checkbox value="bigode" v-model="form.bigode">Bigode</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </div>

          <div class="row">
            <b-form-group
              label="Sinais particulares:"
              description=" (tatuagem, cicatriz, marcas etc.)"
              class="font col-sm-10 col-md-10 col-lg-10"
            >
              <b-form-input type="text" v-model="form.sinaisParticulares"></b-form-input>
            </b-form-group>

            <b-form-group
              label="Acessórios utilizados:"
              description="(anel, cordão, relógio etc)"
              class="font col-sm-10 col-md-10 col-lg-10"
            >
              <b-form-input type="text" v-model="form.acessoriosUtilizados"></b-form-input>
            </b-form-group>

            <b-form-group label="Deficiência, amputações e/ou deformações? Se sim, qual(is)?" class="font col-sm-10 col-md-10 col-lg-10">
              <b-form-input type="text" v-model="form.deficiencia"></b-form-input>
            </b-form-group>
          </div>
            <b-form-group
              class="titulo"  
              label="Circunstâncias em que foi encontrado(a)"
              label-size="lg"
            >
            <hr>
            </b-form-group>
          <div class="row">
            <b-form-group label="Vestimentas que usava" class="font col-sm-8 col-md-8 col-lg-8">
              <b-form-input type="text" v-model="form.vestimentas"></b-form-input>
            </b-form-group>

                  <b-form-group label="Local onde foi encontrado(a)" class="font col-sm-8 col-md-8 col-lg-8"
                  description="(rua, ponto de referência etc)">
                      <b-form-input type="text" v-model="form.localEncontrado"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Bairro" class="font col-sm-8 col-md-8 col-lg-8">
                      <b-form-input type="text" v-model="form.bairroEncontrado"></b-form-input>
                  </b-form-group>
 

            <b-form-group label="Condições em que se encontrava" class="font col-sm-8 col-md-8 col-lg-8">
              <b-form-textarea rows="3" max-rows="6" v-model="form.condicoesEncontrada"></b-form-textarea>
            </b-form-group>

</div>
            <div class="py-2" >
                <b-button  class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                <b-button type="submit" variant="success">Salvar</b-button>
              </div>
          


          </b-form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import {mask} from "vue-the-mask"

export default Vue.extend({
  directives: {mask},
  data() {
      return {
            form: {
                dataEntrada: '' as string,
                horaEntrada: '' as string,
                entradaAtraves: [] as Array<string>,
                nomePaciente: '' as string,
                nomeMae: '' as string,
                dataNascimento: new Date() as Date,
                rg: '' as string,
                cpf: '' as string,
                cns: '' as string,
                nacionalidade: [] as Array<string>,
                sexo: [] as Array<string>,
                raca: [] as Array<string>,
                corOlhos: [] as Array<string>,
                corCabelos: [] as Array<string>,
                tipoCabelo: [] as Array<string>,
                corteCabelo: [] as Array<string>,
                biotipo: [] as Array<string>,
                estaturaAproximada: '' as string,
                pesoAproximado: '' as string,
                idadeAproximada: '' as string,
                barba: false as boolean,
                bigode: false as boolean,
                sinaisParticulares: '' as string,
                acessoriosUtilizados: '' as string,
                deficiencia: '' as string,
                vestimentas: '' as string,
                localEncontrado: '' as string,
                bairroEncontrado: '' as string,
                condicoesEncontrada: '' as string,
                boletim: '' as string
            },
            exibirbo: false as boolean
            
        };
      },
    mounted(){
        this.form.dataEntrada = this.defaultData()
        this.form.horaEntrada = this.defaultHora()
    },

    methods:{

        defaultData(): string {
            let hoje = new Date()
            let month = ("0" + (hoje.getMonth() + 1)).slice(-2)
            let day = ("0" + hoje.getDate()).slice(-2)
            let year = hoje.getFullYear()
            return year + '-' + month + '-' + day
        },
        defaultHora(): string {
            let hoje = new Date()
            let hora =("0" + hoje.getHours()).slice(-2)
            var min = ("0" + hoje.getMinutes()).slice(-2)
            return hora + ":" + min
        },
        submit(){
            alert('enviar')
        },
        voltar(): void{
          this.$router.push('/')
        }
    }        

})

</script>

<style scope>
.root .row {
    min-height: 0vh;
}
.row {
  min-height: 0vh;
}
.font {
  font-family: 'Mulish', sans-serif;
}
.titulo {
  color:#293258;
  margin-top: 20px;
  font-family: 'Mulish', sans-serif;
}
.custom-select-sm {
    height: calc(2.0em + .5rem + 2px);
}    
</style>