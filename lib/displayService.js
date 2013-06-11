var utils = require("./utils");
var TaskQueue = require('./taskQueue');

var taskQueue = new TaskQueue();

var gpio = null;
if (utils.moduleExists("pi-gpio")) {
    gpio = require("pi-gpio");
}

    
module.exports = {
    print : function (message) {
        
        taskQueue.addTask(function (queue) {
            
            if (gpio) {
                console.log("TODO LED displays : %s", message);
            } else {
                console.log("(fake) LED displays : %s", message);
            }
            
            queue.next();
        });
        
    }
};
