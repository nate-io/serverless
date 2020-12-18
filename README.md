# Serverless Framework Example App

Create a simple auction site with the [Serverless framework](https://www.serverless.com/),  deployed to AWS Lambda, DynamoDB, user authentication via [Auth0](https://auth0.com/), etc.

### Commands

Note ```serverless``` and ```sls``` are synonomous. The serverless framework accomodates many cloud providers but this project (and notes) relate to AWS; check docs if using a separate provider. 

* ```sls deploy``` - deploy the project (once cli is setup). For AWS this will set up the stack via CloudFormation, Lambda, and associated products.
* ```sls remove``` - removes the project from CloudFormation (which triggers terminating & deleting associated resources created by CloudFormation).
* ``` sls deploy -f FUNCTION-NAME``` - deploys just the param function name for faster deploys. If the serverless file was changed ```sls deploy``` must be used.

## Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included
* Folder structure used consistently across our projects.
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started
```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

You are ready to go!
