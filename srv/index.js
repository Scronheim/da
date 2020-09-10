const express = require('express');
const paginate = require('express-paginate');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const _ = require('lodash');
const AllModel = require('./models/all');
const UtilsModel = require('./models/utils');
var needle = require('needle');
var cheerio = require('cheerio');

const uri = 'mongodb://212.109.221.239/da?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`);
  })
  .on('error', error => console.warn(error));

function parseHtml(url, cb) {
  needle.get(url, cb);
}

app.use(express.json());
app.use(cors());
app.use(paginate.middleware(8, 100000));

app.post('/parseBand', (req, res) => {
  let result = {
    bio: '',
    discography: [],
    socials: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    pictures: {}
  }
  parseHtml(req.body.url, (err, html) => {
    let $ = cheerio.load(html.body);
    result.title = $('.band_name > a').text();
    let infoLeft = $('.float_left').find('dd');
    let infoRight = $('.float_right').find('dd');
    result.country = infoLeft['0'].children[0].children[0].data;
    result.location = infoLeft['1'].children[0].data;
    result.status = infoLeft['2'].children[0].data;
    result.formedIn = infoLeft['3'].children[0].data;
    result.genre = infoRight['0'].children[0].data;
    result.lyricThemes = infoRight['1'].children[0].data;
    if (infoRight['2'].children[0].children !== undefined) {
      result.label = infoRight['2'].children[0].children[0].data;
    } else {
      result.label = infoRight['2'].children[0].data;
    }
    result.pictures.logo = $('#logo').attr('href');
    result.pictures.bandPic = $('#photo').attr('href');

    let names = [];
    let instruments = [];
    $('#band_tab_members_current .lineupTable td[valign="top"] a').each((index, element) => {
      $(element.children).each((idx, elem) => {
        names.push(elem.data);
      });
    });

    $('#band_tab_members_current .lineupTable tr[class="lineupRow"]').each((index, element) => {
      for (let i of element.children['3'].children) {
        instruments.push(i.data.trim());
      }
    });
    result.currentLineUp = _.zipWith(names, instruments, (name, actions) => ({name, actions}));
    AllModel.create(result);
    res.send({
      success: true,
      data: result
    });
  });
});

app.post('/parseAlbum', (req, res) => {
  let result = {
    songs: []
  }
  parseHtml(req.body.url, (err, html) => {
    if (err) throw err;
    let $ = cheerio.load(html.body);
    let infoLeft = $('.float_left').find('dd');
    let infoRight = $('.float_right').find('dd');
    let bandName = $('.band_name > a');
    if (bandName.length === '1') {
      bandName = bandName.text();
    } else {
      bandName = bandName['0'].children[0].data;
    }
    result.title = $('.album_name').text();
    result.type = infoLeft['0'].children[0].data;
    result.releaseDate = moment(infoLeft['1'].children[0].data, 'MMMM Do, YYYY').format('YYYY-MM-DD');
    if (infoRight['0'].children[0].data) {
      result.label = infoRight['0'].children[0].data;
    } else {
      result.label = infoRight['0'].children[0].children[0].data;
    }
    result.format = infoRight['1'].children[0].data;
    let numbers = [];
    let titles = [];
    let durations = [];
    $('.table_lyrics td[width="20"]').each((index, element) => {
      $(element.children).each((idx, elem) => {
        if (elem.data) {
          elem.data = elem.data.substring(0, elem.data.length-1)
          numbers.push(elem.data)
        }
      });
    });
    $('.table_lyrics .wrapWords').each((index, element) => {
      $(element.children).each((idx, elem) => {
        titles.push(elem.data.trim());
      });
    });
    $('.table_lyrics td[align="right"]').each((index, element) => {
      $(element.children).each((idx, elem) => {
        if (elem.data) {
          durations.push(elem.data);
        }
      });
    });
    for (let n in numbers) {
      let song = {
        number: parseInt(n)+1,
        title: titles[n],
        duration: durations[n]
      }
      result.songs.push(song)
    }
    let duration = $('strong')['0'];
    if (duration !== undefined) {
      result.duration = duration.children[0].data;
    } else {
      result.duration = '00:00';
    }
    result.cover = $('#cover')['0'].attribs.href;

    let names = [];
    let instruments = [];
    $('#album_members_lineup .lineupTable td[valign="top"] a').each((index, element) => {
      $(element.children).each((idx, elem) => {
        names.push(elem.data);
      });
    });

    $('#album_members_lineup .lineupTable tr[class="lineupRow"]').each((index, element) => {
      for (let i of element.children['3'].children) {
        instruments.push(i.data.trim());
      }
    });
    result.lineUp = _.zipWith(names, instruments, (name, actions)=> ({ name, actions}));
    AllModel.findOneAndUpdate({title: bandName}, {$push: {discography: result}}, {useFindAndModify: false}, (err, results) => {
      if (err) res.sendStatus(500);
      res.send({
        success: true,
        data: results
      })
    });
  });
});

app.get('/countries', (req, res) => {
  UtilsModel.find({}, (err, results) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({data: results[0].countries })
    }
  });
});

app.get('/genres', (req, res) => {
  UtilsModel.find({}, (err, results) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({data: results[0].genres })
    }
  });
});

app.get('/all', async (req, res) => {
  const [ results, itemCount ] = await Promise.all([
    AllModel.find({}).sort('-_id').limit(req.query.limit).skip(req.skip).lean().exec(),
    AllModel.countDocuments({})
  ]);
  const pageCount = Math.ceil(itemCount / req.query.limit);

  res.send({
    data: results,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(4, pageCount, req.query.page)
  });

  // AllModel.find({}).sort('-_id').exec((err, results) => {
  //   if (err) {
  //     res.sendStatus(500)
  //   } else {
  //     res.send({data: results })
  //   }
  // });
});

app.get('/band/last8Bands', (req, res) => {
  AllModel.find({}).sort('-_id').limit(8).exec((err, results) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({data: results })
    }
  });
});

app.get('/band/search', async (req, res) => {
  let pageCount;
  let itemCount;
  let results;
  if (req.query.q) {
    results = await AllModel.find({title: {$regex: new RegExp('.*' + req.query.q + '.*', 'i')}}).sort('-_id').limit(req.query.limit).skip(req.skip).lean().exec();

  } else if (req.query.country) {
    results = await AllModel.find({country: req.query.country}).sort('-_id').lean().exec();
  } else if (req.query.genre) {
    results = await AllModel.find({genre: {$regex: new RegExp('.*' + req.query.genre + '.*', 'i')}}).sort('-_id').lean().exec();
  }
  itemCount = results.length;
  pageCount = Math.ceil(itemCount / req.query.limit);
  res.send({
    data: results,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(4, pageCount, req.query.page)
  });
});

app.patch('/band/save', (req, res) => {
  AllModel.updateOne({_id: req.body._id}, req.body, (err, results) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({
        success: true,
        data: results
      });
    }
  });
});

app.post('/band/add', (req, res) => {
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

app.get('/band/:title', (req, res) => {
  AllModel.find({title: req.params.title}, (err, results) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({data: results })
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})