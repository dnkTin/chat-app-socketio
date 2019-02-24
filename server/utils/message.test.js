var expect = require('expect');

var {generateMessage} = require('./message');
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
})