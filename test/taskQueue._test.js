var TaskQueue = require('../lib/taskQueue');

exports.testAsyncTasks = function(test) {
    
    var taskCount = 5;
    var queue = new TaskQueue();
    
    test.expect(1);
    
    count = 0;
    
    for (i = 0; i < taskCount; i++) {
        queue.addTask(function(queue) {
            setTimeout(function() {
                
                queue.next();
                
                count++;
                if (count === taskCount) {
                    test.ok(true, "ran all tasks");
                    test.done();
                }
                
            }, 500);
            
        });
    }
    
};

exports.testSyncTasks = function(test) {
    
    var taskCount = 5;
    var queue = new TaskQueue();
    
    test.expect(1);
    
    count = 0;
    
    for (i = 0; i < taskCount; i++) {
        queue.addTask(function(queue) {
            count++;
            queue.next();
        });
    }
    
    test.ok(count === taskCount, "ran all tasks");
    test.done();
};
