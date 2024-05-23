<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Invoice Manager Backend

## Overview

The backend of the "Invoice Manager" application is built using NestJS, providing a robust and scalable API for managing invoices. This application supports CRUD operations for invoices, user authentication, and export functionalities.

## Technology Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT with Passport
- **Deployment:** Neon (PostgreSQL hosting) and Render

## Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository_url>
cd invoice-manager/backend
2. Install Dependencies
bash
Copy code
npm install
or

bash
Copy code
yarn install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy code
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<your_jwt_secret>
Adjust the database URL according to your PostgreSQL configuration.

4. Run Prisma Migrations
bash
Copy code
npx prisma migrate dev
5. Start the Backend Server
bash
Copy code
npm run start:dev
or

bash
Copy code
yarn start:dev
The backend server should now be running on http://localhost:3000.

Project Structure
plaintext
Copy code
src/
├── auth/               # Authentication module
├── common/             # Common utilities and constants
├── invoice/            # Invoice module
├── prisma/             # Prisma service
├── user/               # User module
├── main.ts             # Entry point
├── app.module.ts       # Root module
└── ...                 # Other configurations and modules
Key Features
Invoice Management
Create Invoice: Add a new invoice with details such as client information, itemized list of products/services, total amount, and due date.
View Invoices: Retrieve a list of all invoices with basic details.
Update Invoice: Edit the details of an existing invoice.
Delete Invoice: Remove an invoice from the system.
Export Functionality
PDF Export: Export individual invoices as PDF documents.
Excel Export: Export all invoices or selected invoices as an Excel file.
Authentication
Sign Up: Create a new user account.
Sign In: Log in with existing user credentials.
Token Management: Securely handle authentication tokens with JWT.

Running Tests
You can run tests using the following command:

bash
Copy code
npm run start:dev
or

bash
Copy code
yarn test
Deployment
Render
The backend is configured to be easily deployed on Render. Follow these steps to deploy:

Sign Up / Log In to your Render account.

Create a New Web Service:

Go to the Render dashboard.
Click on the "New" button and select "Web Service".
Connect your repository from GitHub.
Configure the Service:

Set the Build Command to:
bash
Copy code
npm install && npx prisma migrate deploy && npm run build
Set the Start Command to:
bash
Copy code
npm run start:prod
Set the Environment Variables as needed (e.g., DATABASE_URL, JWT_SECRET).
Deploy:

Click on "Create Web Service" to start the deployment process.
Render will automatically build and deploy your application. You can monitor the deployment process and logs through the Render dashboard.

Conclusion
This README provides the necessary information to set up and run the backend for the "Invoice Manager" application. The backend is designed to be scalable, secure, and easily extendable. If you encounter any issues or have any questions, please refer to the documentation or open an issue in the repository.
