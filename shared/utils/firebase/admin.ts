import * as admin from 'firebase-admin';

let app: admin.app.App;
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  [app] = admin.apps;
}

export default app;
