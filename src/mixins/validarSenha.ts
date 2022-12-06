const validarSenhaMixin = {
    methods: {
      validarSenha(senha: string, confirmarSenha:string): string {
        if (senha !== confirmarSenha) {
          return "As senhas não conferem!Tente novamente";
        }

        if(senha.length < 8){
            return "A senha deve conter no nínimo 8 caracteres";
        }
  
        var letrasMaiusculas = /[A-Z]/;
        var letrasMinusculas = /[a-z]/;        
        var numeros = /[0-9]/;       
        var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
        var auxMaiuscula = 0;
        var auxMinuscula = 0;       
        var auxNumero = 0;       
        var auxEspecial = 0;

        for(var i=0; i<senha.length; i++){
            if(letrasMaiusculas.test(senha[i]))           
                auxMaiuscula++;           
            else if(letrasMinusculas.test(senha[i]))           
                auxMinuscula++;           
            else if(numeros.test(senha[i]))           
                auxNumero++;           
            else if(caracteresEspeciais.test(senha[i]))           
                auxEspecial++;           
        }

        if (auxMaiuscula > 0){
            if (auxMinuscula > 0){
                if (auxNumero > 0){
                    if (auxEspecial) {
                        return "OK"           
                    }else{
                        return "A senha deve conter pelo menos um caracter especial"
                    }
                }else{
                    return "A senha deve conter pelo menos um número"
                }
            }else{
                return "A senha deve conter pelo menos uma letra minúscula"
            }
        }else{
            return "A senha deve conter pelo menos uma letra maiúscula"
        }

      },
    },
  };
  
  export default validarSenhaMixin;
  