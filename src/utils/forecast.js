const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4e5e0219e275b0046841cadd5d7b5adb/' + longitude + ',' + latitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined)
        }
        else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There are ${body.currently.precipProbability} % chances of raining.`)
        }
    })
}

module.exports = forecast;