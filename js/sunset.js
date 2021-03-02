function sunsetList(calendar) {
    const selectList = document.querySelectorAll('.select-list');

    
}

function sunset(bg, color) {
    const date = new Date;

    if(date.getHours() >= 18 || date.getHours() <= 6) {
        bg && [].forEach.call(bg, elem => {
            elem.classList.remove('sunrise');
            elem.classList.add('sunset');
        });
        color && [].forEach.call(color, elem => {
            elem.classList.remove('sunrise-color');
            elem.classList.add('sunset-color');
        });
        
    } else {
        bg && [].forEach.call(bg, elem => {
            elem.classList.remove('sunset');
            elem.classList.add('sunrise');
        });
        color && [].forEach.call(color, elem => {
            elem.classList.remove('sunset-color');
            elem.classList.add('sunrise-color');
        });
        [].forEach.call(list, list => {
            list.classList.remove('select-sunset');
        });
    }
}

function init() {
    const sunBg = document.querySelectorAll('.sunrise');
    const sunCo = document.querySelectorAll('.sunrise-color');

    sunset(sunBg, sunCo);
}

init();