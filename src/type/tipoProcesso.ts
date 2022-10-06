export type TipoProcesso = {
  texto: string;
  value: number;
};

export const TipoProcessoSeeder: Array<TipoProcesso> = [
  { texto: "Administrativo", value: 1 },
  { texto: "Extra-Judicial", value: 2 },
  { texto: "Judicial", value: 3 },
  { texto: "Órgãos de Controle", value: 4 },
];