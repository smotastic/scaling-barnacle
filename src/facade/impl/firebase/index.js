import FireCrud from './fire.crud';
import FireMedia from './fire.media';

export const createRoom = FireCrud.createRoom;
export const readRoom = FireCrud.readRoom;
export const findRoomByName = FireCrud.findRoomByName;
export const deleteRoom = FireCrud.deleteRoom;
export const uploadMedia = FireMedia.uploadMedia;
export const downloadMedia = FireMedia.downloadMedia;
export const removeMedia = FireMedia.removeMedia;
export const listenToUpload = FireMedia.listenToUpload;
export const executeUploadListener = FireMedia.executeUploadListener;

const Facade = { ...FireCrud, ...FireMedia }

export default Facade