const express = require('express');
const route=express.Router();
const homecontroller = require('../controller/homecontroller')
const verify=require('../middleware/veryfighSignup')

route.get('/',homecontroller.index);
route.get('/about',homecontroller.about);
route.get('/service',homecontroller.service);
route.get('/product',homecontroller.product);
route.get('/contact',homecontroller.contact);
route.get('/gallery',homecontroller.gallery);
route.get('/feature',homecontroller.feature);
route.get('/testimonial',homecontroller.testimonial);
route.get('/team',homecontroller.team);
//route.get('/last',homecontroller.last);
route.get('/register',homecontroller.register)
route.post('/registercreate',[verify.CheckDuplicate],homecontroller.register_create)
route.get('/login',homecontroller.login)
route.post('/login_creat',homecontroller.login_create)
route.get('/logout',homecontroller.logout)


module.exports=route
