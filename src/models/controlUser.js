const db = require('../database/db')
const bcrypt = require('bcrypt')
const validaData = require('../models/validaData')

class controlUser{

    listUsers(res){

        const sql = 'SELECT * FROM User'

        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
                res.status(404).json(erro)
            }else{
                //console.log(resultado)
                res.status(200).json(resultado)
            }
        })

    }

    delete(id,res){

        const sql = `DELETE FROM User WHERE id = ${id}`

        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
            }else{
               console.log(resultado)
               res.send("Deleted")
            }

        })

    }

    async createUser(data,res){
        
        const dadosUser = {
            email: data.email, 
            name: data.name,
            lastname: data.lastname,        
            password: data.password,      
            admin: data.admin
        }
        var  sql = `SELECT * FROM User WHERE email = '${dadosUser.email}'`

        db.query(sql,async (erro,resultado) => {

            if(erro){
                console.log(erro)
            }else{

                if(resultado.length == 0){
                    if ((dadosUser.password === data.confirmpassword) && (validaData.validaSenha(dadosUser.password))){
                        
                        sql =  'INSERT INTO user SET ?'
                        dadosUser.password = await controlUser.gerarSenhaHash(dadosUser.password);

                        db.query(sql,dadosUser,(erro,resultado) => {
                            
                            if(erro){
                                console.log(erro)
                                res.status(422).json(erro)
                            }else{
                                console.log(dadosUser)
                                res.status(201).json(resultado)
                            }
                        })

                    }else{
                        console.log("Password and Confirm password isn't equals,or length isn't 8")
                        res.status(400).json({message:"Password and Confirm password isn't equals,or length isn't 8"})
                    }
                }else{
                    console.log("User already exists!")
                    res.status(400).json({erro:"User already exists!"})
                }
            }
        })
    }

    static gerarSenhaHash(data){
        const custoHash = 12
    
        return bcrypt.hash(data,custoHash)
    }

}

module.exports = new controlUser