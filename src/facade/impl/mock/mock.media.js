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
    room.files.push(base64File);
    db.setItem("room", roomStore);
    return Codes.SUCCESS_UPLOAD(base64File);
}

// eslint-disable-next-line
const downloadMedia = async (roomId) => {
    let roomStore = await db.getItem("room");
    let room = roomStore.find(r => r.id === roomId);
    return Promise.resolve(room.files || []);
}

export default { uploadMedia, downloadMedia }