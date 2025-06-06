module.exports.isAdmin = (req,res,next)=>{
    if(req.user.isAdmin)next()
    else res.redirect('/shop');
}