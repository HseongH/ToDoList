function saveList(todos) {
    localStorage.setItem('toDoLists', JSON.stringify(todos));
}

function addTodos(todos) {
    const titleInput = document.getElementById('title-input');
    const desInput = document.getElementById('description-input');
    const hours = document.querySelector('.hours').innerText;
    const minutes = document.querySelector('.minutes').innerText;
    const noon = document.querySelector('.current-noon').innerText;

    const toDoLists = {
        id: todos.length,
        title: titleInput.value,
        description: desInput.value,
        time: `${hours}:${minutes} ${noon}`
    }
    
    todos.push(toDoLists);
    saveList(todos);
}

function init() {
    const todos = [];
    const submitTodos = document.querySelector('.submit-todos');

    submitTodos.addEventListener('click', () => {
        addTodos(todos);
    });
}

init();