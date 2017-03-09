const async = require('async');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /notification
 * Profile page.
 */
exports.getNotification = (req, res) => {
  res.render('notification', {
    title: 'Manage Notifications'
  });
};

/**
 * POST /notification/update
 * Update notification information.
 */
exports.postUpdateNotification = (req, res, next) => {
  console.log(req.body);
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    console.log(errors);
    return res.redirect('/notification');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.contact.name = req.body.name || '';
    user.contact.phone = req.body.phone || '';
    user.contact.email = req.body.contact_email || '';
    user.notification.morning = req.body.morning || '';
    user.notification.evening = req.body.evening || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'OOPS Something went wrong!' });
          return res.redirect('/notification');
        }
        return next(err);
      }
      //console.log(req.body);
      //console.log("Profile information has been updated.");
      req.flash('success', { msg: 'Notification settings have been updated.' });
      res.redirect('/notification');
    });
  });
};
