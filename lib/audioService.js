var lame = require("lame");
var icecast = require("icecast");
var Speaker = require('speaker');
var fs = require('fs');
var http = require('http');

module.exports = {
    say : function(message, lang) {
        
        // If not set : default language is english
        if (lang == undefined) {
            lang = 'en';
        }
         
        var url = 'http://translate.google.com/translate_tts?ie=utf-8&tl=' + lang + '&q=' + message;
        
        icecast.get(url, function(res) {
                        
            
            // Metadata event
            res.on('metadata', function(metadata) {
                metadata = icecast.parse(metadata);
            });
            
            res.on('data', function(data) {
                console.log('data');
            });
            
            res.on('end', function() {
                console.log('end');
                
                // Stupid buffer underrun to flush end of small file
                decoder.pipe(null);
                
            });
            
            // Decode the MP3 audio data
            var decoder = lame.Decoder();
            decoder.on('format', function(format) {
                var speaker = new Speaker(format);
                decoder.pipe(speaker);
            });
            
            res.pipe(decoder);
            
            console.log('Saying ' + message);
        });
        
        /*var file = fs.createWriteStream('say.mp3');
        var req = http.get(url, function(res){
            
            res.on('end', function(data) {
                fs.createReadStream('say.mp3')
                  .pipe(new lame.Decoder)
                  .on('format', console.log)
                  .pipe(new Speaker);
            });
            
            res.pipe(file);
        });*/
        
    }
};
