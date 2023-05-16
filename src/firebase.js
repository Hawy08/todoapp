import  {initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbu0CngIr3Q5X-Vvs4lvBYF2KiAuApWI0",
  authDomain: "todoapp-bb7e6.firebaseapp.com",
  projectId: "todoapp-bb7e6",
  storageBucket: "todoapp-bb7e6.appspot.com",
  messagingSenderId: "663546729757",
  appId: "1:663546729757:web:fc838a45ecb38e34f1fdf4"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);