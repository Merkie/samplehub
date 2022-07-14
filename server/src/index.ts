// File System
import fs from 'fs';

// Dotenv
import dotenv from 'dotenv';
dotenv.config();

// Express
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
app.use('*', cors()); // Cross origin requests
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL encoded data
const port = process.env.PORT;

// Multer, Express middleware
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, './downloads/process') // Initial uploads destination path
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    // let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, file.originalname);
  }
});

// Make multer object with storage configuration
const upload = multer({
  storage: storage
});

// File Handling
import { processDownload } from './filehandling';

// Database
import { queryResources, fetch_user_from_discord, create_user_from_discord } from './database';

// Auth
import { auth } from './auth';

// Watch the downloads folder and call processDownload when a new file is added.
fs.watch('./downloads/process', (event: String, filename: String) => {
  if(fs.existsSync(`./downloads/process/${filename}`) && filename.startsWith('.') == false) {
    processDownload(filename);
  };
});

/*
  -- Routes --
*/

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express and TypeScript!');
});

app.get('/search/:query', (req: Request, res: Response) => {
  // Because SQL is stupid, we have to do this string replacement.
  // the pipe means "or" so it just splits the user query by spaces and says
  // the name contains either of the words.
  const query = req.params.query.replace(/\s/g, ' | ');
  if(query.trim().length > 0) {
    try {
      queryResources(query).then((result) => {
        res.send(result);
      });
    } catch(err) {
      console.log(query);
      res.send([]);
    }
  }
});

app.post('/upload', upload.single('fileupload'), (req: Request, res: Response) => {
  res.send('File uploaded!');
});

app.post('/login', (req: Request, res: Response) => {
  // Try and fetch the user from the database
  fetch_user_from_discord(req.body.user.id).then(result => {
    // If no user is found, create one
    if(!result) {
      create_user_from_discord({
        name: req.body.user.username+'#'+req.body.user.discriminator,
        discord_id: req.body.user.id
      });
    }
  });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.static('public'));