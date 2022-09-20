/*let paragraph = document.createElement("lista"); 
myElement.appendChild(paragraph); 
paragraph.innerText = "How are you?";
let myElement = document.querySelector("#boton");
myElement.appendChild(generateTodoDOM);
generateTodoDOM.innerText = "Text agregado"; */

const formulario = document.querySelector('#new-todo');
const todos = []

const removeTodo = (todoEl) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.toLowerCase() === todoEl.textContent.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
    })
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const todoText = document.createElement('span');

    // Setup the todo text
    todoText.textContent = todo;
    containerEl.appendChild(todoText);

    // Setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    return todoEl;
}

const createTodo = (text) => {
    todos.push(text)({
        title: text,
        completed: false
    })
}

const evento =  (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    
    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = '';
    }
    console.log("Texto añadido: " + todos);

};
formulario.addEventListener('submit', evento);