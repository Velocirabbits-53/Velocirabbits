"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    testMatch: ["**/__tests__/**/*.test.tsx", "**/?(*.)+(spec|test).tsx"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Adjust this based on your project structure
        "\\.(css|less|sass|scss)$": "identity-obj-proxy" // Mock CSS imports for Jest
    },
};
// setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Ensure you have this file if needed
// };
