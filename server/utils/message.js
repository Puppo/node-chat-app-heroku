const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: moment().valueOf(),
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    imageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=200x200&markers=color:blue%7Clabel:S%7C${latitude},${longitude}`,
    createAt: moment().valueOf(),
  }
};

module.exports = {generateMessage, generateLocationMessage};
