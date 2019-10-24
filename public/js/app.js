console.log('Client-side javascript is loaded');

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location = search.value
    console.log(location)
})
