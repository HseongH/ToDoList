function taskToAdd() {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();

    this.href = `index.html?${year}?${month}`;
}

function init() {
    const href = location.href.split('?');
    const calendarArea = document.querySelector('.calendar-area');
    const submitToDo = document.querySelector('.submit-todos');

    calendar.setFullYear(parseInt(href[1]));
    calendar.setMonth(parseInt(href[2]));

    foldUnfold(calendarArea);

    submitToDo.addEventListener('click', taskToAdd);
}

init();