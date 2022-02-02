const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

class Login {

    logon(email,senha,res,remoteIp){
        let result = [] 
        let value = true
        let senhaDB = ''
        
        const sql = `SELECT * FROM User WHERE email = '${email}'`
        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
            }else{
                if(resultado.length == 0){
                    console.log("Email not found!")
                    return res.status(404).json({error:"Email not found!"})
                }else{
                    for(let i = 0;i < resultado.length;i++){
                        //console.log('r:',resultado[i])
                        senhaDB = resultado[i].password
                        value = bcrypt.compareSync(senha, senhaDB)
                        if(value){
                            result = resultado[i]
                            //console.log(resultado[i])
                            break
                        }
                    }

                    if(!value){
                        console.log("Password is wrong!")
                        return res.status(401).json({error:"Password is wrong!"})
                    }else{
                    //token
                        const id = result.id
                        const token = jwt.sign({id},process.env.SECRET,{
                            expiresIn: 500 //FIVE MINUTES
                        })

                        var dataAccess = {
                            "ip":remoteIp,
                            "logado":true,
                            "token":token
                        }
                        var dataUser = {
                            "id":result.id,
                            "admin":result.admin,
                            "email":result.email,
                            "name":result.name,
                            "lastname":result.lastname,
                        }
                        
                        console.log(dataAccess)
                        return res.status(200).json({"user":dataUser,token:token})
                    }
                }
            }
        })
            
        
    }
       

}

module.exports = new Login