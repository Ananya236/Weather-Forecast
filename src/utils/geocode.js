const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5hbnlhLTIzIiwiYSI6ImNrNG81NzhtdTA0Z3Uzcm51bDd6eDJlb3MifQ.GVkjSzOq2P8350Rum-l-3A&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geocoding services.", undefined)
        }
        else if (body.message || body.features.length === 0) {
            callback("Unable to find location.", undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;