
class User{

    init(conexao){
        this.conexao = conexao;
        this.criarUser();
    }

    criarUser(){
        
        const sql = 'CREATE TABLE IF NOT EXISTS User' +
        '(id int NOT NULL AUTO_INCREMENT,email varchar(100) NOT NULL,'+
        'name varchar(30) NOT NULL,lastname varchar(30) NOT NULL,'+
        'password varchar(100) NOT NULL,'+
        'admin boolean NOT NULL,PRIMARY KEY(id))'

        this.conexao.query(sql,(erro) => {
            if(erro){
                console.log(erro)
            }else{
                console.log("tables created!")
            }
        })
    }


}

module.exports = new User