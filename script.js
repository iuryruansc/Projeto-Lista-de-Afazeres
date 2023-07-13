const list = document.querySelector('#lista-tarefas');
const elements = document.getElementsByClassName('item');

// função para adicionar itens na lista
const addItem = () => {
    const tarefa = document.querySelector('#texto-tarefa').value;
    if (tarefa != "") { 
        const newItem = document.createElement('li');
        newItem.innerHTML = tarefa;
        newItem.classList.add('item');
        list.appendChild(newItem);
    } else {
        alert("Insira uma tarefa válida")
    }
    document.getElementById("clear").reset();
}

// função para alterar cor de fundo do item
const itemBGColor = () => {
    list.addEventListener('click', (event) => {
        const selectedItem = event.target;
        const otherItems = Array.from(elements).filter(item => item !== selectedItem);

        otherItems.forEach(item => item.style.backgroundColor = '');
        if (selectedItem.style.backgroundColor === '') {
            selectedItem.style.backgroundColor = 'grey';
        } else {
            selectedItem.style.backgroundColor = '';
        }
        
/*        for (let index = 0; index < elements.length; index += 1) {
            elements[index].style.backgroundColor = '';
        }
        if (event.target.classList.contains('item')) {
            event.target.style.backgroundColor = 'grey';
        }*/
    })
}

// função para riscar o item da lista
const completedItem = () => {
    list.addEventListener('dblclick', (event) => {
        const selectedItem = event.target;
        const isCompleted = selectedItem.classList.contains('completed');

        if (!(isCompleted)) {
            selectedItem.classList.add('completed');
        } else {
            selectedItem.classList.remove('completed');
        }
    })
}

// função para apagar a lista
const eraseList = () => {
    for (let index = 0; index < elements.length; index += 1) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
    localStorage.removeItem('textLine');
    localStorage.removeItem('colorLine');
    localStorage.removeItem('classText');
}

// função para remover completos
const removeDone = () => {
    const allList = Array.from(elements);
    for (let index = 0; index < allList.length; index += 1) {
        if (allList[index].classList.contains('completed')) {
            const toRemove = allList[index];
            list.removeChild(toRemove);
        }
    }
}

// função para remover itens selecionados
const removeSelected = () => {
    const allList = Array.from(elements);
    for (let index = 0; index < allList.length; index += 1) {
        const bgColor = allList[index].style.backgroundColor
        if (bgColor == 'grey') {
            const toRemove = allList[index];
            list.removeChild(toRemove);
        }
    }
}

// função para mover item para cima
const moveUp = () => {
    const allList = Array.from(elements);
    for (let index = 1; index < allList.length; index += 1) {
        const bgColor = allList[index].style.backgroundColor
        if (bgColor == 'grey') {
            const toMove = list.children[index];
            const previousNode = list.children[index-1];
            list.insertBefore(toMove, previousNode);       
        }
    }
}

// função para mover item para baixo
const moveDown = () => {
    const allList = Array.from(elements);
    for (let index = 0; index < allList.length; index += 1) {
        const bgColor = allList[index].style.backgroundColor
            if (bgColor == 'grey') {
                const nextNode = allList[index].nextElementSibling;
                if (nextNode) {
                    const toMove = list.children[index]
                    list.insertBefore(nextNode, toMove);
                }
            }    
    }
}

const save = () => {
    const allList = Array.from(elements);
    const textArray = [];
    const colorArray = [];
    const classArray = [];
    for (let index = 0; index < allList.length; index += 1) {
        const text = allList[index].innerHTML;
        textArray.push(text);
        localStorage.setItem('textLine', JSON.stringify(textArray));

        const cores = allList[index].style.backgroundColor;
        colorArray.push(cores);
        localStorage.setItem('colorLine', JSON.stringify(colorArray));

        const classes = allList[index].classList.value;
        classArray.push(classes)
        localStorage.setItem('classText', JSON.stringify(classArray));
    }
}

const createList = () => {
    const lines = JSON.parse(localStorage.getItem('textLine'));
    const colors = JSON.parse(localStorage.getItem('colorLine'));
    const classes = JSON.parse(localStorage.getItem('classText'))

    if (localStorage.getItem('textLine') === null || localStorage.getItem('colorLine') === null || localStorage.getItem('classText') === null) {
        return
    } else {
        for (let index = 0; index < lines.length; index++) {
            const newLine = document.createElement('li');
            newLine.innerHTML = lines[index];
            newLine.style.backgroundColor = colors[index];
            newLine.classList = classes[index];

            list.appendChild(newLine);
        }
    }
}

const buttonAddItem = document.querySelector('#criar-tarefa');
buttonAddItem.addEventListener('click', addItem);

const buttonEraseList = document.querySelector('#apagar-tudo');
buttonEraseList.addEventListener('click', eraseList);

const buttonRemoveDone = document.querySelector("#remover-finalizados");
buttonRemoveDone.addEventListener('click', removeDone);

const buttonRemoveSelected = document.querySelector('#remover-selecionado');
buttonRemoveSelected.addEventListener('click', removeSelected);

const buttonMoveUp = document.querySelector('#mover-cima');
buttonMoveUp.addEventListener('click', moveUp);

const buttonMoveDown = document.querySelector('#mover-baixo');
buttonMoveDown.addEventListener('click', moveDown);

const buttonSave = document.querySelector('#salvar-tarefas');
buttonSave.addEventListener('click', save)

window.onload = () => {
    createList();
    completedItem();
    itemBGColor();
}