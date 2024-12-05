import express from 'express';
import 'dotenv/config';
import { PORT } from './constants.js';
import handlebarsConfig from './configs/hbsConfig.js';
import mongooseConfig from './configs/mongooseConfig.js';
import expressConfig from './configs/expressConfig.js';
const app = express();

(async () => {
  try {
    // Configure MongoDB database
    await mongooseConfig();
    console.log('Successfully connected to Database...');

    // Configure Handlebars
    handlebarsConfig(app);

    // Configure Express
    expressConfig(app);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Cannot connect to Database:', error);
  }
})();
