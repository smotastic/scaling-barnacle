import FireCrud from './fire.crud';
import FireMedia from './fire.media';

export const createRoom = FireCrud.createRoom;
export const readRoom = FireCrud.readRoom;
export const uploadMedia = FireMedia.uploadMedia;
export const downloadMedia = FireMedia.downloadMedia;

const Facade = { ...FireCrud, ...FireMedia }

export default Facade