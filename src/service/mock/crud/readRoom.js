import db from "../db";

const findRoom = (name) => {
    let foundRoom = db.room.find(entry => entry.name === name);
    return Promise.resolve(foundRoom | {});
}

export default findRoom;