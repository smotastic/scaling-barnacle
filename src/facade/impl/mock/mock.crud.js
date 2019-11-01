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
    db.room.push(newDoc);
    return Promise.resolve(Codes.SUCCESS_CREATE(newDoc.id))
}

export const readRoom = (id) => {
    let foundRoom = db.room.find(entry => entry.id === id);
    return Promise.resolve(foundRoom || {});
}

export default {
    createRoom, readRoom
};