const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rabinson Ghatani'
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Rabinson Ghatani'
    });
});

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Rabinson Ghatani'
    });
});

app.get('/weather',(req, res) => {
    const address = req.query.address;
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: forecastData,
                location,
                address: address    
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404',
       name: 'Rabinson Ghatani',
       errorMessage: 'Help Article Not Found'
    })
});

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rabinson Ghatani',
        errorMessage: 'Page Not Found'
    })
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server is up on port ' + port )
});
