const div = document.createElement("div");
div.classList.add("tarefas");
document.body.appendChild(div)

const titulo = document.createElement("h1");
titulo.textContent = "Lista de Tarefas";

const labelTarefas = document.createElement("label");
labelTarefas.textContent = "Tarefas";

const inputTarefas = document.createElement("input");
inputTarefas.setAttribute("type", "text");
inputTarefas.id = "input-tarefa";

const botaoAdicionar = document.createElement("button");
botaoAdicionar.textContent = "Adicionar";
botaoAdicionar.id = "botao-adicionar";

div.append(titulo, labelTarefas, inputTarefas, botaoAdicionar);

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function mostrarTarefas(){
    document.querySelectorAll(".item-tarefa").forEach(e => e.remove());
    
    tarefas.forEach((t, index) => {
            const tarefa = document.createElement("div");
            tarefa.classList.add("item-tarefa");
            const linha = document.createElement("li")
            linha.textContent = t.texto;
            const estado = document.createElement("span");
            estado.textContent = t.estado;
            const botaoMarcar = document.createElement("button");
            botaoMarcar.textContent = t.estado === "Pendente" ? "Marcar": "Desmarcar";
            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            
            botaoMarcar.addEventListener("click", () => {
                tarefas[index].estado = tarefas[index].estado === "Pendente" ? "Concluida" : "Pendente";
                localStorage.setItem("tarefas", JSON.stringify(tarefas));
                mostrarTarefas();
            });

            botaoEditar.addEventListener("click", () => {
                if(tarefa.querySelector("input[type=text]")) return;
                const inputEditar = document.createElement("input");
                inputEditar.type = "text";
                inputEditar.value = linha.textContent;
                const botaoSalvar = document.createElement("button");
                botaoSalvar.textContent = "Salvar";
                tarefa.append(inputEditar, botaoSalvar);
                botaoSalvar.addEventListener("click", () => {
                    if(inputEditar.value === ""){
                        alert("Digite uma tarefa!");
                        return;
                    }
                    tarefas[index].texto = inputEditar.value;
                    localStorage.setItem("tarefas", JSON.stringify(tarefas));
                    mostrarTarefas();
                    alert("Tarefa editada com sucesso!");
                });
            });

            botaoExcluir.addEventListener("click", () => {
                const confirmar = confirm("Deseja excluir a tarefa?");
                if(confirmar){
                    tarefas.splice(index, 1);
                    localStorage.setItem("tarefas", JSON.stringify(tarefas));
                    mostrarTarefas();
                    alert("Tarefa excluída com sucesso!");
                }
            });

            tarefa.append(linha, estado, botaoMarcar, botaoEditar, botaoExcluir);
            div.appendChild(tarefa);    
        })
    }
    
    const tarefaInput = document.getElementById("input-tarefa");
    const buttonAdd = document.getElementById("botao-adicionar");
    buttonAdd.addEventListener("click", () => {
        if(tarefaInput.value === ""){
            alert("Digite uma tarefa!");
            return;
        }
    
    tarefas.push({ texto: tarefaInput.value, estado: "Pendente" });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    tarefaInput.value = "";

    mostrarTarefas();
});  

mostrarTarefas()