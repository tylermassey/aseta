interface Firebase {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}

interface Config {
    firebase: Firebase;
}

export { Firebase, Config };
