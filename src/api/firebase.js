const firebase = require("firebase")
require("firebase/firestore")

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID
})

export default firebase

