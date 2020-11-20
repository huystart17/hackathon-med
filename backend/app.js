const Koa = require("koa");
const mount = require("koa-mount");
const { AuthGate } = require("./services/auth_gate");
const { AdminRegion } = require("./services/admin");
const { PublicAssets, DistAssets } = require("./services/public_assest");

const { config } = require("./config");

const { middleware_auth_user } = require("./middleware/auth");
const {
  middleware_handle_generic_error
} = require("./middleware/error_handle");
const { middleware_set_response_header } = require("./middleware/general");
const { middleware_body_parser } = require("./middleware/general");
const { middleware_session } = require("./middleware/general");
const { middleware_handle_404 } = require("./middleware/error_handle");

const app = new Koa();
require("koa-qs")(app);

app.keys = [config.KOA_SECRET];

app.use(middleware_handle_generic_error());

app.use(middleware_session(app));
app.use(middleware_body_parser());
app.use(middleware_set_response_header());

(function private_router() {
  app.use(mount("/admin", middleware_auth_user({ redirect: true })));
  app.use(mount("/admin", AdminRegion));
  app.use(mount("/admin-api/", middleware_auth_user({ redirect: false })));
})();

(function public_router() {
  app.use(mount("/", PublicAssets));
  app.use(mount("/dist", DistAssets));
  app.use(mount("/auth", AuthGate));
})();
module.exports = { app };
