const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const findUserByToken =require("./middlewares/findUserByToken")
const accountRoute = require("./routes/account.route")

require("dotenv").config();

const routes = require("./routes");

const config = require("./config");
const connectToDb = require("./db");

const app = express();
const port = config.port || 5000;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/", routes);
app.use("/account", accountRoute)


connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => process.exit(1));
