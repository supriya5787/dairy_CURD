const User=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

userAuth=(req,res,next)=>{
    if (req.user) {
        console.log(req.user);
        next();
        
    } else {
        console.log(req.user);
        req.flash('message2', "Can NOT access this page.....");
        res.redirect('/login')

    }
}


exports.index=(req,res)=>{
    res.render('index',{
        title:"home page",
        data:req.user
    })
}
exports.about=(req,res)=>{
    res.render('about',{
        title:"about page",
        data:req.user
    })
}
exports.service=(req,res)=>{
    res.render('service',{
        title:"service page",
        data:req.user
    })
}
exports.product=(req,res)=>{
    res.render('product',{
        title:"product page",
        data:req.user
    })
}
exports.contact=(req,res)=>{
    res.render('contact',{
        title:"contact page",
        data:req.user
    })
}
exports.gallery=(req,res)=>{
    res.render('gallery',{
        title:"gallery page",
        data:req.user
    })
}
exports.team=(req,res)=>{
    res.render('team',{
        title:"team page",
        data:req.user
    })
}
exports.feature=(req,res)=>{
    res.render('feature',{
        title:"feature page",
        data:req.user
    })
}
exports.testimonial=(req,res)=>{
    res.render('testimonial',{
        title:"testimonial page",
        data:req.user
    })
}
// exports.last =(req,res)=>{
//     res.render('last',{
//         title:"last page"
//     })
// }
exports.register=(req,res)=>{
    res.render('register',{
        message2: req.flash('message'),
        message:req.flash('message'),
        data:req.user,
        // data:User.find()

    })
}

exports.register_create=(req,res)=>{
    console.log(req.body)
    User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }).save((err,data)=>{
        if (!err) {
            req.flash('message',"User Added")
            res.redirect('/login')
            
        }else{
            console.log(err,"User NOT Added");
        }
    })
}

exports.login=(req,res)=>{
   
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login',{
        message: req.flash('message'),
        message2: req.flash('message2'),
        data1:loginData,
        data:req.user,
    })
}


exports.login_create=(req,res)=>{
    User.findOne({
        email: req.body.email
    }, (err, data) => {
       
        if (data) {
            console.log(data);
            const haspassword = data.password;
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, "supriya12345@678", { expiresIn: '5m' })
                res.cookie("userToken", token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data)
                res.redirect('/')    
            } else {
                req.flash('message2', "Password Incorrect");
                res.redirect('/login')
            }
        } else {
            req.flash('message2', "No User found with thet email");
            res.redirect('/login')
        }
       
    })
}

 

exports.logout=(req,res)=>{
    res.clearCookie("userToken");
    res.redirect('/login')
}


// module.exports={
//  register,
//  register_create,
//  login,
//  //login_create,
//  logout,


// }
