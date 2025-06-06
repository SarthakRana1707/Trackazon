const Users = require("../model/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getLogin = (req,res)=>{
    if(req.user){
        return res.redirect('/profile');
    }
    res.render('login',{
        msg: req.flash('msg')
    });
}

// module.exports.postLogin = async (req,res, next)=>{
    
// }