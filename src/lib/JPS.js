/*===================================================================
#    FileName: JPS.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2015-12-31 16:30
# Description: publish/subscribe system
#     Version: 0.1.0
#     licence: MIT
===================================================================*/

/**
* subscriber interface class 
*/ 
class ISubscriber {

    /**
    * must be implemented
    * interface to observe subscriber's interested notification
    */
    listNotificationInterested() {
        return [];
    }

    /**
    * must be implemented
    * interface to execute a notification interested by the subscriber
    */
    executeNotification(notification) {
        
    }
}

/**
* notification base class
*/
class Notification {
    constructor(name, body, type) {
        if(name === null || name === undefined) {
            throw new Error('notification must have a name');
        }
        if(typeof name !== 'string') {
            throw new TypeError('notification name must be string type');
        }
        this._name = name;
        this._body = body;
        this._type = type;
    }

    /**
    * interface to get notification's name
    */
    getName() {
        return this._name;
    }

    /**
    * interface to get notification's body
    */
    getBody() {
        return this._body;
    }

    /**
    * interface to get notification's type
    */
    getType() {
        return this._type;
    }
}

/**
* JSP single instance class
*/
class JPS {
    constructor() {
        if(this._instance) {
            throw new Error('this is an single instance class, please call getInstance to get instance object');
        } else {
            this._instance = undefined;
            /**
            * the map from notification name to subscriber
            */
            this._notificationMap = {};
        }
    }

    static getInstance() {
        if(this._instance === undefined) {
            this._instance = new JPS();
        }
        return this._instance;
    }

    /**
    * interface to subscribe notification
    */
    subscribe(subscriber) {
        if(subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function' && subscriber.executeNotification && typeof subscriber.executeNotification === 'function') {
            var names = subscriber.listNotificationInterested();
            if(names instanceof Array) {
                //check names type
                names.forEach((name) => {
                    if(typeof name === 'string') {
                        //do nothing
                    } else {
                        throw new Error('interested notification name must be String type');
                    }
                });
                //clear
                this._removeSubscribersFromMap(subscriber);
                //add
                names.forEach((name) => {
                    this._addSubscriberToMap(name, subscriber);
                });
            } else {
                throw new Error('interface listNotificationInterested of subscriber must return Array type');
            }
        } else {
            throw new Error('subscriber must implement ISubscriber');
        }
    }

    /**
    * interface to publish notification
    */
    publish(notification) {
        if(notification.getName && typeof notification.getName === 'function') {
            var subs = this._getSubscribersFromMap(notification.getName()).concat();
            subs.forEach((sub) => {
                sub.executeNotification(notification);
            });
        } else {
            throw new Error('notification must implement INotification');
        }
    }

    /**
    * interface to create new notification object
    */
    createNotification(name, data, type) {
        if(typeof name === 'string') {
            return new Notification(name, data, type);
        } else {
            throw new Error('notification name must be String type');
        }
    }

    /**
    * interface to unsubscribe notification interested by subscriber
    */
    unsubscribe(notificationname, subscriber) {
        if(subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function') {
            if(typeof notificationname === 'string') {
                this._removeSubscriberFromMap(notificationname, subscriber);
            } else {
                throw new Error('interested notification name must be String type');
            }
        } else {
            throw new Error('subscriber must implement ISubscriber');
        }
    }

    /**
    *  interface to unsubscribe all the notification interested by subscriber
    */
    unsubscribeAll(subscriber) {
        if(subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function') {
            if(typeof notificationname === 'string') {
                this._removeSubscribersFromMap(subscriber);
            } else {
                throw new Error('interested notification name must be String type');
            }
        } else {
            throw new Error('subscriber must implement ISubscriber');
        }
    }

    /**
    * get the subscribers from map by the notification name
    */
    _getSubscribersFromMap(notificationname) {
        if(this._notificationMap[notificationname] === undefined) {
            return [];
        } else {
            return this._notificationMap[notificationname];
        } 
    }

    /**
    * get the interested names from map by the subscriber
    */
    _getInterestedNamesFromMap(subscriber) {
        var retArr = [];
        var arr;
        for(var name in this._notificationMap) {
            arr = this._notificationMap[name].filter((sub) => {
                return sub === subscriber;
            });
            if(arr.length > 0) {
                retArr.push(name);
            }
        }
        return retArr;
    }

    /**
    * check the name is subscribed by the subscriber from map
    */
    _hasSubscriberFromMap(name, subscriber) {
        var names = this._getInterestedNamesFromMap(subscriber);
        var retArr = names.filter((n) => {
            return n === name;
        });
        return retArr.length > 0;
    }

    /**
    *  add the subscriber to the map
    */
    _addSubscriberToMap(name, subscriber) {
        if(this._hasSubscriberFromMap(name, subscriber)) {
            //do nothing
        } else {
            var subs = this._getSubscribersFromMap(name);
            if(subs.length === 0) {
                subs = this._notificationMap[name] = [];
            }
            subs.push(subscriber);
        }
        return true;
    }

    /**
    * remove the subscriber from the map
    */
    _removeSubscriberFromMap(name, subscriber) {
        var subs = this._getSubscribersFromMap(name);
        var idx = subs.indexOf(subscriber);
        if(idx > -1) {
            subs.splice(idx, 1);
        } else {
            //do nothing
        }
        return subs;
    }

    /**
    * remove all observed notification for the subscriber
    */
    _removeSubscribersFromMap(subscriber) {
        var subs;
        var names = this._getInterestedNamesFromMap(subscriber);
        names.forEach((name) => {
            var subs = this._removeSubscriberFromMap(name, subscriber); 
            if(subs && subs.length === 0) {
                delete this._notificationMap[name];
            }
        });
        return true;
    }
}
