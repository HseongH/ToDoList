let calendar = new Date;

function makeTwoString(str) {
    return `${str}`.length === 2 ? str : `0${str}`;
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

function calendarContainMonth() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('month');
}

function calendarContainYear() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('year');
}

function currentCalendar() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('calendar-task');
}

function currentMonth(list) {
    return list.classList.contains('not-current-month');
}

function nodeIndex(elem) {
    let sibling = elem.previousSibling;
    let nodeIndex = 0;

    while(sibling) {
        if (sibling.nodeType === 1) {
            sibling = sibling.previousSibling;
            nodeIndex++;
        }
    }

    return nodeIndex;
}