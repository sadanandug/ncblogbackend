import express from "express";
import * as controllers from "../controllers/blog.controller1";
// import { isUserAuthenticated } from "../middlewares/auth2.middleware";
import multer, { FileFilterCallback } from "multer";
const router = express.Router();
router.use(function (req, res, next) {
  console.log("inside router");
  // isUserAuthenticated(req, res, next);
   next();
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "x-access-token, Origin, Content-Type, Accept"
  // );

});

// router.get("/:id/list", controllers.list);

//router.post("/:id/create", upload.array("files"), controllers.create);

router.post("/:id", controllers.getSingleBlog);//---------------------- integrated
router.post('/:id/create',controllers.uploadFileMiddleware, controllers.create);
// router.post("/test", controllers.testForm)

//router.get("/category/:category_id", controllers.getBlogsByCategory);
  
// router.put("/:id/:blog_id/update", upload.array("files"),controllers.update);

// router.delete("/:id", controllers.delete_blog);
router.get("/readAllBlogs", controllers.readAllBlogs);//-----------------integrated

// router.get("/test/test", controllers.getpic);

export default router;



























































//For multiple image store

// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({ 
//   cloud_name: 'dlhb7c0gg', 
//   api_key: '477985445521753', 
//   api_secret: 'nNWKze5-0r2Cb3uXc7TU0gFprRs' 
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the destination folder for file uploads
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//   }
// });

// // Create multer upload instance
// const upload = multer({ storage: storage });

// async function uploadFiles(filePaths: string[]): Promise<string[]> {
//   try {
//     const uploadPromises = filePaths.map((filePath) =>
//       cloudinary.uploader.upload(filePath, { tags: 'sample_upload' })
//     );
//     const results = await Promise.all(uploadPromises);
//     console.log('Upload Successful:');
//     console.log(results);
//     return results.map((result) => result.secure_url); // Return the secure URLs of the uploaded files
//   } catch (error) {
//     console.error('Upload Error:');
//     console.error(error);
//     throw error; // Throw the error for the calling function to handle
//   }
// }
// export const create = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return responses.unauthorizedResponse(res, null, 'Invalid user');
//     }

//     if (await Blog.findOne({ title: req.body.title })) {
//       return responses.allreadyExistResponse(res, 'Blog already exists');
//     }

//     let isCategory = await Category.findOne({ name: req.body.categories });
//     if (!isCategory) {
//       return responses.badRequestResponse(res, { error: 'Category does not exist' });
//     } else {
//       const { title, content } = req.body;

//       let fileAddresses: string[] = [];
//       if (req.files && Array.isArray(req.files)) {
//         const filesToUpload = req.files.map((file: Express.Multer.File) => file.path);
//         fileAddresses = await uploadFiles(filesToUpload);
//       }

//       const newBlog = new Blog({
//         title,
//         content,
//         categories: isCategory.id,
//         user_id: user,
//         images: fileAddresses
//       });

//       const savedBlog = await newBlog.save();
//       return responses.successResponse(res, savedBlog);
//     }
//   } catch (error) {
//     console.log(error);
//     // return responses.serverErrorResponse(res);
//     return (error);
//   }
// };

// export const uploadFileMiddleware = upload.array('files'); // Use the appropriate field name used in the client's form data





















































































// import express from "express";
// import * as controllers from "../controllers/blog.controller";
// import type { Request, Response,NextFunction } from "express";
// import { isUserAuthenticated } from "../middlewares/auth.middleware";
// //const upload=require('../controllers/blog.controller')
// const router = express.Router();
// import {s3Uploadv3} from "../utils/s3";

// router.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });
// //create blog by user id
// router.post("/:id/create", controllers.createBlog);
// //get single blog by blog id--------------------------npm -----executed
// // router.get("/:id", controllers.getSingleBlog);//get single blog and readAllBlogs are create contradicton
// //All the blog on website published by user------------executed
// router.get("/:id/list", controllers.list);
// //To delete Blog-------------------------------------------executed
// router.delete("/:id", controllers.delete_blog);
// //api to Publish content by blogId-------------------------executed
// router.patch("/:id/blog_status",controllers.getBlogStataus);
// //api to read all blogs------------------------- -------executed ========admin
// router.get("/readAllBlogs", controllers.readAllBlogs);
// //list of publish blog
// // router.get("/readPublishBlog",controller.readPublishBlog);

// //get blog by category
// //router.get("/category/:name", controllers.getBlogsByCategory);
// // router.post("/category/manage", controllers.manageDirectory);
// //update blog
// //router.put("/:id/:blog_id/update", controllers.update);
// //to Ipload Image:
// // router.post("/upload", controllers.uploadsImage);
// export default router;
