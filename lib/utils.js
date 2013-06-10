module.exports = {
    // Checks if a module is available
    moduleExists : function (name) {
        try { 
            return require.resolve(name) 
        } catch(e) { 
            return false 
        };
    }
};
