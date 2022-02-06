var todoList, arrayTodoList;

function createTodoLi(text, id) {
    let taskList = document.querySelector('#task-list');

    let newElement = document.createElement('li');
    newElement.className = 'list-group-item d-flex justify-content-between align-items-center';
    newElement.setAttribute('data-id', id);
    newElement.innerHTML = text + '<button class="btn btn-sm btn-danger js-btn-delete">x</button>';
    
    taskList.appendChild(newElement);
}

function addTodo(e) {
    e.preventDefault();

    let txtTaskName = document.querySelector('input[name="todo"]');

    if (txtTaskName.value == '') {
        alert('Todo cannot be empty.');

        return false;
    }

    arrayTodoList = getTodoListStorage();

    createTodoLi(txtTaskName.value, arrayTodoList.length);
    setTodoStorage(txtTaskName.value);

    txtTaskName.value = '';
}

function removeTodo(e) {
    e.preventDefault();

    if (e.target.classList.contains('js-btn-delete')) {
        if (! confirm('Are you sure you want to delete the item?')) {
            return false;
        }

        const removeDataId = e.target.parentElement.getAttribute('data-id');
        removeTodoStorage(removeDataId);

        e.target.parentElement.remove();
    }
}

function removeAllTodo() {
    if (! confirm('Are you sure you want to delete all content?')) {
        return false;
    }

    document.querySelectorAll('.list-group-item').forEach(el => el.remove());

    sessionStorage.removeItem('todoList');
}

function arrayRemove(arr, key) { 
    delete arr[key];

    var filtered = arr.filter(function (el) {
        return el != null;
    });

    return filtered;
}

function getTodoListStorage() {
    if (sessionStorage.getItem('todoList') === null) {
        todoList = [];
    } else {
        todoList = JSON.parse(sessionStorage.getItem('todoList'));
    }

    return todoList;
}

function setTodoStorage(text) {
    arrayTodoList = getTodoListStorage();
    arrayTodoList.push(text);

    sessionStorage.setItem('todoList', JSON.stringify(arrayTodoList));
}

function removeTodoStorage(key) {
    arrayTodoList = getTodoListStorage();
    const newTodoList = arrayRemove(arrayTodoList, key);

    sessionStorage.setItem('todoList', JSON.stringify(newTodoList));
}

document.querySelector('#js-btn-add').addEventListener('click', addTodo);
document.querySelector('ul').addEventListener('click', removeTodo);
document.querySelector('#js-btn-delete-all').addEventListener('click', removeAllTodo);

arrayTodoList = getTodoListStorage();
arrayTodoList.forEach((element, key) => {
    createTodoLi(element, key);
});