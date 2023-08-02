// Global Variables
let boardTable = new Array(9).fill(null)
let currentPlayer = 0; // 0 for X, 1 for O
let numOfMoves = 0
let Winner = null

// Calculates the wanted Row Index
function getRowIndex(row)
{
    return row * 3
}

// Calculates the wanted Column Index in a row
function getColIndex(col)
{
    return col
}

// Calculates the Cell Index based on the row and col values
function getCellIndex(row, col) {
    return getRowIndex(row) + getColIndex(col)
}

// Print a certian row
function print_row(i)
{
    let color
    if (i == 0) {color = "color: purple"}
    else if (i == 1) {color = "color: orange"}
    else if (i == 2) {color = "color: green"}

    console.log(`%c\n
    (${i}, 0) == ${getPlayerTag(boardTable[getCellIndex(i, 0)])}
    (${i}, 1) == ${getPlayerTag(boardTable[getCellIndex(i, 1)])}
    (${i}, 2) == ${getPlayerTag(boardTable[getCellIndex(i, 2)])}\n`, color);
}

// Print a certian column
function print_col(i)
{
    let color
    if (i == 0) {color = "color: blue"}
    else if (i == 1) {color = "color: darkgreen"}
    else if (i == 2) {color = "color: green"}

    console.log(`%c\n
    (0, ${i}) == ${getPlayerTag(boardTable[getCellIndex(0, i)])}
    (1, ${i}) == ${getPlayerTag(boardTable[getCellIndex(1, i)])}
    (2, ${i}) == ${getPlayerTag(boardTable[getCellIndex(2, i)])}\n`, color);
}

// get player's tag (X or O), which will be used *Multiple* times bellow
function getPlayerTag(playerNumber)
{
    if (playerNumber == null) {
        return "null"
    }

    return playerNumber ? "O" : "X"
}

// Gets the corresponding color for the player either X or O (green or red)
function getPlayerColor(playerNumber)
{
    return playerNumber ? "#e60073" : "#00e673"
}

// Switches between X and O
function switchPlayer()
{
    currentPlayer = !currentPlayer;
}

// checks if the cell already clicked used or not (valid or not)
function isCellAvalible(cellIndex)
{
    return boardTable[cellIndex] == null
}

// plays a cell in the board table
function updateCell(cellIndex)
{
    numOfMoves++
    let playerTag = getPlayerTag(currentPlayer)
    let cellDiv = document.getElementById(`cell-${cellIndex}`)
    boardTable[cellIndex] = currentPlayer
    cellDiv.innerHTML = `<span class="cell-tag-${playerTag} player-${playerTag}">${playerTag}</span>`
}

// Changes the display of which player turn it is, or if theres a winner
function updateDisplay()
{
    let playerTag = getPlayerTag(currentPlayer)
    let oppPlayerTag = getPlayerTag(!currentPlayer)
    let winnerPlayerTag = getPlayerTag(Winner)
    document.getElementById("player-display").innerHTML = Winner == null ?
     `Player <span class="player-${playerTag}">${playerTag}</span>'s turn` :
     `Player <span class="player-${winnerPlayerTag}">${winnerPlayerTag}</span> Has Won!`

    if (Winner != null) {
        document.getElementById(`win-container`).classList.add("show-disp")

        document.getElementById(`winner-disp`).classList.add("show-disp")
        document.getElementById(`winner-disp`).style.setProperty("--shadowColor", getPlayerColor(Winner))

        document.getElementById(`win-player-disp`).innerHTML = `<span class="player-${winnerPlayerTag} cell-tag-${winnerPlayerTag}" style="font-size: 25vh;">${winnerPlayerTag}</span>`

        document.getElementById(`replay-button`).style.setProperty("--WantedColor", getPlayerColor(Winner))
        document.getElementById(`replay-button`).style.backgroundColor = Winner ? "#f6e0e0" : "#e2f6e0"
    } else {
        document.getElementById(`player-disp-${playerTag}`).style.opacity = Winner == null ? 1 : 0
        document.getElementById(`player-disp-${oppPlayerTag}`).style.opacity = 0
    }
}

// Updates the styles for everything in the page
function updateStyle(cellIndex)
{
    let cellDiv = document.getElementById(`cell-${cellIndex}`)
    let wantedColor;

    if (isCellAvalible(cellIndex)) {
        //console.log("True!!");
        wantedColor = getPlayerColor(currentPlayer)
        cellDiv.style.setProperty("--scaleSize", "1.05")
    }
    else {
        //console.log("False!!");
        wantedColor = "none"
        cellDiv.style.setProperty("--scaleSize", "1.0")
    }

    CellsDivs = document.getElementsByClassName("cell")
    for (let i = 0; i < CellsDivs.length; i++)
    {
        CellsDivs[i].style.setProperty("--hoverColor", wantedColor)
        CellsDivs[i].style.setProperty("--bgColor", wantedColor)
    }
}

