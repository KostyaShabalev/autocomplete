
let stateList = { AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming' };
let matchedStateIndex = null;
const currMatchedStates = [];

const KEY_CODES = {
    'ARROW_UP': 38,
    'ARROW_DOWN': 40,
    'ENTER': 13
}

init(); // Main function

function init() {
    initInput(getInput()); // Function finds options for the request in the entry field
    initBtnClear(getBtnClear());
    initKeyboadControls();
}

function getInput() { // Function gets input-node
    return document.getElementsByClassName('input') &&
        document.getElementsByClassName('input')[0];
}

function getBtnClear() {
    return document.getElementsByClassName('btn-clear') &&
        document.getElementsByClassName('btn-clear')[0];
}

function initInput(inputEl) {
    if (!inputEl) { // Input presence check
        throw 'Input required';
    }

    // Add an event on click
    inputEl.addEventListener('input', (evt) => {
        currMatchedStates.splice(0, currMatchedStates.length, ...getMatched(evt.target.value));
        renderAcOptionsList();
    });

    // Add an event on keydown
    inputEl.addEventListener('keydown', evt => {
        if ([
                KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_UP
            ].indexOf(evt.keyCode) === -1) {
            return;
        }

        evt.preventDefault();
    })
}

// Function forms an array with filtered options
function getMatched(query) {
    if (!query) {
        return [];
    }

    const upperQuery = query.toUpperCase();

    return Object.values(stateList).filter(stateName => {
        return stateName.toUpperCase().indexOf(upperQuery) !== -1;
    });
}

// Function fills container with filtered options
function renderAcOptionsList() {
    const optionElList = currMatchedStates.map((matchedState, index) => {
        return renderAcOption(matchedState, index === matchedStateIndex);
    });

    const resultEl = getResult();

    resultEl.innerHTML = '';

    const wrapper = document.createElement('div');

    optionElList.forEach(optionEl => {
        wrapper.appendChild(optionEl);
    });

    resultEl.appendChild(wrapper)
}

// Function 
function renderAcOption(matchedState, isSelected) {
    var optionEl = document.createElement('p');

    optionEl.innerHTML = matchedState;

    if (isSelected) {
        optionEl.classList.add('highlighted');
    }

    optionEl.addEventListener('click', evt => {
        selectState(matchedState);
    })

    return optionEl;
}

function getResult() {
    return document.getElementsByClassName('result') &&
        document.getElementsByClassName('result')[0];
}

function selectState(stateToSelect) {
    getInput().value = stateToSelect;
    currMatchedStates.splice(0, currMatchedStates.length);
    renderAcOptionsList();
}


function initBtnClear(btnEl) {
    if (!btnEl) {
        throw 'Clear-button required';
    }

    btnEl.addEventListener('click', (evt) => {
        selectState('');
    })
}

function initKeyboadControls() {
    document.addEventListener('keydown', evt => {
        switch (evt.keyCode) {
            case KEY_CODES.ARROW_DOWN:
                if (typeof matchedStateIndex !== 'number') {
                    matchedStateIndex = 0;
                    break;
                }

                if (matchedStateIndex === currMatchedStates.length - 1) {
                    matchedStateIndex = 0;
                    break;
                }

                matchedStateIndex += 1;
                break;
            case KEY_CODES.ARROW_UP:
                if (typeof matchedStateIndex !== 'number') {
                    matchedStateIndex = currMatchedStates.length - 1;
                    break;
                }

                if (matchedStateIndex === 0) {
                    matchedStateIndex = currMatchedStates.length - 1;
                    break;
                }

                matchedStateIndex -= 1;
                break;

            case KEY_CODES.ENTER:
                selectState(currMatchedStates[matchedStateIndex]);
        }

        renderAcOptionsList();
    })
}