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
            const msg = `${body.daily.data[0].summary}\r\nIt is currently ${body.currently.temperature} degrees out.\r\nThe highest temperature today is ${body.daily.data[0].temperatureHigh} and lowest temperature is ${body.daily.data[0].temperatureLow}. There are ${body.currently.precipProbability} % chances of raining.`
            callback(undefined, msg)
        }
    })
}

module.exports = forecast;