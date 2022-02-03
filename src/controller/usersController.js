const controlUser = require('../models/usersModel')
const { verifyJWT } = require('../auth');
module.exports = app =>{

    app.get('/users',verifyJWT,(req,res,next) => {
        controlUser.listUser(res)
    })

    app.get('/users/:id',verifyJWT,(req,res) =>{
        const id = req.params.id;
        controlUser.user(id,res)
    })

    app.post('/users/signup',verifyJWT,(req,res,next) => {
        const data = req.body;
        controlUser.createUser(data,res)
    })

    app.put('/users/update',verifyJWT,(req,res) => {
        const data = req.body;
        controlUser.updateUser(data,res);
    })

    app.delete("/users/delete/:id",verifyJWT,(req,res,next) => {
        const id = req.params.id;
        controlUser.deleteUser(id,res)
    })

}