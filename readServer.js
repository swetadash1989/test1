


const fs = require('fs');



function readServerList(fileName) {

    var serverList = [];

    var array = fs.readFileSync(fileName).toString().split("\n");

    for (i in array) {
        let res = array[i].replace(/(\r\n|\n|\r)/gm, "");
        serverList.push(res);

    }

    return serverList;

}



module.exports = readServerList;





