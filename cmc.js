const fs = require('fs');

const COINMARKETCAP_BASEURL = "https://pro-api.coinmarketcap.com";
const COINMARKETCAP_APIKEY = 'ce8b517b-4db2-4a44-8348-84f1d1ef9eb2' // hobbyist


const fetchTop30Tokens = async()=>{

    let reqData = [];
    const NoOfTopCoins = 30;
  
    let cmc_endPoints_rank = `v1/cryptocurrency/listings/latest?limit=${NoOfTopCoins}`
  
  
    try {
      const response = await fetch(
        `${COINMARKETCAP_BASEURL}/${cmc_endPoints_rank}`,
        {
        headers: {
            "X-CMC_PRO_API_KEY": COINMARKETCAP_APIKEY,
        },
        }
      ).then((response) => response.json());
      let data = response.data;
  
        for(let i=0;i<data.length;i++){
            let coin = data[i];
            let coinObj = {
                rank: coin.cmc_rank,
                name: coin.name,
                symbol: coin.symbol
            }
            reqData.push(coinObj);
        }

             const jsonString = JSON.stringify(reqData, null, 2); 


              fs.writeFile('top30Tokens-wn.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully wrote file');
                }
            });

        console.log('Total data is : ',reqData.length);
        console.log('Data is : ',reqData);

  
    } catch (e) {
      console.log("error in expolore data fetch: ", e);
    }
  
  }

  fetchTop30Tokens();