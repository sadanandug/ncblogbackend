
import express, { Request, Response } from 'express';
import * as controllers from '../controllers/category.controller';

const router = express.Router();
//To add categories
router.post('/create', controllers.create);
//To fetch all the categories
router.get('/list', controllers.list);
//To delete categories
router.delete('/:id', controllers.remove);
//To Update Categories ================It's not working 
router.put("/:id", controllers.update);
export default router;