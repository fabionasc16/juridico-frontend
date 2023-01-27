export type Genero = {
  texto: string;
  value: string;
};

export const GeneroSeeder: Array<Genero> = [
  { value: "", texto: "Selecione" },
  { value: "masculino", texto: "Masculino" },
  { value: "feminino", texto: "Feminino" },
  { value: "autointitulado", texto: "Autointitulado" },
];
