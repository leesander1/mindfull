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

/**
 * POST /entry
 * Post entry.
 */
exports.postNewEntry = (req, res, next) => {

  const entry = new Entry({
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    date: Date()
  });

  Entry.findOne({ date: Date() }, (err, existingDate) => {
    if (err) { return next(err); }
    if (existingDate) {
      return res.redirect('/entry');
    }
    entry.save((err) => {
      if (err) { return next(err); }
      res.redirect('/entry1');
    });
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

exports.entryThree = (req, res) => {
  res.render('entry_three', {
    title: 'Sleep Quality',
    layout: 'interactive',
  });
};

exports.entryFour = (req, res) => {
  res.render('entry_four', {
    title: 'Hours Slept',
    layout: 'interactive',
  });
};
