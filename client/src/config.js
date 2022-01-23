import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "handle-id.firebaseapp.com",
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
