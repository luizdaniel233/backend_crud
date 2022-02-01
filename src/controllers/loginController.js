const login = require('../models/loginModel');
module.exports = app =>{

    app.post("/login",(req,res) => {

        const { email,password } = req.body;
        var remoteIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                 req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                 req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                 req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão

        login.logon(email,password,res,remoteIp)

    })

    app.post("/logout",(req,res) => {
        
        res.status(200).json({auth:false,token:null})
    })



}