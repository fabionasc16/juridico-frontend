export type StatusPrazo = {
  texto: string;
  value: string;
};

export const StatusPrazoSeeder: Array<StatusPrazo> = [
  { texto: "Dentro do Prazo", value: "1" },
  { texto: "Próximo a expirar", value: "2" },
  { texto: "A expirar", value: "3" },
  { texto: "Expirado", value: "4" },
];