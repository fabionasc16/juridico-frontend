const formatarDataBrMixin = {
    methods: {
      formatarDataBr(databr: string): string {
        let data = new Date(databr);
        return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
      },
    },
  };
  
  export default formatarDataBrMixin;
  