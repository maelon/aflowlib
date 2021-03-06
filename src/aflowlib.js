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

    let aflow = window.aflowlib;

    /**
    * 对象池中的对象需要继承实现自此类
    * 并且实现destroy接口
    */
    class IPoolObjectBase {
        /**
        * must be implemented
        */
        IDestroy() {
        }
    }

    class ObjectPool {
        /**
        * 对象类
        * objclass 对象池对象类型 
        * { defaultsize = 0, minsize = 0, maxsize = 50 } 对象池配置信息
        */
        constructor(objclass, { defaultsize = 0, minsize = 0, maxsize = 50 }) {
            if(!(new objclass() instanceof IPoolObjectBase)) {
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
            for(let i = 0; i < this._defaultSize; i++) {
                this._pool.push(new this._ObjectClass());
            }
        }

        /**
        * 获取对像池中的空闲对象
        */
        accquireObject() {
            if(this._pointer > 0) {
                return this._pool[--this._pointer];
            }

            if(this._pool.length < this._maxsize) {
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
        releaseObject(obj) {
            if(obj instanceof this._ObjectClass && this._pool.length > 0) {
                obj.IDestroy();
                this._pool.unshift(obj);
                this._pointer++;
            }
        }

        /**
        * 清空对象池
        */
        destroyPool() {
            this._pool.length = 0;
            this._pointer = this._defaultSize;
        }
    }

    class IFlowWork {
        constructor(name) {
            this._name = name;
        }

        get workName() {
            return this._name;
        }

        IInit(initfunc) {
        }

        IDo(dofunc) {
        }
        /**
        * interface work completes, if wanted to be called, should be implemented.
        */
        IComplete(completefunc) {
        }
    }

    class FlowWorkSet {
        constructor() {
            this._works = [];
            this._status = 'idle';
            this._workMode = 'p'; //'p' means 'parallel', 's' means 'serial'
        }

        addWork(work) {
        }

        removeWork(workname) {
        }
    }


    class Flow {
        constructor() {
            this._flowWorks = [];
            this._flowPointer = 0;
            this._status = 'idle';
        }
        
        start() {
        }

        pause() {
        }

        stop() {
        }

        addWork(work, level) {
        }

        /**
        * works: [{ work: FlowWork, level: integer }, {} ...]
        */
        addWorks(works) {
        }

        removeWork(workname) {
        }

        levelupWork(workname, level) {
        }
    }

    /**
    * 创建一个工作流
    */ 
    aflow.createFlow = function () {
        
    };

}
