var events = require('events');
var util = require('util');

exports = module.exports = TaskQueue;

function TaskQueue(opts) {
  if (!(this instanceof TaskQueue)) return new TaskQueue(opts);

  events.EventEmitter.call(this);
    
  if (!opts){
      opts = {};  
  }

  this._tasks = [];
  this._runningTask = null;
  
 
}

util.inherits(TaskQueue, events.EventEmitter);

TaskQueue.prototype.addTask = function(task) {

    // Add tasks
    this._tasks.push(task);
    
    // Run
    this._run();
    
    return this;
};

TaskQueue.prototype._run = function() {
    
    // If there is a task to run : run it, if queue is not busy yet
    if (this._tasks.length > 0  && !this._runningTask) {
        
        this._runningTask = this._tasks.shift();
        try {
            this._runningTask(this);
        } catch(e) {
            console.log('Task failed : moving on to next task');
            this.next();
        }
        
    } else if (this._tasks.length === 0) {
        
        // Queue is empty : not busy anymore
        this._runningTask = null;
        this.emit('cleared', this);
    }
};

TaskQueue.prototype.next = function() {
    
    this._runningTask = null;
    this._run();
    
    return this;
};