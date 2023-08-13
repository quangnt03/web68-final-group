const rootRouter = require("express").Router();

const foodRoutes = require("./food.route");

const exceptionHandle = require("../middlewares/exceptionHandle");
const payloadFormat = require("../middlewares/payloadFormat");

// rootRouter.use(authRouter);

rootRouter.use("/food", foodRoutes);

rootRouter.use(exceptionHandle);

rootRouter.use(payloadFormat);

module.exports = rootRouter;
