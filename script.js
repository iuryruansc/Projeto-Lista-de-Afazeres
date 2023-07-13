const list = document.querySelector('#lista-tarefas');


const addItem = () => {
    const tarefa = document.querySelector('#texto-tarefa').value;
    const newItem = document.createElement('li');
    newItem.innerHTML = tarefa;
    list.appendChild(newItem);
}

const buttonAddItem = document.querySelector('#criar-tarefa');
buttonAddItem.addEventListener('click', addItem);