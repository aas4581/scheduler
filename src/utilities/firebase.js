import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyARhTEYEsw19fRMFkPxKHjD5ucgKAb8vsQ",
  authDomain: "create-react-app-42773.firebaseapp.com",
  databaseURL: "https://create-react-app-42773-default-rtdb.firebaseio.com",
  projectId: "create-react-app-42773",
  storageBucket: "create-react-app-42773.appspot.com",
  messagingSenderId: "726606927684",
  appId: "1:726606927684:web:dd1a8b7bb1f951b77e6911"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);



export const useData = (path, transform) => {
	const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};