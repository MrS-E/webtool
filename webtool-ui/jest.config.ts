export default {
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/__test__/setupTests.ts'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.ts",
        "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.ts"
    },
    testEnvironment: "jsdom"
}