import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAB6DPOp1KLgryTrn56PPA7Fg21QqMUfIk",
    authDomain: "todo-clone-in.firebaseapp.com",
    projectId: "todo-clone-in",
    storageBucket: "todo-clone-in.appspot.com",
    messagingSenderId: "605343492396",
    appId: "1:605343492396:web:d6cfff8ab00a4ffd78e489",
    measurementId: "G-9GZEKCXWNV"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();