const express = require('express');
const admin = require('firebase-admin');

// Replace with the path to your Firebase Admin SDK JSON file
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(express.json()); // For parsing application/json

const PORT = process.env.PORT || 3000;

app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    const result = {
      status: 'success',
      message: 'Notification sent successfully',
      result: response,
    }
    res.status(200).send(result);
  } catch (error) {
    console.log('Error sending message:', error);
    const result = {
      status: 'error',
      message: 'Error sending notification',
      result: error?.errorInfo,
    }
    res.status(500).send(result);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
