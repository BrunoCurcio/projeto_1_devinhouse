window.onload = () => {
  var armazenadosLocalStorage = JSON.parse(localStorage.getItem("local"));
  if (armazenadosLocalStorage !== null) {
    for (let i = 0; i < armazenadosLocalStorage.length; i++) {
      criaLi(armazenadosLocalStorage[i]);
    }
  }
};

function criaLi(tarefa) {
  var tituloItens = document.getElementById("titulo-itens");
  tituloItens.style.visibility = "visible";

  var ul = document.getElementById("lista");
  var novaLi = document.createElement("li");
  var textoLi = document.createTextNode(tarefa.tarefa);
  novaLi.appendChild(textoLi);

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("id", "check");

  var entraNaValidacao = tarefa.checked;
  if (entraNaValidacao) {
    checkbox.checked = true;
  }

  checkbox.setAttribute("onchange", "handleCheck(event.target)");
  novaLi.appendChild(checkbox);

  var label = document.createElement("label");
  label.appendChild(textoLi);
  novaLi.appendChild(label);

  var botaoDeletar = document.createElement("button");
  var conteudoBotao = document.createElement("i");
  conteudoBotao.className = "fa fa-trash-o";
  botaoDeletar.className = "deletar";
  botaoDeletar.appendChild(conteudoBotao);
  novaLi.appendChild(botaoDeletar);

  botaoDeletar.addEventListener("click", function deletarItem() {
    var confirmar = confirm("Deseja mesmo deletar o item?");

    if (confirmar) {
      var itemDaLista = this.parentNode;
      var ul = itemDaLista.parentNode;
      ul.removeChild(itemDaLista);

      var armazenadosLocalStorage = JSON.parse(localStorage.getItem("local"));

      var indexDoItemASerDeletado = armazenadosLocalStorage.indexOf(
        itemDaLista.children[1].textContent
      );

      armazenadosLocalStorage.splice(indexDoItemASerDeletado, 1);

      localStorage.setItem("local", JSON.stringify(armazenadosLocalStorage));

      if (armazenadosLocalStorage == 0) {
        tituloItens.style.visibility = "hidden";
      }
    }
  });

  ul.appendChild(novaLi);
}

function adicionarTarefa() {
  var novaTarefa = {
    tarefa: document.getElementById("nova-tarefa").value.trim(),
    checked: false,
  };
  if (novaTarefa.tarefa === "") {
    alert("Digite alguma tarefa!");
  } else {
    criaLi(novaTarefa);
    document.getElementById("nova-tarefa").value = "";
    let armazenadosLocalStorage = JSON.parse(localStorage.getItem("local"));
    var armazenados = [];

    if (armazenadosLocalStorage !== null) {
      for (let i = 0; i < armazenadosLocalStorage.length; i++) {
        armazenados.push(armazenadosLocalStorage[i]);
      }
    }
    armazenados.push(novaTarefa);
    localStorage.setItem("local", JSON.stringify(armazenados));
  }
}

function handleCheck(valor) {
  let armazenadosLocalStorage = JSON.parse(localStorage.getItem("local"));

  let labelValue = valor.nextSibling.textContent;

  let indexOfObject = armazenadosLocalStorage.indexOf(
    armazenadosLocalStorage.find((element) => element.tarefa === labelValue)
  );

  let copiaObjeto = armazenadosLocalStorage[indexOfObject];

  if (copiaObjeto.checked === false) {
    copiaObjeto.checked = true;
  } else {
    copiaObjeto.checked = false;
  }

  armazenadosLocalStorage.splice(indexOfObject, 1);
  armazenadosLocalStorage.splice(indexOfObject, 0, copiaObjeto);
  localStorage.setItem("local", JSON.stringify(armazenadosLocalStorage));
}