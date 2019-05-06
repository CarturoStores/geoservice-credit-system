#!/usr/bin/env node
const AWS = require('aws-sdk');
const poller = require('promise-poller').default;
const { createReadStream } = require('fs');

const s3 = new AWS.S3({ region: 'eu-central-1' });
const interval = 30 * 1000;
const retries = 60;
const artifactBucket = 'my-artifacts';
const deploymentBucket = 'my-deployments';

doIt();

async function doIt() {
  const appName = 'app1';
  const accountName = 'stage1';
  const versionId = await upload(appName, accountName);
  await verifyPipelineState(appName, accountName, versionId);
}

async function upload(appName, accountName) {
  console.log('Uploading artifact...');

  try {
    const { VersionId } = await s3
      .putObject({
        Bucket: artifactBucket,
        Key: `${appName}/${accountName}.zip`,
        Body: createReadStream('artifact.zip'),
        ACL: 'bucket-owner-full-control'
      })
      .promise();

    console.log('finished!');
    return VersionId;
  } catch (e) {
    console.log('failed!');
    process.exit(1);
  }
}

async function verifyPipelineState(appName, accountName, versionId) {
  console.log('Verifying pipeline state...');

  try {
    const params = {
      Bucket: deploymentBucket,
      Key: `${appName}/${accountName}/${versionId}`
    };

    await poller({
      taskFn: () => s3.headObject(params).promise(),
      interval,
      retries
    });

    const result = await s3.getObject(params).promise();

    const pipelineState = result.Body.toString();

    if (pipelineState !== 'SUCCEEDED') {
      console.log('failed. Check AWS');
      process.exit(1);
    } else {
      console.log('succeeded!');
    }
  } catch (e) {
    console.log(`Pipeline timed out after ${(interval * retries) / 1000}s`);
    process.exit(1);
  }
}