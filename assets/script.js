const container = document.querySelector('main');
const numInput = document.querySelector('#num');
const initialsInput = document.querySelector('#initials');
const sendBtn = document.querySelector('#send');
const infoOutput = document.querySelector('ul');
const resetBtn = document.querySelector('#reset');

let input = [];

function storeValues(){
    localStorage.setItem("userInput", JSON.stringify(input));
}
//sends globally scoped array to localStorage

function displayValues(){
    infoOutput.innerHTML = '';
    for (let i = 0; i < input.length; i++){    
        let inputElement = input[i];
        let li = document.createElement('li');
        li.textContent = inputElement.initials + ' entered ' + inputElement.number;
        li.setAttribute('data-index', i);
        infoOutput.appendChild(li);
    }
}
//clears ul, creates a new list item for all objects in globally scoped array, gives them text content through string interpolation with object.key pairs, assigns them data-indeces, and appends them to the ul

sendBtn.addEventListener("click", function(event){
    event.preventDefault();
    let userInput = {
        number: numInput.value,
        initials: initialsInput.value
    }
    if ((numInput.value === '') || (initialsInput.value === '')){
        alert('Please enter a number and you initials');
        return;
    } else {
        input.push(userInput);
    }
    document.querySelector('form').reset();
    storeValues();
    displayValues();
});
//sets event listener function on the send button, creates local object with input, determines if fields are filled in, pushes object to glopbal array, resets form input fields, initiates storage and display functions.

resetBtn.addEventListener('click', function(event){
    event.preventDefault();
    infoOutput.innerHTML = '';
    localStorage.clear();
})

function init() {
    let storedInput = JSON.parse(localStorage.getItem("userInput"));
    if (storedInput !== null) {
        input = storedInput;
    }
    displayValues();
}
//this function is called at the opening/reset of the page: calls the stored user input array from local storage, determines if it has a value, and puts it into the global array, then displays the last saved input values.

init();

