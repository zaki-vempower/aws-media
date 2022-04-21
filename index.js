#!/usr/bin/env node
const fs = require('fs');
const AWS = require('aws-sdk');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const moment = require('moment')
const process = require('process');


const argv = yargs(hideBin(process.argv)).argv

if (!argv.accesskey && !argv.secretkey && !argv.filename && !argv.bucket && !argv.meetingid && !argv.userid) {
    console.log(`forgot to add the key ${!argv.accesskey && 'access key,'} ${!argv.secretkey && 'secret key,'} ${!argv.filename && 'file name and path,'} ${!argv.bucket && 's3 bucket,'} ${!argv.meetingid && 'meeting id missing,'}  ${!argv.userid && 'userId is missing'}`);
}
console.log('process.env.AWS_REGION',argv.accesskey , argv.secretkey , argv.filename);
AWS.config.update({
    accessKeyId: argv.accesskey ? argv.accesskey : null,
    secretAccessKey: argv.secretkey ? argv.secretkey : null,
    region: argv.region ? argv.region : 'us-east-1'
    });


        const s3 = new AWS.S3();



// const fileName = 'meet-hour-video.mp4';

const uploadFile = () => {
    const num = moment().valueOf()
    console.log('vd',`${argv.userid}/${argv.meetingid}/${num}/${argv.filename}`);
  fs.readFile(`${argv.filename}`, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: argv.bucket, // pass your bucket name
         Key: `recordings/${argv.userid}/${argv.meetingid}/${num}/${argv.filename}`, // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3 && s3.putObject(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};


    uploadFile();

