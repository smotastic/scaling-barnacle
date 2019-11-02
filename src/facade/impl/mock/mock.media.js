import db from "./db";
import Codes from "../../utils/constants.codes";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const uploadMedia = async (roomId, file) => {
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    if (!room.files) {
        room.files = [];
    }
    let base64File = await toBase64(file);
    let newFile = { name: file.name, url: base64File };
    room.files.push(newFile);
    db.setItem("room", roomStore);
    return Codes.SUCCESS_UPLOAD(newFile);
}

// eslint-disable-next-line
const downloadMedia = async (roomId) => {
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    return Promise.resolve(room.files || []);
}

const removeMedia = async (roomId, fileName) => {
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    let indexOfFileToDelete = room.files.map(file => file.name).indexOf(fileName);
    room.files.splice(indexOfFileToDelete, 1);
    db.setItem("room", roomStore);
    return Promise.resolve(fileName);
}

const listenToUpload = async (roomId, listener) => {
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    // execute listener for each already shown media
    if (room.seenFiles) {
        room.seenFiles.forEach(element => {
            listener(element);
        });
    }
    // listeners are not registered for mocking as callbacks cannot be serialized with localforage
}

const executeUploadListener = async (roomId, file) => {
    // save shown file in seen list
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    if (!room.seenFiles) {
        room.seenFiles = []
    }
    let alreadySeen = room.seenFiles.find(seenFile => file.name === seenFile.name);
    if (!alreadySeen) {
        room.seenFiles.push(file);
    }
    db.setItem("room", roomStore);
    // listeners do not exist for mocking as callbacks cannot be serialized with localforage
}


export default { uploadMedia, downloadMedia, removeMedia, listenToUpload, executeUploadListener }