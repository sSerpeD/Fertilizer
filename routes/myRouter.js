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

router.get('/inputCassava',(req,res)=>{
    const type = req.query.type;
    res.render('inputCassava.ejs', {type:type})
})

router.get('/inputCorn',(req,res)=>{
    const type = req.query.type;
    res.render('inputCorn.ejs', {type:type})
})

router.get('/inputSugarcane',(req,res)=>{
    res.render('inputSugarcane.ejs')
})

router.get('/showSugarcane', (req, res) => {
    const { pH, oM, available_P: P, ex_K: K, check,...otherParams } = req.query;
    res.render('showSugarcane.ejs', { pH, oM, P, K, check, ...otherParams });
});

router.get('/showCorn', (req, res) => {
    const { pH, oM, available_P: P, ex_K: K, ...otherParams } = req.query;
    res.render('showCorn.ejs', { pH, oM, P, K, check, ...otherParams });
});

router.get('/showCassava', (req, res) => {
    const { pH, oM, available_P: P, ex_K: K, ...otherParams } = req.query;
    res.render('showCassava.ejs', { pH, oM, P, K, ...otherParams });
});
  

module.exports = router