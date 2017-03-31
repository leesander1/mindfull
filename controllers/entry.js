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
    entry.feeling.anxious = req.body.feeling_anxious || '';
    entry.feeling.sad = req.body.feeling_sad || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
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


/**
 * POST /entry2
 * Post entry.
 */
exports.postEntryTwo = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.stressed = req.body.stressed || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry3');
    });
  });
};

exports.entryThree = (req, res) => {
  res.render('entry_three', {
    title: 'Sleep Quality',
    layout: 'interactive',
  });
};

/**
 * POST /entry3
 * Post entry.
 */
exports.postEntryThree = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.sleep.quality = req.body.sleep_level|| '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry4');
    });
  });
};

exports.entryFour = (req, res) => {
  res.render('entry_four', {
    title: 'Hours Slept',
    layout: 'interactive',
  });
};

/**
 * POST /entry4
 * Post entry.
 */
exports.postEntryFour = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.sleep.hours = req.body.sleep_hours|| '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry5');
    });
  });
};

exports.entryFive = (req, res) => {
  res.render('entry_five', {
    title: 'Class',
    layout: 'interactive',
  });
};

/**
 * POST /entry5
 * Post entry.
 */
exports.postEntryFive = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.classes = req.body.class_level || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry6');
    });
  });
};

exports.entrySix = (req, res) => {
  res.render('entry_six', {
    title: 'Homework',
    layout: 'interactive',
  });
};

/**
 * POST /entry6
 * Post entry.
 */
exports.postEntrySix = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.homework = req.body.homework || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry7');
    });
  });
};

exports.entrySeven = (req, res) => {
  res.render('entry_seven', {
    title: 'Work Out',
    layout: 'interactive',
  });
};

/**
 * POST /entry7
 * Post entry.
 */
exports.postEntrySeven = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.workout = req.body.workout || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry8');
    });
  });
};

exports.entryEight = (req, res) => {
  res.render('entry_eight', {
    title: 'counselling',
    layout: 'interactive',
  });
};

/**
 * POST /entry8
 * Post entry.
 */
exports.postEntryEight = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.counselling = req.body.counselling || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry9');
    });
  });
};


exports.entryNine = (req, res) => {
  res.render('entry_nine', {
    title: 'Prayer',
    layout: 'interactive',
  });
};

/**
 * POST /entry9
 * Post entry.
 */
exports.postEntryNine = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.prayed = req.body.prayed || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry10');
    });
  });
};

exports.entryTen = (req, res) => {
  res.render('entry_ten', {
    title: 'digestion',
    entry_title:'💩?',
    form_action:'/entry10',
    tooltip_yes:'Right on! 🚽',
    tooltip_no:'Aww that stinks 👃',
    last_entry:'/entry9',
    next_entry:'/',
    layout: 'interactive',
  });
};

/**
 * POST /entry10
 * Post entry.
 */
exports.postEntryTen = (req, res, next) => {

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.digestion = req.body.poop || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/');
    });
  });
};
