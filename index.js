const fs = require('fs');

let URL = 'https://tokens-uniswap-org.ipns.dweb.link/';      // 684 tokens
// let URL = 'https://extendedtokens-uniswap-org.ipns.dweb.link/'; // 2117 tokens 

//   ethereum  1, polygon 137, bsc 56 , base 8453 , arbitrum 42161 , optimism 10

const CHAINS = [
    {
        name: 'ethereum',
        chainId: 1
    },
    {
        name: 'polygon',
        chainId: 137
    },
    {
        name: 'bsc',
        chainId: 56
    },
    {
        name: 'base',
        chainId: 8453
    },
    {
        name: 'arbitrum',
        chainId: 42161
    },
    {
        name: 'optimism',
        chainId: 10
    }
]

const CHAINID = [1,137,56,10,42161,8453];

let tokenHandler = async(tokenName)=>{

    // let response = await fetch(URL);
    // let data = await response.json();

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

    let tokenArr = [];
    let bridgeInfo = [];
    let chainNotFound = CHAINID;
    

    for(let i=0;i<tokens.length;i++){
        let token = tokens[i];
        if(token.symbol.toLowerCase() == tokenName.toLowerCase()){
            if(!CHAINID.includes(token.chainId)) continue;
            if(chainNotFound.includes(token.chainId)) chainNotFound = chainNotFound.filter(chain=>chain!=token.chainId);
            if(tokenArr.find(t=>t.chainId == token.chainId)) continue;
            tokenArr.push({
                chainId: token.chainId,
                address: token.address,
            });
            if(token?.extensions?.bridgeInfo) bridgeInfo.push(token.extensions.bridgeInfo);


        }
    }

    for(let i=0;i<bridgeInfo.length;i++){
        let bridge = bridgeInfo[i];
        for(let j=0;j<chainNotFound.length;j++){
            let chain = chainNotFound[j];
            if(bridge[chain]){
                tokenArr.push({
                    chainId: chain,
                    address: bridge[chain].address
                });
            }
        }
    }

        //  console.log(tokenArr);
        return tokenArr;


}


let fetchTop30Tokens6ChainAddress = async()=>{

    let finalData = [];

// fetch top 30 tokens symbol first...
let top30TokensSymbol = fs.readFileSync('top30Tokens.json');
top30TokensSymbol = JSON.parse(top30TokensSymbol);
top30TokensSymbol = top30TokensSymbol.map(token=>token.symbol);

for(let i=0;i<top30TokensSymbol.length;i++){
    let token = top30TokensSymbol[i].toLowerCase();
    let tokenArr = await tokenHandler(token);
    finalData.push({
        token: token,
        network: tokenArr
    });
}

// console.log(finalData);

fs.writeFileSync('top30TokensOfSupportChain.json',JSON.stringify(finalData));


}

// fetchTop30Tokens6ChainAddress();


let getTop30TokensImage = async()=>{

    console.log('1111111111')

    let top30Tokens = fs.readFileSync('./top30TokensOfSupportChain.json');
    top30Tokens = JSON.parse(top30Tokens);

    console.log('222222222')


    for(let i=0;i<top30Tokens.length;i++){
        let token = top30Tokens[i];
        let tokenName = token.token;
        let response = await fetch('https://wallet-balances-eight.vercel.app/get_tokenLogoBySymbol/'+tokenName);
        let data = await response.json();
        if(data?.URI) token['image'] = data.URI;
        else token['iconURL'] = '';
    }

    console.log('333333333')


    fs.writeFileSync('top30TokensOfSupportChain.json',JSON.stringify(top30Tokens));

}

getTop30TokensImage();