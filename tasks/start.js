const path = require('path');
const serve = require('serve');

const PORT = process.env.PORT || 8080;

const server = serve(path.join(__dirname, '..'), {
  port: PORT,
  ignore: ['node_modules'],
});
