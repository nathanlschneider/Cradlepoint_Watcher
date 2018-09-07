const _ = require('underscore');

var ar1 = [{ name: '018', state: 'online', conType: 'LTE', account: '28785' },
  { name: '092', state: 'online', conType: 'LTE', account: '28785' },
  { name: '119', state: 'online', conType: 'LTE', account: '28785' },
  { name: '066', state: 'online', conType: 'LTE', account: '28785' }];

var ar2 = [{ name: '018', state: 'online', conType: 'LTE', account: '28785' },
{ name: '092', state: 'online', conType: 'LTE', account: '28785' },
{ name: '119', state: 'online', conType: 'LTE', account: '28785' }];

var ar11 = ["qwe", "qwer"];
var ar22 = ["qwe"]


console.log(_.difference(ar11, ar22));

JSON