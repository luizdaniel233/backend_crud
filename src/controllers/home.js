module.exports = app => {

    app.get("/",(req,res) => {

        var remoteIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                 req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                 req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                 req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão
        
        console.log(remoteIp)

        return res.status(200).send("Ola!")
        
    })

}