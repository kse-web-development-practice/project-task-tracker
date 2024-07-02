module.exports = {
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
      '^.+\\.jsx?$': 'babel-jest'
    }
  }