import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'm27ze4',
  defaultCommandTimeout: 7000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/tests/**/*cy.{ts,tsx}',
    experimentalRunAllSpecs: true,
    supportFile: false,
  },
})
