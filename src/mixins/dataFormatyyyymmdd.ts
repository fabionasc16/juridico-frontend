const dataFormatEnMixin = {
    methods: {
      dataFormatEn(databr: string): string {
        let day = databr.substring(0, 2);
        let month = databr.substring(3, 5);
        let year = databr.substring(6, 10);
        return year + "-" + month + "-" + day;
      },
    },
  };
  
  export default dataFormatEnMixin;
  