const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const DATABASE_URL = require('./keys');

const serviceAccount = require('./firebase-api-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL
});

exports.storePostData = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin
      .database()
      .ref('posts')
      .push({
        id: request.body.id,
        title: request.body.title,
        location: request.body.location,
        image: request.body.image
      })
      .then(() => {
        response
          .status(201)
          .json({ message: 'Data stored', id: request.body.id });
      })
      .catch(err => {
        response.status(500).json({ error: err });
      });
  });
});
