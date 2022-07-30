if (process.env.NODE_ENV !== 'production') {
    (await import('dotenv')).config();
};

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    mongoUri: process.env.MONGO_URI,
    secretSession: process.env.SECRET_SESSION,
    keySession: process.env.KEY_SESSION,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    email: process.env.EMAIL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookId: process.env.FACEBOOK_ID,
    facebookSecret: process.env.FACEBOOK_SECRET,
    newRelicAppName: process.env.NEW_RELIC_APP_NAME,
    newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY,
};

export default config;