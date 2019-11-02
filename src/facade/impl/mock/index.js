import MockCrud from './mock.crud';
import MockMedia from './mock.media';

export const createRoom = MockCrud.createRoom;
export const readRoom = MockCrud.readRoom;
export const findRoomByName = MockCrud.findRoomByName;
export const deleteRoom = MockCrud.deleteRoom;
export const uploadMedia = MockMedia.uploadMedia;
export const downloadMedia = MockMedia.downloadMedia;
export const removeMedia = MockMedia.removeMedia;

const Facade = { ...MockCrud, ...MockMedia }

export default Facade