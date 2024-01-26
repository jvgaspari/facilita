import { pool } from "../config/database";

const createAndPopulateTables = async () => {
  const client = await pool.connect();

  try {
    // Criação da tabela
    await client.query(`
      CREATE TABLE IF NOT EXISTS customer (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        coordinate_x INT,
        coordinate_y INT
      );
    `);

    console.log("Table created successfully");

    // População da tabela
    await client.query(`
      INSERT INTO customer (name, email, phone, coordinate_x, coordinate_y)
      VALUES
        ('Roberto Salvio', 'roberto@example.com', '123456789', 2, 2),
        ('Joana Dohler', 'joana@example.com', '987654321', 3, 3),
        ('Joao Silva', 'joao@example.com', '987654321', 4, 4);
    `);

    console.log("Table populated successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.release();
  }
};

createAndPopulateTables();
