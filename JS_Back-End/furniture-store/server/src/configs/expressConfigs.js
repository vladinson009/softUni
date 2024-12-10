import express from 'express';
import routes from '../routes.js';
import cookieParser from 'cookie-parser';
import corsMiddleware from '../middlewares/corsMiddleware.js';
export default function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use(corsMiddleware);

  app.use(routes);
}
