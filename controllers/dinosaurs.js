// import express
const express = require('express')
// create an express router
const router = express.Router()
// mount routes on the router
const fs = require('fs')
// NEW DINO FORM ROUTE 
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})
// INDEX ROUTE
router.get('/', (req,res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    console.log(dinoData)
    if(nameFilter) {
        dinoData=dinoData.filter(dino=> dino.name.toLowerCase()===nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })

})

// POST A NEW DINO ROUTE 
router.post('/', (req,res) => {
    // console.log(req.body)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)
    console.log(dinoData)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData) )
    res.redirect('/dinosaurs')


})
// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino @ :id
router.get('/edit/:id', (req, res) => {
    // get the dino data, render edit form 
    // action to our put rout 
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    
    let dinoIndex= req.params.id
    res.render('dinosaurs/edit', {
        dino: dinoData[dinoIndex],
        dinoID: dinoIndex
    })
})

// PUT /dinosaurs/:id -- update a dino @ :id in the database 
router.put('/:id', (req, res) =>{
    // get the dinos from the dino json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.params.id, req.body)
    let dinoIndex= req.params.id
    // update the dino based on the index and the req.body
    dinoData[dinoIndex].name = req.body.name
    //req.params = which dino
    // req.body = dino data to update
    dinoData[dinoIndex].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData) )
    
    // redirect to some place that has interesting data 
    res.redirect('/dinosaurs')

})
// DELETE /dinosaurs/:id -- DESTROY a dino @ :id 
router.delete('/:id', (req,res) =>{
    // get the dinos from the dino json 
    let dinoIndex = req.params.id
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    // splice dino out of the array from req.params.id
    dinoData.splice(dinoIndex, 1)
    // save the dino json
    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData) )
    
    // redirect to some place that has interesting data 
    res.redirect('/dinosaurs')
})

// SHOW ROUTE (a specific dinosaur)
router.get('/:id', (req, res)=>{
    let dinoIndex = req.params.id
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // need to parse the json data to strings 
    let dinoData = JSON.parse(dinosaurs)
    let dino = dinoData[dinoIndex]
    console.log(req.query)
    res.render('dinosaurs/show', {
        dino: dino
    })
   
})



module.exports = router