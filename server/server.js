import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
import { readdirSync } from 'fs';
import mongoose from 'mongoose';

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

//routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
