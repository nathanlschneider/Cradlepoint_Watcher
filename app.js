const
    express = require('express'),
    app = express(),
    expressWs = require('express-ws')(app),
    request = require('request'),
    options = {
        url: 'https://www.cradlepointecm.com/api/v2/routers/?fields=name,ipv4_address,state,state_updated_at&limit=500',
        method: 'GET',
        headers: {
            'X-CP-API-ID': 'e79c6722',
            'X-CP-API-KEY': '11248c51069c2e200d1e89c74830c431',
            'X-ECM-API-ID': 'a86d9b3c-6f1b-498d-907a-bd2facf56bc9',
            'X-ECM-API-KEY': '5d707dd2d354f0cc125cb43e7b365b972f7454c2',
            'Content-Type': 'application/json'
        }
    };

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.ws("/connect", (ws) => {
    console.log('connected');
    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            result(body);
        }
    })

    function result(data) {
        let jsonData = JSON.parse(data);
        let lteData = jsonData.data;

        for (let i = 0; i < jsonData.data.length; i++) {

            let name = lteData[i].name;
            let state = lteData[i].state;

            if (lteData[i].ipv4_address != null) {
                ipArr = lteData[i].ipv4_address.split(".", 4);
            }

            if (ipArr[0] === '166') {
                var str = `{ "name":"${nameParser(name)}", "state":"${state}", "conType":"${conType(ipArr[0])}" }`;
                ws.send(str);
            };
        }
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


app.listen(8989);
