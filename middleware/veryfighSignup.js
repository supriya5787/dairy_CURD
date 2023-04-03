const usermodel=require('../model/user');

exports.CheckDuplicate=(req,res,next)=>{
    usermodel.findOne({
        email:req.body.email
    }).exec((err,email)=>{
        if (err) {
            console.log(err);
            return
        }
        if (email) {
            req.flash('message2',"Email Already Exisist");
           return res.redirect('/')
        }
        next()
    })
}