const
    express = require('express'),
    app = express(),
    _ = require('underscore'),
    expressWs = require('express-ws')(app),
    request = require('request'),
    fs = require('fs'),
    options = {
        url: 'https://www.cradlepointecm.com/api/v2/routers/?fields=name,ipv4_address,state,state_updated_at,account&limit=500',
        method: 'GET',
        headers: {
            'X-CP-API-ID': 'e79c6722',
            'X-CP-API-KEY': '11248c51069c2e200d1e89c74830c431',
            'X-ECM-API-ID': 'a86d9b3c-6f1b-498d-907a-bd2facf56bc9',
            'X-ECM-API-KEY': '5d707dd2d354f0cc125cb43e7b365b972f7454c2',
            'Content-Type': 'application/json'
        }
    };

let expiredData = [],
    changeType = '';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.ws("/connect", (ws, req) => {
    console.log(Date(), ' client connected from ', req.connection.remoteAddress);
    request(options, function (err, res, body) {
        if (err) {
            console.log(Date(), " Uh oh! - ", err.message);
        } else {
            result(body);
        }
    })

    function result(data) {

        let jsonData = JSON.parse(data),
            lteData = jsonData.data,
            newArr = [],
            nameArr = [],
            diffArr = [],
            tempDiffArr = [];

        for (let i = 0; i < jsonData.data.length; i++) {

            let name = nameParser(lteData[i].name);
            let state = lteData[i].state;
            let account = accountParser(lteData[i].account);

            if (lteData[i].ipv4_address != null) {
                ipArr = lteData[i].ipv4_address.split(".", 4);
            }

            if (ipArr[0] === '166') {
                newArr.push({ name: `${name}`, state: `${state}`, conType: `${conType(ipArr[0])}`, account: `${account}`, change: '' });
                nameArr.push(`${name}`);
            };
        }

        if (nameArr.length > expiredData.length && expiredData.length !== 0) {
            //changeType = 'gained';
            tempDiffArr = _.difference(nameArr, expiredData);
            console.log('gained ', tempDiffArr);
            for (let i = 0; i < tempDiffArr.length; i++) {
                diffArr.push(tempDiffArr[i]);
            }
        }

        if (nameArr.length < expiredData.length && expiredData.length !== 0) {
            //changeType = 'lost';
            console.log('lost ', _.difference(expiredData, nameArr));
        }

        expiredData = nameArr.slice();

        newArr.sort(function (a, b) {
            return a.name - b.name;
        });

        newArr.forEach(payload => {
            if (diffArr.includes(payload.name)) {
                payload.change = 'gained';
            }
            ws.send(JSON.stringify(payload), function (err) {
                if (err) {
                    console.log(Date(), " Uh oh! - ", err.message);
                }
            });
        });
    }
});

function nameParser(data) {
    let data2 = data.replace(/\D/g, '');
    let data3 = data2.replace(/^0+/g, '');
    if (data3.length === 1) {
        return "00" + data3;
    } else if (data3.length === 2) {
        return "0" + data3;
    } else {
        return data3;
    }
}

function conType(data) {
    if (data == "166") {
        return "LTE";
    } else {
        return "WAN";
    }
}

function accountParser(data) {
    var accNum = data.split('/');
    return (accNum[6]);
}

app.listen(8989);
