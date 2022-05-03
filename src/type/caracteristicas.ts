export type Caracteristica = {
    categoria: string,
    label: string,
    tipos: Array<string>
}

export const CaracteristicaSeeder:Array<Caracteristica> = [
    {
        categoria: 'Cor dos olhos',
        label: 'corOlhos',
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
        categoria: 'Cor do cabelo',
        label: "corCabelo",
        tipos:[
            'Ruivo', 'Preto', 'Loiro', 'Grizalho', 'Tingido (azul)', 'Tingido (verde)', 'Tingido (ruivo)'
        ]
    }
]