import express from "express";
import { getOptimizedRoad } from "../controller/road.controller";

export default (router: express.Router) => {
  router.get("/roads", getOptimizedRoad);
};
