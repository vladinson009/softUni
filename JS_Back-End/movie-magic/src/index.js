import 'dotenv/config.js';
import express from 'express';
import expressConfig from './configs/expressConfig.js';
import handlebarsConfig from './configs/handlebarsConfig.js';
import mongooseConfig from './configs/mongooseConfig.js';

const PORT = 3000;
const app = express();
expressConfig(app);
handlebarsConfig(app);
await mongooseConfig();

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));
