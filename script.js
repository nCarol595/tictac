const gameBoard = (function() {
    const gameArray = [{ pos: 0, mark: null }, { pos: 1, mark: null }, { pos: 2, mark: null }, { pos: 3, mark: null },
        { pos: 4, mark: null }, { pos: 5, mark: null }, { pos: 6, mark: null }, { pos: 7, mark: null }, { pos: 8, mark: null }
    ];
    const box = () => {
        let disBox = document.getElementById("gameboard");
        disBox.innerHTML = '';
        gameArray.forEach(space => {
            let spot = `<p id="ma${space.pos}"></p>`;
            disBox.insertAdjacentHTML("afterbegin", spot);
            let pos2 = 'ma' + space.pos;
            let bClass = document.getElementById(pos2);
            bClass.addEventListener('click', () => {
                controlGame.move(pos2);
            })
        });
    };
    return { box }
})();

const Player = (name, mark) => {
    const getName = name;
    const getMark = mark;
    return { getName, getMark };
};

const controlGame = (function() {
    let name1 = window.prompt("Player 1: ");
    if (name1 == null || name1 == '') {
        alert("You failed to enter name, Your name was chosen for you!")
        name1 = 'Player 1';
    }
    let n1 = document.getElementById("name1");
    n1.innerHTML = `<strong>Player 1:</strong> ${name1}`;
    let n2 = document.getElementById("name2");
    let pName1 = Player(name1, 'x');
    let name2 = window.prompt("Player 2: ");
    if (name2 == null || name2 == '') {
        alert("You failed to enter name, Your name was chosen for you!")
        name2 = 'Player 2';
    }
    n2.innerHTML = `<strong>Player 2:</strong> ${name2}`;
    let pName2 = Player(name2, 'o');

    let activePlayer = pName1;
    let activemark = 'x';
    let winner = false;
    let emptySpots = 9;
    const winMethod = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let x_arr = [];
    let o_arr = [];

    function move(e) {
        let clicked_id = e;
        let disId = document.getElementById(clicked_id);
        if (disId.disabled != true) {
            disId.disabled = true;

            if (activemark == 'x') {
                disId.innerHTML = 'X';
                let playPos = parseInt(clicked_id[2], 10);
                x_arr.push(playPos);
                emptySpots = emptySpots - 1;

                winMethod.forEach(sub => {
                    let x_result = sub.every((r) => x_arr.includes(r));
                    let o_result = sub.every((r) => o_arr.includes(r));
                    if (x_result || o_result) {
                        let winDecide = x_result ? 'x' : 'o';
                        if (pName1.getMark == winDecide) {
                            winner = true;
                            let str = `${activePlayer.getName} WON! <button id="newGame">Play Again?</button`;
                            //let str = activePlayer.getName + " WON!";
                            let winDisplay = document.getElementById("display_winner");
                            winDisplay.innerHTML = str;
                            let reBegin = document.getElementById("newGame");
                            reBegin.addEventListener('click', () => {
                                location.reload();
                            })

                        } else {
                            winner = true;
                            let str = `${activePlayer.getName} WON! <button id="newGame">Play Again?</button`;
                            //let str = activePlayer.getName + " WON!";
                            let winDisplay = document.getElementById("display_winner");
                            winDisplay.innerHTML = str;
                            let reBegin = document.getElementById("newGame");
                            reBegin.addEventListener('click', () => {
                                location.reload();
                            })
                        }
                    } else if (emptySpots == 0 && (!x_result || !o_result)) {
                        let str = `It's a TIE! <button id="newGame">Play Again?</button`;
                        //let str = activePlayer.getName + " WON!";
                        let winDisplay = document.getElementById("display_winner");
                        winDisplay.innerHTML = str;
                        let reBegin = document.getElementById("newGame");
                        reBegin.addEventListener('click', () => {
                            location.reload();
                        })


                    }
                });

                activemark = "o";
                activePlayer = pName2;


            } else {
                disId.innerHTML = 'O';
                let playPos = parseInt(clicked_id[2], 10);
                o_arr.push(playPos);
                emptySpots = emptySpots - 1;
                winMethod.forEach(sub => {
                    let x_result = sub.every((r) => x_arr.includes(r));
                    let o_result = sub.every((r) => o_arr.includes(r));
                    if (x_result || o_result) {
                        let winDecide = x_result ? 'x' : 'o';
                        if (pName1.getMark == winDecide) {
                            winner = true;
                            let str = `${activePlayer.getName} WON! <button id="newGame">Play Again?</button`;
                            //let str = activePlayer.getName + " WON!";
                            let winDisplay = document.getElementById("display_winner");
                            winDisplay.innerHTML = str;
                            let reBegin = document.getElementById("newGame");
                            reBegin.addEventListener('click', () => {
                                location.reload();
                            })

                        } else {
                            winner = true;
                            let str = `${activePlayer.getName} WON! <button id="newGame">Play Again?</button`;
                            //let str = activePlayer.getName + " WON!";
                            let winDisplay = document.getElementById("display_winner");
                            winDisplay.innerHTML = str;
                            let reBegin = document.getElementById("newGame");
                            reBegin.addEventListener('click', () => {
                                location.reload();
                            })
                        }
                    } else if (emptySpots == 0 && (!x_result || !o_result)) {
                        let str = `It's a TIE! <button id="newGame">Play Again?</button`;
                        //let str = activePlayer.getName + " WON!";
                        let winDisplay = document.getElementById("display_winner");
                        winDisplay.innerHTML = str;
                        let reBegin = document.getElementById("newGame");
                        reBegin.addEventListener('click', () => {
                            location.reload();
                        })


                    }

                });
                activemark = "x";
                activePlayer = pName1;

            }
        } else { alert("Invalid Move!") }
    }
    return { move };
})();
let form = document.getElementById("players");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    gameBoard.box();

});
let reStart = document.getElementById("restart");
reStart.addEventListener('click', () => {
    location.reload();

});