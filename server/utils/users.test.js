const expect = require('chai').expect;
const {Users} = require('./users');

var users;

beforeEach(()=> {
    users = new Users();

    users.users = [{
        id: 1,
        name: 'ilker',
        room: 'soke'
    }, {
        id: 2,
        name: 'ipek',
        room: 'soke'
    }, {
        id: 3,
        name: 'alper',
        room: 'istanbul'
    }]
})

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: 123,
            name: 'ilker',
            room: 'soke'
        }
        
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).to.be.deep.equal([user]);
    });

    it('should find user by id', () => {
        var userId = 1;
        var resUser = users.getUser(1);
        expect(resUser.id).to.be.equal(userId);
    });

    it('should not find user by id', () => {
        var userId = 99;
        var resUser = users.getUser(userId);
        expect(resUser).to.be.undefined;
    });

    it('should remove a user', () => {
        var id = 1;
        var user = users.removeUser(id);

        expect(user.id).to.be.equal(id);
        expect(users.users.length).to.be.equal(2);
    });

    it('should not remove a user', () => {
        var id = 4;
        var user = users.removeUser(id);

        expect(user).to.be.undefined;
        expect(users.users.length).to.be.equal(3);

    })

    it('should return users of soke room',() => {
        var userList = users.getUserList('soke');

        expect(userList).to.deep.equal(['ilker','ipek']);
    });


    it('should return users of istanbul room',() => {
        var userList = users.getUserList('istanbul');

        expect(userList).to.deep.equal(['alper']);
    })
})