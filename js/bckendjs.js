// Script to run the backend of a game server

/* Things to add:

    game hosting
    handing api calls
    etc


    Back end stuff! 
    When a user clicks onto the online game page, 
    they need to obtain a game id, and pick their character, 
    after this, bots should be generated and calls to a ChatGPT
     api should be made to instantialize characters. 

    Return game id, instantialize
*/

const request = require("request");
const express = require('express');
const cors = require('cors');

// Methods
const app = express();
app.use(cors());

//API Keys
const GPT_KEY = "";
const Deck_KEY = "";
const GGlCal_KEY = "AIzaSyA5fjHr2agoW93queC4T9jUYg1ay0FzP7o";

//URL's
const newdeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=3";


//vars
let character_models = ['penguin', 'squirrel', 'worm', 'pigeon']; // fill this in here

var gameID = 0;
var gameData = [];
const PORTID = 3000;
var currentDeck = null;

//Hello world request
app.get('/', (req, res) => {
    res.send('Ready to receive game start');
    console.log(`Game Ready to be Initialized`);
    // possibly include a language conversion???
});

app.get('/start_game/:charid/:botNum', (req, res) => {


    let charid = String(req.params.charid);
    let botNum = Number(req.params.botNum);
    var botModels = [];
    var deck = "";
    var treaty_pile = [];
    var discard_pile = [];
    var cards = [];
    
    //Vector Read as: numDraw, numAct
    const initVec = [1, 1];
    
    // Call deck of cards API, initialize a deck or two (three decks)
    request(newdeck, (error, response, body) => {
        if(error) console.log(error)
        console.log(`Deck request: ${response.statusCode}`);
        
        //console.log(body);
        let data = JSON.parse(body);
        deck = data.deck_id;

        // initial draw!
        for(let i = 0; i < botNum+1; i++) {
            cards[i] = [];
            let draw = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=3`;
            //console.log(`Requesting a draw request with url: ${draw}`);
            request(draw, (error, response, body)=>{

                if(error) console.log(error)
                console.log(`Draw request ${i}, ${response.statusCode}`);

                let data = JSON.parse(body);
                //console.log(data);
                for(let x in data.cards){
                    cards[i].push(data.cards[x].code);
                }
                //console.log(cards);
                if(i == botNum){
                    
                    B = [charid];
                    //This code line was taken from stack overflow: https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-element-wise-in-javascript
                    temp  = character_models.filter(n => !B.includes(n));
                    // this code line was taken from Dev.to: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
                    temp2 = temp.sort((a, b) => 0.5 - Math.random());
                    for(let i = 0; i < botNum; i++){
                        botModels[i] = temp2[i];
                    }

                    console.log(`Just before compilation into string vector: ${cards}`);
                    gameData[gameData.length] = JSON.stringify({deckid: deck, hands: cards, bots: botModels, treaties: treaty_pile, discard: discard_pile});
                    gameID = gameData.length-1;
                    
                    retString = JSON.stringify({ gameid : gameID, gameInfo: JSON.parse(gameData[gameID])});

                    res.send(retString);
                    console.log(retString);
                }
            });
        };
    });
});

app.get('/draw_card/:gameid/:num_draw', (req, res) => {

    gameID = req.params.gameid;
    let numDraw = req.params.num_draw;
    
    currentDeck = JSON.parse(gameData[gameID]);

    const drawcard = `https://deckofcardsapi.com/api/deck/${data.deckid}/draw/?count=${numDraw}`;

    request(drawcard, (error, response, body) => {

        if(error) console.log(error)
        console.log(response.statusCode);
        
        let newcards = JSON.parse(body);
        for(let x in newcards.cards){
            data.hands[0].push(newcards.cards[x].code);
        }

        gameData[gameID] = JSON.stringify(data);
        res.send(gameData[gameID]);
        console.log(gameData[gameID]);
    });
});

app.get('/vetos_in_game/:gameid', (req,res) => {
    // is sent a game id, and returns a boolean and what hands have a veto card to play if any. 
    gameID = Number(req.params.gameid);
    let bool = false;
    let hands = [];

    let data = JSON.parse(gameData[gameID]);

    for(let x in data.cards){
        for(y in x){
            if(y.includes("J") || y.includes("Q") || y.includes("K")){
                hands.push[data.cards.indexOf(x)]
                bool = true;
            }
            break;
        }
    };
    retVal = JSON.stringify({isVeto: bool, handIndex: hands});
    res.send(retVal);
    console.log(retVal);
});


app.get('/play_card/:gameid/:playerid/:cardid', (req, res) => {

    // get relevant info
    gameID = Number(req.params.gameid);
    let idx = Number(req.params.playerid);
    let cardCode = String(req.params.cardid);

    // add card to discard pile if action or veto, add to treaty pile if treaty
    currentGame = JSON.parse(gameData[gameID]);


    treaty = ["A", "2", "3", "4", "5"];
    action = ["6", "7", "8", "9", "0"];
    if(treaty.includes(cardCode.charAt(0))){
        // treaty protocol
        
        currentGame.discard_pile.push(cardid);
    }else if(ection.includes(cardCode.charAt(0))){
        // action protocol

        currentGame.discard_pile.push(cardid);
    }else{
        // veto protocol

        currentGame.discard_pile.push(cardid);
    }
});

app.get('/bots_turn/:gameid/:botid/:success', (req, res) => {

    // draw

    // play cards

    // generate dialogue

    // end turn

});


app.get('/update_map/', (req, res) => {

    // google maps things

});

app.get('/add_to_schedule/:scheduleID', (req, res) => {

    // Add event to your google calender

});

app.listen(PORTID, function () {
    console.log(`Running on Port ID: ${PORTID}, and waiting!`)
});


function CardConverter(cardid, deckid, handid) {
 
    // this function will most likely be placed in a different place in the code, or scrapped entirely due to changes in code.

    // takes card id as given from player, and returns the corresponding
    // deck of cards card id. A different verison of this function will run backwards. 

}


//Functions that run the game need to be added, either here or to the front end file


