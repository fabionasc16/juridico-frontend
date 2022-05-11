export type Caracteristica = {
    categoria: string,
    label: string,
    tipos: Array<string>
}

export const CaracteristicaSeeder:Array<Caracteristica> = [
    {
        categoria: 'Raça/etnia',
        label: 'raca',
        tipos:[
            'Amarela (asiática)',
            'Branca',
            'Indígena',
            'Negra',
            'Parda',
        ]
    },
    {
        categoria: 'Biotipo',
        label: 'biotipo',
        tipos:[
            'Magro',
            'Sobrepeso',
            'Troncudo'
        ]
    },
    {
        categoria: 'Cor dos olhos',
        label: 'corOlhos',
        tipos:[
            'Castanhos claros',
            'Castanhos escuros',
            'Azuis',
            'Verdes',
            'Pretos',
            'Cinzentos',
            'Desiguais na cor (heterocromia)'
        ]
    },
    {
        categoria: 'Cor do cabelo',
        label: "corCabelo",
        tipos:[
            'Pretos',
            'Castanhos escuros',
            'Castanhos claros',
            'Loiro claro',
            'Loiro escuro',
            'Ruivo',
            'Grisalhos parcial',
            'Grisalhos total',
            'Calvo parcial',
            'Calvo total',
            'Tingido',
        ]
    },
    {
        categoria: 'Tipo de cabelo',
        label: "tipoCabelo",
        tipos:[
            'Liso',
            'Ondulado',
            'Cacheado',
            'Raspado',
            'Calvo'
        ]
    },
    {
        categoria: 'Corte de cabelo',
        label: "corteCabelo",
        tipos:[
            'Raspado/careca',
            'Curto',
            'Médio',
            'Longo'
        ]
    }
]