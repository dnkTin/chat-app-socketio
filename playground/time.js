const moment = require('moment');
var date = new moment();
date.add(1, 'years')
console.log(date.format('h:mm a'));