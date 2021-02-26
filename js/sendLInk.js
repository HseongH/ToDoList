function init() {
    const addToDos = document.querySelector('.add-todos');
    const year = document.querySelector('.select-year');
    const month = document.querySelector('.select-month');

    addToDos.addEventListener('click', localStorage.href = `addTask.html?${year.innerHTML}?${month.innerHTML}`);
}