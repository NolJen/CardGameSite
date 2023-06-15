

let gameButton = document.getElementById("start_game");

let cardSlot = document.getElementsByClassName("cards");
var counter = 0;
var cardPlayed = false;
var xReq = new XMLHttpRequest();
var currentCard = null;
var currentCardIdx = null;

gameButton.onclick = function gameStart(){

    botNum = document.getElementById("num_opponents");
    character = document.getElementById("character_select");

    const nBots = botNum.options[botNum.selectedIndex].value;
    const charID = character.options[character.selectedIndex].value;

    console.log(nBots, charID);

    let hand = [];
    var gameID = 0;
    data = null;
    var eligible_players = nBots+1;
    var turn_order = 1;
    var playerElim = false;
    var actions = 0;
    var numActs = 1;
    var numDraw = 1;
    var activeTreaties = [];
    var ActionPool = [["Draw 1 Card", 1], ["Draw 3 Cards", 2], ["Discard 1 Card", 3], ["Discard 2 Cards to Draw 3 Cards", 4], ["Each Player Draws 1 Card", 5], ["Each Player Discards 1 Card", 6]];
    var TreatyPool = [["Draw 1 Additional Card Per Turn", 1], ["You Can Not Go Over 6 Cards", 2], ["You Can’t Speak", 3], ["At The Start of Your Turn You Must Say The Player To Your Rights Name", 4], ["You Can Not Play The Same Type Of Card Twice In a Row", 5], ["You Must Play 2 Cards Per Turn", 6]];
    
    
    var SERURL = "localhost:3000"; // to be updated when hosted on a live website


    xReq.open("GET", `${SERURL}/start_game/${charID}/${nBots}`);
    xReq.send();
    xReq.onload = function() {
        console.log("Hey this got called!");
        const body = JSON.parse(xReq.responseText);
        console.log(xReq.responseText);

        gameID = body.gameID;
        data = JSON.parse(body.gameInfo);
        

        // Some code here that starts the game animation / game screen 
        // bring up game stage (you can set display none to open and close tabs within the same window)
    }
    while (eligible_players > 1 && !playerElim) {

        // Action and Draw Phase
        if(counter == 0){
            // draw call to players hand
            // let player pick cards to play
            let i = data.stateVec[1];
            while(i > 0){
                let passed = false;
                // wait for player to click on a card, wait for a variable to be true.
                // cardPlayed = false, until player clicks on a card.
                while(!cardPlayed){

                }
                xReq.open("GET", `${SERURL}/vetos_in_game/${gameID}`);
                xReq.send();
                xReq.onload = function() {
                    let temp = JSON.parse(xReq.responseText);
                    vetoIdx = temp.handIndex;

                    if(vetoIdx.length > 1){
                        // random number sample to see if bots play veto
                        // scales with number of bots who have a veto

                        if(randomNum > 1){
                            passed = true;
                        }

                    }
                    else if(vetoIdx.includes(0)){
                        // card is automatically passed

                        passed = true;
                    }
                    else{
                        // random number sample to see if bots play veto

                        if(randomNum > 1){
                            passed = true;
                        }
                    }
                }

                // then do veto phase, 
                    // if no veto is played
                if(passed){
                    // play card with success

                    xReq.open("GET", `${SERURL}/play_card/${gameID}/0/${cardCode}`)
                    xReq.send();
                    xReq.onload = function() {
                        let temp = JSON.parse(xReq.responseText)
                    }  

                    // enforce card effect
                    let code = cardCode.charAt(0)
                    treaty = ["A", "2", "3", "4", "5"];
                    action = ["6", "7", "8", "9", "0"];
                    if(treaty.includes(code)){
                        if(code == "A"){

                        }else if(code == "2"){
                            
                        }else if(code == "3"){
                            
                        }else if(code == "4"){
                            
                        }else{
                            
                        }
                    }else if(action.includes(code)){
                        if(code == "6"){

                        }else if(code == "7"){
                            
                        }else if(code == "8"){
                            
                        }else if(code == "9"){
                            
                        }else{
                            
                        }
                    }

                } else {
                    // play card with failure

                }
                cardPlayed = false;
                i += -1;
            }

        } else {
            // draw 
            // call bots play function

        }


            // all players can play a veto card
            // check if players have a veto, if bot use a random number,  
            // if main player, let them decide. 
            // the wait period is always there no matter what as to not give up game info


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




cardSlot.onclick = function playCard(cardIdx){
    card = document.getElementById(`hand${cardIdx}`);
    cardCode = card.val;
    cardPlayed = true;
}
