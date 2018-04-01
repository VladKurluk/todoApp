/*
* 4) Описываю функцию, которая создает html-элементы
*/
function createTodoItem(title) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.clasName = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Изменить';
    editButton.clasName = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.clasName = 'delete';

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    console.log(listItem);
    return listItem;
}

/*
* 3) Описываю функцию обработчик события
*/
function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === "") return alert('Ты не ввел название задачи!');

    const listItem = createTodoItem(addInput.value);
}

/*
* 1) Получаю доступ к элементам Html разметки
*/
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

/*
* 2) Привязую обработчик события на отправку формы
*/
todoForm.addEventListener('submit', addTodoItem);
