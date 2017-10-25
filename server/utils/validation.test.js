
const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string value', () => {
    const res = isRealString(1234);
    expect(res).toBeFalsy();
  });

  it('should reject with only spaces', () => {
    const res = isRealString('        ');
    expect(res).toBeFalsy();
  });

  it('should allow string with non-space character', () => {
    const res = isRealString('    Luca      ');
    expect(res).toBeTruthy();
  });
});
