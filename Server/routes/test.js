import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  saveImg,
  getData,
  getDetail,
  addUser,
  getUser,
  getAllUsers,
  getsaltt,
  delrevs,
  getallrevs,
} from '../controllers/test.js';

const router = express.Router();
// Middleware to parse the request body

// Handle POST request to upload an image
router.get('/review/:id', asyncHandler(getDetail));
router.get('/energy', asyncHandler(getData));
router.post('/img/:id', asyncHandler(saveImg));
router.post('/user', asyncHandler(addUser));
router.patch('/user', asyncHandler(getUser));
router.get('/users', asyncHandler(getAllUsers));
router.get('/salt/:user', asyncHandler(getsaltt));
router.delete('/img/:id', asyncHandler(delrevs));
router.get('/eee', asyncHandler(getallrevs));
// router.get('/img/:id', asyncHandler(getImg));

export default router;
