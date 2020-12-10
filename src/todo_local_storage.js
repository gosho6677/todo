// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// define variables and functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const displayTodoItemsCount = function() {
	let count = todos.length || 0;
	nodes.totalItemsCount.innerHTML = count;
}
const renderTodos = function(e) {
	// clean current todos:
	nodes.todoListUL.innerHTML = '';

	// add todo item at the end
	todos.forEach( todo => {
		nodes.todoListUL.innerHTML += `
		<li data-id=${todo.id}>
			<span class="todoID">${todo.id}.</span>
			<span class="${todo.completed?'completed':''}">${todo.title}</span>
			<div class="removeTodo"><i class="far fa-trash-alt"></i></div>
		</li>
		`;
	})

	displayTodoItemsCount();
}

const addTodo = function() {
	// get the input text:
	const todoText = nodes.addTodoInput.value;

	// make the ID - this should be done by the server:
	const id = todos.length ? todos[todos.length-1].id + 1 : 1;

	const newTodo = {
		"id": id,
		"title": todoText,
		"completed": false
	};

	// add new todo object to the end of todos array:
	todos = [...todos, newTodo];

	// save to local storage
	// note, that localStorage.setItem() expects the second argument to be string
	localStorage.setItem('todos',JSON.stringify(todos));

	// render todos:
	renderTodos();

	// clear input text
	nodes.addTodoInput.value = '';

	// focus on input for new todo:
	nodes.addTodoInput.focus();
}
const removeTodo = function (e) {
	// get id of todo to be removed:
	let todoID;
	if(e.target.classList.contains('fa-trash-alt')){
		todoID = +e.target.parentNode.parentNode.dataset.id;
	}else if( e.target.classList.contains('removeTodo')){
		// if icon is streatched to div.removeTodo => this is not needed
		todoID = +e.target.parentNode.dataset.id;
	}else{
		return;
	}

	// get the index of todo to be removed from todos array:
	let idx = todos.findIndex(todo => todo.id === todoID);

	// remove from todos array the element with index idx:
	idx>=0 && todos.splice(idx,1);

	// save to local storage
	// note, that localStorage.setItem() expects the second argument to be string
	localStorage.setItem('todos',JSON.stringify(todos));

	// render todos:
	renderTodos();
}

// DOM cache:
const nodes = {
	'todoListUL': document.querySelector('ul.todoListItems'),
	'addTodoInput': document.querySelector('.addTodo>input'),
	'addTodoBtn': document.querySelector('.addTodo>.btnAdd'),
	'totalItemsCount': document.querySelector('.todoApp .total>.output')
}

let localStorage = window.localStorage;

// create todos array of todo objects from LocalStorage data
// note, that localStorage.getItem() returns data as string
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// attach events
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('DOMContentLoaded', event=>{
	renderTodos();
});

// add Todo Item (on button click or on enter key pressed):
nodes.addTodoBtn.addEventListener('click', addTodo);
nodes.addTodoInput.addEventListener('keyup', function(e) {
	if(e.keyCode === 13){
		addTodo();
	}
})

// remove Todo Item:
nodes.todoListUL.addEventListener('click', removeTodo, {capture: true})

// togleComplete: HW