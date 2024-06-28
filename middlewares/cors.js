import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

export const corsMiddleware = cors({
  cors: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})
