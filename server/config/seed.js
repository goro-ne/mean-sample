/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');


Thing.find({}).remove(function() {

  Thing.create({
    name : 'Attend System MTG.',
    info : 'For progress confirmation and this week plans until last week @ ESC room.'
  }, {
    name : 'Sales-Mng System MTG.',
    info : 'For bug reports and test specification confirmation @ Ctrl room.'
  }, {
    name : 'Sales-Mng System Review',
    info : 'Review Board of the test specifications you are planning next week @ Alt room.'
  },  {
    name : 'Welcome Luncn for New Member',
    info : '@ All Day Dining Cross Dine'
  },  {
    name : 'Bigdata Solution DEV.',
    info : 'Development projects of sales support tool @ Enter room.'
  },{
    name : 'Workshop AngularJS',
    info : 'In about capacity number people I have scheduled a workshop @ Alt room.'
  });
});
