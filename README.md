# discord_coin-bot
A simple Discord chat bot, using the command !coin BTC (or other coin symbol) the chatbot displays basic, current bitcoin info in chat.

# About

This project is barebones, was thrown together in an hour as a mini coding challenge. The code is easily editable and extendable. Have fun with it!

## Example

````
!coin ETH
````

Or

````
!coin eth
````

Examples of other coin symbols

````
BTC, LTC, DOGE etc
````

For a full list consult the api link below or check out the [raw json request](https://api.coinmarketcap.com/v1/ticker/) yourself to see the available coin symbols 

## Suggestions

It would be good to implement [crypto-normalize](https://www.npmjs.com/package/crypto-normalize) with this at somepoint.

## Resources Used

* [discord.io](https://github.com/izy521/discord.io)
* [request](https://github.com/request/request)
* [Bit Coin API](https://coinmarketcap.com/api/)
