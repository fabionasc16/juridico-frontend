export type TableProcesso = {        
  numProcedimento: string,
  numProcessoSIGED: string,
  tipoProcesso: string,
  statusProcesso: string, 
  assunto: string,
  orgaoDemandante: string,
  classificacao: string,
  prazoTotal: string,   
  diasRestantes: string,
  caixaAtualSiged: string,
  qtdReiteracao: string    
};

export const FieldsTableProcesso = 
[   //NOMES DAS COLUNAS
  {
    key: 'botaoAction',
    label: 'Ações',
    sortable: false,
  },
  {
    key: 'num_procedimento',
    label: 'Nº Procedimento',
    sortable: true
  },
  {
    key: 'numero_siged',
    label: 'Nº SIGED',
    sortable: true
  },       
  {
    key: 'orgaoDemandante.orgao_demandante',
    label: 'Órgão Demandante',
    sortable: true,
  },
  {
    key: 'classificacao.descClassificacao',
    label: 'Classificação',
    sortable: true,
  },
  {
    key: 'caixa_atual_siged',
    label: 'Caixa SIGED',
    sortable: true,
  },
  {
    key: 'status.desc_status',
    label: 'Status',
    sortable: true,
  },  
  {
    key: 'prazo_total',
    label: 'Prazo (Dias Úteis)',
    sortable: true,
  },  
  {
    key: 'diasAExpirar',
    label: 'Dias a Expirar (Corridos)',
    sortable: true,
  }, 
  {
    key: 'reiteracoes',
    label: 'Reiteração',
    sortable: true,
  }, 

];

export const TableProcessoSeeder: Array<TableProcesso> = [

{ numProcedimento: "111111/1111-11", numProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'JURÍDICO', qtdReiteracao: '1' },
{ numProcedimento: "222222/2222-22", numProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Respondendo', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '3', caixaAtualSiged: 'RH', qtdReiteracao: '2' },
{ numProcedimento: "333333/3333-33", numProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Arquivado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '2', caixaAtualSiged: 'DETIN', qtdReiteracao: '5' },
{ numProcedimento: "444444/4444-44", numProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Distribuído', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '10', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "555555/5555-55", numProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Distribuído', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '0', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "666666/6666-66", numProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Tramitando', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "777777/7777-77", numProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '-1', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "888888/8888-88", numProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "999999/9999-99", numProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '3', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "123456/7890-12", numProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '2', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "154875/8754-87", numProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "789456/2022-01", numProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "754812/2020-10", numProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "111111/1111-11", numProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'JURÍDICO', qtdReiteracao: '0' },
{ numProcedimento: "222222/2222-22", numProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "333333/3333-33", numProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "444444/4444-44", numProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "555555/5555-55", numProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "666666/6666-66", numProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "777777/7777-77", numProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "888888/8888-88", numProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "999999/9999-99", numProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "123456/7890-12", numProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "154875/8754-87", numProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "789456/2022-01", numProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "754812/2020-10", numProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "111111/1111-11", numProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'JURÍDICO', qtdReiteracao: '0' },
{ numProcedimento: "222222/2222-22", numProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "333333/3333-33", numProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "444444/4444-44", numProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "555555/5555-55", numProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "666666/6666-66", numProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "777777/7777-77", numProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "888888/8888-88", numProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "999999/9999-99", numProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "123456/7890-12", numProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "154875/8754-87", numProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "789456/2022-01", numProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'RH', qtdReiteracao: '0' },
{ numProcedimento: "754812/2020-10", numProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'DETIN', qtdReiteracao: '0' },
{ numProcedimento: "017101/2019-20", numProcessoSIGED: "017101/2019-20", tipoProcesso: 'zxcv', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazoTotal: '10', diasRestantes: '4', caixaAtualSiged: 'COMPRAS', qtdReiteracao: '0' }
   
];