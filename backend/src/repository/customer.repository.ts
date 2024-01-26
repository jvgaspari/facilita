import { pool } from "../config/database";

export class CustomerRepository {
  static async getAllCustomers(searchTerm?: string) {
    let query = "SELECT * FROM customer";
    const values = [];

    if (searchTerm) {
      query += " WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1";
      values.push(`%${searchTerm}%`);
    }

    query += " ORDER BY name DESC;";

    return await pool.query(query, values);
  }

  static async createCustomer(
    name: string,
    email: string,
    phone: string,
    coordinate_x: number,
    coordinate_y: number
  ) {
    const query =
      "INSERT INTO customer (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    const values = [name, email, phone, coordinate_x, coordinate_y];

    return await pool.query(query, values);
  }
}
