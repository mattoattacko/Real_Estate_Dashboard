import express from 'express'; //create routes for our app
import * as dotenv from 'dotenv'; //load environment variables from a .env file into process.env
import cors from 'cors'; //enable CORS with various options

import connectDB from './mongodb/connect.js'; //need to specific the .js extension because we are not using React

dotenv.config();

//initialize express
const app = express();

//add middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); //limit file size to 50mb

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})

//start server
const startServer = async () => {
  try {
    //connect to server
    connectDB(process.env.MONGODB_URL);

    //once we are connected, start the server
    app.listen(8080, () => console.log('Server started on port http://localhost:8080'))
  } catch (error) {
    console.log(error);
  }
}

startServer();