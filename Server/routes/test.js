import express from 'express';
import asyncHandler from 'express-async-handler';
import { saveImg, getData, getDetail, addUser, getUser } from '../controllers/test.js';

const router = express.Router();
// Middleware to parse the request body

// Handle POST request to upload an image
router.get('/energy/:id', asyncHandler(getDetail));
router.get('/energy', asyncHandler(getData));
router.post('/img/:id', asyncHandler(saveImg));
router.post('/user', asyncHandler(addUser));
router.get('/user', asyncHandler(getUser));
// router.get('/img/:id', asyncHandler(getImg));

export default router;
