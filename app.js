import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
import { validateVehicle, updateVehicleAccept } from './schemas/vehicle.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const readJSON = (path) => require(path)

const vehicles = readJSON('./data/vehicles.json')
const PORT = process.env.PORT ?? 6675
const app = express()

const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

app.disable('x-powered-by')
app.use(json())

app.use(cors({
  cors: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.get('/vehicles', (req, resp) => {
  const { year } = req.query
  const existYear = vehicles.findIndex(vehicle => vehicle.year === year)
  if (year) {
    if (existYear === -1) {
      resp.status(400).json({ message: 'Vehicle year not found.' })
    } else {
      const vehicleYear = vehicles.filter(vehicle => vehicle.year === year)
      resp.json(vehicleYear)
    }
  }

  resp.json(vehicles)
})

app.get('/vehicles/:id', (req, resp) => {
  const { id } = req.params
  const vehicle = vehicles.find(vehicle => vehicle.id === id)
  if (vehicle) return resp.json(vehicle)
  return resp.status(400).json({ message: "Vehicle id don't exist." })
})

app.delete('/vehicles/:id', (req, resp) => {
  const { id } = req.params

  const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id)
  if (vehicleIndex === -1) return resp.status(400).json({ message: "Vehicle id don't exist." })

  vehicles.splice(vehicleIndex, 1)

  return resp.status(204).json({ message: 'Vehicle deleted.' })
})

app.post('/vehicles', (req, resp) => {
  const acceptVehicle = validateVehicle(req.body)

  if (acceptVehicle.error) return resp.status(400).json({ message: JSON.parse(`${acceptVehicle.error}`) })

  const newVehicle = {
    id: randomUUID(),
    ...acceptVehicle.data
  }

  vehicles.push(newVehicle)

  return resp.status(201).json(newVehicle)
})

app.patch('/vehicles/:id', (req, resp) => {
  const result = updateVehicleAccept(req.body)
  if (result.error) return resp.status(400).json({ message: JSON.parse(`${result.error}`) })

  const { id } = req.params
  const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id)
  if (vehicleIndex === -1) return resp.status(400).json({ message: "Vehicle id don't exist." })

  const updateVehicle = {
    ...vehicles[vehicleIndex],
    ...result.data
  }

  vehicles[vehicleIndex] = updateVehicle

  return resp.json(updateVehicle)
})

app.listen(PORT, () => {
  console.log(`Server listener in port http://localhost:${PORT}`)
})
