const express = require('express');
const webPush = require('web-push');
const router = express.Router();

// Temporary in-memory storage for subscriptions
let pushSubscriptions = new Map();

// Configure VAPID keys
webPush.setVapidDetails(
  'mailto:gabriel.guerrera@programmersinc.com',
  'BN9seiGCuLY_kUI1bmgQa-YzQUe4-nGTC_mK6GAz2NrmVwWOySH3dwZsJkD2dWmZC8AA6hxyI7A9SHqcZAZa6oM',
  'JkrazHU5DDtwbrjQ8Rp-CXDd6271PfqzQNM0x-obWOA'
);

// Save subscription endpoint
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  pushSubscriptions.set(subscription.endpoint, subscription);
  console.log('Subscription received:', subscription);
  res.status(200).json({});
});

// Unsubscribe endpoint
router.post('/unsubscribe', (req, res) => {
  const subscription = req.body;
  pushSubscriptions.delete(subscription.endpoint);
  res.status(200).json({});
});

// Send notification endpoint
router.post('/send-notification', (req, res) => {
  const payload = req.body.payload;
  const { scheduleNotificationTimeout } = JSON.parse(payload);

  if (scheduleNotificationTimeout > 0) {
    setTimeout(() => {
      pushSubscriptions.forEach((subscription) => {
        console.log('Sending notification');
        webPush
          .sendNotification(subscription, payload)
          .then((response) => {
            console.log('Notification sent successfully:', response);
          })
          .catch((error) => {
            console.error('Error sending notification:', error);
            if (error.statusCode === 410) {
              pushSubscriptions.delete(subscription.endpoint);
            }
          });
      });
    }, scheduleNotificationTimeout * 1000);
  }

  res.status(200).json({ message: 'Notification scheduled' });
});

module.exports = router;
