var restify = require('restify');
var displayService = require('./lib/displayService');
var audioService = require('./lib/audioService');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();

//  Server settings
//server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// Commands
server.get('/info', function respond(req, res, next) {
    res.send({
        version: "0.1.0",
        commands: [
            {
                name : "info",
                method : "GET",
                description : "Outputs server information."
            },
            {
                name : "print",
                method : "POST",
                description : "Prints text message onto the display.",
                parameters : [
                    {
                        name : "message",
                        required : true,
                        description : "Message to print onto the display."
                    }
                ]
            },
            {
                name : "say",
                method : "POST",
                description : "Speak a message in a given language.",
                parameters : [
                    {
                        name : "message",
                        required : true,
                        description : "Message to speak."
                    },
                    {
                        name : "language",
                        required : false,
                        description : "Language code to use ('en' is default)."
                    }
                ]
            }
        ]
    });
    return next();
});

server.post('/print', function respond(req, res, next) {
    if (!req.params.message) {
        return next(new restify.MissingParameterError("message parameter is missing"));
    } else {
        displayService.print(req.params.message);
        res.send(200);
        return next();
    }
});

server.post('/say', function respond(req, res, next) {
    if (!req.params.message) {
        return next(new restify.MissingParameterError("message parameter is missing"));
    } else {
        audioService.say(req.params.message, req.params.language);
        res.send(200);
        return next();
    }
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});