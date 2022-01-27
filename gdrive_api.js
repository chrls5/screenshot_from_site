

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = 'YOUR TOKEN';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});


async function uploadFile(filename, path) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename, 
        mimeType: 'image/jpg',
        parents: ['1CBBZ4JJhJKqeaGT_Fl4G_i_pRSXFoI_y']  //folder path in gdrive
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(path),
      },
    });

    console.log("Uploaded: " + filename);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports={uploadFile}
