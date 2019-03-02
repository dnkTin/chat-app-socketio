const expect = require('expect');

const {
    Users
} = require('./user');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
                id: '1',
                name: 'Mike',
                room: 'Node course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'Node course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node course'
            }
        ];
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'ktin',
            room: 'The office fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
});