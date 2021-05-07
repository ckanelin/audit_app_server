# audit_app_server

This is the back-end application for a hackathon project with a team of 4 people.

## Inspiration
Two former accountants were on the team, one with a public accounting background (auditor), and the other with industry experience.
On both sides, the accountants voiced frustrations around the meticulous yet mundane task of providing and matching audit support (invoices, receipts, etc) to financial records
The public accounting services sector is a $13 billion dollar industry, of which a large portion of services provided include financial statement audits for all publicly traded companies and many private companies as well.
All accounting firms that provide audit services, MUST go through the process of reviewing and matching audit support documents with financial records
What it does
Leveraging Google Cloud’s Document AI platform, and Google Cloud Storage services, auditors and clients can seamlessly request and exchange audit documentation. Once clients have uploaded the requested documentation, the auditor can initiate an analysis of the documentation at the click of a button. A side by side analysis provided by Document AI and our matching algorithms is then displayed for the auditor to easily verify, eliminating hours of mindless work.

## How we built it
AuditApp is built on a MERN (MongoDB, Express.js , React.js, Node.js) stack.

- Creating user stories and wireframes in Figma to determine the user flow
- Determining client-side inputs and outputs
- Determining front-end back-end interface (endpoints, flow and structure of information, etc.)
- We split into three teams : Front-end with react.js (2 ppl), Back-end server and database with express.js, node.js and MongoDB (1 ppl), Integration of Google Cloud Document AI (1 ppl)
- Deploying our server onto Heroku

## Challenges we ran into
- Working with asynchronous functions in JavaScript
- CORS with local development between front and back end
- Deploying application onto Heroku
- Connecting the front end and back end
- Nested array/object items and JSON parsing in React
- Dynamic tables rendering from Document AI
- Generating unique ids associated for multiple uploads

## Accomplishments that we're proud of
- Working with limited MERN experience
- Successfully managing the download of files from Google Cloud Storage
- Successfully implementing the Google Document AI API, such that key fields are extracted from uploaded documents.
- Successfully deploying a working server
- Successfully implementing MongoDB
- Successfully implementing router with React

## What we learned
- Application design process
- How to plan and distribute work on a team
- How to set up a database with MongoDB
- CRUD with MongoDB
- Deploying an application to Heroku
- Working with Google Cloud Platform (Document AI, Storage)
- How to set up environment variables
- How to work with figma wireframes as a reference to build the website
- How to hide components in React
- Implementation of Papaparse in React
- Impressed by accuracy of Google’s AI/ML algorithms
- How to become more comfortable with tachyons and bootstrap

## What's next for AuditApp
- Full integration of front and back end
- User Authentication
- Feature allowing users to input desired keys
- Exit to Big 4 for minimum 10 billion BTC
