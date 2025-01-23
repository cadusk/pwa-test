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
  'BN9seiGCuLY_kUI1bmgQa-YzQUe4-nGTC_mK6GAz2NrmVwWOySH3dwZsJkD2dWmZC8AA6hxyI7A9SHqcZAZa6oM',
  'JkrazHU5DDtwbrjQ8Rp-CXDd6271PfqzQNM0x-obWOA'
);

// Save subscription endpoint
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  pushSubscriptions.set(subscription.endpoint, subscription);
  console.log('Subscription received:', subscription);
  res.status(200).json({});
});

app.post('/unsubscribe', (req, res) => {
  const subscription = req.body;
  pushSubscriptions.delete(subscription.endpoint);
  res.status(200).json({});
});

app.post('/send-notification', (req, res) => {
  const payload = req.body.payload;
  const  {scheduleNotificationTimeout}  = JSON.parse(payload);
  if (scheduleNotificationTimeout > 0) {
    setTimeout(() => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});