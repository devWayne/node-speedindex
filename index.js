const Workflow = require('./workflow');

var cron = require('node-cron');

cron.schedule('* * 9 * *', function(){
  Workflow.workflow('index.json','result.json');
});
