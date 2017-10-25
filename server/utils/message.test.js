
const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should genereta correct message object', () => {
    const from = 'example'
        , text = 'My text';
    const message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(message.createAt).toBeTruthy();
    expect(typeof message.createAt).toBe('number');
  });
});
