let User;
User = require('./model/User');
let Role;
Role = require('./model/Role');
let bcrypt;
bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
class AuthController {
    async registration(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "error when reg"}, errors)
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "User exist"})
            }
            const hashPassword = bcrypt.hashSync(password, 4);
            const userRole = await Role.findOne({value: "USER"});
            const user =  User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: "User added"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try{

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async getUser(req, res){
        try {
            // отдельный эндпоинт
            const userRole = new Role();
            const adminRole = new Role({value: "ADMIN"});
            await userRole.save();
            await adminRole.save();
            // for test
            res.json("server working");
        } catch (e) {

        }
    }
}
module.exports = new AuthController();