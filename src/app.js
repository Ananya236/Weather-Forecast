const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

//specifying paths for express configuration
const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static diretory to serve our browser
app.use(express.static(publicDirPath))

//render our hbs views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ananya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ananya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'This is help page.',
        title: 'Help',
        name: 'Ananya'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.address
    if(!address){
        return res.send({
            error:"Please provide an address"
        })
    }
    geocode(address,(error,data)=>{
        if(error){
            res.send({
                error
            })
        }
        else{
            const {longitude,latitude,location} = data
            forecast(longitude,latitude,(error,weather)=>{
                if(error){
                    res.send({
                        error
                    });
                }
                else{
                    res.send({
                        location,
                        forecast:weather
                    })
                }
            })
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        msg:'help article not found',
        title: '404 HELP ERROR',
        name: 'Ananya'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        msg:'page not found.',
        title: '404 ERROR',
        name: 'Ananya'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})