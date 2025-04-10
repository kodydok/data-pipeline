import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as iam from 'aws-cdk-lib/aws-iam';


export class Project0DataPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for data
    const dataBucket = new s3.Bucket(this, 'DataBucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Glue Database
    const glueDatabase = new glue.CfnDatabase(this, 'GlueDatabase', {
      catalogId: this.account,
      databaseInput: {
        name: 'mini_data_lake',
      },
    });

    // IAM role for Glue Crawler
    const glueRole = new iam.Role(this, 'GlueCrawlerRole', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
      ],
    });

    // Grant S3 read access to Glue
    dataBucket.grantRead(glueRole);

    // Outputs (for reference)
    new cdk.CfnOutput(this, 'BucketName', {
      value: dataBucket.bucketName,
    });

    new cdk.CfnOutput(this, 'GlueRoleArn', {
      value: glueRole.roleArn,
    });

  } // constructor
} // class
