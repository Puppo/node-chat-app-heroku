class Users {

  constructor() {
    this.users = [];
  }

  add(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  remove(id) {
    const user = this.get(id);
    
    if (!!user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  get(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    const nameArray = users.map(user => user.name);
    return nameArray;
  }

}

module.exports = {Users};
