# Project Title

One Paragraph of project description goes here

### Authors

## Joe Colago, Alyssa Nichols, and T Mark Schisel ##

## Table of Contents
- [About](#)
- [Start](#getting-started)
- [Install](#development-setup-instructions)
- [Thanks](#acknowledgments)
- [Dependencies](#dependencies)

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

* Hat tip to anyone whose code was used
* Inspiration
* etc

## Dependencies

- Material UI
- Material UI x-charts
- Sweet Alerts
- A full list of dependencies can be found in `package.json`