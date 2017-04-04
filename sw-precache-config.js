/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint-env node */

module.exports = {
  dynamicUrlToDependencies: {
    '/': [
      'views/layout/main.hbs',
      'views/home.hbs'
    ],
    '/login': [
      'views/layout/main.hbs',
      'views/login.hbs'
    ],
    '/signup': [
      'views/layout/main.hbs',
      'views/signup.hbs'
    ],
    '/notification': [
      'views/layout/main.hbs',
      'views/notification.hbs'
    ],
    '/account': [
      'views/layout/main.hbs',
      'views/profile.hbs'
    ],
    '/entry': [
      'views/layout/interactive.hbs',
      'views/entry.hbs'
    ],
    '/entry1': [
      'views/layout/interactive.hbs',
      'views/entry_one.hbs'
    ],
    '/entry2': [
      'views/layout/interactive.hbs',
      'views/entry_two.hbs'
    ]
  },
  staticFileGlobs: [
    '/public',
    '/manifest.json',
    '/bower_components/material-design-lite/material.min.js',
    '/bower_components/material-design-lite/material.min.js',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
    '/bower_components/*',
  ],
  verbose: true,
  runtimeCaching: [{
  urlPattern: /this\\.is\\.a\\.regex/,
  handler: 'networkFirst'
}]
};
