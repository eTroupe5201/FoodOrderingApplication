// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics"; // Import isSupported
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const {
	VITE_REACT_APP_API_KEY,
	VITE_REACT_APP_AUTH_DOMAIN,
	VITE_REACT_APP_PROJECT_ID,
	VITE_REACT_APP_STORAGE_BUCKET,
	VITE_REACT_APP_MESSAGING_SENDER_ID,
	VITE_REACT_APP_APP_ID,
	VITE_REACT_APP_MEASUREMENT_ID,
} = import.meta.env;

export const firebaseConfig = {
	apiKey: VITE_REACT_APP_API_KEY,
    authDomain: VITE_REACT_APP_AUTH_DOMAIN,
    projectId: VITE_REACT_APP_PROJECT_ID,
    storageBucket: VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: VITE_REACT_APP_APP_ID,
    measurementId: VITE_REACT_APP_MEASUREMENT_ID,
}

let analytics;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof VITE_REACT_APP_MEASUREMENT_ID === "string" && isAnalyticsSupported()) { // Check if analytics is supported, fix bug
    analytics = getAnalytics(app);
}

export { analytics };
export const db = getFirestore(app);
export const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099"); // Adjust port if necessary

export const functions = getFunctions(app);
//connectFunctionsEmulator(functions, "localhost", 5001); // Adjust port if necessary

//connectFirestoreEmulator(db, 'localhost', 8080);
