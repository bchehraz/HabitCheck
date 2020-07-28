const authResolver = require('./auth');
const habitResolver = require('./habit');
// const preferenceResolver = require('./preference');

const rootResolver = {
  ...authResolver,
  ...habitResolver,
  // ...preferenceResolver,
};

module.exports = rootResolver;
