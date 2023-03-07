import { createRequire } from 'module';
import {
  dbgetData,
  dbgetDetail,
  dbAddImg,
  dbAddUser,
  dbgetUser,
  dbgetAllUsers,
  getsalt,
} from '../models/test.js';

const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

export async function saveImg(req, res) {
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
export async function getData(req, res) {
  res.status(200).json(await dbgetData());
}

export async function getUser(req, res) {
  const salt = await getsalt(req.body.username);

  const user = req.body;
  user.pwd = bcrypt.hashSync(req.body.pwd, salt.salt);

  console.log(user);
  const result = await dbgetUser(user);

  if (result == null) {
    res.status(200).json('Haram');
  } else {
    res.status(200).json(await dbgetUser(user));
  }
}

export async function getDetail(req, res) {
  res.set('Cache-Control', 'no-store');
  res.status(200).json(await dbgetDetail(req.params.id));
}
export async function addUser(req, res) {
  const salt = bcrypt.genSaltSync(10);
  const user = req.body;
  user.pwd = bcrypt.hashSync(req.body.pwd, salt);
  user.salt = salt;
  res.status(200).json(await dbAddUser(user));
}
export async function getAllUsers(req, res) {
  res.status(200).json(await dbgetAllUsers());
}
export async function getsaltt(req, res) {
  res.status(200).json(await getsalt(req.params.user));
}
