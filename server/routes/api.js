const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import Model for Video object
const Video = require('../models/video');

const db = "mongodb://chris:chris@ds159050.mlab.com:59050/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
  if (err) {
    console.error("Error!! " + err);
  }
});

// Get all videos
router.get('/videos', function (req, res) {
  console.log('Get Request for all videos');

  Video.find({})
    .exec(function (err, videos) {
      if (err) {
        console.log('Error retrieving videos');
      } else {
        res.json(videos);
      }
    })
});

// Get particular video
router.get('/videos/:id', function (req, res) {
  console.log('Get Request for a single video');

  Video.findById(req.params.id)
    .exec(function (err, video) {
      if (err) {
        console.log('Error retrieving the particular video');
      } else {
        res.json(video);
      }
    })
});

// Create new video
router.post('/video', function (req, res) {
  console.log('Post a video');

  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;

  newVideo.save(function (err, insertedVideo) {
    if (err) {
      console.log('Error saving video');
    } else {
      res.json(insertedVideo);
    }
  });
});

router.put('/video/:id', function (req, res) {
  console.log('Update a video');
  Video.findByIdAndUpdate(
    req.params.id, {
      $set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }
    }, {
      //return the video with the updated values instead of old values
      new: true
    },
    function (err, updatedVideo) {
      if (err) {
        res.send('Error updating video');
      } else {
        res.json(updatedVideo);
      }
    })
});

router.delete('/video/:id', function (req, res) {
  console.log('Deleting a video');
  Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send('Error deleting video');
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;
