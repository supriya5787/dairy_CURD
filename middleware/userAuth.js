const jwt=require('jsonwebtoken');

exports.authjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,"supriya12345@678",(err,data)=>{
            req.user=data
            next();
        })
    } else {
        next();
    }
}