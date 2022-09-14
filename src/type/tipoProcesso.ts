export type TipoProcesso = {
  texto: string;
  value: string;
};

export const TipoProcessoSeeder: Array<TipoProcesso> = [
  { texto: "Administrativo", value: "administrativo" },
  { texto: "Extra-Judicial", value: "extraJudicial" },
  { texto: "Judicial", value: "judicial" },
  { texto: "Órgãos de Controle", value: "orgaoControle" },
];