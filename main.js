
const form = document.querySelector('form');
const length = document.querySelector('#length');
const lowerCase = document.querySelector('#lower-case');
const upperCase = document.querySelector('#upper-case');
const numeric = document.querySelector('#numeric');
const special = document.querySelector('#special-char');
const pwDiv  = document.querySelector('#pw');
const indicator = document.querySelector('.range-indicator');
const message = document.querySelector('#message');
// Set initial range value
indicator.textContent = length.value;

// Lower case string
const lowString =  'abcdefghijklmnopqrstuvwxyz';

// Default characters
const characters = {
    lowerCase: lowString,
    upperCase:  lowString.toUpperCase(),
    numeric: '123456789',
    special: '!@#$%^&*()+~`-=/<>'
}
// Function to return object of selected characters
function filterCharacters (values) {
    const filteredKeys = Object.keys(values).filter((key) => values[key]);
    if(filteredKeys.length === 0) {
        alert('You must select at least one character type');
        return false;
    }
    const selectedChars = {};
    filteredKeys.forEach(key => {
        selectedChars[key] = characters[key];
    })
   return selectedChars;
}
//Function to generate PW
function generatePW (length, selected) {
    let newPW = '';
    for (let i = 0; i < length; i++) {
        // Grab random key of charset object based on those selected
        const selSelected = Math.floor((Math.random() * Object.entries(selected).length));
        // Get the key of the charset
        const selectedKey = Object.keys(selected)[selSelected];
        // Get the charset
        const string = selected[selectedKey];
        // Get random num to grab from charset
        const randChar =  Math.floor((Math.random() * string.length));
        // Append that letter to the new pw
        newPW += string.charAt(randChar);
    }
    // Update the pw div
    pwDiv.textContent = newPW;
    // Let them know to copy it
    message.textContent= "Click to Copy"
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const options = {
            lowerCase: lowerCase.checked,
            upperCase: upperCase.checked,
            numeric: numeric.checked,
            special: special.checked,
    }
    // get the filtered characters
    const filterChars = filterCharacters(options);
    if(filterChars) {
        // now generate the pw
        generatePW(parseInt(length.value), filterChars);
    }

});

// Update output on range change
if(length) {
    length.addEventListener('input', () => {
        indicator.textContent = length.value;
    });
}

// Copy the PW to the clipboard
if(pwDiv) {
    pwDiv.addEventListener('click', function () {
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(pwDiv.textContent);
        message.innerHTML = 'PW Copied to Clipboard';
        setTimeout(() => {
            message.innerHTML = '';
        }, 3000)
    });
}


