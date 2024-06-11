const express = require('express')
const app = express()
const crypto = require('node:crypto')
const vehicles = require('./data/vehicles.json')
const { validateVehicle, updateVehicleAccept } = require('./schemas/vehicle')
const PORT = process.env.PORT ?? 6675

const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

app.disable('x-powered-by')
app.use(express.json())

app.get('/vehicles', (req, resp) => {
  const { year } = req.query

  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    resp.header('Access-Control-Allow-Origin', origin)
  }
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

  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    resp.header('Access-Control-Allow-Origin', origin)
  }

  const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id)
  if (vehicleIndex === -1) return resp.status(400).json({ message: "Vehicle id don't exist." })

  vehicles.splice(vehicleIndex, 1)

  return resp.status(204).json({ message: 'Vehicle deleted.' })
})

app.post('/vehicles', (req, resp) => {
  const acceptVehicle = validateVehicle(req.body)

  if (acceptVehicle.error) return resp.status(400).json({ message: JSON.parse(`${acceptVehicle.error}`) })

  const newVehicle = {
    id: crypto.randomUUID(),
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

app.options('/vehicles/:id', (req, resp) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    resp.header('Access-Control-Allow-Origin', origin)
    resp.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  resp.sendStatus('200')
})

app.listen(PORT, () => {
  console.log(`Server listener in port http://localhost:${PORT}`)
})
