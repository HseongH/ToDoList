function saveList(todos) {
    localStorage.setItem('toDoLists', JSON.stringify(todos));
}