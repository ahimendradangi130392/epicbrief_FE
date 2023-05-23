import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, updateDoc, addDoc, setDoc, deleteDoc, where, query } from 'firebase/firestore/lite';


// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD_vE-AVaMwPtjda0TVdlgJPu9NHHaJKW4",
//     authDomain: "it-wala-thekedar-b08b5.firebaseapp.com",
//     databaseURL: "https://it-wala-thekedar-b08b5-default-rtdb.firebaseio.com",
//     projectId: "it-wala-thekedar-b08b5",
//     storageBucket: "it-wala-thekedar-b08b5.appspot.com",
//     messagingSenderId: "875528147998",
//     appId: "1:875528147998:web:4ade571f6424381b7cca0f",
//     measurementId: "G-QZMB4BYDB2"
// };
  
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function getFireBaseData() {
    const testdata = collection(db, 'enquey');
    const dataSnapshot = await getDocs(testdata);
    const data = dataSnapshot.docs.map(doc => doc.data());
    return data;
}


export async function updateFireBaseData(datas, objectId) {

    try {
        const collRef = collection(db, 'epicbrief');
        const dataSnapshot = await getDocs(collRef);
        const data = await dataSnapshot.docs.map(doc => { return { id: doc.id, doc: doc.data() } });
        let ids = await data.filter(x => parseInt(x.doc.hs_object_id) == objectId)
        let id = ids[0].id;

        if (id) {
            const taskDocRef = doc(db, 'epicbrief', id)
            await setDoc(taskDocRef, {
                hs_meeting_title: datas.hs_meeting_title,
                hs_meeting_body: datas.hs_meeting_body,
                hs_object_id: objectId,

            }).then(res => console.log("fire", res))
        }
    } catch (err) {
    }
}

export async function deleteFireBaseData(objectId) {
    const collRef = collection(db, 'epicbrief');
    const dataSnapshot = await getDocs(collRef);
    const data = dataSnapshot.docs.map(doc => { return { id: doc.id, doc: doc.data() } });
    let ids = data.filter(x => parseInt(x.doc.hs_object_id) == objectId)
    try {
        let id = ids[0].id;
        if (id) {
            const taskDocRef = doc(db, 'epicbrief', id)
            await deleteDoc(taskDocRef).then(res => console.log("delete"))
        }

    } catch (err) {
    }
}

export async function addFireBaseData(data) {
    const taskDocRef = collection(db, 'epicbrief')
    try {
        await addDoc(taskDocRef, {
            hs_object_id: data.hs_object_id,
            hs_meeting_title: data.hs_meeting_title,
            hs_meeting_body: data.hs_meeting_body,
        })
    } catch (err) {
    }
}


export const getDocId = async (objectId) => {
    const collRef = collection(db, 'epicbrief');
    const dataSnapshot = await getDocs(collRef);
    const data = await dataSnapshot.docs.map(doc => { return { id: doc.id, doc: doc.data() } });
    let ids = await data.filter(x => parseInt(x.doc.hs_object_id) == objectId)
    return ids

}