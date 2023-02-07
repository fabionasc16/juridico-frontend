export type StatusProcesso = {
  texto: string;
  value: string;
};

export const StatusProcessoSeeder: Array<StatusProcesso> = [
  { texto: "Recebido", value: "10" },
  { texto: "Distribuído", value: "11" },
  { texto: "Tramitando", value: "12" },
  { texto: "Respondendo", value: "13" },
  { texto: "Arquivado", value: "14" },
];