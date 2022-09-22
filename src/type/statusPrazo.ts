export type StatusPrazo = {
  texto: string;
  value: string;
};

export const StatusPrazoSeeder: Array<StatusPrazo> = [
  { texto: "Crítico", value: "1" },
  { texto: "Atenção", value: "2" },
  { texto: "Normal", value: "3" },
  { texto: "Expirado", value: "9" },
];