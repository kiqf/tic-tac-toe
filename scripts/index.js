// Função para exibir qual jogador tem a vez no jogo
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Variáveis principais de controle do jogo
let gameActive = true; // Controla se o jogo está em andamento
let currentPlayer = "X"; // Define o jogador inicial como "X"
let gameState = ["", "", "", "", "", "", "", "", ""]; // Armazena o estado atual do tabuleiro

// Funções para exibir mensagens de vitória ou empate
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

// Atualiza o status do jogo na interface (turno do jogador)
const statusDisplay = document.querySelector('.game-status');
statusDisplay.innerHTML = currentPlayerTurn();

// Adiciona eventos de clique às células do jogo e ao botão de reiniciar
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

// Função chamada quando uma célula do jogo é clicada
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target; // Obtém a célula clicada
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Pega o índice da célula

  // Impede jogadas em células preenchidas ou se o jogo não estiver ativo
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Atualiza o estado do jogo com a jogada feita
  handleCellPlayed(clickedCell, clickedCellIndex);
  
  // Valida se houve um vencedor ou empate após a jogada
  handleResultValidation();
}

// Atualiza a célula jogada e o estado do jogo
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer; // Atualiza o estado do jogo com o jogador atual
  clickedCell.innerHTML = currentPlayer; // Mostra o símbolo do jogador na célula clicada
}

// Condições de vitória possíveis (linhas, colunas e diagonais)
const winningConditions = [
  [0, 1, 2], // Primeira linha
  [3, 4, 5], // Segunda linha
  [6, 7, 8], // Terceira linha
  [0, 3, 6], // Primeira coluna
  [1, 4, 7], // Segunda coluna
  [2, 5, 8], // Terceira coluna
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal secundária
];

// Verifica se há um vencedor ou empate após cada jogada
function handleResultValidation() {
  let roundWon = false;

  // Verifica cada condição de vitória
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    // Se qualquer célula da condição de vitória estiver vazia, continue
    if (a === '' || b === '' || c === '') {
      continue;
    }

    // Se todas as células da condição forem iguais, alguém venceu
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  // Se houver um vencedor, exibe a mensagem e encerra o jogo
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  // Verifica se todas as células estão preenchidas, ou seja, se houve empate
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  // Se não houve vitória ou empate, muda o jogador
  handlePlayerChange();
}

// Alterna o jogador atual entre "X" e "O"
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna o jogador
  statusDisplay.innerHTML = currentPlayerTurn(); // Atualiza o turno na interface
}

// Reinicia o jogo para um novo começo
function handleRestartGame() {
  gameActive = true; // Reativa o jogo
  currentPlayer = "X"; // Define o jogador inicial como "X"
  gameState = ["", "", "", "", "", "", "", "", ""]; // Reseta o estado do tabuleiro

  // Atualiza o status na interface e limpa as células do jogo
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//
const main = document.querySelector("main")
const root = document.querySelector(":root")

document.getElementById('themeSwitcher').addEventListener('click', function() {
  const body = document.querySelector('body');

  if (body.dataset.theme === 'dark') {
    // Define o tema light
    body.dataset.theme = 'light';

  } else {
    // Define o tema dark
    body.dataset.theme = 'dark';
 }
});