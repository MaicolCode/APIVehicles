import { readJSON } from '../../utils.js'
import { randomUUID } from 'node:crypto'
const vehicles = readJSON('./data/vehicles.json')

export class VehicleModel {
  static async getAll ({ year }) {
    const existYear = vehicles.findIndex(vehicle => vehicle.year === year)
    if (year) {
      if (existYear === -1) {
        return { message: 'Vehicle year not found.' }
      } else {
        const vehicleYear = vehicles.filter(vehicle => vehicle.year === year)
        return vehicleYear
      }
    }
    return vehicles
  }

  static async getById ({ id }) {
    const vehicle = vehicles.find(vehicle => vehicle.id === id)
    if (vehicle) return vehicle
    return false
  }

  static async delete ({ id }) {
    const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id)
    if (vehicleIndex === -1) return false
    vehicles.splice(vehicleIndex, 1)
    return true
  }

  static async create ({ input }) {
    const newVehicle = {
      id: randomUUID(),
      ...input
    }

    vehicles.push(newVehicle)
    return newVehicle
  }

  static async update ({ id, input }) {
    const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id)
    if (vehicleIndex === -1) return false
    const updateVehicle = {
      ...vehicles[vehicleIndex],
      ...input
    }

    vehicles[vehicleIndex] = updateVehicle

    return updateVehicle
  }
}
