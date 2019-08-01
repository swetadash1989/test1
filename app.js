
'use strict';



const readServerList = require('./readServer');

const pingServer = require('./pingServer');

const fireApp = require('./startUp');

const fs = require('fs');

fireApp.startApp();

var serverLists = readServerList('serverList.txt');



Promise.all(

    serverLists.map(currentServer =>  pingServer(currentServer, '/status') )

).then(results => {
    var aggregateResult = [];

var keySet = [];

//function

results.forEach(result => {

    var key = result.Application + ',' + result.Version;

if (aggregateResult[key]) {

    aggregateResult[key].Success_Count = aggregateResult[key].Success_Count + result.Success_Count;

    aggregateResult[key].Error_Count = aggregateResult[key].Error_Count + result.Error_Count;

    aggregateResult[key].Request_Count = aggregateResult[key].Request_Count + result.Request_Count;

} else {

    keySet.push(key);

    aggregateResult[key] = {};

    aggregateResult[key].Success_Count = result.Success_Count;

    aggregateResult[key].Error_Count = result.Error_Count;

    aggregateResult[key].Request_Count = result.Request_Count;

}

});

// Now write this into a file

var logger = fs.createWriteStream('output.txt', {

    flags: 'a' // 'a' means appending (old data will be preserved)

})

keySet.forEach(function (key) {

    if (aggregateResult[key]) {

        let individualResult = aggregateResult[key];

        var standardOutput = {};

        let appVersion = key.split(',')

        standardOutput.Application = appVersion[0];

        standardOutput.Version = appVersion[1];

        standardOutput.successRate = (individualResult.Success_Count / individualResult.Request_Count) * 100;

        console.log(standardOutput);

        logger.write(standardOutput.Application + ' ' + standardOutput.Version + ' ' + standardOutput.successRate + '\n');

    }

});

fireApp.shutdownApp();

logger.end();

}

).catch(function (rej) {

    //here when you reject the promise

    console.log(rej);

});



