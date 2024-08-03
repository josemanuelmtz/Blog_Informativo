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


try {
    // Read SSL certificate files
    const privateKey = fs.readFileSync('/etc/nginx/ssl/nginx-blog.key', 'utf8');
    const certificate = fs.readFileSync('/etc/nginx/ssl/nginx-blog.crt', 'utf8');
    
    const options = {
      key: privateKey,
      cert: certificate
    };
    var httpsServer = https.createServer(options, app);
    
    httpsServer.listen(PORT, () => {
      console.log(`HTTPS Server is running on port ${PORT}`);
    });
  
    wss = new WebSocket.Server({ server: httpsServer });
      wss.on('connection', function connection(ws) {
        console.log('Client connected');
  
        ws.on('error', console.error);
  
        ws.on('close', function close() {
          console.log('Client disconnected');
        });
      });
    
    setWss(wss);
  }
  catch (e) {
    
    console.log('\x1b[33m%s\x1b[0m', 'No se pudo crear un servidor HTTPS, se usará HTTP');
    
    const httpServer = http.createServer(app);
  
    
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    wss = new WebSocket.Server({ server: httpServer });
    wss.on('connection', function connection(ws) {
      console.log('Client connected');
  
      ws.on('error', console.error);
  
      ws.on('close', function close() {
        console.log('Client disconnected');
      });
    });
    setWss(wss);
  
  }
