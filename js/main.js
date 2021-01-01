const grid = document.querySelector(".grid");
const actionButton = document.getElementById('start');
let score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let scoreValue = 0;
let intervalTime = 1000;
let timeId = 0;



//Grid in which the snake can move

function createGrid() {

    for (let i = 0; i < 100; i++) {

        const square = document.createElement('div');

        square.classList.add('square');

        grid.appendChild(square);

        squares.push(square);

    }

};

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));



//start game

function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    
    squares[appleIndex].classList.remove('apple');
    
    clearInterval(timeId);
    currentSnake = [2, 1, 0];
    scoreValue = 0;
    score.textContent = scoreValue;
    direction = 1;
    intervalTime = 1000;
    genApples();
    
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    
    timeId = setInterval(move, intervalTime);

}







//moving the snake 

function move() {


    if (

        (currentSnake[0] + width >= width * width && direction === width) ||

        (currentSnake[0] % width === width - 1 && direction === 1) ||

        (currentSnake[0] % width === 0 && direction === -1) ||

        (currentSnake[0] - width < 0 && direction === -width) ||

        squares[currentSnake[0] + direction].classList.contains('snake')
    )

        return clearInterval(timeId);



    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');

    let head = currentSnake.unshift(currentSnake[0] + direction);



    //snake head getting the apple

    if (squares[currentSnake[0]].classList.contains('apple')) {

        squares[currentSnake[0]].classList.remove('apple');

        squares[tail].classList.add('snake');

        currentSnake.push(tail);

        genApples();

        scoreValue++;

        score.textContent = scoreValue;

        clearInterval(timeId)

        intervalTime = intervalTime * 0.9

        timeId = setInterval(move, intervalTime);
    }


    squares[currentSnake[0]].classList.add('snake');

};





//grnerating random apples

function genApples() {

    do {

        appleIndex = Math.floor(Math.random() * squares.length)

    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple');
};

genApples();



//snake control using keycodes

function control(e) {

    if (e.keyCode === 39) {

        direction = 1;

    } else if (e.keyCode === 38) {

        direction = -width;

    } else if (e.keyCode === 37) {

        direction = -1;

    } else if (e.keyCode === 40) {

        direction = +width;
    }
};

document.addEventListener('keyup', control);

actionButton.addEventListener('click', startGame);
