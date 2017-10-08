const expect = require('chai').expect;

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'ilker';
        let text = 'this is message';
        let message = generateMessage(from,text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({from, text});
    });

    it('should generate correct location object', () => {
        let from = 'ilker';
        let lat = 41;
        let long = 29;
        let url = 'https://www.google.com/maps?q=41,29';

        let result = generateLocationMessage(from,lat,long);
        expect(result.createdAt).to.be.a('number');
        expect(result).to.include({from, url});
    })
})