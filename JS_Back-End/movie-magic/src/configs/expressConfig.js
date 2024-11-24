import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from '../router.js';
import { isUser } from '../middlewares/authMiddleware.js';

export default function expressConfig(app) {
  app.use('/public', express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(isUser);
  app.use(router);
}
