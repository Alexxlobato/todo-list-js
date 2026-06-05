function adicionarTarefa() {
    //Procura na página HTML o campo de texto (<input>) que possui o ID "novaTarefa" e guarda-o nesta variável para podermos interagir com ele.
    const input = document.getElementById('novaTarefa');
    
    //Pega exatamente aquilo que o utilizador digitou dentro do campo de texto e armazena na variável tarefa. O método trim() é utilizado para remover quaisquer espaços em branco extras no início ou no final do texto, garantindo que a tarefa seja armazenada de forma limpa.
    const tarefa = input.value.trim();
    
    //Verifica se o utilizador clicou em adicionar com o campo vazio. Se estiver vazio, exibe um alerta na tela (alert) e o comando return interrompe a função imediatamente, impedindo a criação de uma tarefa em branco.
    if (tarefa === '') {
        alert('Por favor, digite uma tarefa válida.');
        return;
    }
    
    //Procura na página HTML o elemento <ul> que possui o ID "listaTarefas" e guarda-o nesta variável para podermos adicionar novas tarefas a ele.
    const lista = document.getElementById('listaTarefas');
    
    //Cria um novo elemento de lista (<li>) que representará a nova tarefa.
    const li = document.createElement('li');
    
    //Insere conteúdo dentro do <li> criado. O texto fica dentro de um <span> para ser riscado sozinho.
    //Os botões numa <div> e adicionamos as suas classes customizadas (.btn-concluir e .btn-excluir).
    li.innerHTML = `
        <span class="texto-tarefa">${tarefa}</span>
        <div>
            <button class="btn-concluir" onclick="concluirTarefa(this)">✓ Concluir</button>
            <button class="btn-excluir" onclick="removerTarefa(this)">Excluir</button>
        </div>
    `;
    
    //Pega o <li> (agora com o texto e os botões lá dentro) e adiciona-o visualmente como um "filho" dentro da nossa lista (listaTarefas). É neste momento que a tarefa aparece no ecrã.
    lista.appendChild(li);
    
    //Limpa o campo de texto para que o utilizador possa digitar uma nova tarefa sem precisar apagar a anterior.
    input.value = '';

    salvarNoLocalStorage(); // <--- Guarda a lista atualizada no Local Storage toda vez que uma nova tarefa é adicionada.
}

function removerTarefa(elementoclicado) {
    // Como os botões agora estão dentro de uma <div> no HTML, usamos .closest('li') para encontrar 
    // com segurança o item da lista (<li>) mais próximo acima do botão e removê-lo da interface.
    elementoclicado.closest('li').remove();
    salvarNoLocalStorage(); // <--- Guarda a lista após apagar uma tarefa, para manter o Local Storage atualizado.
}

function concluirTarefa(elementoclicado) {
    // Encontra o item da lista (<li>) pai onde o botão "Concluir" foi clicado.
    const li = elementoclicado.closest('li');
    
    // Procura a tag <span> que contém apenas o texto dentro deste <li> específico.
    const textoTarefa = li.querySelector('.texto-tarefa');
    
    // Adiciona a classe "concluida" se ela não existir, ou remove-a se já existir (efeito liga/desliga).
    textoTarefa.classList.toggle('concluida');
    salvarNoLocalStorage(); // Guarda a lista após concluir uma tarefa, para manter o Local Storage atualizado.
}

// ==========================================
// CÓDIGO DO ENTER ADICIONADO AQUI NO FINAL:
// ==========================================
// Adiciona um ouvinte de eventos para detectar quando o usuário pressiona uma tecla dentro do campo de texto.
//A linha funciona assim:
// 1) document.getElementById('novaTarefa')>>> Diz ao navegador: "Encontra o campo de texto onde o utilizador digita as tarefas"
// 2).addEventListener('keypress', ...): Diz ao navegador: "Fica atento a todas as teclas que o utilizador carregar apenas enquanto ele estiver a digitar dentro desse campo de texto".
// Desta forma, o Enter só vai disparar a função de adicionar se o utilizador estiver com o cursor a piscar dentro desse campo específico. Se carregar em Enter noutro sítio da página, não acontece nada.
document.getElementById('novaTarefa').addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada é a tecla "Enter" (código 13).
    if (event.key === 'Enter') {   
        adicionarTarefa();
    }
// adicionarTarefa();: O navegador executa a ordem: "Então vai lá acima, lê a receita da função adicionarTarefa e executa todos os passos (pegar no texto, criar o item na lista e limpar o campo)".Sem o adicionarTarefa() dentro desse if, o navegador saberia que carregou no Enter, mas não saberia o que fazer a seguir.
// O navegador lê essa linha assim: "Se a tecla que o utilizador carregou for exatamente igual a 'Enter', então executa a função adicionarTarefa."
}); 

// ==========================================
//    NOVAS FUNÇÕES PARA O LOCALSTORAGE
// ==========================================

function salvarNoLocalStorage() {
    const listaHTML = document.getElementById('listaTarefas');
    const itens = listaHTML.querySelectorAll('li');
    const tarefasParaSalvar = [];

    // Passa por cada <li> e guarda o texto e se está concluída
    itens.forEach(function(li) {
        const texto = li.querySelector('.texto-tarefa').innerText;
        const estaConcluida = li.querySelector('.texto-tarefa').classList.contains('concluida');
        
        tarefasParaSalvar.push({
            texto: texto,
            concluida: estaConcluida
        });
    });

    // Transforma a lista de objetos em texto e guarda no navegador
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefasParaSalvar));
}

function carregarDoLocalStorage() {
    const tarefasGuardadas = localStorage.getItem('minhasTarefas');
    
    // Se não houver nada guardado, interrompe a função
    if (!tarefasGuardadas) return;

    // Transforma o texto de volta num array/lista de objetos JavaScript
    const tarefas = JSON.parse(tarefasGuardadas);
    const lista = document.getElementById('listaTarefas');

    // Recria cada tarefa visualmente na página
    tarefas.forEach(function(tarefa) {
        const li = document.createElement('li');
        
        // Verifica se a tarefa já estava concluída para adicionar a classe CSS
        const classeConcluida = tarefa.concluida ? 'concluida' : '';

        li.innerHTML = `
            <span class="texto-tarefa ${classeConcluida}">${tarefa.texto}</span>
            <div>
                <button class="btn-concluir" onclick="concluirTarefa(this)">✓ Concluir</button>
                <button class="btn-excluir" onclick="removerTarefa(this)">Excluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

// Executa automaticamente a função de carregar assim que a página abre
carregarDoLocalStorage();