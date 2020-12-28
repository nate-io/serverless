import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendMail(event, context) {
  const params = {
    Source: 'nyoung125@gmail.com',
    Destination: {
      ToAddresses: [ 'nyoung125@gmail.com' ],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from SES!',
        },
      },
      Subject: {
        Data: 'Test Email',
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const handler = sendMail;
