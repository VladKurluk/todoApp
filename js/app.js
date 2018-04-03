/*
* 4) Описываю функцию, которая создает DOM-элементы
*/
function createTodoItem(title) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Изменить';
    editButton.className = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.className = 'delete';

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    //Подписка на события
    bindEvents(listItem);

    return listItem;
}

/*
* 5) Описываю ф-ию привязки событий на кнопки задачи в списке
*/
function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

/*
* 3) Описываю функцию обработчик события,
*    которая добавляет задачу в список
*/
function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === "") return alert('Ты не ввел название задачи!');

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    //Очистка поля формы после добавления задачи в список
    addInput.value = '';
}

/*
* 6) Описываю ф-ию для события на Чекбоксе
*/
function toggleTodoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

/*
* 7) Описываю ф-ию для события на кнопке Изменить
*/
function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Изменить';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');
}

/*
* 8) Описываю ф-ию для события "удаления задчи"
*/
function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
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

/*
* 9) Описываю ф-ию для манипуляции с уже имеющейся задачей.
*/
function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}

main();
