# Asset Finance Specialists

## Description

The repository is split into 2 main directories, client and server. The client directory contains all of the front-end logic, which was created using Javascript and React. The server directory contains all of the back-end logic, using node.js and express to expose API endpoints and communicating with the MongoDB database.

## Getting Started

### MongoDB Credentials

* Username: afs-admin
* password: Password123

## How to run

### Step 1: Start Server

Open a terminal window and copy the following commands:

```
cd server
npm install
node --env-file=config.env server
```

### Step 2: Start Client

Open another terminal window and copy the following commands:

```
cd client
npm install
npm run dev
```

## Pipeline Configuration

The pipeline for CI/CD purposes was set up using Github Actions Workflows. It works by building installing dependencies and building the project in the client directory. It then uploads the artifacts. The next pipeline step involves installing the dependencies in the server directory. Once these steps are done, it initiates the final step which then deploys the project.

## Additional Comments

### Things to do/improve on if I had more time

* Create a user log in page which allows them to create/edit and view only their finance applications.
* Create an admin portal which allows admins to approve/deny applications.
* Add ESLint
* Deploy client to an AWS S3 bucket.
* Deploy server to an AWS Lambda function exposed using an API Gateway.
* Log error messages.
* Improve UI/UX experience.

## Authors

Created by Kevin Bortas
