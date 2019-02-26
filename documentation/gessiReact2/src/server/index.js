// Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import exphbs from 'express-handlebars';


// Config
import config from '../config';
// Webpack Configuration
import webpackConfig from '../../webpack.config.babel';
//api
import blogApi from './api/blog'; 
import libraryApi from './api/library';

//ones we add handelbars, wee need to add helpers 
import * as hbsHelper from '../lib/handlebars';
//utils
import { isMobile } from '../lib/utils/device';
//WebpackCompiler
const WebpackCompiler = webpack(webpackConfig)
//Enviroment?
const isDevelopment = process.env.NODE_ENV !== 'production';

// Express app
const app = express();

//public
app.use(express.static(path.join(__dirname,'../public')));

// Handlebars setup
app.engine(config.views.engine, exphbs({
    extname: config.views.extension,
    helpers: hbsHelper
  }));

  
// View Engine Setup
app.set('views', path.join(__dirname, config.views.path));
app.set('view engine', '.hbs');

//webpackmiddelware
if(!isDevelopment){
app.use(webpackDevMiddleware(WebpackCompiler));
app.use(webpackHotMiddleware(WebpackCompiler));
}

// Device detector
app.use((req, res, next) => {
    res.locals.isMobile = isMobile(req.headers['user-agent']);
  
    return next();
  });
 
//API dispatch(use of the api)
app.use('/api/blog', blogApi);
app.use('/api/library', libraryApi);

// Sending all the traffic to React
app.get('*', (req, res) => {
    res.render('frontend/index', {
      layout: false
    });
 });

//listen
app.listen(config.serverPort,err =>{
    if(!err){
        open(`${config.baseUrl}`);
    }
})