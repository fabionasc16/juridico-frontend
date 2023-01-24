export type TableLogProcesso = { 
    isActive: boolean,
    date: string,
    module: string,
    transaction: string,  
    user: string,  
};

export const FieldsTableLog = 
    [   //NOMES DAS COLUNAS
        {
            key: 'date',
            label: 'Data',
            sortable: true,
        },
        {
            key: 'module',
            label: 'Módulo',
            sortable: true
        },
        {
            key: 'transaction',
            label: 'Ação',
            sortable: true,
        },
        {
            key: 'user',
            label: 'Usuário',
            sortable: true,
        },

      ];