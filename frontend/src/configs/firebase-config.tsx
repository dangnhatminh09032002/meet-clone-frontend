import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBeZ4_ymJv3ftBet7MWQ8MTFU0r_W-uYgk',
    authDomain: 'meet-clone-v1.firebaseapp.com',
    projectId: 'meet-clone-v1',
    storageBucket: 'meet-clone-v1.appspot.com',
    messagingSenderId: '825820055456',
    appId: '1:825820055456:web:a2c0047f05d0ddadcf86c5',
    measurementId: 'G-E4QHWH6E3K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
