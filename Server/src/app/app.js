const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const dataConnect = require('../configs/configsDb')
const userRoutes = require('../app/routes/user.routes')
const movieRoutes = require('../app/routes/movie.routes')
const favoriteRoute = require('../app/routes/favorite.routes')
const commentsRoute = require('./routes/comments.routes')
const path = require('path');
const dirname = path.join(__dirname, '../../public');

const corsOrigin = ['https://project-reactjs-nodejs-movie.vercel.app', 'http://localhost:3000','http://localhost:8000','https://project-reactjs-nodejs-movie-tnyl.vercel.app']

app.use(express.static(dirname));
//middleware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

const corsOptions = {
  origin: corsOrigin,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions))

//database

dataConnect.connect()
//router

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/movie', movieRoutes)
app.use('/api/v1/favorite', favoriteRoute)
app.use('/api/v1/comments', commentsRoute)

//handle errors

module.exports = app
