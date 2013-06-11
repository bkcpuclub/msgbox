var lame = require("lame");
var icecast = require("icecast");
var Speaker = require('speaker');
var TaskQueue = require('./taskQueue');

var taskQueue = new TaskQueue();

module.exports = {
    
    say : function (message, lang) {
        
        
        var task = function (queue) {
            
            // If not set : default language is english
            if (lang === undefined) {
                lang = 'en';
            }
             
            var url = 'http://translate.google.com/translate_tts?ie=utf-8&tl=' + lang + '&q=' + message;
            
            icecast.get(url, function (res) {
                            
                // Metadata event
                res.on('metadata', function (metadata) {
                    metadata = icecast.parse(metadata);
                });
                
                // Decode the MP3 audio data
                var decoder = lame.Decoder();
                decoder.on('format', function (format) {
                    var speaker = new Speaker(format);
                    speaker.on('close', function () {
                        // Task is finished
                        queue.next();
                    });
                    decoder.pipe(speaker);
                });
                
                res.pipe(decoder);
                
                console.log('Saying ' + message);
            });
        
        };
        
        //
        taskQueue.addTask(task);
        
    }
};
