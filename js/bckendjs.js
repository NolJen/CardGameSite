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

const app = express();

const GPT_KEY = "";
const Deck_KEY = "";
const GGlCal_KEY = "AIzaSyA5fjHr2agoW93queC4T9jUYg1ay0FzP7o";

var gameGen = 0;
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
    
    // Call deck of cards API, initialize a deck or two

    // Create Bots

    // Decide turn order

    
    retString = JSON.stringify({ gameid : gameGen += 1, handid : playerPile})

    res.send(retString)
    console.log(retString)
});

app.get('/play_card/:handid/:cardid/:deckid', (req, res) => {

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


