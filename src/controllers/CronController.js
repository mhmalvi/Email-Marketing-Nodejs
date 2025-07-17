const { Queue } = require('bullmq');
const Redis = require('ioredis');
const { sendMail } = require("../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const emailQueue = new Queue('emailQueue', { connection });

// Function to enqueue email jobs (to be called on schedule or via route)
const enqueueEmailJob = async () => {
  await emailQueue.add('sendMail', {}); // Add job data as needed
};

// Optionally, export enqueueEmailJob for use in routes
module.exports = { enqueueEmailJob };
