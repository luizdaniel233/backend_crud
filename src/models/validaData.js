
class validaData {

    validaSenha(senha){
        let result = true
        if((senha.length > 7) && (senha.length < 64)){
            result = true
            return result
        }else{
            if(senha.length < 8){
                result = false
                return result
            }
        }
    }

    

}

module.exports = new validaData