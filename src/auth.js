const jwt = require('jsonwebtoken');

class verify{ 
    
    verifyJWT(req, res, next){
        
        var remoteIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão
        
        const token = req.headers['authorization'];

        if (!token) {
            const output = { "ip": remoteIp,auth: false, message: 'No token provided.' }
            console.log(output)
            return res.status(401).json(output);
        }
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        
            if (err){
                const output = { "ip": remoteIp,auth: false, message: 'Failed to authenticate token.' }
                console.log(output)
                return res.status(500).json(output);
            } 
            
            // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        console.log("Token Válido!")
        next();

        });
    }

    verifyPassword(senha){
        let result = true;

        if((senha.length > 7) && (senha.length < 64)){
            result = true;
            return result;
        }else{
            if(senha.length < 8){
                result = false;
                return result;
            }
        }
    }
}

module.exports = new verify