function morning() {
    const noon = document.querySelectorAll('.noon');
    const [am] = [].filter.call(noon, elem => elem.innerText === 'AM');
    const [pm] = [].filter.call(noon, elem => elem.innerText === 'PM');

    if (pm.classList.contains('current-noon')) {
        am.classList.add('current-noon');
        pm.classList.remove('current-noon');
    } else {
        return;
    }
}

function evening() {
    const noon = document.querySelectorAll('.noon');
    const [am] = [].filter.call(noon, elem => elem.innerText === 'AM');
    const [pm] = [].filter.call(noon, elem => elem.innerText === 'PM');

    if (am.classList.contains('current-noon')) {
        am.classList.remove('current-noon');
        pm.classList.add('current-noon');
    } else {
        return;
    }
}

function setFinishHours(elem) {
    const availableTime = parseInt(elem.querySelector('.input-time').value);
    const minutes = document.querySelector('.minutes');

    if (availableTime < 0 || availableTime > 24) {
        return;
    } else {
        if (availableTime > 12) {
            if (availableTime !== 24) {
                evening();
            } else {
                morning();
            }
            
            elem.innerText = makeTwoString(availableTime - 12);
        } else {
            elem.innerText = makeTwoString(availableTime);
            
            if (availableTime === 0) {
                morning();

                elem.innerText = 12;
            }
        }

        if (minutes.innerText === '--') minutes.innerText = '00';
    }
}

function setFinishMinutes(elem) {
    let availableTime = parseInt(elem.querySelector('.input-time').value);
    const hours = document.querySelector('.hours');
    
    if (availableTime < 0) {
        return;
    } else {
        if (availableTime >= 60) {
            let minutesCount = 0;

            while (Math.floor(availableTime / 60) > 0) {
                availableTime -= 60;
                minutesCount++;
            }

            hours.innerText = makeTwoString(parseInt(hours.innerText) + minutesCount);
            elem.innerText = makeTwoString(availableTime);

            if (hours.innerText > 12) {
                let hourInner = parseInt(hours.innerText);

                while (Math.floor(hourInner / 12) > 0) {
                    hourInner -= 12;
                }

                hours.innerText = makeTwoString(hourInner);
                elem.innerText = makeTwoString(availableTime);
                evening();
            }
        } else {
            elem.innerText = makeTwoString(availableTime);
        }
    }
}

function callFinishTime(event) {
    const parent = this.parentNode;

    event.preventDefault();
    
    if (parent.classList.contains('hours')) {
        setFinishHours(parent);
    } else {
        setFinishMinutes(parent);
    }
}

function inputTime() {
    const minutes = document.querySelector('.minutes');
    const hours = document.querySelector('.hours');

    if (this.querySelector('.input-time')) {
        this.querySelector('.input-time').select();
        return;
    } else {
        if (this === minutes && hours.innerText === '--') {
            return;
        }else {
            const form = document.createElement('form');
            const input = document.createElement('input');

            form.setAttribute('class', 'time-form');
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'input-time');
            input.value = this.innerText;

            form.appendChild(input);
            this.innerText = '';
            this.appendChild(form);
            input.select();

            form.addEventListener('submit', callFinishTime);
        }
    }
}

function findSibling(elem) {
    const siblings = [];
    let sibling = elem.parentNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem ) {
            siblings.push(sibling);
        }

        sibling = sibling.nextSibling;
    }

    return siblings;
}

function changeAtNoon() {
    const siblings = findSibling(this);
    
    this.classList.add('current-noon');
    [].forEach.call(siblings, (sib) => {
        sib.classList.remove('current-noon');
    });
}

function init() {
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const noon = document.querySelectorAll('.noon');

    hours.addEventListener('click', inputTime);
    minutes.addEventListener('click', inputTime);
    [].forEach.call(noon, (noon) => {
        noon.addEventListener('click', changeAtNoon);
    });
}

init();