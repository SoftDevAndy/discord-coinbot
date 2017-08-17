var Discord = require('discord.io');
var request = require('request');
var auth = require('./discordBotToken.json');

// Libs and global variables

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

// Initializing the bot

bot.on('message', function (user, userID, channelID, message, evt){

    if(message.substring(0, 1) == '!'){ 

    	// Making sure a command is sent to the bot i.e !command it must start with an !

        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        // Cleaning up the arguments

        switch(cmd){

            case 'coin':

            // If the user typed !coin do the following...

            	if(checkArgs(args)){

	            	symbol = args[0].toUpperCase(); // e.g converts !coin eth to !coin ETH

					request('https://api.coinmarketcap.com/v1/ticker/', function (error, response, body){
					  
						// Once the api request has returned do the following...

						var currentCoin = getCoin(symbol, body);

						// Search to see if a valid coin symbol was passed and return the coin

						if(currentCoin != "null"){

							// If a valid coin was passed back to us, do the following
	
							var coinInfoStr = getCoinStr(currentCoin);

							// Build the information message from the current coin

						  	bot.sendMessage({
		            			to: channelID,
		            			message: coinInfoStr
		            	  	})							

		            	  	// Make the bot print the coin information to chat
						}
					});

				}

            break;
         }
     }
});

function checkArgs(args){

	// Make sure the user has passed a valid arguments 
	// e.g !coin eth 
	// e.g !coin nope <- Valid argument but it wont return a coin later

	if(args == undefined)
		return false;
	if(args.length != 1)
		return false;
	if(args[0] == "")
		return false

	return true;
}

function getCoin(symbol, rawCoin){

	var parsedCoin = JSON.parse(rawCoin);

	// Parse the html get request from the coin api
	// Iterate through all the coin data
	// If coin data matching the passed coin symbol is found return it
	// Otherwise return null

	for(var i = 0; i < parsedCoin.length; i++)
		if(parsedCoin[i].symbol == symbol)
			return parsedCoin[i];

	return "null";
}

function getCoinStr(rawCoin){

	// Building a string of the coins info and returning it
	// Pretty standard.

	var str = "";

	str += "Coin: " + rawCoin.name + "\n";
	str += "Rank: " + rawCoin.rank + "\n";
	str += "Price: " + rawCoin.price_usd + "\n";
	str += "Market Cap: " + rawCoin.market_cap_usd + "\n";
	str += "Change: " + rawCoin.percent_change_24h + "\n";

	return str;
}