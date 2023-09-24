import express from "express";
import { router } from "./router";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from "./services/swaggerConfig";

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(router);

app.get('/', (request, response) => {
    response.redirect('/api-docs/')
  })
  
  app.listen(3000, () => console.log("Server is running on PORT 3000"));