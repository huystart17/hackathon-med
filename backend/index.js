const {config} = require("./config");
require("./db/mongo_connection");
const {app} = require("./app");
const {NodeHelper} = require("./lib/node_helper");
app.listen(config.PORT);
console.log(`listening on port ${config.PORT}`);
NodeHelper.systemShowStatus();

// require('./graphql/index')