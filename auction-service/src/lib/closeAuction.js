import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

/**
 * Complete the close auction process for param auction
 * 1. update db record
 * 2. notify seller (sold or expired)
 * 3. notify bidder (if a sale was made)
 * @param {obj} auction 
 */
export async function closeAuction(auction) {
  await updateRecordToClosed(auction);
  const notifySeller = sendSellerNotification(auction);
  const notifyBidder = sendBidderNotification(auction);

  return Promise.all([ notifySeller, notifyBidder && notifyBidder ]);
}

// update the param record to closed status
function updateRecordToClosed(auction) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: `set #status = :status`,
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status'
    },
  };

  return dynamodb.update(params).promise();
}

/**
 * Notify seller of param auction two cases: 
 *  1. If no bids receieved, send email explaining auction is closed
 *  2. If bid receieved, inform of the sale price
 * @param {*} auction 
 */
function sendBidderNotification(auction) {
  const { title, highestBid } = auction;
  const { amount, bidder } = highestBid;

  if (bidder) {
    return sqs.sendMessage({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'You won the auction! 🚀',
        recipient: bidder,
        body: `Congrats you won the auction of ${title} for $${amount}`,
      }),
    }).promise();
  }
}

/**
 * Notify seller of param auction two cases: 
 *  1. If no bids receieved, send email explaining auction is closed
 *  2. If bid receieved, inform of the sale price
 * @param {*} auction 
 * 
 * Returns promise 
 */
function sendSellerNotification(auction) {
  const { title, seller, highestBid } = auction;
  const { amount } = highestBid;
  const subject = amount === 0 ? 'Your auction has expired' : 'Your item has sold!' 
  const body = amount === 0 
                    ? 'Sorry, your auction closed with no bidders :(' 
                    : `Yes! Your item "${title}" has sold for $${amount}`

  return sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      subject,
      recipient: seller,
      body,
    }),
  }).promise();
}