const rootRouter = require("express").Router();

const foodRoutes = require("./food.route");
const accountRoutes = require("./account.route");
const orderRoutes = require("./order.route");

const exceptionHandle = require("../middlewares/exceptionHandle");
const payloadFormat = require("../middlewares/payloadFormat");

// rootRouter.use(authRouter);

rootRouter.use("/food", foodRoutes);
rootRouter.use("/account", accountRoutes);
rootRouter.use("/order", orderRoutes);

rootRouter.use(exceptionHandle);

rootRouter.use(payloadFormat);

module.exports = rootRouter;
