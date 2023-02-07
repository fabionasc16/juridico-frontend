# juridicos-frontend
<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## Descrição
O Projeto SAPEJ auxiliará o setor Jurídico no controle de processos provenientes também de órgãos externos.

<br>

O cadastro do processo é realizado pela recepção do jurídico.<br>
A recepção pode visualizar os processos até que sejam distribuídos.<br>
Para distribuir processo, a recepção informará um responsável, o qual é um advogado cadastrado,
e após isso muda o status para 'Distribuído'. <br>
O processo fica agora em responsabilidade do Advogado, o qual pode ser tramitado, respondido ou arquivado.<br>
Esses processos cadastrados, podem ser vinculados a um número do Siged, então, é possível visualizar o andamento do mesmo no Siged através da tela de Tramitação.<br>


# :hammer: Funcionalidades do projeto

- `Funcionalidade 1`: Processos
- `Funcionalidade 2`: Cadastro de Responsáveis
- `Funcionalidade 3`: Cadastro de Feriados
- `Funcionalidade 4`: Cadastro de Orgãos
- `Funcionalidade 5`: Cadastro de Tipos de Processos
- `Funcionalidade 6`: Cadastro de Usuários
- `Funcionalidade 7`: Cadastro de Assuntos
- `Funcionalidade 8`: Cadastro de Classificação

## 1. Processos

O Prazo Total do Processo vem escrito no documento do orgão demandante.<br>
A partir da data de recebimento do processo, é calculada a data final limite,
que leva em consideração os feriados cadastrados no sistema, o prazo total informado,
e se esse prazo total é em dias úteis ou corridos.
<p>
Existem 2 status no processo: <b>status do prazo</b> e <b>status do processo</b>. 
<br><br>
O <b>status do processo</b> pode ser: <br>

   - RECEBIDO: Chegou na mesa da Recepção, foi cadastrado.
   - DISTRIBUÍDO: Entre as pessoas do setor que vão dar a solução, no caso os 
   responsáveis (advogados) cadastrados.
   - TRAMITANDO: Quando enviam para outro setor.
   - RESPONDENDO: Tramitou e já estão respondendo.
   - ARQUIVADO: Quando foi arquivado no SIGED. Quando responde para o órgão demandante com ofício.
   
   É possível desarquivar o processo, após ser arquivado.
   <br>
   Se orgão demandante não aceitar a resposta, abre outro processo.
   <p>O processo tem 2 números: número do SIGED ou número externo(número do procedimento).
   - Número externo: número processo gerado pelo órgão externo, exemplo Ministério Público, para permitir que seja realizada busca.
   - Número SIGED: número processo SIGED, para conduzir o externo.
   </p>
   Caixa do SIGED: posteriormente deverá ser feito update para saber em que caixa está, pois hoje só
   salva a caixa atual, no momento do cadastro do processo.
   <br> Ou ver a tela de tramitações, que mostra por todos as caixas que o processo passou, de acordo com o SIGED.

<BR> O <b>status do prazo</b> pode ser: <br>

   - NORMAL: PRAZO>=6 DIAS (verde)
   - ATENÇÃO: PRAZO>=4 E < 6 DIAS (amarelo)
   - CRÍTICO: PRAZO >=0 E <4 DIAS, E HOJE(== -1) (vermelho)
   - EXPIRADO: PRAZO <-1 (preto)

</p>

### 1.1. Tramitações

As tramitações são buscadas no elastic, e exibidas no sistema.
<br>
Elas só serão exibidas quando for informado o número do SIGED.

### 1.2. Reiteração no processo
    
Pode haver reiterações no processo, com novo número no SIGED.

### 1.3. Duplicar processo

Serve para facilitar o cadastro do processo, para que não precise digitar tudo de novo.
<br>
Se existir algum processo muito parecido com o que será cadastrado,
basta clicar em editar esse processo, e clicar em duplicar.
Alguns dados serão 'reaproveitados'.<br>
A duplicação só será efetiva ao salvar.<br>

## 2. Responsáveis

Cadastro de advogados que serão responsáveis pelo processo.

## 3. Feriados

Uma vez por ano deve-se registrar os feriados para o ano corrente. O feriado pode ser móvel ou fixo.
O Ponto Facultativo também precisa ser registrado na tabela de feriado para que seja levado em consideração no cálculo do prazo final.
<br>
Nova reunião foi informado que seria conversado com o jurídico a respeito dos feriados.
Mas a ideia seria o sistema cadastrar os feriados fixos e calcular os móveis, uma vez por ano.
E o jurídico ficaria responsável pelo cadastro dos pontos facultativos.
Em relação a feriados criados, o sistema enviaria para o usuário confirmar, por exemplo: 'Deseja atualizar o prazo dos processos que estão em aberto?'. Caso usuário confirme, o sistema atualiza o prazo de todos os processos que não estão arquivados, em que o feriado interfira o prazo do processo.

