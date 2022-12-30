# juridicos-frontend
<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## Descrição
O Projeto SAPEJ auxiliará o setor Jurídico no controle de processos provenientes também de órgãos externos.

# :hammer: Funcionalidades do projeto

- `Funcionalidade 1`: Processos
- `Funcionalidade 2`: Cadastro de Responsáveis
- `Funcionalidade 3`: Cadastro de Feriados
- `Funcionalidade 4`: Cadastro de Orgãos
- `Funcionalidade 5`: Cadastro de Tipos de Processos
- `Funcionalidade 6`: Cadastro de Usuários
- `Funcionalidade 7`: Cadastro de Assuntos
- `Funcionalidade 8`: Cadastro de Classificação

### Papéis no sistema
- Administrador
    Tem acesso a todas as funcionalidades

    SAPEJ_PROCESSO
    SAPEJ_RESPONSAVEL
    SAPEJ_FERIADO
    SAPEJ_ORGAO
    SAPEJ_TIPO_PROCESSO
    SAPEJ_USUARIO
    SAPEJ_ASSUNTO
    SAPEJ_CLASSIFICACAO
    SAPEJ_DASHBOARD
    SAPEJ_ADMINISTRADOR

- Advogado
    Ver todos os processos (mesmo os cadastrados pela recepção ou distribuídos para outros advogados),
    porém os que estão distribuídos para ele são ordenados no início.
    Não pode atualizar os processos não distribuídos para ele, mas ele pode alterar responsável.

    SAPEJ_PROCESSO
    SAPEJ_RESPONSAVEL
    SAPEJ_FERIADO
    SAPEJ_ORGAO
    SAPEJ_TIPO_PROCESSO
    SAPEJ_USUARIO
    SAPEJ_ASSUNTO
    SAPEJ_CLASSIFICACAO
    SAPEJ_DASHBOARD

- Recepção
    Pode ver os processos que ainda não foram distribuídos, ou seja, os processos com status Recebido, independente de quem cadastrou.
    Apenas quando estiver com status de Recebido, pode excluir processo.

    SAPEJ_PROCESSO

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
