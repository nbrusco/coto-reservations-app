import express from "express";
import cowsay from "cowsay";
import colors from "colors";

import routerAPI from "./routes/routes.js";

const env = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routerAPI(app);

  app.listen(8080, () =>
    console.log(
      cowsay.say({
        text: "Server up in port 8080!",
        e: "^^",
      }).rainbow
    )
  );
};

env();
