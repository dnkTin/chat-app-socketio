[{
    id: '/#123dsaklfjas',
    name: 'Andrew',
    room: 'The office fans'
}]

// add user
// remove user
// fetch user
// get user list

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('tin', 25);

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        var users =  this.users.filter((user) => user.room === room);
        var nameArray = users.map((user) => user.name);
        return nameArray;
    }
    
}

module.exports = {Users};