// Elementit
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const errorMsg = document.getElementById('errorMsg');

// Hae tehtävät localStoragesta, jos niitä on
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Päivitä UI, kun sivu ladataan
renderTodos();

// Tehtävän lisääminen
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    // Tarkista, että syöte ei ole tyhjä tai liian lyhyt
    if (taskText === '' || taskText.length < 3) {
        errorMsg.textContent = 'Tehtävän on oltava vähintään 3 merkkiä pitkä.';
        taskInput.classList.add('invalid');
    } else {
        errorMsg.textContent = '';
        taskInput.classList.remove('invalid');

        // Lisää uusi tehtävä listalle
        const newTask = {
            text: taskText,
            completed: false
        };

        todos.push(newTask);
        taskInput.value = ''; // Tyhjennä syötekenttä
        saveTodos();
        renderTodos();
    }
});

// Renderöi tehtävät listaan
function renderTodos() {
    todoList.innerHTML = ''; // Tyhjennä lista ensin
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);

        const taskText = document.createElement('span');
        taskText.textContent = todo.text;

        // Merkitse tehtävä tehdyksi
        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Peruuta' : 'Valmis';
        completeBtn.classList.add('complete');
        completeBtn.addEventListener('click', function() {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        // Poista tehtävä
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Poista';
        deleteBtn.addEventListener('click', function() {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Tehtävien tallennus localStorageen
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
