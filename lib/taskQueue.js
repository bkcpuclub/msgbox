exports = module.exports = TaskQueue;

function TaskQueue(opts) {
  if (!(this instanceof TaskQueue)) return new TaskQueue(opts);

  if (!opts) opts = {};
  this._tasks = [];

}

TaskQueue.prototype.addTask = function(task) {
    
console.log('TASKS = ' + this._tasks.length);
    
    this._tasks.push(task);
    
    if (task === this._tasks[0]){
        this._run();
    }
    
};

TaskQueue.prototype._run = function() {
    
    if (this._tasks.length > 0) {
        this._tasks[0](this);
    };
};

TaskQueue.prototype.next = function() {
    
    if (this._tasks.length > 0) {
        this._tasks.shift();
    }
    
    this._run();
    
};