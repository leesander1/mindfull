const moment = require('moment');

let date = moment().format("MMM Do YY");

/**
 * GET /
 * Entry page.
 */
exports.newEntry = (req, res) => {
  res.render('entry', {
    title: 'New Entry',
    layout: 'interactive',
    day: date
  });
};
