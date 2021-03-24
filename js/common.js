// COMMON FUNCTION
_cal.splitByTwoLetters = str => {
    return `${str}`.length >= 2 ? str : `0${str}`;
}

_cal.findSiblings = elem => {
    const siblings = [];
    let sib = elem.parentNode.firstChild;

    while (sib) {
        if (sib !== elem && sib.nodeType === 1) {
            siblings.push(sib);
        }

        sib = sib.nextSibling;
    }

    return siblings;
}

_cal.nodeIndex = elem => {
    let sib = elem.previousSibling;
    let nodeIndex = 0;

    while(sib) {
        if (sib.nodeType === 1) {
            nodeIndex++;
        }
        
        sib = sib.previousSibling;
    }

    return nodeIndex;
}

_cal.isContainYear = () => {
    const calendarArea = _cal.calendarArea;

    return calendarArea.classList.contains('year');
}

_cal.isContainMonth = () => {
    const calendarArea = _cal.calendarArea;

    return calendarArea.classList.contains('month');
}

_cal.calendarType = () => {
    const calendarArea = _cal.calendarArea;

    return calendarArea.classList.contains('calendar-task');
}

_cal.isCurrentMonth = elem => {
    return !(elem.classList.contains('not-this-month'));
}
