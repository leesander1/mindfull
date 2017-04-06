const cronJob = require('cron').CronJob;
const notificationController = require('./controllers/notification');


function sayHello() {
  notificationController.pushMorning();
  console.log('Cron job successful');
}
sayHello();
process.exit();
