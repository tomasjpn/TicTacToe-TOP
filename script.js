
//1. Erstmal alle DOM Elemente rausgeholt und in Variablen gespeichert
const allCells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-message");
const restartButton = document.getElementById("RestartBtn");

//Variablen für Spieler, Gameboard und Session erstellt
let currentPlayer = "X";
let gameBoard = ["","","","","","","","",""];
let gameActive = true; 

//Funktionsweise für die Auslösung eines Clicks
const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = Array.from(allCells).indexOf(clickedCell)

    if (gameActive === true && gameBoard[cellIndex]=== ""){ //gameBoard[cellIndex] ==== "": Wenn das Spielfeld leer ist 
        gameBoard[cellIndex] = currentPlayer; //Den Wert des aktuellen Feldes wird auf den aktuellen Spieler gesetzt
        updateCell(clickedCell); // angeklicktes Feld
        checkWinner();
        switchPlayer();

    }

}





// Für jedes Feld wird ein EvenListener als Click hinzugefügt
allCells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
    
});


// das derzeitige Feld wird auf den aktuellen Spieler gesetzt
const updateCell = (clickedCell) =>{
//...dabei wird in DOM die Zelle aktualisiert.
   clickedCell.classList.add(currentPlayer.toLowerCase());
   updateBoard(); //Update Board Funktion aufgerufen, um die Visuelle Darstellung zu updaten

}


// Abwechslung der Spieler
const switchPlayer = () => {
 // Wenn X gerade ist, wird es auf = gesetzt und vice versa
    currentPlayer = currentPlayer === "X" ? "Circle" : "X"

}


// Überprüfung des Winners
const checkWinner = () => {
    // Alle möglichen Kombinationen für einen Sieg
    const winPatterns = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],  // Horizontal
        [0, 3, 6],[1, 4, 7],[2, 5, 8], // Vertikal
        [0, 4, 8],[2, 4, 6]            // Diagonal
    ]

    // Das Array wird iteriert
    for (let i=0; i<winPatterns.length; i++){
        // Aus dem Sub-Arrays[i] werden die Werte destruktiert in a, b c
        const [a,b,c] = winPatterns[i];
        // Wenn gameBoard [a] !==null: Wenn das also nicht leer ist => Sicherheitsmaßnahme, dass das Spielstein, das gerade überprüft wird, tatsächlich ein Spielstein enthält
        // Wenn gameBoard [a] === gameBoard [b]
        // Wenn gameBoard [a] === gameBoard [c]
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            // aktuelle Game Session wird beendet
            gameActive = false; 
            //Gewinner wird im Screen aufpoppen
            displayWinner(currentPlayer);
            return; 


        }
    }

    // !gameBoard.includes(""): Wenn schon alle Felder besetzt und trotzdem gameActive true ist
    if(!gameBoard.includes("") && gameActive === true ){
        gameActive = false; // Dann wird Session erstmal beendet
        displayWinner("Draw") // Unentschieden angezeigt
    }
}
// Screen der den Gewinner anzeigt
const displayWinner = (winner) => {
    if(winner === "Draw"){ // Wenn Draw, dann Draw
        winningMessage.textContent = "Draw";
    } else {
        winningMessage.textContent = `${winner} has won the game!`;
    }

    // In DOM den show: also Blackscreen mit Winner Message anzeigen
    winningMessage.classList.add("show");
    
    //Restart Button Toggle 
    document.getElementById("RestartBtn").style.display = 'block';
    document.getElementById("RestartBtn").style.position = 'relative';
    
};

//Wenn Spielbrett voll ist
const isBoardFull = () => {
    if (!gameBoard.includes("")){
        return true;
    }else {
        return false; 
    }
}



// Restart Funktion
const restartGame = () => {
    

    //Alle Variablen werden zurückgesetzt
    currentPlayer = "X";
    gameBoard = ["","","","","","","","",""];
    winningMessage.classList.remove("show");






    allCells.forEach((cell) => {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.textContent = ""; //Der Text Content wird gelöscht
    })




    gameActive = true;

    restartButton.style.display = 'none'; // RestartButton ausgeblendet

}

//Wenn restartButton angeklickt wird, dann Funktion Restart ausgeführt
restartButton.addEventListener("click",restartGame);

// Die Visuelle Veränderung am Board
const updateBoard = () => {
    //Array iteriert
    for (let i= 0; i < allCells.length; i++){
        // Array für das DOM(allCells bei Index i) der Textcontent wird auf den Stand des gameBoard[i] gesetzt
        allCells[i].textContent = gameBoard[i];
    }
}


const hoverClass = () => {
    board.classList.remove("x");
    board.classList.remove("circle");
    if (currentPlayer === "X") {
        board.classList.add("x");
    } else {
        board.classList.add("circle");
    }
};

board.addEventListener("mouseover", hoverClass);
board.addEventListener("mouseout", () => {
    board.classList.remove("x");
    board.classList.remove("circle");
});

