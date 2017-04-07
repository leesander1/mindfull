const notificationController = require('./controllers/notification');

function sayHello() {
  notificationController.pushNow();
  console.log('Cron job successful');
}
sayHello();
process.exit();
