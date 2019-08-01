



const http = require('http');



var applicationName = ['Webapp0', 'Database2', 'Webapp2', 'Cache2', 'Database0', 'Webapp1', 'Database1', 'Cache0'];

var versions = ['0.2.1', '1.0.1', '0.1.1', '1.2.1', '0.0.1', '1.1.1', '1.0.0', '1.1.0', '0.0.3', '1.2.2', '0.1.2', '0.2.2'];



function pingServer(hostName, api, callback) {

    return new Promise(resolve => {

        var options = {

            host: "http://" + hostName + api

        };

    var request = http.request(options, function (req) {

        // Do something when the call passes

        // We know this is always going to fail

    });

    request.on('error', function (err) {

        var fakeResponse = {};

        fakeResponse.Application = applicationName[Math.floor(Math.random() * applicationName.length)];

        fakeResponse.Version = versions[Math.floor(Math.random() * versions.length)];

        fakeResponse.Uptime = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

        fakeResponse.Request_Count = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

        fakeResponse.Error_Count = Math.floor(Math.random() * (fakeResponse.Request_Count - 1000000000 + 1)) + 1000000000;

        fakeResponse.Success_Count = fakeResponse.Request_Count - fakeResponse.Error_Count;

        // Fake the response

        resolve(fakeResponse);

    });

}

);

}



module.exports = pingServer;


