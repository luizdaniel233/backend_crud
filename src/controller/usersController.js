const controlUser = require('../models/usersModel')
const { verifyJWT } = require('../auth');
const { io } = require('../config/expressConfig');
module.exports = (app,io) =>{

    app.get('/users',async (req,res,next) => {
        await controlUser.listUser(res)
    })

    app.get('/users/:id',verifyJWT,(req,res) =>{
        const id = req.params.id;
        controlUser.user(id,res)
    })

    app.post('/users/signup',verifyJWT,async (req,res,next) => {
        const data = req.body;
        await controlUser.createUser(data,res,io)
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