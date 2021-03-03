function addTodos(todos) {
    const titleInput = document.getElementById('title-input');
    const desInput = document.getElementById('description-input');
    const hours = document.querySelector('.hours').innerText;
    const minutes = document.querySelector('.minutes').innerText;
    const noon = document.querySelector('.current-noon').innerText;
    const startDate = document.querySelector('.select-date').innerText;
    const endDate = document.querySelectorAll('.select-date')[1].innerText;

    const toDoLists = {
        id: todos.length,
        title: titleInput.value,
        description: desInput.value
    }

    if (hours !== '--') toDoLists.time = `${hours}:${minutes} ${noon}`;
    if (startDate !== '---- / -- / --') toDoLists.startDate = startDate;
    if (endDate !== '---- / -- / --') toDoLists.endDate = endDate;
    
    todos.push(toDoLists);
    saveList(todos);
}

function init() {
    const todos = localStorage.getItem('toDoLists') ? JSON.parse(localStorage.getItem('toDoLists')) : [];
    const submitTodos = document.querySelector('.submit-todos');

    submitTodos && submitTodos.addEventListener('click', () => {
        addTodos(todos);
    });
}

init();