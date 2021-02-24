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

function setFinishHours(elem, sib, time) {
    const availableTime = elem.querySelector('.input-time');
    
    if (availableTime) {
        if (availableTime.value) {
            time.setHours(availableTime.value);
        } else {
            elem.innerText = '--';
            return;
        }
    }

    elem.innerText = makeTwoString(time.getHours());

    if (time.getHours() > 12) {
        elem.innerText = makeTwoString(time.getHours() - 12);
        evening();
    }

    if (sib.innerText === '--') sib.innerText = '00';
}

function setFinishMinutes(elem, sib, time) {
    let availableTime = parseInt(elem.querySelector('.input-time').value);
    
    if (availableTime) time.setMinutes(availableTime);

    elem.innerText = makeTwoString(time.getMinutes());
    setFinishHours(sib, elem, time);
}

function callFinishTime(elem, time) {
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');

    if (elem.classList.contains('hours')) {
        setFinishHours(hours, minutes, time);
    } else {
        setFinishMinutes(minutes, hours, time);
    }
}

function inputTime(elem, time) {
    const minutes = document.querySelector('.minutes');
    const hours = document.querySelector('.hours');

    if (elem.querySelector('.input-time')) {
        return;
    } else {
        if (elem === minutes && hours.innerText === '--') {
            setFinishHours(hours, minutes, time);
        }else {
            const input = document.createElement('input');
            
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'input-time');
            input.value = elem.innerText;
            
            elem.innerText = '';
            elem.appendChild(input);
            input.select();

            input.addEventListener('blur', () => {
                callFinishTime(elem, time);
            });
        }
    }
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

    const time = new Date;

    hours.addEventListener('click', () => {
        inputTime(hours, time);
    });
    minutes.addEventListener('click', () => {
        inputTime(minutes, time);
    });
    [].forEach.call(noon, (noon) => {
        noon.addEventListener('click', changeAtNoon);
    });
}

init();