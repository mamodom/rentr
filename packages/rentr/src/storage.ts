import * as admin from "firebase-admin";
import * as fireorm from "fireorm";

import { resolve } from "path";

import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const serviceAccount = {
  projectId: process.env.FIRESTORE_PROJECT_ID,
  databaseUrl: process.env.FIREBASE_DATABASE_URL,
  privateKey: Buffer.from(
    process.env.FIRESTORE_PRIVATE_KEY_BASE_64 as string,
    "base64"
  ).toString("ascii"),
  clientEmail: process.env.FIRESTORE_CLIENT_EMAIL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true
});
fireorm.Initialize(firestore);

export default fireorm;
