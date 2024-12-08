import express from 'express';
import routes from '../routes.js';
import corsMiddleware from '../middlewares/corsMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default function (app) {
  app.use(express.json());
  app.use(corsMiddleware);
  app.use(authMiddleware);
  app.use(routes);
}
