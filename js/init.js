const _cal = {
    createObject: ns => {
        let obParts = ns.split('.');
        let parent = _cal;

        if (obParts[0] === '_cal') {
            obParts = obParts.slice(1);
        }

        for (let i = 0; i < obParts.length; i++) {
            if (!parent[obParts[i]]) {
                parent[obParts[i]] = {};
            }
            parent = parent[obParts[i]];
        }

        return parent;
    }
};

// COMMON VARIABLE
_cal.today = new Date;
_cal.calendar = new Date;

_cal.calElem = document.querySelector('.calendar');
_cal.calendarArea = document.querySelector('.calendar-area');
_cal.select = document.querySelector('.select');
_cal.selectYear = document.querySelector('.select-year');
_cal.selectMonth = document.querySelector('.select-month');
_cal.selectToday = document.querySelector('.select-today');
_cal.arrowLeft = document.querySelector('.arrow--left');
_cal.arrowRight = document.querySelector('.arrow--right');

_cal.tasks = localStorage.getItem('toDoLists') ? JSON.parse(localStorage.getItem('toDoLists')) : [];

// INDEX.HTML VARIABLE
_cal.createObject('indexVar');

_cal.indexVar.date = document.querySelector('.date');
_cal.indexVar.time = document.querySelector('.time');
_cal.indexVar.unfold = document.querySelector('.control__unfold');
_cal.indexVar.addToDos = document.querySelector('.add-to-dos');

// ADDTASK.HTML VARIABLE
_cal.createObject('addTaskVar');

_cal.addTaskVar.title = document.getElementById('title-input');
_cal.addTaskVar.desc = document.getElementById('description-input');
_cal.addTaskVar.startDate = document.querySelector('.select-date');
_cal.addTaskVar.endDate = document.querySelectorAll('.select-date')[1];
_cal.addTaskVar.hours = document.querySelector('.hours');
_cal.addTaskVar.minutes = document.querySelector('.minutes');
_cal.addTaskVar.noon = document.querySelectorAll('.noon');
_cal.addTaskVar.submitToDos = document.querySelector('.submit-to-dos');
