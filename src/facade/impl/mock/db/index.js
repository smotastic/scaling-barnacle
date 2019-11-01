const localforage = require("localforage");
const store = localforage.createInstance({ name: "barnacle" });

export default store;