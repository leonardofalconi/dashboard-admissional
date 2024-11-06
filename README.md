# Caju Front Test

### Requirements

1. Node v22.0.0 or higher (recommended): [nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
2. Yarn: `npm install --global yarn`

### Install

1. Install dependencies: `yarn`

### How to Run the Project

- Init the Json Web Server to consume the API: `yarn init:db` default port is 3000 (http://localhost:3000)
- Start in **development mode** and monitor changes: `yarn dev` default port is 3001 (http://localhost:3001)
- Run local in **production mode**: `yarn build` to generate the build first and then execute `yarn preview` to start the host

### Development Tools

- eslint: `yarn lint`
- prettier: `yarn format`

### Unit and Integrations Testing (Jest)

- Run **all files**: `yarn test:dev`
- Generate the updated **coverage file**: `yarn test:coverage`

### End-to-end Testing (Cypress)

- Run all tests in **CLI mode**: `yarn cypress:run`
- To open the **Cypress interface** and run the tests manually: `yarn cypress:open`

### Environment Variables

We don't need a env file
