'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* define Subscribe A class
*/

var SubA = (function (_ISubscriber) {
    _inherits(SubA, _ISubscriber);

    function SubA() {
        _classCallCheck(this, SubA);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SubA).apply(this, arguments));
    }

    _createClass(SubA, [{
        key: 'listNotificationInterested',
        value: function listNotificationInterested() {
            return ['All', 'A', 'B2A'];
        }
    }, {
        key: 'executeNotification',
        value: function executeNotification(notification) {
            var jps = JPS.getInstance();
            switch (notification.getName()) {
                case 'All':
                    console.log('suba receive All msg', notification.getBody());
                    //console.log('suba unsubscribe all msg');
                    //jps.unsubscribe('All', this);
                    break;
                case 'A':
                    console.log('suba receive A msg', notification.getBody());
                    console.log('suba send A2B msg');
                    var notificationA2B = jps.createNotification('A2B', { 'msg': 'A2B' });
                    jps.publish(notificationA2B);
                    break;
                case 'B2A':
                    console.log('suba receive B2A msg', notification.getBody());
                    break;
            }
        }
    }]);

    return SubA;
})(ISubscriber);

/**
* define Subscriber B class
*/

var SubB = (function (_ISubscriber2) {
    _inherits(SubB, _ISubscriber2);

    function SubB() {
        _classCallCheck(this, SubB);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SubB).apply(this, arguments));
    }

    _createClass(SubB, [{
        key: 'listNotificationInterested',
        value: function listNotificationInterested() {
            return ['All', 'B', 'A2B'];
        }
    }, {
        key: 'executeNotification',
        value: function executeNotification(notification) {
            var jps = JPS.getInstance();
            switch (notification.getName()) {
                case 'All':
                    console.log('subb receive All msg', notification.getBody());
                    break;
                case 'B':
                    console.log('subb receive B msg', notification.getBody());
                    console.log('suba send B2A msg');
                    var notificationB2A = jps.createNotification('B2A', { 'msg': 'B2A' });
                    jps.publish(notificationB2A);
                    break;
                case 'A2B':
                    console.log('subb receive A2B msg', notification.getBody());
                    break;
            }
        }
    }]);

    return SubB;
})(ISubscriber);

var jps = JPS.getInstance();
var suba = new SubA();
jps.subscribe(suba);
var subb = new SubB();
jps.subscribe(subb);
var notificationAll = jps.createNotification('All', { 'msg': 'All' });
jps.publish(notificationAll);
setTimeout(function () {
    jps.publish(notificationAll);
}, 1000);
var notificationA = jps.createNotification('A', { 'msg': 'A' });
jps.publish(notificationA);
var notificationB = jps.createNotification('B', { 'msg': 'B' });
jps.publish(notificationB);