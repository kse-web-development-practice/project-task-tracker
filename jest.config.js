export const moduleNameMapper = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
}
export const transform = {
  '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
  '^.+\\.jsx?$': 'babel-jest'
}
export const testEnvironment = 'jsdom'
