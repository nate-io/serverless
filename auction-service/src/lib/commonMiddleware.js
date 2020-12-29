import middy from '@middy/core';
// auto parse the event body
import httpJsonBodyParser from '@middy/http-json-body-parser';
// standardize http events
import httpEventNormalizer from '@middy/http-event-normalizer';
// cleaner error handling
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

export default handler => middy(handler)
  .use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors(),
  ]);