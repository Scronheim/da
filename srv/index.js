import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const AllModel = require('./models/all');
const CountriesModel = require('./models/countries');

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

  app.get('/countries', (req, res) => {
    CountriesModel.find({}, (err, results) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({data: results })
      }
    });
  });

  app.get('/all', (req, res) => {
    AllModel.find({}, (err, results) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({data: results })
      }
    });
  });

  app.patch('/artist/save', (req, res) => {
    AllModel.updateOne({_id: req.body._id}, req.body, (err, results) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({data: results })
      }
    });
  });

  app.post('/artist/add', (req, res) => {
    AllModel.find({title: req.body.title, country: {$gte: req.body.country}}, (err, result) => {
      if (err) res.sendStatus(500);
      if (result.length === 0) {
        AllModel.create(req.body);
        res.send({success: true, message: 'Successful added'})
      } else {
        res.send({success: false, message: 'This artist from selected country already exist'})
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
