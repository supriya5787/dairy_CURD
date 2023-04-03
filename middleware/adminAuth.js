const jwt=require('jsonwebtoken');

exports.authjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken,"supriya12345@678",(err,data)=>{
            req.admin=data
            next();
        })
    } else {
        next();
    }
}