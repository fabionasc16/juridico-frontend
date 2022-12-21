export type EstadoCivil = {
  texto: string;
  value: string;
};

export const EstadoCivilSeeder: Array<EstadoCivil> = [
  { texto: "Solteiro", value: "solteiro" },
  { texto: "União estável", value: "uniao_estavel" },
  { texto: "Casado", value: "casado" },
  { texto: "Separado", value: "separado" },
  { texto: "Divorciado", value: "divorciado" },
  { texto: "Viúvo", value: "viuvo" },
];
