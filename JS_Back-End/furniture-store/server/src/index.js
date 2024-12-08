import express from 'express';
import expressConfigs from './configs/expressConfigs.js';
import mongooseConfigs from './configs/mongooseConfigs.js';

const app = express();

expressConfigs(app);
await mongooseConfigs();

app.listen(3030, () => console.log('Server is listening on http://localhost:3030 ...'));
