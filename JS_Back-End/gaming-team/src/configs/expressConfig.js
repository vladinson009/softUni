import express from 'express';
import cookieParser from 'cookie-parser';
import router from '../routes.js';
import pageTitle from '../middlewares/pageTitle.js';
import isValidCookie from '../middlewares/isValidCookie.js';

// configuration for express
export default function expressConfig(app) {
  app.use('/static', express.static('static'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(pageTitle);
  app.use(isValidCookie);
  app.use(router);
}
