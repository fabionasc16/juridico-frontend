export type Caracteristica = {
    categoria: string,
    label: string,
    tipos: Array<string>
}

export const CaracteristicaSeeder:Array<Caracteristica> = [
    {
        categoria: 'Nº Processo',
        label: 'nProcesso',
        tipos:[
            '01.02.017305.001635/2021-23',
            '01.02.017305.001703/2021-54',
            '01.02.017305.001670/2021-42',
            '01.02.017305.001614/2021-08',
            '01.02.017305.001713/2021-90',
            '01.02.017305.001636/2021-78',
            '01.02.017305.001670/2021-42',
            '01.02.017305.001705/2021-43'
        ]
    },
    {
        categoria: 'Tipo do Processo',
        label: 'tipoProcesso',
        tipos:[
            'Administrativo',
            'Extra-Judicial',
            'Judicial',
            'Órgãos de Controle',
        ]
    },
    {
        categoria: 'Órgão Demandante',
        label: "orgaoDemandante",
        tipos:[
            'Ministério',
            'Tribunal de Contas'
        ]
    },
    {
        categoria: 'Assunto',
        label: "assunto",
        tipos:[
            'Assunto 1',
            'Assunto 2',
            'Assunto 3',
            'Assunto 4',
            'Assunto 5'
        ]
    },
    {
        categoria: 'Classificação',
        label: "classificacao",
        tipos:[
            'Classificação 1',
            'Classificação 2',
            'Classificação 3',
            'Classificação 4',
            'Classificação 5'
        ]
    },
    {
        categoria: 'Caixa SIGED',
        label: "caixaSIGED",
        tipos:[
            'GERFIN - GERÊNCIA DE FINANÇAS E LIQUIDAÇÃO DE CONTAS',
            'CRH - COORDENADORIA DE RECURSOS HUMANOS',
            'GERFIN - GERÊNCIA DE FINANÇAS E LIQUIDAÇÃO DE CONTAS',
            'ASSJUR - ASSESSORIA JURÍDICA',
            'ARQGERCONV - ARQUIVO DA GERÊNCIA DE CONTRATOS E CONVÊNIOS'
        ]
    }
]