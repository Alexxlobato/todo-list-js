function adicionarTarefa() {
    //Procura na página HTML o campo de texto (<input>) que possui o ID "novaTarefa" e guarda-o nesta variável para podermos interagir com ele.
    const input = document.getElementById('novaTarefa');
    
    //Pega exatamente aquilo que o utilizador digitou dentro do campo de texto e armazena na variável texto. O método trim() é utilizado para remover quaisquer espaços em branco extras no início ou no final do texto, garantindo que a tarefa seja armazenada de forma limpa.
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
}

function removerTarefa(elementoclicado) {
    // Como os botões agora estão dentro de uma <div> no HTML, usamos .closest('li') para encontrar 
    // com segurança o item da lista (<li>) mais próximo acima do botão e removê-lo da interface.
    elementoclicado.closest('li').remove();
}

function concluirTarefa(elementoclicado) {
    // Encontra o item da lista (<li>) pai onde o botão "Concluir" foi clicado.
    const li = elementoclicado.closest('li');
    
    // Procura a tag <span> que contém apenas o texto dentro deste <li> específico.
    const textoTarefa = li.querySelector('.texto-tarefa');
    
    // Adiciona a classe "concluida" se ela não existir, ou remove-a se já existir (efeito liga/desliga).
    textoTarefa.classList.toggle('concluida');
}
