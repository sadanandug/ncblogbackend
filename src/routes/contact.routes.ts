
import express, {Request, Response } from 'express';
import * as controllers from '../controllers/contact.controller';

const router = express.Router();

router.post('/doubt',controllers.doubt);

export default router;