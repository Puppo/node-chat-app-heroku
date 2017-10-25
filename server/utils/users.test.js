
const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Test 1',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Test 2',
      room: 'Angular Course'
    }, {
      id: '3',
      name: 'Test 3',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var user = {
      id: '1234',
      name: 'Test',
      room: 'The Room Test'
    };
    const newUser = users.add(user.id, user.name, user.room);
    expect(newUser).toMatchObject(user);
    expect(users.users.length).toBe(4);
  });

  it('should remove a user', () => {
    const user = users.users[0];
    const userRemoved = users.remove(user.id);
    expect(userRemoved).toMatchObject(user);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userRemoved = users.remove('23');
    expect(userRemoved).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const user = users.users[0];
    const userFind = users.get(user.id);
    expect(userFind).toMatchObject(user);
    expect(users.users.length).toBe(3);
  });

  it('should not find a user', () => {
    const userFind = users.get('23');
    expect(userFind).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Test 1', 'Test 3']);
  });

  it('should return names for angular course', () => {
    var userList = users.getUserList('Angular Course');
    expect(userList).toEqual(['Test 2']);
  });

})
