

let hand = [];
var charID = hey; // This should be updated before the new game call
var SERURL = ''; // This should call the new game function with a selected character already chosen!


var xReq = new XMLHttpRequest();
xReq.open("GET", `${SERURL}`);
xReq.send();
xReq.onload = function() {
    const body = JSON.parse(xReq.responseText);

    const gameID = body.gameID;
    const charID = body.charID;
    const pileID = body.pileID;

    // Some code here that starts the game animation / game screen 

    // Some code that makes the player draw their starting cards
}

// xReq for dealing cards and starting game (random order and who goes first)

// xReq wait period for your turn!

// xReq 

// functions that run the game might need to be written here. 






