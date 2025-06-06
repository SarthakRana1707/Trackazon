const Users = require("../model/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.postSignup = async (req,res,next)=>{
    const {email, password} = req.body;
    try{
        let user = await Users.findOne({
            email
        }).exec();
        if(!user){
            try{
                bcrypt.hash(password, saltRounds).then(async function(hash) {
                    user = await Users.create({ email, password: hash, isAdmin: false });
                });
            req.flash('msg','Signup Successful');
            return res.redirect('/login');
            }
            catch(err){
                next(err);
            }
        }
        else{
            req.flash('msg','User already exists, try another username');
            return res.redirect('/signup');
        }
    }
    catch(err){
        next(err);
    }
}

module.exports.getSignup = (req,res)=>{
    res.render('signup',{
        msg: req.flash('msg')
    });
}