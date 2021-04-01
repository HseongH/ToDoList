// COMMON FUNCTION
_cal.splitByTwoLetters = str => {
    return `${str}`.length >= 2 ? str : `0${str}`;
}

// _cal.findSiblings = elem => {
//     const parent = elem.parentNode;
//     const className = elem.getAttribute('class');
//     const apply = className ? parent.querySelectorAll(`.${className}`) : parent.children;
//     const siblings = [].filter.call(apply, el => {
//         return el !== elem;
//     });

//     return siblings;
// }
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
    return _cal.calElem.classList.contains('year');
}

_cal.isContainMonth = () => {
    return _cal.calElem.classList.contains('month');
}

_cal.calendarType = () => {
    return _cal.calElem.classList.contains('calendar-task');
}

_cal.isCurrentMonth = elem => {
    return elem.classList.contains('not-this-month');
}

_cal.saveList = todos => {
    localStorage.setItem('toDoLists', JSON.stringify(todos));
}
