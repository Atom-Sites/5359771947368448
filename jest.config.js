// jest.config.js
const path = require('path');

module.exports = {
    // Your existing configuration options

    moduleNameMapper: {
        // Add the following line
        '^@/(.*)$': path.join(__dirname, 'src', '$1'),
    },
    testEnvironment: 'jsdom',
};
