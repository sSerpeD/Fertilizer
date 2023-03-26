const express = require('express')
const path = require('path')
const router = express.Router()

const refCassavaPage = path.join(__dirname,"../public/ref/cassava.html")
const refSugarcanePage = path.join(__dirname,"../public/ref/sugarcane.html")
const refCornPage = path.join(__dirname,"../public/ref/corn.html")

router.get("/cassava",(req,res)=>{
    res.render('cassava.ejs')
})

router.get('/sugarcane',(req,res)=>{
    res.render('sugarcane.ejs')
})

router.get("/corn",(req,res)=>{
    res.render('corn.ejs')
})

router.get("/corn/ref",(req,res)=>{
    res.sendFile(refCornPage)
})

router.get("/cassava/ref",(req,res)=>{
    res.sendFile(refCassavaPage)
})

router.get("/sugarcane/ref",(req,res)=>{
    res.sendFile(refSugarcanePage)
})

router.get('/',(req,res)=>{
    res.render('index.ejs')
})

router.get("/dirt",(req,res)=>{
    res.render('dirt.ejs')
})

router.get('/calc',(req,res)=>{
    res.render('calc.ejs')
})

router.get('/show',(req,res)=>{
    const pH = req.query.pH
    const oM = req.query.oM
    const P = req.query.available_P
    const K = req.query.ex_K
    const nn = req.query.nn
    const np = req.query.np
    const nk = req.query.nk
    const pn = req.query.pn
    const pp = req.query.pp
    const pk = req.query.pk
    const kn = req.query.kn
    const kp = req.query.kp
    const kk = req.query.kk
    const rai = req.query.rai
    const ngan = req.query.ngan
    const squareWa = req.query.squareWa
    const price1 = req.query.price1
    const price2 = req.query.price2
    const price3 = req.query.price3
    res.render('show.ejs',{pH:pH,oM:oM,P:P,K:K,nn:nn,np:np,nk:nk,pn:pn,pp:pp,pk:pk,kn:kn,kp:kp,kk:kk,rai:rai,ngan:ngan,squareWa:squareWa,price1:price1,price2:price2,price3:price3})
})

module.exports = router