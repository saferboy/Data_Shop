import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors'
import api from "./api/router"
import path from 'node:path';

const app = express();
const port = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', api)

app.use('/upload', express.static(path.join(__dirname, '../upload')))

app.listen(port, () => {
  console.log(`Server http://localhost:${port} portda ishga tushdi.`);
});   