console.log('Client-side javascript is loaded');

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit',(event) => {
        event.preventDefault();
        const location = document.querySelector('input').value
        const messageOne = document.querySelector('#message-1');
        const messageTwo = document.querySelector('#message-2');

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';

        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                   messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
    })
});

