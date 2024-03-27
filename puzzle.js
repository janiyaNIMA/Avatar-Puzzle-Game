var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank title

var turns = 0;

var imgOder = ["3", "5", "2", "1", "6", "9", "7", "8", "4",];

window.onload = function(){
    for (let r=0; r<rows; r++){

        for (let c=0; c<columns; c++){
        
            let tile = document.createElement("img");
            tile.id = r.toString()+"-"+c.toString();
            tile.src = imgOder.shift()+".jpg";

            //image drag

            tile.addEventListener("dragstart",dragstart);
            tile.addEventListener("dragover",dragover);
            tile.addEventListener("dragenter",dragenter);
            tile.addEventListener("dragleave",dragleave);
            tile.addEventListener("drop",drop);
            tile.addEventListener("dragend",dragend);

            document.getElementById("board").append(tile);
        }
    }
}

function dragstart(){
    currTile = this;
}

function dragover(e){
    e.preventDefault();
}

function dragenter(e){
    e.preventDefault();
}

function dragleave(){
    
}

function drop(){
    otherTile = this;
}

function dragend(){

    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}
