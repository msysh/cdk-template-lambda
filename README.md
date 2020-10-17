# Template for AWS Lambda function

This is a AWS Lambda function template with CDK. The AWS Lambda's runtime is **Python 3.8**.

## Quick Start

1. `git clone https://github.com/msysh/cdk-template-lambda.git`
2. `cd cdk-template-lambda`
3. `npm install` or `yarn install`
4. `cdk bootstrap`, if you've never execute yet.
5. `cdk deploy`

## Customize

### AWS Lambda function

Add files you want for AWS Lambda, into `assets`.

### Others

* Lambda function name : `functionName` in `cdk.json`. Default is `my_function`.
* IAM role name : `roleName` in `cdk.json`. Default is `role_for_my_function`.

---

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
