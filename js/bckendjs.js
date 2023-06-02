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

// Methods
const app = express();

//API Keys
const GPT_KEY = "";
const Deck_KEY = "";
const GGlCal_KEY = "AIzaSyA5fjHr2agoW93queC4T9jUYg1ay0FzP7o";

//URL's
const newndeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=3";


//vars
let character_models = ['penguin', ]; // fill this in here

var gameID = 0;
var gameData = [];
const PORTID = 3000;

//Hello world request
app.get('/', (req, res) => {
    res.send('Ready to receive game start');
    console.log(`Game Ready to be Initialized`);

    // possibly include a language conversion???
});

app.get('/start_game/:charid/:botNum', (req, res) => {

    let charid = req.params.charid;
    let botNum = req.params.botNum;
    let botModels = [];
    let deck = "";
    
    // Call deck of cards API, initialize a deck or two (three decks)
    request(newdeck, (error, response, body) => {
        if(error) console.log(error)
        console.log(response.statusCode);
        
        let data = JSON.parse(body);
        deck = data.deckid;
        console.log(`Deck 1 has been generated with deck id: ${deck}`)
    });

    var cards = [];

    // initial draw!
    for(let i = 0; i < nBots+1; i++) {
        cards[i] = [];
        let draw = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=3`;
        request(draw, (error, response, body)=>{

            if(error) console.log(error)
            console.log(response.statusCode);
            
            let data = JSON.parse(body);
            for(let x in data.cards){
                cards[i].push(x.code);
            }

        });
    };


    B = [charid];
    //This code line was taken from stack overflow: https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-element-wise-in-javascript
    temp  = character_models.filter(n => !B.includes(n));
    // this code line was taken from Dev.to: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    temp2 = temp.sort((a, b) => 0.5 - Math.random());
    for(let i = 0; i < nBots; i++){
        botModels[i] = temp2[i];
    }

    gameData[gameData.length] = JSON.stringify({deckid: deck, hands: cards, bots: botModels, discard: discard_pile});
    gameID = gameData.length-1;
    
    retString = JSON.stringify({ gameid : gameID, gameInfo: JSON.parse(gameData[gameID])});

    res.send(retString);
    console.log(retString);
});

app.get('/draw_card/:gameid/:num_draw', (req, res) => {

    gameID = req.params.gameid;
    numDraw = req.params.num_draw;
    
    let data = JSON.parse(gameData[gameID]);

    const drawcard = `https://deckofcardsapi.com/api/deck/${data.deckid}/draw/?count=${numDraw}`;

    request(drawcard, (error, response, body) => {

        if(error) console.log(error)
        console.log(response.statusCode);
        
        let newcards = JSON.parse(body);
        for(let x in newcards.cards){
            data.cards[0].push(x.code);
        }

    });

    gameData[gameID] = JSON.stringify(data);
    res.send(gameData[gameID]);
    console.log(gameData[gameID]);
});

app.get('/vetos_in_game/:gameid', (req,res) => {

});

app.get('/play_card/:gameid/:cardid', (req, res) => {

    // add card to discard pile

    // enforce card effect 

    // queue bots turns or play another card

});


app.get('/update_map/', (req, res) => {

    // google maps things

});

app.get('/add_to_schedule/:scheduleID', (req, res) => {

    // Add event to your google calender

});

app.listen(PORTID, () => {
    console.log(`Running on Port ID: ${PORTID}, and waiting!`)
});


function CardConverter(cardid, deckid, handid) {
 
    // takes card id as given from player, and returns the corresponding
    // deck of cards card id. A different verison of this function will run backwards. 

}


//Functions that run the game need to be added, either here or to the front end file


