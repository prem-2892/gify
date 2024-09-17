// firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD20xnraaRNh2WdjNWJ9GrU61lYjV-gq7I',
  authDomain: 'gify-be2d0.firebaseapp.com',
  projectId: 'gify-be2d0',
  storageBucket: 'gify-be2d0.appspot.com',
  messagingSenderId: '962974336489',
  appId: '1:962974336489:web:0ea130f99cd946708bb778',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
