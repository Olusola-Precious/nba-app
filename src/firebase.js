import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDceNaoMEVLEoQm37Tg_kcgjfTHE53hYSw",
    authDomain: "nba-full-9dffc.firebaseapp.com",
    databaseURL: "https://nba-full-9dffc-default-rtdb.firebaseio.com",
    projectId: "nba-full-9dffc",
    storageBucket: "nba-full-9dffc.appspot.com",
    messagingSenderId: "704077326167",
    appId: "1:704077326167:web:ab460e6b3537b722d90012",
    measurementId: "G-JHJL38WX35"
};

firebase.initializeApp(firebaseConfig);

const firebaseDb = firebase.database();
const firebaseArticles = firebaseDb.ref('articles');
const firebaseTeams = firebaseDb.ref('teams');
const firebaseVideos = firebaseDb.ref('videos');


const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childsnapshot) => {
        //console.log(childsnapshot)
        data.push({
            ...childsnapshot.val(),
            id: childsnapshot.key
        })
    })

    return data;
}


export {
    firebase,
    firebaseDb,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}

//firebase.database().ref().set('It Works');