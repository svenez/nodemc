var express = require('express'),
    app = express(),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    rfs = require('rotating-file-stream'),
    minecraft = require('minecraft');

var serverConf = {
    port : 1488,
    logDir : path.join(__dirname, 'log')
};

fs.existsSync(serverConf.logDir) || fs.mkdirSync(serverConf.logDir);

var accessLogStream = rfs('access.log', {
    interval: '1d',
    path: serverConf.logDir
});
app.use(morgan('combined', {stream: accessLogStream}));

app.all('*', function (req, res) {
    var worldJSON = minecraft.world.asJSON();
    res.send(worldJSON);
});

app.listen(serverConf.port, function () {
    console.log('MC server listening on port '+serverConf.port+'!');
});

