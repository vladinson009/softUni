import express from 'express';
import 'dotenv/config';
import { PORT } from './constants.js';
const app = express();

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
