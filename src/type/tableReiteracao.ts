export type TableReitaracao = {        
        numProcedimento: string,
        dataProcesso: string,
        dataRecebimento: string,
        horaRecebimento: string,
        numProcessoSIGED: string,
        prazoTotal: string,   
        diasRestantes: string,
        statusPrazo: string,
};

export const FieldsTableReiteracao = 
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
            key: 'data_processo',
            label: 'Data Processo',
            sortable: true,
        }, 
      /*  {
            key: 'dataRecebimento',
            label: 'Data Recebimento',
            sortable: true,
        }, 
        {
            key: 'horaRecebimento',
            label: 'Hora Recebimento',
            sortable: true,
        }, */
        {
            key: 'numero_siged',
            label: 'Processo SIGED',
            sortable: true,
        },
        {
            key: 'prazo',
            label: 'Prazo (Dias Úteis)',
            sortable: true,
        },  
        /*{
            key: 'diasRestantes',
            label: 'Dias a Expirar (Corridos)',
            sortable: true,
        },*/ 
       /* {
            key: 'idStatus',
            label: 'Status',
            sortable: true,
        }, */


        
      ];

export const TableReiteracaoSeeder: Array<TableReitaracao> = [
 

 { numProcedimento: '00001',
  dataProcesso: '20/07/2022',
  dataRecebimento: '21/07/2022',
  horaRecebimento: '10:00',
  numProcessoSIGED: '45689',
  prazoTotal: '3',   
  diasRestantes: '1',
  statusPrazo: 'Crítico'},    

  { numProcedimento: '00002',
  dataProcesso: '20/07/2022',
  dataRecebimento: '21/07/2022',
  horaRecebimento: '10:00',
  numProcessoSIGED: '11111',
  prazoTotal: '3',   
  diasRestantes: '1',
  statusPrazo: 'Atenção'},    

  { numProcedimento: '00003',
  dataProcesso: '20/07/2022',
  dataRecebimento: '21/07/2022',
  horaRecebimento: '10:00',
  numProcessoSIGED: '22222',
  prazoTotal: '3',   
  diasRestantes: '1',
  statusPrazo: 'Normal'},    

  { numProcedimento: '00004',
  dataProcesso: '20/07/2022',
  dataRecebimento: '21/07/2022',
  horaRecebimento: '10:00',
  numProcessoSIGED: '33333',
  prazoTotal: '3',   
  diasRestantes: '1',
  statusPrazo: 'Expirado'},    
];