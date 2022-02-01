const db = require('mysql2')
const database = require("./database.json")

const conexao = db.createConnection(database)

module.exports = conexao