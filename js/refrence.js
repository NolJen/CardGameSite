

let gameButton = document.getElementById("start_game");

gameButton.onclick = function gameStart(){

    botNum = document.getElementById("num_opponents");
    character = document.getElementById("character_select");

    const nBots = botNum.options[botNum.selectedIndex].value;
    const charID = character.options[character.selectedIndex].value;

    console.log(nBots, charID);

    let hand = [];
    var gameID = 0;
    data = [];
    var eligible_players = nBots+1;
    var turn_order = 1;
    var playerElim = false;
    var actions = 0;
    var numActs = 1;
    var numDraw = 1;
    var activeTreaties = [];
    var ActionPool = [["Draw 1 Card", 1], ["Draw 3 Cards", 2], ["Discard 1 Card", 3], ["Discard 2 Cards to Draw 3 Cards", 4], ["Each Player Draws 1 Card", 5], ["Each Player Discards 1 Card", 6]];
    var TreatyPool = [["Draw 1 Additional Card Per Turn", 1], ["You Can Not Go Over 6 Cards", 2], ["You Can’t Speak", 3], ["At The Start of Your Turn You Must Say The Player To Your Rights Name", 4], ["You Can Not Play The Same Type Of Card Twice In a Row", 5], ["You Must Play 2 Cards Per Turn", 6]];
    var SERURL = "localhost:3000"; // This should call the new game function with a selected character already chosen!


    var xReq = new XMLHttpRequest();
    xReq.open("GET", `${SERURL}/start_game/${charID}/${nBots}`);
    xReq.send();
    xReq.onload = function() {
        console.log("Hey this got called!");
        const body = JSON.parse(xReq.responseText);
        console.log(xReq.responseText);

        gameID = body.gameID;
        data = body.gameInfo;
        

        // Some code here that starts the game animation / game screen 
        // bring up game stage (you can set display none to open and close tabs within the same window)
    }
    counter = 0;
    while (eligible_players > 1 && !playerElim) {

        // Action and Draw Phase
        if(counter == 0){
            // draw call to players hand
            // let player pick cards to play
            let i = actions;
            while(i > 0){

            }

        } else {
            // draw 
            // call backend to play bots turn

        }

        // Veto Phase

        xReq.open("GET", `${SERURL}/vetos_in_game/${gameID}`);
        xReq.send();
        xReq.onload = function() {
            let temp = JSON.parse(xReq.responseText)
        }

            // all players can play a veto card
            // check if players have a veto, if bot use a random number,  
            // if main player, let them decide. 
            // the wait period is always there no matter what as to no give up game info


        // results phase

            // eligible players might change

        // game mod phase

            // treaty cards go into effect
            // if statement structure to see the effect of the card played. 
            //things like draw count and action count are affectedd. 


        //end of turn
        counter = counter + turn_order;
        if(counter < 0){
            counter = eligible_players + counter;
        }
        playerElim = true;
    }
}

//for google calls, this might go in a differnt file
/*
let GOOGLEURL = "";

var googleReq = new XMLHttpRequest();
googleReq.open("GET", `${GOOGLEURL}`);
googleReq.send();
googleReq.onload = function() {
    const body = JSON.parse(googleReq.responseText);

    
}

*/