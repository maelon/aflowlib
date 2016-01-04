'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var ISubscriber = (function () {
    function ISubscriber() {
        _classCallCheck(this, ISubscriber);
    }

    _createClass(ISubscriber, [{
        key: 'listNotificationInterested',

        /**
        * must be implemented
        * interface to observe subscriber's interested notification
        */
        value: function listNotificationInterested() {
            return [];
        }

        /**
        * must be implemented
        * interface to execute a notification interested by the subscriber
        */

    }, {
        key: 'executeNotification',
        value: function executeNotification(notification) {}
    }]);

    return ISubscriber;
})();

/**
* notification base class
*/

var Notification = (function () {
    function Notification(name, body, type) {
        _classCallCheck(this, Notification);

        if (name === null || name === undefined) {
            throw new Error('notification must have a name');
        }
        if (typeof name !== 'string') {
            throw new TypeError('notification name must be string type');
        }
        this._name = name;
        this._body = body;
        this._type = type;
    }

    /**
    * interface to get notification's name
    */

    _createClass(Notification, [{
        key: 'getName',
        value: function getName() {
            return this._name;
        }

        /**
        * interface to get notification's body
        */

    }, {
        key: 'getBody',
        value: function getBody() {
            return this._body;
        }

        /**
        * interface to get notification's type
        */

    }, {
        key: 'getType',
        value: function getType() {
            return this._type;
        }
    }]);

    return Notification;
})();

/**
* JSP single instance class
*/

var JPS = (function () {
    function JPS() {
        _classCallCheck(this, JPS);

        if (this._instance) {
            throw new Error('this is an single instance class, please call getInstance to get instance object');
        } else {
            this._instance = undefined;
            /**
            * the map from notification name to subscriber
            */
            this._notificationMap = {};
        }
    }

    _createClass(JPS, [{
        key: 'subscribe',

        /**
        * interface to subscribe notification
        */
        value: function subscribe(subscriber) {
            var _this = this;

            if (subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function' && subscriber.executeNotification && typeof subscriber.executeNotification === 'function') {
                var names = subscriber.listNotificationInterested();
                if (names instanceof Array) {
                    //check names type
                    names.forEach(function (name) {
                        if (typeof name === 'string') {
                            //do nothing
                        } else {
                                throw new Error('interested notification name must be String type');
                            }
                    });
                    //clear
                    this._removeSubscribersFromMap(subscriber);
                    //add
                    names.forEach(function (name) {
                        _this._addSubscriberToMap(name, subscriber);
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

    }, {
        key: 'publish',
        value: function publish(notification) {
            if (notification.getName && typeof notification.getName === 'function') {
                var subs = this._getSubscribersFromMap(notification.getName()).concat();
                subs.forEach(function (sub) {
                    sub.executeNotification(notification);
                });
            } else {
                throw new Error('notification must implement INotification');
            }
        }

        /**
        * interface to create new notification object
        */

    }, {
        key: 'createNotification',
        value: function createNotification(name, data, type) {
            if (typeof name === 'string') {
                return new Notification(name, data, type);
            } else {
                throw new Error('notification name must be String type');
            }
        }

        /**
        * interface to unsubscribe notification interested by subscriber
        */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(notificationname, subscriber) {
            if (subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function') {
                if (typeof notificationname === 'string') {
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

    }, {
        key: 'unsubscribeAll',
        value: function unsubscribeAll(subscriber) {
            if (subscriber.listNotificationInterested && typeof subscriber.listNotificationInterested === 'function') {
                if (typeof notificationname === 'string') {
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

    }, {
        key: '_getSubscribersFromMap',
        value: function _getSubscribersFromMap(notificationname) {
            if (this._notificationMap[notificationname] === undefined) {
                return [];
            } else {
                return this._notificationMap[notificationname];
            }
        }

        /**
        * get the interested names from map by the subscriber
        */

    }, {
        key: '_getInterestedNamesFromMap',
        value: function _getInterestedNamesFromMap(subscriber) {
            var retArr = [];
            var arr;
            for (var name in this._notificationMap) {
                arr = this._notificationMap[name].filter(function (sub) {
                    return sub === subscriber;
                });
                if (arr.length > 0) {
                    retArr.push(name);
                }
            }
            return retArr;
        }

        /**
        * check the name is subscribed by the subscriber from map
        */

    }, {
        key: '_hasSubscriberFromMap',
        value: function _hasSubscriberFromMap(name, subscriber) {
            var names = this._getInterestedNamesFromMap(subscriber);
            var retArr = names.filter(function (n) {
                return n === name;
            });
            return retArr.length > 0;
        }

        /**
        *  add the subscriber to the map
        */

    }, {
        key: '_addSubscriberToMap',
        value: function _addSubscriberToMap(name, subscriber) {
            if (this._hasSubscriberFromMap(name, subscriber)) {
                //do nothing
            } else {
                    var subs = this._getSubscribersFromMap(name);
                    if (subs.length === 0) {
                        subs = this._notificationMap[name] = [];
                    }
                    subs.push(subscriber);
                }
            return true;
        }

        /**
        * remove the subscriber from the map
        */

    }, {
        key: '_removeSubscriberFromMap',
        value: function _removeSubscriberFromMap(name, subscriber) {
            var subs = this._getSubscribersFromMap(name);
            var idx = subs.indexOf(subscriber);
            if (idx > -1) {
                subs.splice(idx, 1);
            } else {
                //do nothing
            }
            return subs;
        }

        /**
        * remove all observed notification for the subscriber
        */

    }, {
        key: '_removeSubscribersFromMap',
        value: function _removeSubscribersFromMap(subscriber) {
            var _this2 = this;

            var subs;
            var names = this._getInterestedNamesFromMap(subscriber);
            names.forEach(function (name) {
                var subs = _this2._removeSubscriberFromMap(name, subscriber);
                if (subs && subs.length === 0) {
                    delete _this2._notificationMap[name];
                }
            });
            return true;
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            if (this._instance === undefined) {
                this._instance = new JPS();
            }
            return this._instance;
        }
    }]);

    return JPS;
})();