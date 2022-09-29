export type Processo = {
    idProcesso: string,
    numProcedimento: string,
    idTipoProcesso: string,
    prazoTotal: string,
    idOrgaoDemandante: string,
    dataProcesso: string,
    dataRecebimento: string,
    horaRecebimento: string,
    idAssunto: string,
    idClassificacao: string,
    objeto: string,
    requerSIGED: boolean,
    numProcessoSIGED: string,
    dataProcessoSIGED: string,
    permanenciaSIGED: string,
    caixaAtualSIGED: string,
    tramitacaoSIGED: string,
    idResponsavel: string,
    descricao: string,
    dataLimitePrazo: string,
    diasPercorridos: string,
    diasExpirados: string,
    statusPrazo: string,
    statusProcesso: string, 
    sigiloso: boolean,
    observacao: string,   
    valorMulta?: string,
    reiteracao?: string,
    dataArquivamento?: string,
};
