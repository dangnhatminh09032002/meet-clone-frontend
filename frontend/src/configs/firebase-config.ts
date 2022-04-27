import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: `AIzaSyDzWDumzS3BdbgSDviwoMq-Lpe5s2fevBU`,
    authDomain: `meet-clone-v2.firebaseapp.com`,
    projectId: `meet-clone-v2`,
    storageBucket: `meet-clone-v2.appspot.com`,
    messagingSenderId: `741670495932`,
    appId: `1:741670495932:web:acd74c1b4b6559f32492b9`,
    measurementId: `G-BNPDPTT669`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
