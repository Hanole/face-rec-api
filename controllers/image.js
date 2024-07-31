// const fetch = require('node-fetch');

// Function to prepare the Clarifai API request options
const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'b78a0c00137e49b7a80e293fd733112b';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}

// Function to handle API call to Clarifai
const handleApiCall = (req, res) => {
  const imageUrl = req.body.input;

  fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(imageUrl))
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with API'));
}

// Function to handle image and update entries
const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
  handleImage,
  handleApiCall
}