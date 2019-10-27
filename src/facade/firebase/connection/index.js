import Config from './fire.config.js'

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp(Config);

const store = firebase.firestore();

export const firestore = store;
export const auth = firebase.auth();
