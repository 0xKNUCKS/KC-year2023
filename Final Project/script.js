// Global Variables
let boardTable = new Array(9).fill(null)
let currentPlayer = 0; // 0 for X, 1 for O
let numOfMoves = 0
let Winner = -1

// Calculates the wanted Row Index
function getRowIndex(row)
{
    return row * 3
}

// Calculates the wanted Column Index in a row
function getColIndex(rowIndex, col)
{
    return rowIndex + col
}

// Calculates the Cell Index based on the row and col values
function getCellIndex(row, col) {
    return getColIndex(getRowIndex(row), col)
}

// get player's tag (X or O), which will be used *Multiple* times bellow
function getPlayerTag(playerNumber)
{
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

// Changes the display of which player turn it is
function updateDisplay()
{
    let playerTag = getPlayerTag(currentPlayer)
    let oppPlayerTag = getPlayerTag(!currentPlayer)
    document.getElementById("player-display").innerHTML = `Player <span class="player-${playerTag}">${playerTag}</span>'s turn`

    document.getElementById(`player-disp-${playerTag}`).style.setProperty("--displayOpacity", 1);
    document.getElementById(`player-disp-${oppPlayerTag}`).style.setProperty("--displayOpacity", 0);
}

// Updates the styles for everything in the page
function updateStyle(cellIndex)
{
    let cellDiv = document.getElementById(`cell-${cellIndex}`)
    let wantedColor;

    if (isCellAvalible(cellIndex) || Winner != -1) {
        console.log("True!!");
        wantedColor = getPlayerColor(currentPlayer)
        cellDiv.style.setProperty("--scaleSize", "1.05")
    }
    else {
        console.log("False!!");
        wantedColor = "none"
        cellDiv.style.setProperty("--scaleSize", "1.0")
    }

    CellsDivs = document.getElementsByClassName("cell")
    for (let i = 0; i < CellsDivs.length; i++)
    {
        CellsDivs[i].style.setProperty("--hoverColor", Winner != -1 ? getPlayerColor(Winner) : wantedColor)
        CellsDivs[i].style.setProperty("--bgColor", Winner != -1 ? getPlayerColor(Winner) : wantedColor)
    }
}

// Update Board Status
function updateBoard(cellIndex)
{
    if (numOfMoves == 9) {
        Winner = 0
        return
    }
    else {
        for (let col = 0; col <= 2; col++) {
            for (let row = 1; row <= 2; row++)
            {
                let currCellIndex = getCellIndex(row, col)
                let prevCellIndex = getCellIndex(row - 1, col)
                if (boardTable[currCellIndex] == null || boardTable[getCellIndex(row, 0)] == null) {
                    return
                }

                if (boardTable[prevCellIndex] == boardTable[currCellIndex]) {
                    Winner = currentPlayer
                    return
                }
            }
        }
    }
}

// the Action function called when played/clicked on a cell
function playAction(cellIndex)
{
    if (isCellAvalible(cellIndex))
    {
        updateCell(cellIndex)
        //updateBoard(cellIndex)
        switchPlayer()
        updateDisplay()
        updateStyle(cellIndex)
    }
}

function loadCells() {
    let boardDiv = document.getElementById("board")

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++)
        {
            let cellIndex = getCellIndex(row, col)
            let divHTML = boardDiv.innerHTML;
            boardDiv.innerHTML = divHTML + `<div class="cell" id="cell-${cellIndex}" onclick="playAction(${cellIndex})" onmouseover="updateStyle(${cellIndex})"></div>\n`
            console.log(`Added Cell (${row}, ${col})`)
        }
    }
}