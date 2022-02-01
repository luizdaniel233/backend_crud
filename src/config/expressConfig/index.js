const express = require('express')
const body = require('body-parser')
const consign = require('consign')

module.exports = () =>{

    const app = express()
    
    var cors = require('cors')
    app.use(cors())

    app.use(body.json())
    app.use(body.urlencoded({extended:true}))

    consign()
        .include('./src/controllers')
        .into(app);

    return app
}