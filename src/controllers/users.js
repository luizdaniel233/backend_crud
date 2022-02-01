const controlUser = require('../models/controlUser')
const { verifyJWT } = require('../auth');
module.exports = app =>{

    app.get('/users',verifyJWT,(req,res,next) => {
        controlUser.listUsers(res)
    })

    app.delete("/users/delete/:id",verifyJWT,(req,res,next) => {
        const id = req.params.id;
        controlUser.delete(id,res)
    })

    app.post('/signup',verifyJWT, (req,res,next) => {
        const data = req.body;
        controlUser.createUser(data,res)
    })

}