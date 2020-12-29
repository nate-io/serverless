# Serverless Framework Example App

Create a simple auction site with the [Serverless framework](https://www.serverless.com/), deployed to AWS (CloudFormation, Lambda, DynamoDB, S3, IAM, etc), user authentication via [Auth0](https://auth0.com/), etc.

### Project Layout
```
.
|-- auction-service       - main; handles auction related logic
  |-- iam                 - dynamic aws iam declarations for import*
  |-- resources           - dynamic aws resource declarations for import
  |-- src               
    |-- handlers          - route handlers
    |-- lib               - cross-cutting utility functions
    |-- serverless.yml    - service definition
|
|-- auth-service          - auth services for main app using Auth0
  |-- src               
    |-- handlers          - route handlers
    |-- serverless.yml    - service definition
|
|-- notification-service  - defines a mail queue & processor to send mail
  |-- iam                 - dynamic aws iam declarations for import*
  |-- resources           - dynamic aws resource declarations for import
  |-- src               
    |-- handlers          - mail processor
    |-- serverless.yml    - service definition
```

`*` NOTE: IAM policies defined in this manner resolve in AWS as IAM roles attached to the specified resource.

### Commands

Note ```serverless``` and ```sls``` are synonomous. The serverless framework accomodates many cloud providers but this project (and notes) relate to AWS; check docs if using a separate provider. 

* ```sls deploy``` - deploy the project (once cli is setup). For AWS this will set up the stack via CloudFormation, Lambda, and associated products.
* ```sls remove``` - removes the project from CloudFormation (which triggers terminating & deleting associated resources created by CloudFormation).
* ``` sls deploy -f <FUNCTION-NAME>``` - deploys just the param function name for faster deploys. If the serverless file was changed ```sls deploy``` must be used.
* ```sls logs -f <FUNCTION-NAME> -t``` - tail the logs for the param function
* ```sls invoke -f <FUNCTION-NAME> -l``` - manually invoke a function and view the log of that invocation 

### Codingly.io: Base Serverless Framework Template

https://codingly.io

### What's included
* Folder structure used consistently across our projects.
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

### Getting started
```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

### Restoring Project After Development

Once work is complete the associated AWS resources will be terminated. To restore the project simply nav to each service directory and run ``` sls deploy -v```.
