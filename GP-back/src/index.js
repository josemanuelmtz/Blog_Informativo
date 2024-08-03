import express from 'express';
import cors from 'cors';
import login from './routes/login.routes.js';
import register from './routes/register.routes.js';
import noticias from './routes/noticias.routes.js';

const app = express();

const allowedOrigins = ['https://localhost:3002', 'http://localhost:3002', 'https://3.135.217.231:3002'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(login);
app.use(register);
app.use(noticias);


app.listen(3002)
console.log('Server is running on port', 3002)