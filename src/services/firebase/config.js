import * as firebase from 'firebase';

const configFirebase = () =>{
    const firebaseConfig = {
        apiKey: "AIzaSyDoKjtnc7pax74vJgr9PmByle05AVeY2W8",
        authDomain: "les-fanfoues-en-vadrouille.firebaseapp.com",
        databaseURL: "https://les-fanfoues-en-vadrouille.firebaseio.com",
        projectId: "les-fanfoues-en-vadrouille",
        storageBucket: "les-fanfoues-en-vadrouille.appspot.com",
        messagingSenderId: "186928631597",
        appId: "1:186928631597:web:36ec362e150789f1b4cda4",
        measurementId: "G-W8C9YXSRDX"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export default configFirebase