import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Return a list of all currently open auctions which have ended.
 */
export async function getEndedAuctions() {
  const now = new Date();
  // #status is used b/c status is a reserved word
  // ExpressionAttributeNames resolves when query executes
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynamodb.query(params).promise();
  return result.Items;
}