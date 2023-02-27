import { createRequire } from 'module';
import { dbgetData, dbgetDetail, dbAddImg } from '../models/test.js';

const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');

async function saveImg(req, res) {
  const imageDataURL = req.body.image;
  const imageData = imageDataURL.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(imageData, 'base64');
  const zusatzPath = req.params.id;
  // Generate a unique filename for the image
  fs.mkdir(`public/images/uploads/${zusatzPath}/`, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to create upload directory');
      return;
    }

    // Generiere einen eindeutigen Dateinamen für das Bild
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(`public/images/uploads/${zusatzPath}/`, fileName);

    // Speichere die Bilddatei auf der Festplatte
    fs.writeFile(filePath, imageBuffer, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Failed to upload image');
      } else {
        console.log(`Image saved to ${filePath}`);
        dbAddImg(req.params.id, `images/uploads/${req.params.id}/${fileName}`);
        res.status(200).send(fileName);
        //   res.status(200).send('Image uploaded successfully');
      }
    });
  });
}
async function getData(req, res) {
  if (req.query.id) {
    res.status(200).json(await dbgetDetail(req.query.id));
  } else {
    res.status(200).json(await dbgetData());
  }
}

export { saveImg, getData };
