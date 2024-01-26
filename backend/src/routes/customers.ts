import express from "express";
import {
  createCustomer,
  getCustomers,
} from "../controller/customer.controller";

export default (router: express.Router) => {
  router.post("/customers", createCustomer);
  router.get("/customers", getCustomers);
};
