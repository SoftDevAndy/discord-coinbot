const discord = require('discord.js');
const request = require('request');
const config = require('./config.json');

// Initializing the bot

const bot = new discord.Client();

bot.on("ready", () => {
   console.log('\n' + config.botname + ' is running!'); 
}); 

bot.on("message", async message => {

    // Making sure a command is sent to the bot i.e !command it must start with an !        
    if(message.content.substring(0, 1) !== config.prefix) { 
        return; 
    }
    else { 
        // Cleaning up the arguments
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];       
        args = args.splice(1);

        switch(cmd){
            // If the user typed !coin do the following...
            case 'coin':
            	if(checkArgs(args)){
	            	symbol = args[0].toUpperCase(); // e.g converts !coin eth to !coin ETH

					request({url:config.api, key:config.apikey}, function (error, response, body){
                      
                        if (!error && response.statusCode == 200) {
                            // Once the api request has returned do the following...
                            var currentCoin = getCoin(symbol, body);

                            // Search to see if a valid coin symbol was passed and return the coin
                            if(currentCoin != "null"){

                                // If a valid coin was passed back to us, do the following	
                                var coinInfoStr = getCoinStr(currentCoin);

                                // Build the information message from the current coin
                                message.channel.send(coinInfoStr);
                            }
                            else {
                                message.channel.send('Coin wasn\'t found! Try !coin xrp'); 
                            }
                        } else {
                            message.channel.send('Issues with the API, sorry!');
                            console.log(error);
                        }
					});
                }
                else {
                    message.channel.send('Try again! Something like .. !coin xrp');
                }
            break;
         }
     }
});

bot.login(config.token)

function checkArgs(args){

	// Make sure the user has passed a valid arguments 
	// e.g !coin eth 
	// e.g !coin nope <- Valid argument but it wont return a coin later

	if(args == undefined) { return false; }
	if(args.length != 1) { return false; }		
	if(args[0] == "") { return false; }		

	return true;
}

function getCoin(symbol, rawCoin){

	// Parse the html get request from the coin api
	// Iterate through all the coin data
	// If coin data matching the passed coin symbol is found return it
	// Otherwise return null

	var parsedCoin = JSON.parse(rawCoin);

	for(var i = 0; i < parsedCoin.length; i++) {
		if(parsedCoin[i].symbol == symbol) {
            return parsedCoin[i];
        }
    }

	return "null";
}

function getCoinStr(rawCoin){

	// Building a string of the coins info and returning it

    var price = parseFloat(rawCoin.price_usd).toFixed(3);

    var str = `----------------------------------\n`;
    str += `Rank: ${rawCoin.name} \n`;
	str += `Rank: ${rawCoin.rank} \n`;
	str += `Price: ${price} \n`;
	str += `Market Cap: ${rawCoin.market_cap_usd} \n`;
    str += `Change in Past 24 Hours: ${rawCoin.percent_change_24h} \n`;
    str += `----------------------------------\n`;
	return str;
}