/*===================================================================
#    FileName: Test_ObjectPool.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2015-12-21 14:27
# Description: test for object pool
#     Version: 0.1.0
===================================================================*/

{
    class ObjectClass extends IPoolObjectBase {
        constructor(name) {
            super();
            this._name = name;
        }

        get objName() {
            return this._name;
        }
        set objName(name) {
            this._name = name;
        }

        IDestroy() {
            this._name = undefined;
        }
    }

    let objPool = new ObjectPool(ObjectClass, { 'maxsize': 2 });

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
    objPool.releaseObject(obj1)

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
