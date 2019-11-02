import { storage } from "./connection"
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
    console.log(roomId, listener);
}

const executeUploadListener = async (roomId, file) => {
    console.log(roomId, file);
}

export default { uploadMedia, downloadMedia, removeMedia, listenToUpload, executeUploadListener }