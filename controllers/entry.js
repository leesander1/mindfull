const moment = require('moment');
const nodemailer = require('nodemailer');
const async = require('async');
const Entry = require('../models/Entry');
const User = require('../models/User');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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

exports.postNewEntry = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

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
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, existingDate) => {
    if (err) {
      return next(err); }
    if (existingDate) {
      req.flash('errors', { msg: 'Entry for today already exists.' });
      return res.redirect('/entry1');
    }
    entry.save((err) => {
      if (err) { return next(err); }
      res.redirect('/entry1');
    });
  });
};

/**
 * GET /entry
 * Entry meds page.
 */

exports.medMorning = (req, res) => {
  let date = moment().format("MMM Do YY");
  res.render('med_morning', {
    title: 'Morning Medication',
    entry_name: 'med_morning',
    entry_title:'Have you taken your medicine this morning?',
    form_action:'/am',
    tooltip_yes:'Great!',
    tooltip_no:'Take them before you forget!',
    last_entry:'/',
    next_entry:'/',
    layout: 'interactive',
    day: date,
  });
};

exports.postMedMorning = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

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
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, existingDate) => {
    if (err) {
      return next(err); }
    if (existingDate) {
      req.flash('errors', { msg: 'Error' });
      return res.redirect('/');
    }
    entry.save((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
};

/**
 * GET /entry
 * Entry meds page.
 */

exports.medEvening = (req, res) => {
  let date = moment().format("MMM Do YY");
  res.render('med_morning', {
    title: 'Evening Medication',
    entry_name: 'med_evening',
    entry_title:'Have you taken your medicine this evening?',
    form_action:'/pm',
    tooltip_yes:'Great!',
    tooltip_no:'Take them before bed! 🛏️',
    last_entry:'/',
    next_entry:'/',
    layout: 'interactive',
    day: date,
  });
};

exports.postMedEvening = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

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
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, existingDate) => {
    if (err) {
      return next(err); }
    if (existingDate) {
      req.flash('errors', { msg: 'Error' });
      return res.redirect('/');
    }
    entry.save((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
};

/**
 * Entry 1 page.
 */

exports.entryOne = (req, res) => {
  res.render('entry_one', {
    title: 'How are you feeling?',
    layout: 'interactive',
  });
};

exports.postEntryOne = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 2 page.
 */

exports.entryTwo = (req, res) => {
  res.render('entry_two', {
    title: 'Stress Level',
    layout: 'interactive',
  });
};

exports.postEntryTwo = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 3 page.
 */

exports.entryThree = (req, res) => {
  res.render('entry_three', {
    title: 'Sleep Quality',
    layout: 'interactive',
  });
};

exports.postEntryThree = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 4 page.
 */
exports.entryFour = (req, res) => {
  res.render('entry_four', {
    title: 'Hours Slept',
    layout: 'interactive',
  });
};

exports.postEntryFour = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 5 page.
 */

exports.entryFive = (req, res) => {
  res.render('entry_five', {
    title: 'Class',
    layout: 'interactive',
  });
};

exports.postEntryFive = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 6 page.
 */
exports.entrySix = (req, res) => {
  res.render('entry_six', {
    title: 'Homework',
    layout: 'interactive',
  });
};

exports.postEntrySix = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 7 page.
 */
exports.entrySeven = (req, res) => {
  res.render('entry_seven', {
    title: 'Work Out',
    layout: 'interactive',
  });
};

exports.postEntrySeven = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 8 page.
 */
exports.entryEight = (req, res) => {
  res.render('entry_eight', {
    title: 'counselling',
    layout: 'interactive',
  });
};

exports.postEntryEight = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 9 page.
 */
exports.entryNine = (req, res) => {
  res.render('entry_nine', {
    title: 'Prayer',
    layout: 'interactive',
  });
};

exports.postEntryNine = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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

/**
 * Entry 10 page.
 */
exports.entryTen = (req, res) => {
  res.render('entry_ten', {
    title: 'digestion',
    entry_title:'💩?',
    entry_name: 'poop',
    form_action:'/entry10',
    tooltip_yes:'Right on! 🚽',
    tooltip_no:'Aww that stinks 👃',
    last_entry:'/entry9',
    next_entry:'/',
    layout: 'interactive',
  });
};

exports.postEntryTen = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
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
      res.redirect('/entry11');
    });
  });
};

/**
 * Entry 11 page.
 */
exports.entryEleven = (req, res) => {
  res.render('entry_eleven', {
    title: 'Diet',
    entry_name: 'healthy',
    entry_title:'Have you been eating healthy?',
    form_action:'/entry11',
    tooltip_yes:'I ate healthy!',
    tooltip_no:'I could have eaten better',
    last_entry:'/entry10',
    next_entry:'/',
    layout: 'interactive',
  });
};

exports.postEntryEleven = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.diet.healthy = req.body.healthy || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry12');
    });
  });
};

/**
 * Entry 12 page.
 */
exports.entryTwelve = (req, res) => {
  res.render('entry_twelve', {
    title: 'Diet',
    entry_name: 'caffeine',
    entry_title:'Caffeine intake?',
    form_action:'/entry12',
    last_entry:'/entry11',
    next_entry:'/',
    layout: 'interactive',
  });
};

exports.postEntryTwelve = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.diet.caffeine = req.body.caffeine || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/entry13');
    });
  });
};

/**
 * Entry 13 page.
 */
exports.entryThirteen = (req, res) => {
  res.render('entry_twelve', {
    title: 'Diet',
    entry_name: 'meals',
    entry_title:'Have many meals did you have today?',
    form_action:'/entry13',
    last_entry:'/entry12',
    next_entry:'/',
    layout: 'interactive',
  });
};

exports.postEntryThirteen = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    entry.diet.meals = req.body.meals || '';
    entry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'error' });
          return res.redirect('/');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Success' });
      res.redirect('/done');
    });
  });
};

exports.entryFinish = (req, res) => {
  res.render('entry_done', {
    title: 'Complete',
    entry_title:'Submit',
    form_action:'/done',
  });
};

exports.postEntryFinish = (req, res, next) => {
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  Entry.findOne({
    $and: [
         { email: req.body.email },
         {
             createdAt: {$gte: start, $lt: end}
         }
      ] }, (err, entry) => {
    if (err) { return next(err); }
    const message = {
      to: entry.number,
      from: '+15005550006',
      body: 'homework: ' + entry.homework
    };
    twilio.sendMessage(message, (err, responseData) => {
      if (err) { return next(err.message); }
      req.flash('success', { msg: `Text sent to ${responseData.to}.` });
      res.redirect('/');
    });
  });
};
