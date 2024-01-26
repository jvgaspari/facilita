import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../service/customer.service";

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = req.query.search as string | undefined;
    const { data, message, status } = await CustomerService.getCustomers(
      searchTerm
    );

    return res.status(status).json({
      status,
      message,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, message, status } = await CustomerService.createCustomer(
      req.body
    );

    return res.status(status).json({
      status,
      message,
      data,
    });
  } catch (error) {
    return next(error);
  }
};
