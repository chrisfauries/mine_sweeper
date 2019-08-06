function buildMineBoard(width, height, mines) {
    let matrix = new Array(height).fill(0);
    matrix = matrix.map(_ => new Array(width).fill(0));
    placeMinesRandomly(matrix, mines);
    labelSpacesAdjacentToMines(matrix);
    return matrix;
}

function buildSelectionBoard(width, height) {
    let matrix = new Array(height).fill(0);
    matrix = matrix.map(_ => new Array(width).fill(false));
    return matrix;
}

function placeMinesRandomly(matrix, mines) {
    let i = 0;
    while(i < mines) {
        let randomCol = Math.floor(Math.random() * matrix.length);
        let randomRow = Math.floor(Math.random() * matrix[0].length);
        if(!matrix[randomCol][randomRow]) {
            matrix[randomCol][randomRow] = -1;
            i++;
        }
    }
}

function labelSpacesAdjacentToMines(matrix) {
    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if(cell === -1) {
                for(let i = -1; i <= 1; i++) {
                    if(matrix[rowIndex - 1] === undefined) {
                        break;
                    }
                    let neighbor = matrix[rowIndex - 1][colIndex + i];
                    if(neighbor !== undefined && neighbor >= 0) {
                        ++matrix[rowIndex - 1][colIndex + i];
                    }
                }
                for(let i = -1; i <= 1; i++) {
                    if(matrix[rowIndex + 1] === undefined) {
                        break;
                    }
                    let neighbor = matrix[rowIndex + 1][colIndex + i];
                    if(neighbor !== undefined && neighbor >= 0) {
                        ++matrix[rowIndex + 1][colIndex + i];
                    }
                }
                for(let i = -1; i <= 1; i+=2) {
                    let neighbor = matrix[rowIndex][colIndex + i];
                    if(neighbor !== undefined && neighbor >= 0) {
                        ++matrix[rowIndex][colIndex + i];
                    }
                }
            }
        })
    })
}


function updateSelectionBoard(mineBoard, selectionBoard, X, Y) {
    if(mineBoard[X][Y] < 0) {
        return 'game over!';
    }
    if(mineBoard[X][Y] > 0) {
        selectionBoard[X][Y] = true;
    }
    if(mineBoard[X][Y] === 0) {
        updateAndCheckNeighbors(mineBoard, selectionBoard, X, Y);
    }



    function updateAndCheckNeighbors(mineBoard, selectionBoard, X, Y) {
        selectionBoard[X][Y] = true;
        for(let i = -1; i <= 1; i++) {
            if(mineBoard[X - 1] === undefined) {
                break;
            }
            let neighbor = mineBoard[X - 1][Y + i];
            if(neighbor !== undefined && neighbor >= 0) {
                if(neighbor === 0 && !selectionBoard[X - 1][Y + i]) {
                    updateAndCheckNeighbors(mineBoard, selectionBoard, X - 1, Y + i)
                } else {
                    selectionBoard[X - 1][Y + i] = true;
                }
            }
        }
        for(let i = -1; i <= 1; i++) {
            if(mineBoard[X + 1] === undefined) {
                break;
            }
            let neighbor = mineBoard[X + 1][Y + i];
            if(neighbor !== undefined && neighbor >= 0) {
                if(neighbor === 0 && !selectionBoard[X + 1][Y + i]) {
                    updateAndCheckNeighbors(mineBoard, selectionBoard, X + 1, Y + i)
                } else {
                    selectionBoard[X + 1][Y + i] = true;
                }
            }
        }
        for(let i = -1; i <= 1; i+=2) {
            let neighbor = mineBoard[X][Y + i];
            if(neighbor !== undefined && neighbor >= 0) {
                if(neighbor === 0 && !selectionBoard[X][Y + i]) {
                    updateAndCheckNeighbors(mineBoard, selectionBoard, X, Y + i)
                } else {
                    selectionBoard[X][Y + i] = true;
                }
            }
        }
    }
}