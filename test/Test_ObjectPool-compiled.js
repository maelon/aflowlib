'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*===================================================================
#    FileName: Test_ObjectPool.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2015-12-21 14:27
# Description: test for object pool
#     Version: 0.1.0
===================================================================*/

{
    var ObjectClass = (function (_IPoolObjectBase) {
        _inherits(ObjectClass, _IPoolObjectBase);

        function ObjectClass(name) {
            _classCallCheck(this, ObjectClass);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectClass).call(this));

            _this._name = name;
            return _this;
        }

        _createClass(ObjectClass, [{
            key: 'IDestroy',
            value: function IDestroy() {
                this._name = undefined;
            }
        }, {
            key: 'objName',
            get: function get() {
                return this._name;
            },
            set: function set(name) {
                this._name = name;
            }
        }]);

        return ObjectClass;
    })(IPoolObjectBase);

    var objPool = new ObjectPool(ObjectClass, { 'maxsize': 2 });

    console.log('------------accquire obj1-------------');
    var obj1 = objPool.accquireObject();
    obj1 && console.log(obj1.objName);
    obj1 && (obj1.objName = 'obj1');
    obj1 && console.log(obj1.objName);

    console.log('------------accquire obj2-------------');
    var obj2 = objPool.accquireObject();
    obj2 && console.log(obj2.objName);
    obj2 && (obj2.objName = 'obj2');
    obj2 && console.log(obj2.objName);

    console.log('------------accquire obj3-------------');
    var obj3 = objPool.accquireObject();
    obj3 && console.log(obj3.objName);
    obj3 && (obj3.objName = 'obj3');
    obj3 && console.log(obj3.objName);

    console.log('------------release obj1-------------');
    objPool.releaseObject(obj1);

    console.log('------------accquire obj4-------------');
    var obj4 = objPool.accquireObject();
    obj4 && console.log(obj4.objName);
    obj4 && (obj4.objName = 'obj4');
    obj4 && console.log(obj4.objName);

    console.log('------------accquire obj5-------------');
    var obj5 = objPool.accquireObject();
    obj5 && console.log(obj5.objName);
    obj5 && (obj5.objName = 'obj5');
    obj5 && console.log(obj5.objName);
}