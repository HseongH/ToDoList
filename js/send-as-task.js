_cal.createObject('sendLink');

_cal.sendLink.sendAsTask = () => {
    localStorage.setItem('dateSet', JSON.stringify(_cal.calendarInitial));
}
