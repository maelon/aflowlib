'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*===================================================================
#    FileName: IFlowWork.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2015-12-29 16:50
# Description: FlowWork Class
#     Version: 0.1.0
#     licence: MIT
===================================================================*/

var FlowWork = (function () {
    function FlowWork(name) {
        _classCallCheck(this, FlowWork);

        if (typeof name === 'string') {
            this._name = name;
            this._status = 'idle'; //idle inited doing completed
            this._result = undefined;
            this._targets = undefined;
            this._initFunc = undefined;
            this._doFunc = undefined;
            this._completeFunc = undefined;
        } else {
            throw new Error('Your work must have an unique name!');
        }
    }

    _createClass(FlowWork, [{
        key: 'initWork',

        /**
        * interface to state how to handle init data, with returning handled data
        */
        value: function initWork(initfunc) {
            if (typeof initfunc === 'function') {
                this._initFunc = initfunc;
            } else if (initfunc === null || initfunc === undefined) {
                //do nothing
            } else {
                    throw new Error('initWork must get a function type parameter or nothing');
                }
            return this;
        }

        /**
        * interface to state how to handle work, with inputing data and complete callback
        */

    }, {
        key: 'doWork',
        value: function doWork(dofunc) {
            if (typeof dofunc === 'function') {
                this._doFunc = dofunc;
            } else {
                throw new Error('doWork must get a function type parameter');
            }
            return this;
        }

        /**
         * interface to state how to handle result data, with returning handled data and targets
         */

    }, {
        key: 'completeWork',
        value: function completeWork(completefunc) {
            if (typeof completefunc === 'function') {
                this._completeFunc = completefunc;
            } else {
                throw new Error('doWork must get a function type parameter');
            }
            return this;
        }

        /**
        * interface for WorkSet
        */

    }, {
        key: '_init',
        value: function _init(data) {
            this._status = 'inited';
            return this._initFunc(data);
        }

        /**
        * interface for WorkSet
        */

    }, {
        key: '_do',
        value: function _do(data) {
            this._status = 'doing';
            this._doFunc(data, this._complete);
        }

        /**
        * interface for WorkSet
        */

    }, {
        key: '_complete',
        value: function _complete(data) {
            this._status = 'completed';
            this._targets = data['targets'];
            this._result = this._completeFunc(data['data']);
            return this._result;
        }
    }, {
        key: 'workName',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'workStatus',
        get: function get() {
            return this._status;
        }
    }, {
        key: 'workResult',
        get: function get() {
            return this._result || null;
        }
    }, {
        key: 'workTargets',
        get: function get() {
            return this._targets || [];
        }
    }]);

    return FlowWork;
})();