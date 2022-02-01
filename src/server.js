const expressConfig = require('../src/config/expressConfig')
const db = require('../src/database/db')
const userTable = require('../src/database/tables/user')

const port = 3001
const app = expressConfig()


db.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log("Database connected!")
        userTable.init(db)
        app.listen(port,() => console.log(`Port ${port} available!`))
    }
})


