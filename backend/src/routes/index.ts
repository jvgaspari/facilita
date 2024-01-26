import express from "express";

import customers from "./customers";
import roads from "./roads";

const router = express.Router();

export default (): express.Router => {
  customers(router);
  roads(router);
  return router;
};
