const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL ของ webapp - ใช้ production URL แทน localhost
    // baseUrl: 'http://localhost:8080',
    baseUrl: 'https://bait-check-in-webapp.web.app',
    
    // Timeout สำหรับแต่ละ command
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    
    // Video recording
    video: true,
    videoCompression: 32,
    
    // Screenshots on failure
    screenshotOnRunFailure: true,
    
    // Browser launch args
    chromeWebSecurity: false,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  // ตั้งค่า viewport สำหรับ mobile testing
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
