const users = [];

export const createUser = (id, username, room) => {
  const lowCaseRoom = room.toLowerCase();
  const existUser = users.find(user => user.username === username);
  
  if(existUser){
    return {error: "This username already exists!"}
  }
  users.push({id, username, room: lowCaseRoom});
  return {user: {username, room: lowCaseRoom}}
}

export const getUser = id => users.find(user => user.id === id);

export const removeUser = id => {
  const userIndexToRemote = users.findIndex(user => user.id === id);
  const userSave = users[userIndexToRemote];
  if(userIndexToRemote !== -1){
    users.splice(userIndexToRemote, 1)[0];
    return userSave;
  } 
}

export const getOnlineUsers = room => users.filter(user => user.room === room).map(user => user.username);
