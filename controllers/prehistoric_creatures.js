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