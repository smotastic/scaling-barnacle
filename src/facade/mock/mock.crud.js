import db from "./db";

const createRoom = (name, password) => {
    let newRoom = { name, password };
    db.room.push(newRoom);
    return Promise.resolve(newRoom);
}

const readRoom = (name) => {
    let foundRoom = db.room.find(entry => entry.name === name);
    return Promise.resolve(foundRoom || {});
}

export default {
    createRoom, readRoom
};