const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');

const app = express();
const PORT = 3000;
const cors = require('cors');

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Temporary in-memory storage for subscriptions
const subscriptions = [];
let pushSubscriptions = new Map();


// VAPID keys (replace with your actual keys)
webPush.setVapidDetails(
  'mailto:gabriel.guerrera@programmersinc.com',
  //'pwa-test',
  'BBO_LaqAURJ5gH18XZG_jeFSZXOC_c5PpbzhFBCdD_20ARng2vZqB4qU0jSx-VgzYkS4_fTwnapjdDRa1FQECc4',
  '2JM_OHakmBOHY_wHHXDVNjLSsn4PGtQnbJdfVxAsSGw'
);

// Save subscription endpoint
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  // subscriptions.push(subscription);
  pushSubscriptions.set(subscription.endpoint, subscription);
  console.log('Subscription received:', subscription);
  res.status(200).json({});
});

app.post('/unsubscribe', (req, res) => {
  const subscription = req.body;
  pushSubscriptions.delete(subscription.endpoint);
  res.status(200).json({});
});

// // Send push notification
// app.post('/send-notification', (req, res) => {
//   const payload = req.body.payload; // Payload sent from the client
//   console.log('payload', payload)
//   console.log('subscription', subscriptions);
//   subscriptions.forEach((subscription) => {
//     webPush.sendNotification(subscription, payload)
//     .then(() => console.log('Notification sent successfully to:', subscription.endpoint))
//     .catch((error) => console.error('Error sending notification:', error));
//   });
//   res.status(200).json({ message: 'Notifications sent.' });
// });

app.post('/send-notification', (req, res) => {
  const payload = req.body.payload;
  const  {scheduleNotificationTimeout}  = JSON.parse(payload);
  console.log('Payload:', payload);
  console.log('scheduleNotificationTimeout:', scheduleNotificationTimeout);

  // Get the last subscription from the array
  const lastSubscription = subscriptions[subscriptions.length - 1];
  console.log('last subscription', lastSubscription);

  // webPush.sendNotification(lastSubscription, payload)
  //   .then(() => {
  //     res.status(200).json({ message: 'Notification sent successfully.' });
  //   })
  //   .catch((error) => {
  //     console.error('Error sending notification:', error);
  //     res.status(500).json({ message: 'Error sending notification.', error });
  //   });

  const delay = 5000;
  console.log('API: scheduleNotificationTimeout', scheduleNotificationTimeout)
  if (scheduleNotificationTimeout > 0) {
    setTimeout(() => {
      // webPush
      //   .sendNotification(lastSubscription, payload)
      //   .then(() => {
      //     res.status(200).json({ message: 'Notification sent successfully.' });
      //   })
      //   .catch((error) => {
      //     console.error('Error sending notification:', error);
      //     res
      //       .status(500)
      //       .json({ message: 'Error sending notification.', error });
      //   });

      pushSubscriptions.forEach(subscription => {
          console.log(`Sending notification`);
          webPush.sendNotification(subscription, payload).then(response => {
              console.log('sendNotification: response',response)
          })
            .catch(error => {
                console.error('Error sending notification:', error);
                if (error.statusCode === 410) {
                    pushSubscriptions.delete(subscription.endpoint);
                }
            });
    });
    }, scheduleNotificationTimeout * 1000);
  }
});

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
