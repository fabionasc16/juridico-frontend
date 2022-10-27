const prazoMixin = {
  methods: {   

    statusPrazo(prazo: number): any {

      if(prazo < 0) {
        return 9 
      }

      if(prazo >= 0 && prazo <= 3) {
        return 1
      }

      if(prazo >= 4 && prazo <= 5 ) {
        return 2
      }

      if(prazo >= 6) {
        return 3
      }

      return ""
      
    },  

    
  },
};

export default prazoMixin;