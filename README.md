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
    Não pode atualizar os processos não distribuídos para ele, mas ele pode alterar responsável.
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
    Pode ver os processos que ainda não foram distribuídos, ou seja, os processos com status Recebido, independente de quem cadastrou.
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
    acrescenta o que está utlizando para que seja reconhecido como módulo.
<br>
    - router/index:<br> 
    criou requires Auth para saber se a página precisa estar autenticda para acessar. 
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
    e substitui o token no store e localStorage.
    A alteração no token do store está até o momento diretamente no state,
    pois a realização da alteração através da action estava ocorrendo erro (pesquisar).
<br>
    Essa funcionalidade é chamada em App, configurada atualmente em 20 minutos, antes
    que o token expire (30 min), para que o usuário do sistema não precise fazer login
    a cada expiração do token.

# 📁 Acesso ao projeto master
https://sistemas.saude.am.gov.br/sapej/index.html#/

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

