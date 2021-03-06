/**
 * Created by BWY on 2017/11/28.
 */

var loadImage = require('./imageloader');
//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;
//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;
/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
    this.taskQueue = []; //任务队列
    this.index = 0; //当前任务的索引
    this.state = STATE_INITIAL; //记录当前状态
}
/**
 * 添加一个同步任务，去预加载图片
 * @param imglist Array 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
    var taskFn = function(next) {
        //数组的深拷贝
        loadImage(imglist.slice(),next);
    };
    var type = TASK_SYNC;
    return this._add(taskFn,type);
};
/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele  DOM对象
 * @param positions 背景位置数组
 * @param imageUrl  图片地址
 */
Animation.prototype.changePosition = function(ele, positions, imageUrl) {

};
/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele image标签
 * @param imglist 图片数组
 */
Animation.prototype.changeSrc = function(ele, imglist) {

};
/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function(taskFn) {

};
/**
 * 添加一个同步任务，可以在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then = function(callback) {

};
/**
 * 开始执行任务 异步定时任务执行的间隔
 * @param interval
 */
Animation.prototype.start = function(interval) {
    if(this.state === STATE_START) {
        return this;
    }
    //如果任务链中没有任务，则返回
    if(!this.taskQueue.length) {
        return this;
    }
    this.state = STATE_START;
    this.interval = interval; //将interval保留在类实例中
    this._runTask();
    return this;
};
/**
 * 添加一个同步任务，该任务就是回退到上一个任务，
 * 实现重复上一个任务的效果，可以定义重复的次数
 * @param times 重复次数
 */
Animation.prototype.repeat = function(times) {

};
/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无限循环上一次任务
 */
Animation.prototype.repeatForever = function () {

};
/**
 * 设置当前任务执行结束后到下一个任务开始前等待的时间
 * @param time 等待时长
 */
Animation.prototype.wait = function(time) {

};
/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function() {

};
/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function() {

};
/**
 * 释放资源
 */
Animation.prototype.dispose = function() {

};
/**
 * 添加一个任务到任务队列中
 * @param taskFn 任务方法
 * @param type 任务类型
 * @private
 */
Animation.prototype._add = function (taskFn,type) {
    this.taskQueue.push({
        taskFn: taskFn,
        type: type
    });
    return this;
};
/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function() {
    if(!this.taskQueue || this.state !== STATE_START) {
        return;
    }
    //任务执行完毕
    if(this.index === this.taskQueue.length) {
        this.dispose();
        return this;
    }
    //获得任务链上当前的任务
    var task = this.taskQueue[this.index];
    if(task.type===TASK_SYNC) {
        this._syncTask(task);
    } else {
        this._asyncTask(task);
    }
};
/**
 * 同步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._syncTask = function(task) {
    var me = this;
    var next = function() {
        //切换到下一个任务
        me._next();
    };
    var taskFn = task.taskFn;
    taskFn(next);
};
/**
 * 异步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._asyncTask = function(task) {

};
/**
 * 切换到下一个任务
 * @private
 */
Animation.prototype._next = function () {
    this.index++;
    this._runTask();
};