import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const AllModel = require('./models/all');

const uri = "mongodb://localhost/da?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
let db = mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`);
  })
  .on('error', error => console.warn(error));

export default (app, http) => {
  app.use(express.json());
  app.use(cors());
  // app.use(bodyParser);

  app.get('/all', (req, res) => {
    AllModel.find({}, (err, results) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({data: results })
      }
    });
  });
  app.get('/artist/:title', (req, res) => {
    AllModel.find({title: req.params.title}, (err, results) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({data: results })
      }
    });
  });

}
