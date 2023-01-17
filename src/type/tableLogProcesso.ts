export type TableLogProcesso = { 
    isActive: boolean,
    caixaSIGED: string,
    eventoTramitacao: string,
    entradaSetor: string,  
    permanencia: string,  
};

export const FieldsTableLog = 
    [   //NOMES DAS COLUNAS
        {
            key: 'entrada_no_setor',
            label: 'Data',
            sortable: true,
        },
        {
            key: 'evento_tramitado',
            label: 'Hora',
            sortable: true
        },
        {
            key: 'dias_no_setor',
            label: 'Ação',
            sortable: true,
        },
        {
            key: 'setor_tramitacao',
            label: 'Usuário',
            sortable: true,
        },

      ];