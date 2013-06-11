var lame = require('lame');
var Speaker = require('speaker');
var Spotify = require('spotify-web');
var TaskQueue = require('./taskQueue');

var taskQueue = new TaskQueue();

module.exports = {
    add: function (uri, username, password) {
        
        // Spotify uri
        if (uri.indexOf('spotify:track:') !== -1) {
            addSpotifyTrack(uri, username, password);
        } else {
            throw 'Unsupported URI';
        }
    }
};

function addSpotifyTrack(uri, username, password) {
        
    var task = function (queue) {
        
        Spotify.login(username, password, function (err, spotify) {
            if (err) {
                spotify.disconnect();
                queue.next();
            }
            
            spotify.get(uri, function (err, track) {
                
                if (err) {
                    spotify.disconnect();
                    queue.next();
                }
                
                console.log('Playing %s - %s', track.artist[0].name, track.name);
            
                track.play()
                .pipe(new lame.Decoder())
                .pipe(new Speaker())
                .on('finish', function () {
                    spotify.disconnect();
                    // Move to next track
                    queue.next();
                  });
        
            });
             
        });
    };
    
    taskQueue.addTask(task);
}