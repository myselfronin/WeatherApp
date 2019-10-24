const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8e45162e30d7da705487eedf7ef3d207/' + latitude + ',' + longitude +'?units=us';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +'It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
};

module.exports = forecast;