### Papéis no sistema
- `Administrador`:
    <br>
    Tem acesso a todas as funcionalidades
    <br>

    * SAPEJ_PROCESSO
    * SAPEJ_RESPONSAVEL
    * SAPEJ_FERIADO
    * SAPEJ_ORGAO
    * SAPEJ_TIPO_PROCESSO
    * SAPEJ_USUARIO
    * SAPEJ_ASSUNTO
    * SAPEJ_CLASSIFICACAO
    * SAPEJ_DASHBOARD
    * SAPEJ_ADMINISTRADOR

- `Advogado`
    <br>
    Ver todos os processos (mesmo os cadastrados pela recepção ou distribuídos para outros advogados),
    porém os que estão distribuídos para ele são ordenados no início.
    <br>
    Ficará aberto para atualizar processo, pois será armazenado em log. 
    Ele pode alterar responsável do processo.
    <br>

    * SAPEJ_PROCESSO
    * SAPEJ_RESPONSAVEL
    * SAPEJ_FERIADO
    * SAPEJ_ORGAO
    * SAPEJ_TIPO_PROCESSO
    * SAPEJ_USUARIO
    * SAPEJ_ASSUNTO
    * SAPEJ_CLASSIFICACAO
    * SAPEJ_DASHBOARD

- `Recepção`:
    <br>  
    Pode ver todos os processos, mas só pode alterar com status do recebido. 
    A regra de visualizar processos foi alterada para que
    a Recepção possa ver se o processo já está cadastrado e se o que ele vai cadastrar é apenas uma reiteração ou um processo novo.

    Apenas quando estiver com status de Recebido, pode excluir processo.
    <br>

    * SAPEJ_PROCESSO

# Arquivos Login e Refresh Token
<br>
    - Arquivo store/usuario:<br>
    
    Actions chama mutations. 
    Só mutations altera o estado da variável.
    Dispatch chama método(boa prática).
    RemoveItem apaga do localStorage.
    https://medium.com/@emerson_pereira/vuex-actions-e-mutations-6f3b107b313a

<br>
    - localStorage é permanente, salvar nele os dados do login, para que ao dar F5 não apague tudo.
<br>
    - store/index:<br> 
    acrescenta o que está utilizando para que seja reconhecido como módulo.
<br>
    - router/index:<br> 
    criou requires Auth para saber se a página precisa estar autenticada para acessar. 
    Nessa mesma tela usa em beforeEach.
<br>
    - App:<br> 
    Onde faz com que o store não perca conteúdo após refresh.
    Pode chamar a actions direto, não pode chamar a mutations direto
<br>
    - layout/Header
<br>
    - services/rest/http_sapej
    enviar token no header
<br>
    - Para o refresh token:<br>
    Foi utilizado o typescript em services/rest/refresh_token
    que envia uma requisição para buscar um token novo no backend,
    e substitui o token no store(store/usuario) e localStorage.
    A alteração no token do store está até o momento diretamente no state,
    pois a realização da alteração através da action estava ocorrendo erro (pesquisar).
<br>
    Essa funcionalidade é chamada em App, configurada atualmente em 20 minutos, antes
    que o token expire (30 min), para que o usuário do sistema não precise fazer login
    a cada expiração do token.
    É chamada também após efetuar login (store/usuario/efetuarLogin)
<br>
  o tempo para chamada do refresh-token no front, é configurado no environment, no campo timerUpdateRefreshToken.

<br><br>
Para as permissões na tela:
<br>
Service auth.ts: funções para permissões
<br>
layout/Sidebar.vue: permissão para exibir menu 
<br>
mixins/menu.ts: colocar as roles em meta permission
<br>
router/index: Em beforeEach, validar se tem permissão para acessar aquela página.
Nas rotas, em meta permission colocar as roles.

# 📁 Acesso ao projeto master
https://sistemas.saude.am.gov.br/sapej/index.html#/
<br>
 local: apiURL: "http://192.168.107.150:3302/api/v1"
 <br>
 produção: apiURL: "https://sistemas.saude.am.gov.br/sapej-backend/api/v1" 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Imagens

## MER
Esse modelo pode não estar com os dados atualizados, porém, essa foi a estrutura utilizada. 

![name](/readme/mer.jpg)

## Código dos status

![name](/readme/status.jpg)

