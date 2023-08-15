module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
      },
      moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
      },
}