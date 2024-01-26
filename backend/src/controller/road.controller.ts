import { Request, Response, NextFunction } from "express";
import { RoadService } from "../service/road.service";

export const getOptimizedRoad = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await RoadService.getOptimizedRoad();

    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
};
