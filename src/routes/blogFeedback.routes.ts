import express from "express";
import * as controllers from "../controllers/blogFeedback.controller";
import type { Request, Response,NextFunction } from "express";
import { isUserAuthenticated } from "../middlewares/auth.middleware";
//const upload=require('../controllers/blog.controller')
const router = express.Router();

//create blog by user id
// router.post("/:id/create", controllers.createBlog);
router.post("/likeBlog",controllers.likeBlog);
router.post("/dislikeBlog",controllers.disLikeBlog); 
router.post("/commentOnBlog",controllers.commentOnBlog);
router.delete("/deleteComment/:feedbackId",controllers.deleteComment);
router.get("/readFeedbackByBlogId/:blogId",controllers.readFeedbackByBlogId);
router.post("/saveBlog",controllers.saveBlog);
router.post("/report",controllers.reportBlog);
export default router;
