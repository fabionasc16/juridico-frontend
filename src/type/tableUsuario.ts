export const FieldsTableUsuario = 
    [   //NOMES DAS COLUNAS
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'user_name',
          label: 'Nome Completo',
          sortable: true
        },
        {
          key: 'user_cpf',
          label: 'CPF',
          sortable: true
        },  
        {
          key: 'profiles[0].profile_name',
          label: 'Perfil',
          sortable: true
        },        
        {
          key: 'user_status',
          label: 'Status',
          sortable: true,
          formatter: value => (value == 1 ? 'Ativo' : 'Inativo')
        },
             
];