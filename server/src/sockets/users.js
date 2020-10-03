export const users = [];

export const createUser = (id, username, room, userId) => {
  const existUser = users.find((user) => {
    if (user.userId === userId && user.id === id) return user;
  });
  const sameUserDiffrentDevice = users.find((user) => {
    if (user.userId === userId && user.room === room) return user;
  });

  if (sameUserDiffrentDevice) {
    return {err: 'Jesteś już w tym pokoju na innym urządzeniu'};
  } else if (existUser) {
    const index = users.findIndex((user) => user.userId === userId && user.id === id);
    users[index].room = room;
  } else {
    users.push({id, username, room: room, userId});
  }
  return {user: {username, room, userId}};
};

export const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    return user;
  } else {
    return {err: 'err'};
  }
};

export const removeUser = (id) => {
  const userIndexToRemote = users.findIndex((user) => user.id === id);
  const userSave = users[userIndexToRemote];
  if (userIndexToRemote !== -1) {
    users.splice(userIndexToRemote, 1)[0];
    return userSave;
  }
};

export const getOnlineUsers = (room) =>
  users.filter((user) => user.room === room).map((user) => user.username);

export const leaveFromRoom = (id) => {
  const indexUserToLeave = users.findIndex((user) => user.id === id);
  users[indexUserToLeave].room = '';
};
