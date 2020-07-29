const users = [];

export const createUser = (id, username, room, userId) => {
  console.log(room);
  const existUser = users.find((user) => user.username === username);

  if (existUser) {
    const index = users.findIndex((user) => user.username === username);
    users[index].room = room;
  } else {
    users.push({id, username, room: room, userId});
  }
  return {user: {username, room, userId}};
};

export const getUser = (id) => {
  return users.find((user) => user.id === id);
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
