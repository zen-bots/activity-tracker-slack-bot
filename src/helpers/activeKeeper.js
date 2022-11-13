var http = require('http')
var options = {
    host: 'website-wqjk.onrender.com',
    path: '/'
}

const keepMeActive = () => {
    try {
        http.get(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));

            // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            res.on('data', function (chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function () {
                var body = Buffer.concat(bodyChunks);
                console.log('BODY: ' + body);
                // ...and/or process the entire body here.
            })
        })
    }
    catch (error) {
        console.log(error.message)
        return new Error(error.message)
    }
}

setInterval(
    () => keepMeActive(options),
    20000
)

module.exports = keepMeActive;