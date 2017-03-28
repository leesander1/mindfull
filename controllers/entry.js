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

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, existingDate) => {
    if (err) {
      return next(err); }
    if (existingDate) {
      req.flash('errors', { msg: 'Entry for today already exists.' });
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

/**
 * POST /entry1
 * Post entry.
 */
exports.postEntryOne = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.email = req.body.email || '';
    entry.feeling.good = req.body.feeling_good || '';
    entry.feeling.ok = req.body.feeling_ok || '';
    entry.feeling.confident = req.body.feeling_strong || '';
    entry.feeling.moody = req.body.feeling_moody || '';
    entry.feeling.axious = req.body.feeling_anxious || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry2');
    });
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
