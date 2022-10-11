export type TableOrgao = { 
  id_orgao: number;
  orgao_demandante: string;
  sigla_orgao: string;
  esfera_orgao: string;
  orgao_controle: string;
  orgao_justica: string;
};

export const FieldsTableOrgao = 
    [   //NOMES DAS COLUNAS
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'orgao_demandante',
          label: 'Órgão Demandante',
          sortable: true
        },
        {
          key: 'esfera_orgao',
          label: 'Esfera',
          sortable: true
        },
      ];
