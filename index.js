const express=require('express');
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const cookieparser=require('cookie-parser');
const userauth=require('./middleware/userAuth')
const adminauth=require('./middleware/adminAuth')
const adminroute=require('./route/adminroute')

const app=express();
app.use(express.urlencoded({extended:true}));

app.use(flash());

app.use(cookieparser());

app.use(session({
    cookie:{maxAge:50000},
    secret:'supriya12345@678',
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs');
app.set('views','views')
app.use(userauth.authjwt)
app.use(adminauth.authjwt)

app.use(express.static(path.join(__dirname,'public')))


const homeroute = require('./route/homeroute')
app.use(homeroute)
app.use('/admin',adminroute)

const port=2000
const DBcon="mongodb+srv://supriya:yug5AgRkOqdsAqyO@cluster0.jky13qm.mongodb.net/dairy_CURD";
mongoose.connect(DBcon,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(re=>{
    app.listen(port,()=>{
        console.log("DB Connected.......");
        console.log(`server running http://localhost:${port}`);
    })
}).catch(err=>{
    console.log(err);
})