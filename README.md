# Project Title

One Paragraph of project description goes here

### Authors

## Joe Colago, Alyssa Nichols, and T Mark Schisel ##

## Table of Contents
- [About](#description)
- [Start](#getting-started)
- [Install](#development-setup-instructions)
- [Databases](#database-configuration)
- [Thanks](#acknowledgments)
- [Dependencies](#dependencies)

## Description
This project (description here)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Database Configuration

- For this project, we created a database using Postico 2
- If you would like to create a database using mock data, please review the database.sql file

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- JavaScript
- React
- Node
- CSS
- Material UI
- animate.css
- SweetAlerts
- Javascript

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Emerging Digital Academy for teaching us the skills to complete this project

* Thank you to our clients, Chris and Wendy from the Preferred Savings Guide

* A big thanks to Anthony at Devii for providing us with a client, and for your support throughout the project

* Thanks to Ann, for guiding us through to project completion

## Dependencies

- Material UI
- React.toastify
- Sweet Alerts
- A full list of dependencies can be found in `package.json`