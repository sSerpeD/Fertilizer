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
    res.render('input.ejs')
})

router.get('/show', (req, res) => {
    const { pH, oM, available_P: P, ex_K: K, check, ...otherParams } = req.query;
    res.render('show.ejs', { pH, oM, P, K, check, ...otherParams });
});
  

module.exports = router