import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import svgR from './routes/svg.js';
import pngR from './routes/png.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/svg', svgR);
app.use('/png', pngR);

export default app;
