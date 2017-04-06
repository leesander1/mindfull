const cronJob = require('cron').CronJob;
const homeController = require('./controllers/home');


function sayHello() {
  console.log('Cron job successful');
}
sayHello();
process.exit();
