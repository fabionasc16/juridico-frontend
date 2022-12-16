const validarDataMixin = {
    methods: {
      validarData(dateString: string): any {
        if (dateString == "") {
          return false;
        }
  
        //Declare Regex
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var dtArray = dateString.match(rxDatePattern); // is format OK?
  
        if (dtArray == null) return false;
  
        let arrayOfStrings = dateString.split("/");
  
        const dia: any = arrayOfStrings[0];
        const mes: any = arrayOfStrings[1];
        const ano: any = arrayOfStrings[2];
  
        if (mes < 1 || mes > 12) return false;
        else if (dia < 1 || dia > 31) return false;
        else if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31)
          return false;
        else if (mes == 2) {
          var isleap = ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0);
          if (dia > 29 || (dia == 29 && !isleap)) return false;
        }
  
        return true;
      },
  
      stringToDate(dateString: string): any {
        let arrayOfStrings = dateString.split("/");
  
        const dia: any = arrayOfStrings[0];
        const mes: any = arrayOfStrings[1];
        const ano: any = arrayOfStrings[2];
  
        const date = new Date(+ano, mes - 1, +dia);
  
        return date;
      },
    },
  };
  
  export default validarDataMixin;
  