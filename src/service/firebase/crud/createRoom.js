import db from "../db";

const createRoom = (name, password) => {
    let newRoom = { name, password };
    db.room.push(newRoom);
    return Promise.resolve(newRoom);
}

export default createRoom;