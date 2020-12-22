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

/* Back-end */
import ICON_NODEJS from 'assets/back-end/node.svg';
import ICON_NESTJS from 'assets/back-end/nest.svg';
import ICON_TYPEORM from 'assets/back-end/typeorm.png';
import ICON_RESTAPI from 'assets/back-end/rest.png';
import ICON_POSTGRES from 'assets/back-end/postgres.svg';
import ICON_MYSQL from 'assets/back-end/mysql.svg';
import ICON_FLASK from 'assets/back-end/flask.svg';

/* Front-end */
import ICON_REACT from 'assets/front-end/react.svg';
import ICON_ELECTRON from 'assets/front-end/electron.svg';
import ICON_STYLEDCOMPS from 'assets/front-end/styledcomponents.png';
import ICON_MUI from 'assets/front-end/mui.png';
import ICON_REDUX from 'assets/front-end/redux.svg';
import ICON_ANTD from 'assets/front-end/antd.png';
import ICON_SCSS from 'assets/front-end/scss.svg';
import ICON_BOOTSTRAP from 'assets/front-end/bootstrap.svg';
import ICON_BLUETOOTH from 'assets/front-end/bluetooth.svg';
import ICON_HTML5 from 'assets/front-end/html5.svg';

/* Technologies */
import ICON_TS from 'assets/technologies/typescript.svg';
import ICON_HASK from 'assets/technologies/haskell.svg';
import ICON_ELM from 'assets/technologies/elm.svg';
import ICON_PY from 'assets/technologies/python.svg';
import ICON_RML from 'assets/technologies/reasonml.svg';
import ICON_GIT from 'assets/technologies/git.svg';
import ICON_RXJS from 'assets/technologies/rxjs.svg';
import ICON_FPTS from 'assets/technologies/fpts.png';
import ICON_RDXOBS from 'assets/technologies/reduxobservable.gif';
import ICON_GITHUB from 'assets/technologies/github.png';
// import ICON_MATLAB from 'assets/technologies/matlab.png';
// import ICON_R from 'assets/technologies/r.svg';
import ICON_BABYLON from 'assets/technologies/babylon.svg';
import ICON_JEST from 'assets/technologies/jest.svg';

interface Skill {
  title: string;
  description: string;
  link: string;
  icon: string;
  level: 'novice' | 'intermediate' | 'advanced';
  bg: string;
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
  icon: string,
  bg: string = ''
): Skill => ({
  title,
  description,
  link,
  level,
  icon,
  bg
});
const skillGroup = (title: string, ...items: Array<Skill>) => ({
  title,
  items
});

const TechLang = skillGroup(
  'Technologies / Languages',
  skill(
    'Typescript',
    'Statically typed Javascript',
    'advanced',
    'https://www.typescriptlang.org/',
    ICON_TS
  ),
  skill(
    'fp-ts',
    'Strongly-typed functional ecosystem for Typescript',
    'advanced',
    'https://github.com/gcanti/fp-ts',
    ICON_FPTS
  ),
  skill(
    'elm',
    'Purely functional front-end',
    'novice',
    'https://elm-lang.org/',
    ICON_ELM
  ),
  skill(
    'Python',
    'Multi-purpose (great for data-science) language',
    'intermediate',
    'https://www.python.org/',
    ICON_PY
  ),
  skill(
    'ReasonML',
    'Functional programming for React',
    'novice',
    'https://reasonml.github.io/',
    ICON_RML
  ),
  skill(
    'Git',
    'Ubiquitous version control',
    'advanced',
    'https://git-scm.com/',
    ICON_GIT
  ),
  skill(
    'RxJS',
    'Handling streams of data functionally',
    'advanced',
    'https://rxjs-dev.firebaseapp.com/',
    ICON_RXJS
  ),
  skill(
    'redux-observable',
    'Actions in, actions out',
    'advanced',
    'https://redux-observable.js.org/',
    ICON_RDXOBS
  ),
  skill(
    'Haskell',
    'Categorical in beauty, purely functional',
    'novice',
    'https://www.haskell.org/',
    ICON_HASK
  ),
  skill(
    'Github',
    'Repository / organization management and CI/CD',
    'intermediate',
    'https://github.com/',
    ICON_GITHUB,
    'black'
  ),
  // skill(
  //   'Matlab',
  //   'Popular data-science toolkit',
  //   'novice',
  //   'https://www.mathworks.com/products/matlab.html',
  //   ICON_MATLAB
  // ),
  // skill(
  //   'R language',
  //   'Convenient statistics',
  //   'intermediate',
  //   'https://www.r-project.org/',
  //   ICON_R
  // )
  skill(
    'Babylon.js',
    'Browser-based rendering engine',
    'novice',
    'https://www.babylonjs.com/',
    ICON_BABYLON
  ),
  skill(
    'Jest',
    'Ubiquitous test runner for Javascript',
    'advanced',
    'https://jestjs.io/',
    ICON_JEST
  )
);

