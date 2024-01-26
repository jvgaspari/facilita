import { Customer } from "../model/customer";
import { CustomerRepository } from "../repository/customer.repository";

export class CustomerService {
  static async getCustomers(searchTerm?: string) {
    const data = await CustomerRepository.getAllCustomers(searchTerm);

    if (data.rowCount === 0) {
      return { status: 404, message: "No customer exists", data: [] };
    }

    return { status: 200, message: "All customers:", data: data.rows };
  }

  static async createCustomer({
    name,
    email,
    phone,
    coordinate_x,
    coordinate_y,
  }: Customer) {
    const data = await CustomerRepository.createCustomer(
      name,
      email,
      phone,
      coordinate_x,
      coordinate_y
    );

    return {
      status: 201,
      message: "Customer added successfully",
      data: data.rows,
    };
  }
}
