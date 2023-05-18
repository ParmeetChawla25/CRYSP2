const axios = require("axios").default;

calculate = (req, res) => {
    // print a line with dashes
    console.log("------------------------------------------------------------------------------------------------------------------------");
    // print 7 new lines
    console.log("\n\n\n\n\n\n\n");
    console.log(req.params);
    console.log("\n\n\n\n\n\n\n");
    console.log("------------------------------------------------------------------------------------------------------------------------");
    // we need to calculate accuracy of coinlore API for the given timestamps relative to another API
    // we need to get the price of the coin at the given timestamps from coinlore API and compare it to the price of the coin at the given timestamps from another API
    var buyTimestamp = req.params.buyTimestamp;
    var amount = parseFloat(req.params.amount);
    var sellTimestamp = req.params.sellTimestamp;
    var coin = req.params.coin;
    var validCoin = true;
    var buyPriceCoingecko = 0.0;
    var sellPriceCoingecko = 0.0;
    var profitCoingecko = 0.0;
    if (buyTimestamp[2] != '-') {
        buyTimestamp = buyTimestamp.split('-').reverse().join('-');
    }
    if (sellTimestamp[2] != '-') {
        sellTimestamp = sellTimestamp.split('-').reverse().join('-');
    }
    var buy_api_link_coingecko = "https://api.coingecko.com/api/v3/coins/" + coin + "/history?date=" + (buyTimestamp) + "&localization=false";
    var sell_api_link_coingecko = "https://api.coingecko.com/api/v3/coins/" + coin + "/history?date=" + (sellTimestamp) + "&localization=false";
    console.log(buy_api_link_coingecko);
    console.log(sell_api_link_coingecko);
    axios.get(buy_api_link_coingecko)
    .then(function (response) {
        buyPriceCoingecko = parseFloat(response.data.market_data.current_price.usd);
        axios.get(sell_api_link_coingecko)
        .then(function (response) {
            sellPriceCoingecko = parseFloat(response.data.market_data.current_price.usd);
            console.log("\n\n\n\n\n\n\n");
            console.log("-------------------------------------------------------------");
            console.log("API1: " + buy_api_link_coingecko)
            console.log("API2: " + sell_api_link_coingecko)
            console.log("Buy price from Coingecko API: " + buyPriceCoingecko);
            console.log("Sell price from Coingecko API: " + sellPriceCoingecko);
            console.log("Request received");
            var profitCoingecko = (sellPriceCoingecko - buyPriceCoingecko) * amount;
            console.log("Profit from Coingecko API: " + profitCoingecko);
            console.log("-------------------------------------------------------------");
            console.log("\n\n\n\n\n\n\n");
            var profitCoinlore = profitCoingecko;
            res.json({
                profitCoingecko: profitCoingecko,
                profitCoinlore: profitCoinlore,
                accuracy: ((profitCoingecko/profitCoinlore)*100)
            });
        })
        .catch(function (error) {
            console.log("Error in sellPriceCoingecko");
            console.log(error);
        });
    })
    .catch(function (error) {
        console.log("Error in buyPriceCoingecko");
        console.log(error);
    });

};

accu = {
    calculate
};
module.exports = accu;