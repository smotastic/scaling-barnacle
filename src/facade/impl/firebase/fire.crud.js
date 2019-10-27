import { firestore } from "./connection"
import Codes from "../../utils/constants.codes";

const readRoom = async (id) => {
    let snapshot = await firestore.collection("room").doc(id).get();
    let result = { ...snapshot.data(), id };
    return result;
}

const createRoom = async (name, password) => {
    console.log(firestore);
    let newRoomDoc = { name, password };
    let newDoc = {};
    try {
        newDoc = await firestore.collection("room").add(newRoomDoc);
    } catch (e) {
        console.log(e);
    }
    return Promise.resolve(Codes.SUCCESS_CREATE(newDoc.id))
}

export default {
    createRoom, readRoom
};