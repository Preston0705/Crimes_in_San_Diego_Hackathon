const server = require('./serverapp');

server.listen(8484, function() {
  console.log('Server is listening on http://localhost:8484');
});