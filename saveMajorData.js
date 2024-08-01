const fs = require('fs');


let URL_1 = 'https://tokens-uniswap-org.ipns.dweb.link/';      // 684 tokens
let URL_2 = 'https://extendedtokens-uniswap-org.ipns.dweb.link/'; // 2117 tokens 
let URL_3 = "https://tokens.coingecko.com/uniswap/all.json" // 5277 tokens
let URL_4 = "https://tokens.coingecko.com/binance-smart-chain/all.json" // 3456 tokens
let URL_5 = "https://tokens.coingecko.com/arbitrum-one/all.json" // 735 tokens
let URL_6 = "https://tokens.coingecko.com/optimistic-ethereum/all.json" //219 tokens
let URL_7 = "https://tokens.coingecko.com/polygon-pos/all.json" // 1146 tokens
let URL_8 = "https://static.optimism.io/optimism.tokenlist.json" // 674 tokens
let URL_9 = "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json" // alot of tokens
let URL_10 = "https://tokens.coingecko.com/base/all.json" // 5277 tokens
let URL_11 = "https://tokens.coingecko.com/ethereum/all.json" // 4273 tokens


const fetchURLData = async(url,filename)=>{

    let response = await fetch(url);
    let data = await response.json();
    let tokens = data.tokens;

    let tokensStr = JSON.stringify(tokens, null, 2); 
    fs.writeFile(filename, tokensStr, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });

}


// fetchURLData(URL_11,"tokens-coingecko-ethereum.json");


const createUniqueTokenHolder = async()=>{

    let uniqueHolder = fs.readFileSync('unique-token-holder.json');
    uniqueHolder = JSON.parse(uniqueHolder);
    return console.log(uniqueHolder.length);

    let data1 = fs.readFileSync('extendedtokens-uniswap-org.json');
    data1 = JSON.parse(data1);

    let data2 = fs.readFileSync('tokens-uniswap-org.json');
    data2 = JSON.parse(data2);

    let data3 = fs.readFileSync('tokens-coingecko.json');
    data3 = JSON.parse(data3);

    let data4 = fs.readFileSync('tokens-coingecko-bsc.json');
    data4 = JSON.parse(data4);

    let data5 = fs.readFileSync('tokens-coingecko-arb.json');
    data5 = JSON.parse(data5);

    let data6 = fs.readFileSync('tokens-coingecko-op.json');
    data6 = JSON.parse(data6);

    let data7 = fs.readFileSync('tokens-coingecko-polygon.json');
    data7 = JSON.parse(data7);

    let data8 = fs.readFileSync('static-op-tokens.json');
    data8 = JSON.parse(data8);

    let data9 = fs.readFileSync('github-list-1.json');
    data9 = JSON.parse(data9);

    let data10 = fs.readFileSync('tokens-coingecko-base.json');
    data10 = JSON.parse(data10);

    let data11 = fs.readFileSync('tokens-coingecko-ethereum.json');
    data11 = JSON.parse(data11);

    let tokens = data1.concat(data2);
    tokens = tokens.concat(data3);
    tokens = tokens.concat(data4);
    tokens = tokens.concat(data5);
    tokens = tokens.concat(data6);
    tokens = tokens.concat(data7);
    tokens = tokens.concat(data8);
    tokens = tokens.concat(data9);
    tokens = tokens.concat(data10);
    tokens = tokens.concat(data11);

    let uniqueTokenHolder = [];

    tokens.forEach(token=>{
        if(!uniqueTokenHolder.includes(token.address)){
            uniqueTokenHolder.push(token);
        }
    });

    let uniqueTokenHolderStr = JSON.stringify(uniqueTokenHolder, null, 2);
    fs.writeFile("unique-token-holder.json", uniqueTokenHolderStr, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });

}


// createUniqueTokenHolder();