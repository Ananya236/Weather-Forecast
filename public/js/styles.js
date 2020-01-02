console.log("client side js file loaded.")

const weatherSearch = document.querySelector('form')
const address = document.querySelector('input')
const location1 = document.querySelector('#location')
const forecast1 = document.querySelector('#forecast')
weatherSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const url = 'http://localhost:3000/weather?address=' + address.value
    location1.textContent = 'loading.....'
    forecast1.textContent = ''

    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                location1.textContent = data.error
            }
            else {
                location1.textContent = data.location
                forecast1.textContent = data.forecast
            }
        })
    })
})