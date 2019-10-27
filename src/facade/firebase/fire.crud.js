const readRoom = (name) => {
    console.log(name);
    return Promise.resolve({});
}

const createRoom = (name, password) => {
    console.log(name, password);
    return Promise.resolve({});
}

export default {
    createRoom, readRoom
};