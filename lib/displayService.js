var utils = require("./utils");

var gpio = null;
if (utils.moduleExists("pi-gpio")) {
    gpio = require("pi-gpio");
}

    
module.exports = {
    print : function(message) {
        
        if (gpio) {
            console.log("TODO LED displays : %s", message);
        } else {
            console.log("(fake) LED displays : %s", message);
        }
    }
};
