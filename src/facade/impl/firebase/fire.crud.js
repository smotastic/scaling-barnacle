import { firestore, storage } from "./connection"
import Codes from "../../utils/constants.codes";

const readRoom = async (id) => {
    let snapshot = await firestore.collection("room").doc(id).get();
    let result = { ...snapshot.data(), id };
    return result;
}

const createRoom = async (name, password) => {
    let newRoomDoc = { name, password };
    let newDoc = {};
    try {
        newDoc = await firestore.collection("room").add(newRoomDoc);
    } catch (e) {
        console.log(e);
    }
    return Promise.resolve(Codes.SUCCESS_CREATE(newDoc.id))
}

const deleteRoom = async (id) => {
    // delete doc
    await firestore.collection("room").doc(id).delete();
    // delete media
    let ref = storage.ref();
    let folderRef = ref.child(id);
    let res = await folderRef.listAll();
    await res.items.map(item => item.name).forEach(async fileName => await folderRef.child(fileName).delete());

    return Promise.resolve(id);
}

export default {
    createRoom, readRoom, deleteRoom
};