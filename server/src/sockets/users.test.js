const dataUser1 = {
  id: '323dz3fga',
  username: 'szymon',
  room: '01',
  userId: 'heheeh1',
};

const dataUser2 = {
  id: 'aweqrr32aafd',
  username: 'adnrzej',
  room: '02',
  userId: 'heheeh2',
};

const dataUser3 = {
  id: '12394u1fasjfvz',
  username: 'ben',
  room: '01',
  userId: 'heheeh3',
};

const {username, room, id, userId} = dataUser1;

describe('create user', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('creating a user who has not yet been', () => {
    const {createUser} = require('./users');
    const response = createUser(id, username, room);
    expect(response).toEqual({user: {username, room}});
  });

  it('create a user who has already been', () => {
    const {createUser} = require('./users');
    createUser(id, username, room);
    const response2 = createUser(id, username, room);
    expect(response2).toEqual({err: 'Jesteś już w tym pokoju na innym urządzeniu'});
  });

  it('get user', () => {
    const {createUser, getUser} = require('./users');
    createUser(id, username, room);
    const responseGetUser = getUser(id);
    expect(responseGetUser).toEqual({id, username, room});
  });

  it('remove user', () => {
    const {createUser, getUser, removeUser} = require('./users');
    createUser(id, username, room);
    createUser(dataUser2.id, dataUser2.username, dataUser2.room);
    const removeUserData = removeUser(dataUser2.id);

    expect(removeUserData).toEqual({
      id: dataUser2.id,
      username: dataUser2.username,
      room: dataUser2.room,
    });

    const getUser2 = getUser(dataUser2.id);
    expect(getUser2).toEqual({err: 'err'});
    const getUser1 = getUser(id);
    expect(getUser1).toEqual({id, username, room});
  });

  it('get onlineUsers', () => {
    const {createUser, getOnlineUsers} = require('./users');
    createUser(id, username, room, userId);
    createUser(dataUser2.id, dataUser2.username, dataUser2.room, dataUser2.userId);
    createUser(dataUser3.id, dataUser3.username, dataUser3.room, dataUser3.userId);

    const onlineUsers = getOnlineUsers(room);

    expect(onlineUsers).toEqual([username, dataUser3.username]);
  });
});
