// import
const express = require('express') 
const ejsLayouts = require('express-ejs-layouts')
const req = require('express/lib/request')
const fs = require('fs')
const methodOverride = require('method-override')

const PORT = 4000
// create instance of express 
const app = express()

// tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs');

// middleware
app.use(ejsLayouts)
// body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non get/post methods from an html5 form 
app.use(methodOverride('_method'))

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// HOME ROUTE
app.get('/', (req, res) => {
    res.render('home')
})







app.listen(PORT, () => {
    console.log(`Cruddy Dinos ${PORT} up and running (FOR NOW 🦖🦕☄️)`)
})