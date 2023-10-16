import 'firebase/app'
import {initializeApp} from 'firebase/app'

import 'firebase/storage'
import {getStorage} from 'firebase/storage'

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyB0SlXwzuD4e6U1i8sQESX2PVCClesA1vU",
    authDomain: "lagospoloclub-6f778.firebaseapp.com",
    projectId: "lagospoloclub-6f778",
    storageBucket: "lagospoloclub-6f778.appspot.com",
    messagingSenderId: "337139075063",
    appId: "1:337139075063:web:860a247eb38746641450f2",
})

const storage = getStorage(firebaseConfig);

export default storage;