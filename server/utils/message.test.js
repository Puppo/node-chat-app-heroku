
const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generete correct message object', () => {
    const from = 'example'
        , text = 'My text';
    const message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(message.createAt).toBeTruthy();
    expect(typeof message.createAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const from = 'Deb'
          , latitude = 15
          , longitude = 16
          , url = 'https://www.google.com/maps?q=15,16';

    const locationMessage = generateLocationMessage(from, latitude, longitude);
    expect(locationMessage).toMatchObject({from, url});
    expect(locationMessage.createAt).toBeTruthy();
    expect(typeof locationMessage.createAt).toBe('number');
  });
});
