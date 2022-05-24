// import express
const express = require('express')
// create an express router
const fs = require('fs')
const router = express.Router()
// mount routes on the router



router.get('/', (req, res) => {
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let preCreaturesData = JSON.parse(preCreatures)
    let nameFilter = req.query.nameFilter
    console.log(req.query)
    if(nameFilter) {
        preCreaturesData=preCreaturesData.filter(animal=> animal.type.toLowerCase()===nameFilter.toLowerCase())
    }
    res.render('prehistoric_creatures/index.ejs', {
        myPreCreatures: preCreaturesData
    }) 
})
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino @ :id
router.get('/edit/:id', (req, res) => {
    // get the dino data, render edit form 
    // action to our put rout 
    let animals = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let animalData = JSON.parse(animals)
    
    let animalIndex= req.params.id
    res.render('prehistoric_creatures/edit', {
        animal: animalData[animalIndex],
        animalID: animalIndex
    })
})

// PUT /dinosaurs/:id -- update a dino @ :id in the database 
router.put('/:id', (req, res) =>{
    // get the dinos from the dino json
    let animals = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let animalData = JSON.parse(animals)
    let animalIndex= req.params.id
    // update the dino based on the index and the req.body
    animalData[animalIndex].type = req.body.type
    //req.params = which dino
    // req.body = dino data to update
    animalData[animalIndex].img_url = req.body.img_url

    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(animalData) )
    
    // redirect to some place that has interesting data 
    res.redirect('/prehistoric_creatures')

})
// DELETE /dinosaurs/:id -- DESTROY a dino @ :id 
router.delete('/:id', (req,res) =>{
    // get the dinos from the dino json 
    let animalIndex = req.params.id
    let animals = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let animalData = JSON.parse(animals)
    // splice dino out of the array from req.params.id
    animalData.splice(animalIndex, 1)
    // save the dino json
    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(animalData) )
    
    // redirect to some place that has interesting data 
    res.redirect('/prehistoric_creatures')
})

router.get('/:id', (req, res)=>{
    let animalIndex = req.params.id
    console.log(`The creature you're searching for is ${animalIndex}`)
    let animals = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let animalsData = JSON.parse(animals)
    let animal = animalsData[animalIndex]
    console.log(req.query)
    res.render('prehistoric_creatures/show', {
        animal: animal, 
    })
   
})

router.post('/', (req,res) => {
    // console.log(req.body)
    let animals = fs.readFileSync('./prehistoric_creatures.json')
    // need to parse the json data to strings 
    let animalData = JSON.parse(animals)
    animalData.push(req.body)
    console.log(animalData)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(animalData) )
    res.redirect('/prehistoric_creatures')
})

module.exports = router