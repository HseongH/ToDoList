function calendarContainMonth() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('month');
}

function calendarContainYear() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('year');
}