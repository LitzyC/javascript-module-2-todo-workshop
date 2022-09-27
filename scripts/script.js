/*let paragraph = document.createElement("lista"); 
myElement.appendChild(paragraph); 
paragraph.innerText = "How are you?";
let myElement = document.querySelector("#boton");
myElement.appendChild(generateTodoDOM);
generateTodoDOM.innerText = "Text agregado"; */

//Variable, funciones principales, eventos

let todos = []
const filters = {
    searchTitle: '',
    showFinished: false,
    showUnfinished: false
}

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchTitle: e.target.value
    })
    renderTodos(todos);
})

document.querySelector('#show-finished').addEventListener('change', (e) => {
    setFilters({
        showFinished: e.target.checked
    })
    renderTodos(todos);
})

document.querySelector('#show-unfinished').addEventListener('change', (e) => {
    setFilters({
        showUnfinished: e.target.checked
    })
    renderTodos(todos);
})

const saveTodosToLocalStorage = () => {
    ls.setItem('todos', JSON.stringify(todos));
}




const setFilters = (updates) => {
    if(typeof updates.searchTitle === 'string'){
        filters.searchTitle = updates.searchTitle;
    }
    if(typeof updates.showFinished === 'boolean'){
        filters.searchTitle=updates.showFinished;
    }
    if(typeof updates.showUnfinished === 'boolean'){
        filters.searchTitle = updates.showUnfinished;
    }
}

const renderTodos = (todos) => {
    let filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    if (filters.showFinished && filters.showUnfinished){

    }else if(filters.showFinished){
        filteredTodos = filteredTodos.filter((todo) => todo.completed)
    }else if(filters.showFinished){
        filteredTodos = filteredTodos.filter((todo) => todo.completed)
    }

    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    }else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no "todos" to show'
        todoList.appendChild(messageEl);
    }
}

const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup todo checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    // Setup the todo text
    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}

const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
    }
}

const createTodo = (text) => {
    const todo = {
        title: text,
        completed: false,
    };
    todos.push(todo);
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}


document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  renderTodos(todos);
});


renderTodos(todos);


/*const evento =  (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    
    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = '';
    }
    console.log("Texto añadido: " + todos);

};

formulario.addEventListener('submit', evento);*/