var todoList = sessionStorage.getItem('todoList') ?? [];

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

    todoList = sessionStorage.getItem('todoList');

    arrayTodoList = JSON.parse(todoList);
    let arrayLenght = arrayTodoList == null ? 0 : arrayTodoList.length;

    createTodoLi(txtTaskName.value, arrayLenght);
    if (arrayTodoList == null) {
        arrayTodoList = Array(arrayTodoList);
    }
    arrayTodoList.push(txtTaskName.value);

    sessionStorage.setItem('todoList', JSON.stringify(arrayTodoList));

    txtTaskName.value = '';
}

function removeTodo(e) {
    e.preventDefault();

    if (! confirm('Are you sure you want to delete the item?')) {
        return false;
    }

    todoList = sessionStorage.getItem('todoList');

    if (e.target.classList.contains('js-btn-delete')) {
        arrayTodoList = JSON.parse(todoList);

        let removeDataId = e.target.parentElement.getAttribute('data-id');
        let newTodoList = arrayRemove(arrayTodoList, removeDataId);

        sessionStorage.setItem('todoList', JSON.stringify(newTodoList));

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

document.querySelector('#js-btn-add').addEventListener('click', addTodo);
document.querySelector('ul').addEventListener('click', removeTodo);
document.querySelector('#js-btn-delete-all').addEventListener('click', removeAllTodo);

if (todoList.length) {
    let arrayTodoList = JSON.parse(todoList);

    arrayTodoList.forEach((element, key) => {
        if (element != null) {
            createTodoLi(arrayTodoList[key], key);
        }
    });
}