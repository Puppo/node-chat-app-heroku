
const moment = require('moment');

moment.locale('it')

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMMM Do YYYY'));

// const date = moment();
// date.add(-3, 'hour');
// console.log(date.format('h:mm a'))

const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

const createAt = new Date().getTime();
const date = moment(createAt);
console.log(date.format('h:mm a'))
