/**
* define Subscribe A class
*/
class SubA extends ISubscriber {
	listNotificationInterested() {
		return ['All', 'A', 'B2A'];
	}
	executeNotification(notification) {
        let jps = JPS.getInstance();
		switch(notification.getName()) {
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
}

/**
* define Subscriber B class
*/
class SubB extends ISubscriber {
    listNotificationInterested() {
        return ['All', 'B', 'A2B'];
    }
    executeNotification(notification) {
        let jps = JPS.getInstance();
        switch(notification.getName()) {
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
}

let jps = JPS.getInstance();
let suba = new SubA();
jps.subscribe(suba);
let subb = new SubB();
jps.subscribe(subb);
let notificationAll = jps.createNotification('All', { 'msg': 'All' });
jps.publish(notificationAll);
setTimeout(function () {
    jps.publish(notificationAll);
}, 1000);
var notificationA = jps.createNotification('A', { 'msg': 'A' });
jps.publish(notificationA);
var notificationB = jps.createNotification('B', { 'msg': 'B' });
jps.publish(notificationB);
