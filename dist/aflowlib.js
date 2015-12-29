'use strict';

(function (aflow) {

    /**
    * 创建一个工作流
    */
    aflow.createFlow = function () {};

    /**
    * 工作流类
    */
    aflow._Flow = function () {
        this._flow = [];
    };

    /**
    * 根据配置文件生成work对象
    */
    aflow._Flow.prototype.createWork = function (workconfig) {};

    /**
    * 公有方法
    * 添加一个work
    */
    aflow.addWork = function (work) {};
})(window.aflowlib = window.aflowlib || {});

var a = '123';