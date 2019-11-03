import { storage, firestore } from "./connection"
import Codes from "../../utils/constants.codes";

const uploadMedia = async (roomId, file) => {
    let storageRef = storage.ref();
    let roomRef = storageRef.child(`${roomId}/${file.name}`);
    let snapshot = await roomRef.put(file);
    let downloadUrl = await snapshot.ref.getDownloadURL();
    return Codes.SUCCESS_UPLOAD({ name: file.name, url: downloadUrl });
}

const downloadMedia = async (roomId) => {
    let storageRef = storage.ref();
    let listRef = storageRef.child(roomId);
    let res = await listRef.listAll();
    return Promise.all(res.items.map(async item => ({ name: item.name, url: await item.getDownloadURL() })));
}

const removeMedia = async (roomId, fileName) => {
    let storageRef = storage.ref();
    var fileRef = storageRef.child(`${roomId}/${fileName}`);
    await fileRef.delete();
    return Promise.resolve(fileName);
}

const listenToUpload = async (roomId, listener) => {
    let alreadyExistingDocs = await firestore.collection("room_seenFiles").where("roomId", "==", roomId);
    let detachListener = alreadyExistingDocs.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                listener(change.doc.data());
            }
        });
    });
    return detachListener;
}

const executeUploadListener = async (roomId, file) => {
    let collection = await firestore.collection("room_seenFiles");
    let alreadyExistingDocs = await collection.where("roomId", "==", roomId).where("filename", "==", file.name).get();
    // file not existing, create it, so others can see it
    if (alreadyExistingDocs.empty) {
        let newFileToListenTo = { roomId, filename: file.name, url: file.url };
        await collection.add(newFileToListenTo);
    }
}

export default { uploadMedia, downloadMedia, removeMedia, listenToUpload, executeUploadListener }