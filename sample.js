const
    express = require('express'),
    app = express(),
    fs = require('fs'),
    expressWs = require('express-ws')(app),
    request = require('request'),
    options = {
        url: 'https://www.cradlepointecm.com/api/v2/routers/?fields=ipv4_address,name,state&limit=500',
        method: 'GET',
        headers: {
            'X-CP-API-ID': 'e79c6722',
            'X-CP-API-KEY': '11248c51069c2e200d1e89c74830c431',
            'X-ECM-API-ID': 'a86d9b3c-6f1b-498d-907a-bd2facf56bc9',
            'X-ECM-API-KEY': '5d707dd2d354f0cc125cb43e7b365b972f7454c2',
            'Content-Type': 'application/json'
        }
    };

    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            fs.appendFile('output.txt', JSON.parse(body));
            //console.log(JSON.parse(body));
        }
    })