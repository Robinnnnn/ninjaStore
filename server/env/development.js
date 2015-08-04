module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "http://localhost:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "1476011056044369",
    "clientSecret": "191f6c8d0f32f584b96e1a562eb8dd83",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "853502665892-bu9golih10gctphqoriueivhgjc5fthg.apps.googleusercontent.com",
    "clientSecret": "JtCswpqmsSCMjxbP004wikPb",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};
