import express from "express";
import { router } from "./router";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from "./services/swaggerConfig";
import path from 'path';
import bodyParser from 'body-parser';

const cors = require('cors');
const app = express();

const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const options = { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css' };

app.use('/public', express.static(path.join(SRC_FOLDER, 'public')));

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, options));
app.use(router);

app.get('/', (request, response) => {
    response.redirect('/api-docs/')
  })
  
  app.listen(3000, () => console.log("Server is running on PORT 3000"));