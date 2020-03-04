let input = document.querySelector("input[name=tarefa]");
let listaTarefas = document.querySelector("#lista");
let btn = document.querySelector("#btn");
let btnlimpar = document.querySelector("#btn_limpar");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function deletarTarefa(tar) {
    
    // console.log(tarefas.indexOf(tar.textContent));
    
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);
    renderizar();
}

function limparObj(obj) {
    obj.innerHTML = "";
}

function limparInput(input) {
    input.value = "";
}

function errorMSG(el, msg) {
    let span = document.createElement("span");
    let msgERRO = document.createTextNode(msg);
    span.setAttribute("class", "alert alert-warning mt-5");
    span.appendChild(msgERRO);
    el.appendChild(span);
}

function removerSpans(el) {
    let spans = document.querySelectorAll("span");
    spans.forEach((span) => {
        el.removeChild(span);
    })
}   

function renderizar() {
    limparInput(input);
    limparObj(lista);
    salvarStorage();
    tarefas.forEach((tarefa) => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let novaTarefa = document.createTextNode(tarefa);
        tr.onclick = function() {
            deletarTarefa(this);
        }
        td.appendChild(novaTarefa);
        tr.appendChild(td);
        listaTarefas.appendChild(tr);
        
    })
}

function clickAll() {
    let novaTarefa = input.value;
    removerSpans(lista);
    if(novaTarefa !== "") {
        tarefas.push(novaTarefa);
        renderizar();
    } else {
        errorMSG(lista, "Mano Não tem nada ai");
    }
}

btn.onclick = () => {
    clickAll();
}

btnlimpar.onclick = () => {
    tarefas = [];
    renderizar();
}

document.onkeypress = (e) => {
    if(e.keyCode == 13) {
        clickAll();
    }
}

function salvarStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

renderizar();