const Frontend = skillGroup(
  'Front-end',
  skill(
    'React',
    'Fast and scalable UI library',
    'advanced',
    'https://reactjs.org/',
    ICON_REACT
  ),
  skill(
    'Redux',
    'Functional and scalable state management',
    'advanced',
    'https://redux.js.org/',
    ICON_REDUX
  ),
  skill('Sass', 'CSS with extensions', 'advanced', 'https://sass-lang.com/', ICON_SCSS),
  skill(
    'styled-components',
    'Clean and declarative css in js',
    'advanced',
    'https://styled-components.com/',
    ICON_STYLEDCOMPS
  ),
  skill(
    'Electron',
    'Chromium based desktop apps',
    'intermediate',
    'https://www.electronjs.org/',
    ICON_ELECTRON
  ),
  skill(
    'Material-UI',
    "Google's design for React Apps",
    'advanced',
    'https://material-ui.com/',
    ICON_MUI
  ),
  skill(
    'Ant Design',
    'Design system + UI Library',
    'intermediate',
    'https://ant.design/',
    ICON_ANTD
  ),
  skill(
    'Bootstrap',
    'Responsive UI framework',
    'intermediate',
    'https://getbootstrap.com/',
    ICON_BOOTSTRAP
  ),
  skill(
    'Web Bluetooth',
    'Chrome Bluetooth in the browser',
    'advanced',
    'https://web.dev/bluetooth/',
    ICON_BLUETOOTH
  ),
  skill(
    'HTML5',
    'The latest in browser technology',
    'advanced',
    'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
    ICON_HTML5
  )
);

const Backend = skillGroup(
  'Infrastructure',
  skill(
    'Express',
    'REST API with Express and Node.js',
    'advanced',
    'https://expressjs.com/',
    ICON_NODEJS
  ),
  skill(
    'REST API',
    'Database request standards and design',
    'intermediate',
    'https://restfulapi.net/',
    ICON_RESTAPI
  ),
  skill(
    'PostgreSQL',
    'Open source relational database',
    'novice',
    'https://www.postgresql.org/',
    ICON_POSTGRES
  ),
  skill(
    'NestJS',
    'Modern high-level back-end routing logic',
    'intermediate',
    'https://nestjs.com/',
    ICON_NESTJS
  ),
  skill(
    'TypeORM',
    'Modern table schematic declaration',
    'novice',
    'https://typeorm.io/#/',
    ICON_TYPEORM,
    'white'
  ),
  skill(
    'MySQL',
    "The world's most popular open source database",
    'intermediate',
    'https://www.mysql.com/',
    ICON_MYSQL,
    'white'
  ),
  skill(
    'Flask',
    'Request routing in Python',
    'intermediate',
    'https://flask.palletsprojects.com/en/1.1.x/',
    ICON_FLASK,
    'white'
  )
);

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

const skills: Array<SkillGroup> = [TechLang, Frontend, Backend, AWS, GCP];

export default skills;
