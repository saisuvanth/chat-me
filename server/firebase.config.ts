import * as firebase from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import json from './mercor-firebase.json';

const app = firebase.initializeApp({
	credential: firebase.credential.cert(json as any),
})

const auth = getAuth(app);

export default auth;

