# discord-coinbot
A simple Discord chat bot, using the command !coin BTC (or other coin symbol) the chatbot displays basic, current Bitcoin info in chat.

# About

This project is barebones, was thrown together in an hour as a mini coding challenge. The code is easily editable and extendable. Have fun with it!

# Running the bot

* You must have **Manage Server permissions** on the discord server to add the bot.
* You must have an APP BOT USER TOKEN. You replace this token with the existing string in **config.json**

config.json

```` 
{
    "botname": "Crypto Price Bot",
    "token": "Please enter a valid token here!",
    "api": "https://api.coinmarketcap.com/v1/ticker/",
    "api-key": "Please enter a valid api key here!",
    "prefix": "!"
}
````

* Use ```` npm install ```` to install the required modules and ```` node bot.js ```` to run it

* Include your client id in the following url to navigate to the page that allows you to invite the bot to the server

````https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0````

## Example

````
!coin xrp
````

Or

````
!coin XRP
````

**Results in**

````
----------------------------------
Rank: XRP 
Rank: 3 
Price: 0.304 
Market Cap: 12545069733.0 
Change in Past 24 Hours: 0.31 
----------------------------------
````

Examples of other coin symbols

````
BTC, LTC, DOGE etc
````

For a full list consult the api link below or check out the [raw json request](https://api.coinmarketcap.com/v1/ticker/) yourself to see the available coin symbols 

## Suggestions

It would be good to implement [crypto-normalize](https://www.npmjs.com/package/crypto-normalize) with this at somepoint.

## Resources Used

* [discordjs](https://discord.js.org/#/)
* [request](https://github.com/request/request)
* [Bitcoin API](https://coinmarketcap.com/api/)
