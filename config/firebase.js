
const firebaseAdmin = require("firebase-admin")
require('dotenv').config()

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    "type": "service_account",
    "project_id": `${process.env.FIREBASE_PROJECT_ID}`,
    "private_key_id": `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
    "private_key": `${process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')}`,
    "client_email": `${process.env.FIREBASE_CLIENT_EMAIL}`,
    "client_id": `${process.env.FIREBASE_CLIENT_ID}`,
    "auth_uri": `${process.env.FIREBASE_AUTH_URL}`,
    "token_uri": `${process.env.FIREBASE_TOKEN_URL}`,
    "auth_provider_x509_cert_url": `${process.env.FIREBASE_AUTH_CERT_URL}`,
    "client_x509_cert_url": `${process.env.FIREBASE_CLIENT_CERT_URL}`
  }),
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`
})

module.exports = firebaseAdmin
