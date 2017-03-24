Sander Health App
=======================
[![dependencies Status](https://david-dm.org/leesander1/sanderhealth/status.svg)](https://david-dm.org/leesander1/sanderhealth)
[![Build Status](https://travis-ci.org/leesander1/sanderhealth.svg?branch=master)](https://travis-ci.org/leesander1/hearmenow-server)
[![devDependency Status](https://david-dm.org/leesander1/sanderhealth.svg)](https://david-dm.org/leesander1/sanderhealth#info=devDependencies)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/leesander1/sanderhealth/blob/master/license)

**Get the App**: [Sander Health](https://github.com/leesander1/sanderhealth)

**Heroku**:
[sanderhealth-development](https://leesander.com)
[sanderhealth-production](https://leesander.com)

**Still need to set up heroku & Travis**



## Getting Started

These instructions will provide information on the overall design and project structure. They will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

[MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* Run `mongo --version` and should get a response if installed correctly.

[Node.js](https://nodejs.org/)

[Nodemon](https://nodemon.io/)
* (Helpful but not required)
* Run `npm install -g nodemon` to install.
* Can now edit package.json or simply run `nodemon server.js`

## Developers
To get involved with this project, you'll need to do a few things:

1. Download [Node.js](https://nodejs.org/).
2. Clone this repository by running `git clone https://github.com/leesander1/hearmenow-server.git` in the location of your choice.
3. Download the dependencies by running `npm install` when you're in the project directory.
4. Create new '.env' file following the example.env and input your api keys and environmental variables accordingly.
5. To start run `npm start` or `nodemon server.js`
6. The server should be accessible at `localhost:3000`
7. Get the electron app [link](https://github.com/leesander1/hearmenow-electron)
8. Deploy server.


## Running the tests

Tests are run using [mocha](https://mochajs.org/)

### Create Tests

Add new .js file to /tests folder.


### Run Test


`npm test`

## Project structure

| Name                               | Description / Purpose                                        |
| ---------------------------------- | ------------------------------------------------------------ |
| server.js                          | The main application file and entrypoint.                    |
| **config**/passport.js             | Passport strategies and middleware to manage login.          |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **views**/                         | All the handlebars layouts and views                         |
| **controllers**/api.js             | Controller for /api route and to manage twilio requests.     |
| **controllers**/home.js            | Controller for home.                                         |
| **controllers**/user.js            | Controller for user account management.                      |
| **controllers**/notification.js    | Controller to manage notifications                           |
| **controllers**/entry.js           | Controller for entries.                                      |
| **test**/                          | Folder containing all our unit tests for mocha.              |
| example.env                        | Your API keys, tokens, passwords and database URI.           |
| package.json                       | npm package dependencies & node config                       |
| .travis.yml                        | Contains travis ci configuration settings                    |

## Tools Used

* Time/Date - moments
* User Management/Sessions - passport
* DB - mongodb / mongoose mlab
* CI - travis ci
* Hosting - heroku
* Dependency Management - david
* Tasks - cron
* web notifications - node-pushnotifications
* Voice / SMS - twillio
* Email - sendGrid
* Notifications - google cloud messaging (polymer component)
* Front-end / Templating - electron / polymer & handlebars
* Package Manager - npm / yarn


### Packages
(See package.json) but at a glance, the following packages are / will be used.

* async
* bcrypt
* chalk
* compression
* connect-mongo
* dotenv
* express
* errorhandler
* lodash
* passport-local
* moments
* supertest
* sinon
* eslint
* express-session
* body-parser
* express-validator
* serve-favicon
* mongoose
* mocha
* nodemailer
* passport
* passport-google-oauth
* request
* twilio
* validator


## Contributing

1. Clone repo. We work off the development branch.
2. Create new branch for your feature.
3. Submit pull request for your branch into development.

Changelog
---------

### 0.0.1 (Mar 21, 2017)
- Updated project & uploaded to github

### 0.0.0 (Nov 02, 2016)
- Initial Setup

## Authors

* [**Lee Sander**](https://github.com/leesander1) - *[leesander.com](https://leesander.com)*


See also the list of [contributors](https://github.com/leesander1/hearmenow-server/contributors) who participated in this project.

## License

[MIT](https://github.com/leesander1/sanderhealth/blob/master/license)

## Acknowledgements

* Hat tip to anyone whose code was used
* Project structure and information from [hackathon-starter](https://github.com/sahat/hackathon-starter)
* [Template for README](https://gist.githubusercontent.com/PurpleBooth/109311bb0361f32d87a2/raw/4a39c2139c4caa4686addc1e5dd490170fb82006/README-Template.md)
* The labels used in the issues section were inspired by [this site](https://robinpowered.com/blog/best-practice-system-for-organizing-and-tagging-github-issues/)
* Issue and PR Templates were inspired by [this site](https://www.talater.com/open-source-templates/#)
