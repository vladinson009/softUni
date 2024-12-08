import express from 'express';
import routes from '../routes.js';
import corsMiddleware from '../middlewares/corsMiddleware.js';

export default function (app) {
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(routes);
}
