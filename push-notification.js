async function setupPushNotifications() {
    try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.log('Push notifications not supported');
            return;
        }

        const registration = await navigator.serviceWorker.ready;
        // const response = await fetch('/api/vapidPublicKey');
        // const { publicKey } = await response.json();

        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BBO_LaqAURJ5gH18XZG_jeFSZXOC_c5PpbzhFBCdD_20ARng2vZqB4qU0jSx-VgzYkS4_fTwnapjdDRa1FQECc4')
            });

            // Send subscription to server
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription)
            });
        }
    } catch (error) {
        console.error('Error setting up push notifications:', error);
    }
}

// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}