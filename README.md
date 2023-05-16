# Drug Wars

A turn-based strategy video game in which the player assumes the role of a drug dealer engaged in arbitrage. Inspired by the by the DOS game by John E. Dell in 1984. Built for the web using React and Typescript.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fad6792e-1c44-44db-bd79-ea74b42b0f89/deploy-status)](https://app.netlify.com/sites/drug-wars/deploys/)

[:joystick: **PLAY NOW**](https://drug-wars.netlify.app/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Preferred node version v18.16.0 - change version with [nvm](https://github.com/nvm-sh/nvm)

### Installing

Get a development env running

```
# 1. Clone the repository to your local development environment
git clone https://github.com/jeffdiers/drugwars.git

# 2. Move into the project directory
cd drugwars

# 3. Install code dependencies
yarn install

# 4. Authenticate the xata CLI to your account
xata auth login

# 5. Add env vars to .env and generate file to connect to the database
xata init

# 6. Spin up a local development server
yarn start:netlify
```

You can now view the site in the browser at http://localhost:8888/

## Running the tests

If using vscode I recommend installing this extension [vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

or run from CLI

```
# Run all test suites
yarn test --watchAll
```

## Deployment

Deploy your own version of this site by selecting the Deploy to Netlify Button below. This will automatically:

- Clone a copy of this repo to your own GitHub account
- Create a new project in your [Netlify account](https://app.netlify.com/?utm_medium=social&utm_source=github&utm_campaign=devex&utm_content=devex-examples), linked to your new repo
- Create an automated deployment pipeline to watch for changes on your repo
- Build and deploy your new site

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jeffdiers/drugwars)

## Built With

- [TypeScript](https://www.typescriptlang.org/) - The language used
- [React](https://react.dev/) - The web framework used
- [Redux toolkit](https://redux-toolkit.js.org/) - State managment
- [Xata](https://xata.io/) - The database used
- [Netlify](https://www.netlify.com/) - Used for CI/CD deployments
- [Jest](https://jestjs.io/) - Testing library
- [Styled components](https://styled-components.com/) - Used to style components

## Workflow

Please read [workflow.md](workflow.md) for details on releases.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jeffdiers/drugwars/tags).

## Authors

- **Jeff Diers** - [website](https://jeffdiers.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
