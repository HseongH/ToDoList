function addToTask() {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();

    this.href = `addTask.html?${year}?${month}`;
}

function init() {
    const addTask = document.querySelector('.add-todos');
    const href = location.href.split('?');
    const calendarArea = document.querySelector('.calendar-area');

    if (href[1]) {
        calendar.setFullYear(parseInt(href[1]));
        calendar.setMonth(parseInt(href[2]));

        foldUnfold(calendarArea);
    }

    addTask.addEventListener('click', addToTask);
}

init();