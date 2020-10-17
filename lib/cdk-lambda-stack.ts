import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const FUNCTION_NAME :string = this.node.tryGetContext('functionName');
    const ROLE_NAME :string = this.node.tryGetContext('roleName');

    //
    // IAM Policy & Role
    //
    const policyStatement1 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });
    policyStatement1.addActions(
      'logs:CreateLogGroup'
    );
    policyStatement1.addResources(
      `arn:aws:logs:${this.region}:${this.account}:*`
    );

    const policyStatement2 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });
    policyStatement2.addActions(
      'logs:CreateLogStream',
      'logs:PutLogEvents'
    );
    policyStatement2.addResources(
      `arn:aws:logs:${this.region}:${this.account}:log-group:/aws/lambda/${FUNCTION_NAME}:*`
    );

    const policyDocument = new iam.PolicyDocument({statements:[policyStatement1, policyStatement2]})

    const role = new iam.Role(this, 'role', {
      roleName: `${ROLE_NAME}`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Role for Lambda by CDK',
      //managedPolicies: [
      //  iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
      //],
      inlinePolicies: {
        'policy': policyDocument
      }
    });

    //
    // Lambda
    //
    const lambdaFunction = new Function(this, 'function', {
      functionName: `${FUNCTION_NAME}`,
      runtime: Runtime.PYTHON_3_8,
      code: AssetCode.fromAsset('assets'),
      handler: 'lambda_function.lambda_handler',
      timeout: cdk.Duration.seconds(300),
      role: role,
      environment: {
        //KEY: "VALUE"
      }
    });
  }
}