// Update Board Status
function updateBoard()
{
    if (numOfMoves == 9) {
        Winner = 3
        return
    }
    else {
        for (let i = 0; i <= 2; i++)
        {
            // Check if the whole row is not empty
            if (boardTable[getCellIndex(i, 0)] != null &&
                boardTable[getCellIndex(i, 1)] != null &&
                boardTable[getCellIndex(i, 2)] != null)
            {

                //console.log(`Row ${i} is not full\n`)
                //print_row(i)

                // Check if the whole row was played by one player
                if (boardTable[getCellIndex(i, 0)] == boardTable[getCellIndex(i, 1)]
                && boardTable[getCellIndex(i, 0)] == boardTable[getCellIndex(i, 2)])
                {
                   Winner = boardTable[getCellIndex(i, 0)]
                   console.log(`Row ${i} Got a Winner! currentPlayer=${getPlayerTag(currentPlayer)}, table player=${getPlayerTag(boardTable[getCellIndex(i, 0)])}`);
                   return
                }
            }

            // Check if the whole column is full
            if (boardTable[getCellIndex(0, i)] != null &&
                boardTable[getCellIndex(1, i)] != null &&
                boardTable[getCellIndex(2, i)] != null)
            {

                // console.log(`Col ${i} is NOT full!`);
                // print_col(i)

                // Check if the whole column was played by one player
                if (boardTable[getCellIndex(0, i)] == boardTable[getCellIndex(1, i)]
                && boardTable[getCellIndex(0, i)] == boardTable[getCellIndex(2, i)])
                {
                   Winner = boardTable[getCellIndex(0, i)]
                   console.log(`Col ${i} Got a Winner! currentPlayer=${getPlayerTag(currentPlayer)}, table player=${getPlayerTag(boardTable[getCellIndex(0, i)])}`);
                   return
                }
            }
        }

        // table:
        // 1 - -
        // - 1 -
        // - - 1
        // Check if diagonal cells was full
        if (boardTable[getCellIndex(0, 0)] != null &&
            boardTable[getCellIndex(1, 1)] != null &&
            boardTable[getCellIndex(2, 2)] != null)
        {
            console.log(`Diagonal Cells Full!`);
            // Check if the diagonal cells was played by one player
            if (boardTable[getCellIndex(0, 0)] == boardTable[getCellIndex(1, 1)]
            &&  boardTable[getCellIndex(0, 0)] == boardTable[getCellIndex(2, 2)])
            {
                Winner = boardTable[getCellIndex(0, 0)]
                console.log(`Normal Diag got a winner! currentPlayer=${currentPlayer} table player=${boardTable[getCellIndex(0, 0)]}`);
                return
            }
        }
        else {
            console.log(`Diagonal Cells NOT Full!`);
        }

        // table:
        // - - 1
        // - 1 -
        // 1 - -
        // Check if reverse diagonal was full
        if (boardTable[getCellIndex(2, 0)] != null &&
            boardTable[getCellIndex(1, 1)] != null &&
            boardTable[getCellIndex(0, 2)] != null)
        {
            if (boardTable[getCellIndex(2, 0)] == boardTable[getCellIndex(1, 1)] &&
                boardTable[getCellIndex(2, 0)] == boardTable[getCellIndex(0, 2)])
            {
                Winner = boardTable[getCellIndex(2, 0)]
                console.log(`Reverse Diag got a winner! currentPlayer=${currentPlayer} table player=${boardTable[getCellIndex(0, 0)]}`);
                return
            }
        }
    }
}

// the Action function called when played/clicked on a cell
function playAction(cellIndex)
{
    if (isCellAvalible(cellIndex) && Winner == null)
    {
        updateCell(cellIndex)
        updateBoard()
        switchPlayer()
    }

    updateDisplay()
    updateStyle(cellIndex)

    document.getElementById("test").innerText = "Winner: " + getPlayerTag(Winner)
}

function resetCells() {
    boardTable.fill(null)
    currentPlayer = !currentPlayer
    Winner = null
    numOfMoves = 0
    loadCells()
    updateDisplay()
}

function loadCells() {
    let boardDiv = document.getElementById("board")
    boardDiv.innerHTML = ""

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++)
        {
            let cellIndex = getCellIndex(row, col)
            boardDiv.innerHTML += `<div class="cell" id="cell-${cellIndex}" onclick="playAction(${cellIndex})" onmouseover="updateStyle(${cellIndex})"></div>\n`
            console.log(`Added Cell (${row}, ${col})`)
        }
    }
}