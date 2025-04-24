// Best Time to Buy and Sell Stock

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let price = prices[0];
    let profit = 0;
    for(let i=1;i<prices.length;i++){
        if(price > prices[i]){
            price = prices[i];
        }
        profit = Math.max(profit,prices[i] - price);
    }
    return profit;
};