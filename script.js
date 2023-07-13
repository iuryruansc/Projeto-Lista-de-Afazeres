const list = document.querySelector('#lista-tarefas');
let listArray = [];

// função para adicionar itens na lista
const addItem = () => {
    let tarefa = document.querySelector('#texto-tarefa').value;
    if (tarefa != "") { 
        const newItem = document.createElement('li');
        newItem.innerHTML = tarefa;
        list.appendChild(newItem);
    } else {
        alert("Insira uma tarefa válida")
    }
    document.getElementById("clear").reset();
    listArray.push(tarefa);
}

// função para salvar os itens da lista
const saveList = () => {
    const listItems = localStorage.getItem('toDoList');
    if (listItems === "") {
        return
    } else {
        for (let index = 0; index < listItems.length; index += 1) {
        }
    }
}

const buttonAddItem = document.querySelector('#criar-tarefa');
buttonAddItem.addEventListener('click', addItem);

window.onload = () => {
    
}