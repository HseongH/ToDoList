const todos = localStorage.getItem('toDoLists') ? JSON.parse(localStorage.getItem('toDoLists')) : [];

function sortList(toDoLists) {
    if (!(toDoLists.time) || todos.length === 0) {
        todos.push(toDoLists);
    }else {
        for (let i = 0; i < todos.length; i++) {
            if (!(todos[i].time)) {
                todos.unshift(toDoLists);
                break;
            } else {
                const past = toDoLists.time.split(':');
                const current = todos[i].time.split(':');
                const pastMi = past[1].split(' ');
                const curMi = current[1].split(' ');
                const pastNoon = pastMi[1] === 'AM' ? 0 : 12;
                const curMiNoon = curMi[1] === 'AM' ? 0 : 12;
    
                const pastHour = parseInt(past[0]) + pastNoon;
                const curHour = parseInt(current[0]) + curMiNoon;
                const pastMinutes = parseInt(pastMi[0]);
                const curMinutes = parseInt(curMi[0]);
    
                const pastTime = pastHour + (pastMinutes / 100);
                const curTime = curHour + (curMinutes / 100);
    
                if (curTime > pastTime) {
                    todos.splice(i, 0, toDoLists);
                    break;
                }
            }
        }
    }
}

function inputValue() {
    if (this.value) {
        this.classList.remove('no-value');
    } else {
        this.classList.add('no-value');
    }
}

function addTodos() {
    const titleInput = document.getElementById('title-input');
    const desInput = document.getElementById('description-input');
    if (titleInput.value || desInput.value) {
        const hours = document.querySelector('.hours').innerText;
        const minutes = document.querySelector('.minutes').innerText;
        const noon = document.querySelector('.current-noon').innerText;
        const startDate = document.querySelector('.select-date').innerText;
        const endDate = document.querySelectorAll('.select-date')[1].innerText;
        const year = document.querySelector('.select-year').innerText;
        const month = document.querySelector('.select-month').innerText;
        const date = document.querySelector('.today').querySelector('.calendar__date').innerText;

        const toDoLists = {
            title: titleInput.value,
            description: desInput.value,
            startDate
        }

        if (hours !== '--') toDoLists.time = `${hours}:${minutes} ${noon}`;
        if (startDate === '---- / -- / --') toDoLists.startDate = `${year} / ${month} / ${makeTwoString(date)}`;
        if (endDate !== '---- / -- / --') toDoLists.endDate = endDate;
        
        sortList(toDoLists);
        saveList(todos);
    } else {
        titleInput.classList.add('no-value');
        desInput.classList.add('no-value');
        window.scrollTo(0, 0);

        titleInput.addEventListener('change', inputValue);
        desInput.addEventListener('change', inputValue);

        return false;
    }
}

function init() {
    const submitTodos = document.querySelector('.submit-todos');

    submitTodos.onclick = addTodos;
}

init();