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
const initVec = [1, 1];

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
    
    // Call deck of cards API, initialize a deck or two (three decks)
    request(newdeck, (error, response, body) => {
        if(error) console.log(error)
        console.log(`Deck request: ${response.statusCode}`);
        counter2 = 0;
        
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
                console.log(data);
                for(let x in data.cards){
                    cards[i].push(data.cards[x].code);
                }
                //console.log(cards);

                //After last bot has drawn cards, return to front end is generated
                if(counter2 == botNum){
                    
                    B = [charid];
                    //This code line was taken from stack overflow: https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-element-wise-in-javascript
                    temp  = character_models.filter(n => !B.includes(n));
                    // this code line was taken from Dev.to: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
                    temp2 = temp.sort((a, b) => 0.5 - Math.random());
                    for(let i = 0; i < botNum; i++){
                        botModels[i] = temp2[i];
                    }

                    //console.log(`Just before compilation into string vector: ${cards}`);
                    gameData[gameData.length] = JSON.stringify({deckid: deck, hands: cards, bots: botModels, treaties: treaty_pile, discard: discard_pile, stateVec: initVec});
                    gameID = gameData.length-1;
                    
                    retString = JSON.stringify({ gameid : gameID, gameInfo: JSON.parse(gameData[gameID])});

                    res.send(retString);
                    console.log(retString);
                }
                counter2 += 1;
            });
        };
    });
});

app.get('/draw_card/:gameid/:playerid/:num_draw', (req, res) => {

    gameID = Number(req.params.gameid);
    let playerID = Number(req.params.playerid);
    let numDraw = Number(req.params.num_draw);
    
    data = JSON.parse(gameData[gameID]);

    const drawcard = `https://deckofcardsapi.com/api/deck/${data.deckid}/draw/?count=${numDraw}`;

    request(drawcard, (error, response, body) => {

        if(error) console.log(error)
        console.log(response.statusCode);
        
        let newcards = JSON.parse(body);
        for(let x in newcards.cards){
            data.hands[playerID].push(newcards.cards[x].code);
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
    let handIdx = [];

    let data = JSON.parse(gameData[gameID]);

    for(let x = 0; x < data.hands.length; x++){
        for(let y = 0; y < data.hands[x].length; y++){
            if(data.hands[x][y][0].includes("J") || data.hands[x][y][0].includes("Q") || data.hands[x][y][0].includes("K")){
                handIdx.push(x);
                bool = true;
                break;
            }
        };
    };
    retVal = JSON.stringify({isVeto: bool, handIndex: handIdx});
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
        currentGame.treaty_pile_pile.push(cardid);
    }else if(action.includes(cardCode.charAt(0))){
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


app.get('/fail_play/:gameid/:playerid/:cardid', (req, res) => {
    // discard the card 
});

app.get('/state_change/:gameid/:changeType/:changeVal', (req, res) => {
    gameID = Number(req.params.gameid);
    let type = Number(req.params.changeType);
    let val = Number(req.params.changeVal);

    let data = JSON.parse(gameData[gameID]);

    data.stateVec[type] = data.stateVec[type] + val;

    gameData[gameID] = JSON.stringify(data);
    res.send(gameData[gameID]);
    console.log(gameData[gameID]);

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



