/* AWS */
import ICON_APIG from 'assets/AWS/apigateway.svg';
import ICON_CF from 'assets/AWS/cloudfront.svg';
import ICON_COGNITO from 'assets/AWS/cognito.svg';
import ICON_DYNAMO from 'assets/AWS/dynamo.svg';
import ICON_IAM from 'assets/AWS/iam.svg';
import ICON_LAMBDA from 'assets/AWS/lambda.svg';
import ICON_R53 from 'assets/AWS/route53.svg';
import ICON_S3 from 'assets/AWS/s3.svg';
import ICON_SM from 'assets/AWS/secretsmanager.svg';
import ICON_SUM from 'assets/AWS/sumerian.svg';

/* GCP */
import ICON_APPENGINE from 'assets/GCP/appengine.svg';
import ICON_FIRESTORE from 'assets/GCP/firestore.svg';
import ICON_IAMG from 'assets/GCP/iam.svg';
import ICON_SECRETS from 'assets/GCP/secrets.svg';
import ICON_CFG from 'assets/GCP/cloudfunctions.svg';
import ICON_CS from 'assets/GCP/cloudstorage.svg';

interface Skill {
  title: string;
  description: string;
  link: string;
  icon: string;
  level: 'novice' | 'intermediate' | 'advanced';
}

interface SkillGroup {
  title: string;
  items: Array<Skill>;
}

const skill = (
  title: string,
  description: string,
  level: 'novice' | 'intermediate' | 'advanced',
  link: string,
  icon: string
): Skill => ({
  title,
  description,
  link,
  level,
  icon
});
const skillGroup = (title: string, ...items: Array<Skill>) => ({
  title,
  items
});

const AWS = skillGroup(
  'AWS',
  skill(
    'AWS Cognito',
    'User identity service',
    'intermediate',
    'https://aws.amazon.com/cognito/',
    ICON_COGNITO
  ),
  skill(
    'AWS IAM',
    'Organization resource permissions',
    'intermediate',
    'https://aws.amazon.com/iam/',
    ICON_IAM
  ),
  skill(
    'AWS Secrets Manager',
    'Sensitive strings',
    'advanced',
    'https://aws.amazon.com/secrets-manager/',
    ICON_SM
  ),
  skill(
    'AWS S3',
    'Extensible online storage',
    'intermediate',
    'https://aws.amazon.com/s3/',
    ICON_S3
  ),
  skill(
    'AWS Sumerian',
    '3d browser rendering, with human-like hosts',
    'intermediate',
    'https://aws.amazon.com/sumerian/',
    ICON_SUM
  ),
  skill(
    'AWS DynamoDB',
    'NoSQL database solution',
    'intermediate',
    'https://aws.amazon.com/dynamodb/',
    ICON_DYNAMO
  ),
  skill(
    'AWS API Gateway',
    'Routing for REST APIs',
    'novice',
    'https://aws.amazon.com/api-gateway/',
    ICON_APIG
  ),
  skill(
    'AWS CloudFront',
    'Content delivery networking',
    'novice',
    'https://aws.amazon.com/cloudfront/',
    ICON_CF
  ),
  skill(
    'AWS Route 53',
    'Domains',
    'intermediate',
    'https://aws.amazon.com/route53/',
    ICON_R53
  ),
  skill(
    'AWS Lambda',
    'Serverless function execution',
    'intermediate',
    'https://aws.amazon.com/lambda/',
    ICON_LAMBDA
  )
);

const GCP = skillGroup(
  'Google Cloud',
  skill(
    'App Engine',
    'Serverless app platform',
    'novice',
    'https://cloud.google.com/appengine',
    ICON_APPENGINE
  ),
  skill(
    'Firestore',
    'NoSQL Database Solution',
    'advanced',
    'https://cloud.google.com/firestore',
    ICON_FIRESTORE
  ),
  skill(
    'Cloud IAM',
    'Service and User Permissions',
    'intermediate',
    'https://cloud.google.com/iam',
    ICON_IAMG
  ),
  skill(
    'Secret Manager',
    'Sensitive strings',
    'advanced',
    'https://cloud.google.com/secret-manager',
    ICON_SECRETS
  ),
  skill(
    'Cloud Functions',
    'Serverless compute',
    'advanced',
    'https://cloud.google.com/functions',
    ICON_CFG
  ),
  skill(
    'Cloud Storage',
    'Deterministic Dropbox',
    'novice',
    'https://cloud.google.com/storage',
    ICON_CS
  )
);

const skills: Array<SkillGroup> = [AWS, GCP];

export default skills;
