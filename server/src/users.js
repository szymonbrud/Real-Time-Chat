export const users = [];

// TODO: jesli dołaczanie zależy od nicku to jest totalnie bez sensu

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
  // -
  // 1) musi działać jeśli otworzymy tę samą rozmowę na 2 kontach
  // const existUserSameRoom = users.find((user) => user.userId === userId && user.room === room);

  // if (existUserSameRoom) {
  //   users.push(existUserSameRoom);
  // }
};

export const getUser = (id) => {
  const us = users.find((user) => user.id === id);
  if (us) {
    return us;
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

// script
// 1) musi działać jeśli otworzymy tę samą rozmowę na 2 kontach
// 2) musi działać jeśli otworzymy 2 różne rozmowy na tym mamym koncie
// 3) wcześniej byliśmy na podwójnej rozmowie a teraz każdy dołacza na inny kanał
// 4) odwrotnie do 3) ↑
