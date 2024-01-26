import { pool } from "../config/database";
import { Customer } from "../model/customer";

export class RoadRepository {
  static async getOptimizedRoad() {
    const result = await pool.query(
      "SELECT * FROM customer WHERE coordinate_x IS NOT NULL AND coordinate_y IS NOT NULL ORDER BY coordinate_x, coordinate_y"
    );
    return result.rows as Customer[];
  }
}
