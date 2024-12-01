import 'dotenv/config.js';
import express from 'express';
import { PORT } from './constants.js';

import expressConfig from './configs/expressConfigs.js';
import hbsConfig from './configs/handlebarsConfig.js';
import mongooseConfig from './configs/mongooseConfigs.js';

const app = express();

expressConfig(app);
hbsConfig(app);
mongooseConfig();

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));
