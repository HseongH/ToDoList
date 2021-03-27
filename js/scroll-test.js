const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');

function preventScroll(event) {
    event.preventDefault();
    event.stopPropagation();
}

function timeSelection(elem, event) {
    const selection = elem.querySelector('.selection-area');
    const time = selection.querySelectorAll('li');
    const position = event.deltaY;

    time[1].classList.remove('selection-time');
    
    if (position > 0) {
        selection.appendChild(time[0]);
        time[2].classList.add('selection-time');
        return;
    }
    
    selection.insertBefore(selection.lastElementChild, time[0]);
    time[0].classList.add('selection-time');
}

hours.addEventListener('scroll', preventScroll);
minutes.addEventListener('scroll', preventScroll);
hours.addEventListener('mousewheel', () => {
    preventScroll(event);
    timeSelection(hours, event);
});
minutes.addEventListener('mousewheel', () => {
    preventScroll(event);
    timeSelection(minutes, event);
});
