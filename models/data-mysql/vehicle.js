import mysql from 'mysql2/promise'

const DEFAULT_CONFIG =
{
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'vehiclesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class VehicleModel {
  static async getAll ({ year }) {
    if (year) {
      const [vehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE year = ?', [year])
      if (vehicle.length === 0) return ({ message: 'Vehicle year not found.' })
      return vehicle
    }
    const [vehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle')
    return vehicle
  }

  static async getById ({ id }) {
    const [vehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE id = UUID_TO_BIN(?)', [id])
    if (vehicle.length === 0) return false
    return vehicle[0]
  }

  static async delete ({ id }) {
    const [vehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE id = UUID_TO_BIN(?)', [id])
    if (vehicle.length === 0) return false
    await connection.query('DELETE FROM vehicle WHERE id = UUID_TO_BIN(?)', [id])
    return true
  }

  static async create ({ input }) {
    const { name, model, year, description, price, urlImage } = input
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`INSERT INTO vehicle (id, name, model, year, description, price, urlImage) VALUES 
        (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`, [name, model, year, description, price, urlImage])
    } catch (error) {
      return { message: 'Error to create vehicle.' }
    }
    const [vehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE id = UUID_TO_BIN(?)', [uuid])
    return vehicle
  }

  static async update ({ id, input }) {
    const [result] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE id = UUID_TO_BIN(?)', [id])
    if (result.length === 0) return false

    await connection.query('UPDATE vehicle SET ? WHERE id = UUID_TO_BIN(?)', [input, id])
    const [updatedVehicle] = await connection.query('SELECT BIN_TO_UUID(id) id, name, model, year, description, price, urlImage FROM vehicle WHERE id = UUID_TO_BIN(?)', [id])
    return updatedVehicle
  }
}
