const moment = require('moment');
const nodemailer = require('nodemailer');
const async = require('async');
const Entry = require('../models/Entry');



/**
 * GET /entry
 * Entry page.
 */
exports.newEntry = (req, res) => {
  let date = moment().format("MMM Do YY");
  res.render('entry', {
    title: 'New Entry',
    layout: 'interactive',
    day: date,
  });
};

exports.entryOne = (req, res) => {
  res.render('entry_one', {
    title: 'How are you feeling?',
    layout: 'interactive',
  });
};

exports.entryTwo = (req, res) => {
  res.render('entry_two', {
    title: 'Stress Level',
    layout: 'interactive',
  });
};
