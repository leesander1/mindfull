const cronJob = require('cron').CronJob;
const notificationController = require('./controllers/notification');

notificationController.pushMorning();
