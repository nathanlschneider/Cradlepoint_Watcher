result = function(data) {
    let jsonData = JSON.parse(data);
    let lteData = jsonData.data;

    for (let i = 0; i < jsonData.data.length; i++) {
      
        let name = lteData[i].name;
        let state = lteData[i].state;

        if (lteData[i].ipv4_address != null) {
            ipArr = lteData[i].ipv4_address.split(".", 4);
        }
        //CradlePointCollection[i] = new Cradlepoint(nameParser(name), status, conType(ipArr[0]));
        var str = `{ "name":"${nameParser(name)}", "state":"${state}", "conType":"${conType(ipArr[0])}" }`;
       ws.send(str);
    // return str;
    }
}

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