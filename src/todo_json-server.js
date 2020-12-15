// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// define variables and functions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const url = 'http://localhost:3000';

const renderTodos = function() {
	// clean current todos:
	nodes.todoListUL.innerHTML = '';
	// add todo item at the end
	fetch(`${url}/todos`)
		.then(response => response.json())
		.catch(error => console.error('Error:', error))
		.then(response => response.forEach(todo => {
			nodes.todoListUL.innerHTML += `
			<li data-id=${todo.id}>
				<span class="${todo.completed?'completed':''}">${todo.title}</span>
				<div class="removeTodo"><i class="far fa-trash-alt"></i></div>
			</li>
			`;
		}))
	// displayTodoItemsCount();
}

const addTodo = function(value) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", `${url}/todos`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		"title": value,
		"completed": false
	}));

	// clear input text
	nodes.addTodoInput.value = '';
}
const removeTodo = function (e) {
	let currIdx = +e.target.parentNode.parentNode.dataset.id;
	class DeleteHTTP {
		async delete(url) {
			const response = await fetch(url, { 
				method: 'DELETE', 
				headers: { 
					'Content-type': 'application/json'
				} 
			});
		} 
	}
	const http = new DeleteHTTP;
	http.delete(`${url}/todos/${currIdx}`);
	// renderTodos();
}

// DOM cache:
const nodes = {
	'todoListUL': document.querySelector('ul.todoListItems'),
	'addTodoInput': document.querySelector('.addTodo>input'),
	'addTodoBtn': document.querySelector('.addTodo>.btnAdd'),
	'totalItemsCount': document.querySelector('.todoApp .total>.output')
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// attach events
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('DOMContentLoaded', () => {
	renderTodos();
});

// add Todo Item (on button click or on enter key pressed):
nodes.addTodoBtn.addEventListener('click', function() {
	addTodo(nodes.addTodoInput.value)
})
nodes.addTodoInput.addEventListener('keyup', function(e) {
	if(e.keyCode === 13){
		addTodo(nodes.addTodoInput.value);
	}
})

nodes.todoListUL.addEventListener('click', e => {
	if(e.target.style['text-decoration'] !== 'line-through') {
		e.target.style = "text-decoration: line-through;"
	} else {
		e.target.style = "text-decoration: none;"
	}
})
window.addEventListener('click', e => {
	if(e.target.className === 'far fa-trash-alt') {
		removeTodo(e)
	}
})

// console.log(e.target.style['text-decoration']);