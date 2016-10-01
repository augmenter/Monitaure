import { POSTer } from '../serverIO/ajaxMethods';
import { setGCMToken } from '../serverIO/dataHandling';

const sendSubscriptionToServer = (subscription) => {
	const subscriptionEndpoint = subscription.endpoint.split('/');
    const gcmToken = subscriptionEndpoint[subscriptionEndpoint.length - 1];
    setGCMToken(POSTer, { gcmToken }, (err) => {
        //TMP
        console.warn(err);
    });
};

export const subscribe = () => {
	navigator.serviceWorker.ready
		.then((serviceWorkerRegistration) => {
            alert('SW ready!');
			serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
				.then(function(subscription) {
					// The subscription was successful
					return sendSubscriptionToServer(subscription);
				})
				.catch(function(e) {
					if (Notification.permission === 'denied') {
						// The user denied the notification permission which
						// means we failed to subscribe and the user will need
						// to manually change the notification permission to
						// subscribe to push messages
						console.log('Permission for Notifications was denied');
					} else {
						// A problem occurred with the subscription, this can
						// often be down to an issue or lack of the gcm_sender_id
						// and / or gcm_user_visible_only
						console.log('Unable to subscribe to push.', e);
					}
				})
			;
		})
	;
};
