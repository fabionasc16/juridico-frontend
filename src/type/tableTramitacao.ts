export type TableTramitacao = { 
        isActive: boolean,
        caixaSIGED: string,
        eventoTramitacao: string,
        entradaSetor: string,  
        permanencia: string,  
};

export const FieldsTableTramitacao = 
    [   //NOMES DAS COLUNAS
        {
            key: 'entrada_no_setor',
            label: 'Data Entrada',
            sortable: true,       
        },
        {
            key: 'setor_tramitacao',
            label: 'Setor Tramitação',
            sortable: true
        },
        {
            key: 'dias_no_setor',
            label: 'Dias no Setor',
            sortable: true,
        },
        {
            key: 'evento_tramitado',
            label: 'Evento',
            sortable: true,
        },
      ];

/*
export const TableTramitacaoSeeder: Array<TableTramitacao> = [ 
  { isActive: true, caixaSIGED: 'JURÍDICO', eventoTramitacao: 'Para Assinatura', entradaSetor: '03/06/2022', permanencia: '0' },
  { isActive: true, caixaSIGED: 'CONTRATOS', eventoTramitacao: 'Aguardar Pagamento', entradaSetor: '01/06/2022', permanencia: '2' },
  { isActive: true, caixaSIGED: 'COMPRAS', eventoTramitacao: 'Tramitando', entradaSetor: '28/05/2022', permanencia: '4' },
  { isActive: true, caixaSIGED: 'DETIN', eventoTramitacao: 'Conhecimento e Providências', entradaSetor: '26/05/2022', permanencia: '2' },
  { isActive: true, caixaSIGED: 'RECURSOS HUMANOS', eventoTramitacao: 'Validar Registro', entradaSetor: '20/05/2022', permanencia: '6' },
  { isActive: true, caixaSIGED: 'DIREÇÃO', eventoTramitacao: 'Conhecimento e Providências', entradaSetor: '16/05/2022', permanencia: '4' },
  { isActive: true, caixaSIGED: 'JURÍDICO', eventoTramitacao: 'Para Assinatura Digital', entradaSetor: '16/05/2022', permanencia: '0' },
  { isActive: true, caixaSIGED: 'PROTOCOLO', eventoTramitacao: 'Tramitando', entradaSetor: '15/05/2022', permanencia: '1' },
];
*/