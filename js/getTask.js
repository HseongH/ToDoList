function init() {
    const href = location.href.split('?');
    if (href[1]) {
        const title = document.getElementById('title-input');
        const description = document.getElementById('description-input');
        const startDate = document.querySelector('.select-date');
        const endDate = document.querySelectorAll('.select-date')[1];
        const hours = document.querySelector('.hours');
        const minutes = document.querySelector('.minutes');
        const noon = document.querySelectorAll('.noon');

        title.value = href[1];
        description.value = href[2];
        startDate.innerText = decodeURI(href[3]);

        if (href[4] != undefined) {
            endDate.innerText = decodeURI(href[4]);
        }

        if (href[5] != undefined) {
            const timeStr = decodeURI(href[5]);
            const time = timeStr.split(' ');
            const hourMi = time[0].split(':');
            const [currentNoon] = [].filter.call(noon, noon => noon.innerText === time[1]);
            const [otherNoon] = findSibling(currentNoon);

            hours.innerText = hourMi[0];
            minutes.innerText = hourMi[1];
            otherNoon.classList.remove('current-noon');
            currentNoon.classList.add('current-noon');
        }
    }
}

init();