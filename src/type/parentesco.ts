export type GrauParentesco = {
    texto: string,
    value: string
}

export const GrauParentescoSeeder:Array<GrauParentesco> = [
            { texto: '-- Selecione --', value: "null"  },
            { texto: 'Mãe', value: 'Mãe' },
            { texto: 'Pai', value: 'Pai' },
            { texto: 'Avô(ó)', value: 'Avô(ó)' },
            { texto: 'Filho(a)', value: 'Filo(a)' },
            { texto: 'Neto(a)', value: 'Neto(a)' },
            { texto: 'Neto(a)', value: 'Neto(a)' },
            { texto: 'Tio(a)', value: 'Tio(a)' },
            { texto: 'Primo(a)', value: 'Primo(a)' },
            { texto: 'Irmão(ã)', value: 'Irmão(ã)' },
            { texto: 'Sobrinho(a)', value: 'Sobrinho(a)' },
            { texto: 'Companheiro(a)', value: 'Companheiro(a)' },
            { texto: 'Conjuge', value: 'Conjuge' },
            { texto: 'Nenhum', value: 'Nenhum' }
]