"use strict";

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
    window.aflowlib = window.aflowlib || {};

    var aflow = window.aflowlib;

    /**
    * 创建一个工作流
    */
    aflow.createFlow = function () {};

    var FlowWork = function FlowWork(config) {
        _classCallCheck(this, FlowWork);
    };

    var Flow = (function () {
        function Flow() {
            _classCallCheck(this, Flow);

            this._flow = [];
        }

        _createClass(Flow, [{
            key: "addWork",
            value: function addWork(work) {}
        }, {
            key: "removeWork",
            value: function removeWork(workname) {}
        }, {
            key: "levelupWork",
            value: function levelupWork(workname, level) {}
        }]);

        return Flow;
    })();
}