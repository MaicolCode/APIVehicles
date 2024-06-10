const express = require('express')
const app = express()
const crypto = require('node:crypto')
// const z = require('zod')
const vehicles = require('./data/vehicles.json')
const PORT = process.env.PORT ?? 6675

app.disable('x-powered-by')
app.use(express.json())
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

app.post('/vehicles', (req, resp) => {
  const { name, model, year, description, price, urlImage } = req.body

  const newVehicle = {
    id: crypto.randomUUID(),
    name,
    model,
    year,
    description,
    price,
    urlImage
  }

  vehicles.push(newVehicle)

  return resp.status(201).json(newVehicle)
})

app.listen(PORT, () => {
  console.log(`Server listener in port http://localhost:${PORT}`)
})
