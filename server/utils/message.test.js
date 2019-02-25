var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it ('should generate correct message object', () => {
        console.log(require('./message'));
        const expectBody = {
            from: 'tin',
            text: 'Hi Hi',
            createdAt: new Date().getTime()
        }
        const message = generateMessage(expectBody.from, expectBody.text);
        expect(message).toInclude(expectBody);
        
    })
});


describe('generateMessage', () => {
    it ('should generate correct message object', () => {
        console.log(require('./message'));
        const expectBody = {
            from: 'Admin',
            url: 'https://www.google.com/maps/?q=1,2',
            createdAt: new Date().getTime()
        }
        const message = generateLocationMessage(expectBody.from, 1, 2);
        expect(message).toInclude(expectBody);
        
    })
})