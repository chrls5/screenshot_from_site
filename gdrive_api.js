

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '991700221567-qtshhfht9cn1621523sl8a9gdqa47lb2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04SH9HvpaD9KvCgYIARAAGAQSNwF-L9Ir7pYUQDsmWlGg7iUYMLozNvZI_83LB_3g5Q7BAC1LnJ_TiRp3vB2i-sRV95gn1sFYJYg';

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