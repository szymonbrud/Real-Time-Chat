import {RoomsData} from '../databaseControll';

export const clearRoomsData = async () => {
  await RoomsData.deleteOne({}, (err) => {
    if (err) {
      return err;
      console.log(err);
    }
  });
  return 'wow';
};
