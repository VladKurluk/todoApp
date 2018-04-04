const main = (document => {
    /*
    * 10) Рефакторинг пункта 4. Описываю ф-ию для создания DOM-элементов с приминением паттерна "Фасад".
    */
    function createElement(tag, props, ...children) { 
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                element.appendChild(child);
            });
        }

        return element;
    }

    /*
    * 4) Описываю функцию, которая создает DOM-элементы
    * 11) Рефакторинг
    */
    function createTodoItem(title) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', { className: 'title' }, title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

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
    * 12) Описываю фунццию 
    */
    function load() {
        const data = JSON.parse(localStorage.getItem('todos'))
        return data;
    }

    function save(data) {
        const string = JSON.stringify(data);
        localStorage.setItem('todos', string);
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

    return main;
})(document);

main();

