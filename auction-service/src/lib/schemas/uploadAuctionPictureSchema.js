const schema = {
  properties: {
    body: {
      type: 'string',
      minLength: 1,
      contentEncoding: 'base64',
    },
  },
  required: [ 'body' ],
};

export default schema;