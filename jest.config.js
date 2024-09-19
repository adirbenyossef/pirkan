const { createDefaultPreset } = require('ts-jest')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
      ...createDefaultPreset().transform,
    },
  };
  