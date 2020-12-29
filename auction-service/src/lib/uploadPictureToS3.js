import AWS from 'aws-sdk';

const s3 = new AWS.S3();

/**
 * Send the param data to S3 for storage.
 * @param {string} key the name of the S3 object
 * @param {string} body the data of the S3 object
 */
export async function uploadPictureToS3(key, body) {
  const result = await s3.upload({
    Bucket: process.env.AUCTIONS_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg', // works for png as well
  }).promise();

  // return image s3 location url
  return result.Location;
}