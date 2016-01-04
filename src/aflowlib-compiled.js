'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*===================================================================
#    FileName: aflowlib.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2015-12-11 18:23
# Description: a work flow lib
#     Version: 0.1.0
#     licence: MIT
===================================================================*/

{
    (function () {
        window.aflowlib = window.aflowlib || {};

        var aflow = window.aflowlib;

        /**
        * 对象池中的对象需要继承实现自此类
        * 并且实现destroy接口
        */

        var IPoolObjectBase = (function () {
            function IPoolObjectBase() {
                _classCallCheck(this, IPoolObjectBase);
            }

            _createClass(IPoolObjectBase, [{
                key: 'IDestroy',

                /**
                * must be implemented
                */
                value: function IDestroy() {}
            }]);

            return IPoolObjectBase;
        })();

        var ObjectPool = (function () {
            /**
            * 对象类
            * objclass 对象池对象类型 
            * { defaultsize = 0, minsize = 0, maxsize = 50 } 对象池配置信息
            */

            function ObjectPool(objclass, _ref) {
                var _ref$defaultsize = _ref.defaultsize;
                var defaultsize = _ref$defaultsize === undefined ? 0 : _ref$defaultsize;
                var _ref$minsize = _ref.minsize;
                var minsize = _ref$minsize === undefined ? 0 : _ref$minsize;
                var _ref$maxsize = _ref.maxsize;
                var maxsize = _ref$maxsize === undefined ? 50 : _ref$maxsize;

                _classCallCheck(this, ObjectPool);

                if (!(new objclass() instanceof IPoolObjectBase)) {
                    throw new TypeError('ObjectPool object class must be extended from IPoolObjectBase');
                }

                //对象类型
                this._ObjectClass = objclass;
                //默认对象池中对象数量
                this._defaultSize = defaultsize;
                //最小对象池中对象数量
                this._minSize = minsize;
                //最大对象池中对象数量
                this._maxsize = maxsize;

                //对象池
                this._pool = [];
                //对象池对象指针
                this._pointer = this._defaultSize;

                //初始化对象池中对象，达到默认数量
                for (var i = 0; i < this._defaultSize; i++) {
                    this._pool.push(new this._ObjectClass());
                }
            }

            /**
            * 获取对像池中的空闲对象
            */

            _createClass(ObjectPool, [{
                key: 'accquireObject',
                value: function accquireObject() {
                    if (this._pointer > 0) {
                        return this._pool[--this._pointer];
                    }

                    if (this._pool.length < this._maxsize) {
                        this._pool.unshift(new this._ObjectClass());
                        this._pointer++;
                        return this.accquireObject();
                    } else {
                        return null;
                    }
                }

                /**
                * 返回对象池中的对象
                */

            }, {
                key: 'releaseObject',
                value: function releaseObject(obj) {
                    if (obj instanceof this._ObjectClass && this._pool.length > 0) {
                        obj.IDestroy();
                        this._pool.unshift(obj);
                        this._pointer++;
                    }
                }

                /**
                * 清空对象池
                */

            }, {
                key: 'destroyPool',
                value: function destroyPool() {
                    this._pool.length = 0;
                    this._pointer = this._defaultSize;
                }
            }]);

            return ObjectPool;
        })();

        var IFlowWork = (function () {
            function IFlowWork(name) {
                _classCallCheck(this, IFlowWork);

                this._name = name;
            }

            _createClass(IFlowWork, [{
                key: 'IInit',
                value: function IInit(initfunc) {}
            }, {
                key: 'IDo',
                value: function IDo(dofunc) {}
                /**
                * interface work completes, if wanted to be called, should be implemented.
                */

            }, {
                key: 'IComplete',
                value: function IComplete(completefunc) {}
            }, {
                key: 'workName',
                get: function get() {
                    return this._name;
                }
            }]);

            return IFlowWork;
        })();

        var FlowWorkSet = (function () {
            function FlowWorkSet() {
                _classCallCheck(this, FlowWorkSet);

                this._works = [];
                this._status = 'idle';
                this._workMode = 'p'; //'p' means 'parallel', 's' means 'serial'
            }

            _createClass(FlowWorkSet, [{
                key: 'addWork',
                value: function addWork(work) {}
            }, {
                key: 'removeWork',
                value: function removeWork(workname) {}
            }]);

            return FlowWorkSet;
        })();

        var Flow = (function () {
            function Flow() {
                _classCallCheck(this, Flow);

                this._flowWorks = [];
                this._flowPointer = 0;
                this._status = 'idle';
            }

            _createClass(Flow, [{
                key: 'start',
                value: function start() {}
            }, {
                key: 'pause',
                value: function pause() {}
            }, {
                key: 'stop',
                value: function stop() {}
            }, {
                key: 'addWork',
                value: function addWork(work, level) {}

                /**
                * works: [{ work: FlowWork, level: integer }, {} ...]
                */

            }, {
                key: 'addWorks',
                value: function addWorks(works) {}
            }, {
                key: 'removeWork',
                value: function removeWork(workname) {}
            }, {
                key: 'levelupWork',
                value: function levelupWork(workname, level) {}
            }]);

            return Flow;
        })();

        /**
        * 创建一个工作流
        */

        aflow.createFlow = function () {};
    })();
}