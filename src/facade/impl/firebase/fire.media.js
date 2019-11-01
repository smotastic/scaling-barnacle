import { storage } from "./connection"
import Codes from "../../utils/constants.codes";

const uploadMedia = async (roomId, file) => {
    let storageRef = storage.ref();
    let roomRef = storageRef.child(`${roomId}/${file.name}`);
    let snapshot = await roomRef.put(file);
    let downloadUrl = await snapshot.ref.getDownloadURL();
    return Codes.SUCCESS_UPLOAD(downloadUrl);
}

const downloadMedia = async (roomId) => {
    let storageRef = storage.ref();
    let listRef = storageRef.child(`${roomId}`);
    let res = await listRef.listAll();
    return Promise.all(res.items.map(item => { item.name, item.getDownloadURL() }));
}

export default { uploadMedia, downloadMedia }