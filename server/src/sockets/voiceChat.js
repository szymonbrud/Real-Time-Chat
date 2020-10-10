const users = [];

export const joinUser = ({roomId, name, socketId}) => {
  const roomsUsers = users.filter((user) => user.roomId === roomId);
  users.push({roomId, name, socketId});

  return roomsUsers;
};
