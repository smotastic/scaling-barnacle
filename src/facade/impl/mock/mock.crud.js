import db from "./db";
import Codes from "../../utils/constants.codes";


const randomid = () => {
    let generatePart = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // eslint-disable-next-line
    return [1, 2, 3].map(_ => generatePart()).reduce((prev, curPart) => `${prev}-${curPart}`, generatePart());
}

export const createRoom = async (name, password) => {
    let newDoc = { name, password, id: randomid() };
    let roomStore = await db.getItem("room");
    if (!roomStore) {
        roomStore = [];
    }
    roomStore.push(newDoc);
    db.setItem("room", roomStore);
    return Promise.resolve(Codes.SUCCESS_CREATE(newDoc.id))
}

export const readRoom = async (id) => {
    let roomStore = await db.getItem("room");
    if (!roomStore) {
        roomStore = [];
        db.setItem("room", roomStore);
    }
    let foundRoom = roomStore.find(entry => entry.id === id);
    return Promise.resolve(foundRoom || {});
}

export const deleteRoom = async (id) => {
    let roomStore = await db.getItem("room");
    let indexOfRoom = roomStore.map(room => room.id).indexOf(id);
    roomStore.splice(indexOfRoom, 1);
    db.setItem("room", roomStore);
    return Promise.resolve(id);
}

export default {
    createRoom, readRoom, deleteRoom
};