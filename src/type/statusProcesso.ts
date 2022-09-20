export type StatusProcesso = {
  texto: string;
  value: string;
};

export const StatusProcessoSeeder: Array<StatusProcesso> = [
  { texto: "Cadastrado", value: "1" },
  { texto: "Distribuído", value: "2" },
  { texto: "Tramitando", value: "3" },
  { texto: "Respondendo", value: "4" },
  { texto: "Arquivado", value: "5" },
];