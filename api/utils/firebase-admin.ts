import * as admin from 'firebase-admin';

let app: admin.app.App;

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  if (admin.apps[0]) {
    [app] = admin.apps;
  } else {
    throw new Error('Firebase app is not initialized');
  }
}

export default app;
