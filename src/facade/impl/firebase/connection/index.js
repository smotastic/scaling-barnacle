import Config from './fire.config.js'

const firebase = require("firebase/app");
console.log(firebase);
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

firebase.initializeApp(Config);

const store = firebase.firestore();

export const firestore = store;
export const auth = firebase.auth();
export const storage = firebase.storage();
