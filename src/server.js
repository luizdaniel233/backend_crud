const { serverHttp } = require('../src/config/expressConfig')
const db = require('../src/database/db')
const userTable = require('../src/database/tables/user')
const port = 3001

db.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log("Database connected!")
        userTable.init(db)
        serverHttp.listen(port,() => console.log(`Port ${port} available!`))
    }
})


