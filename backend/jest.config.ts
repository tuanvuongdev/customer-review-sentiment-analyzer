module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: [
        "**/__tests__/**/*.test.ts",
        "**/?(*.)+(spec|test).ts"
    ],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
        "!src/__tests__/**",
        "!src/types/**",
        "!src/dbs/**"
    ],
    coverageDirectory: "coverage",
    coverageReporters: [
        "text",
        "lcov",
        "html"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    setupFilesAfterEnv: [],
    testTimeout: 10000,
    verbose: true,
    clearMocks: true,
    restoreMocks: true
};