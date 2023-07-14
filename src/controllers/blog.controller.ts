// import type { Request, Response,NextFunction } from "express";
// import Category from "../models/category.model";
// import User from "../models/user.model";
// import Blog from "../models/blog.model";
// import responses from "../utils/responses";

// import Axios from "axios";
// import { Callback } from "mongoose";
// // const S3 = require('aws-sdk/clients/s3')
// export const createBlog = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     // Check if the user is valid
//     console.log(req.body);
//     const user = await User.findById(userId);
//     if (!user) {
//       return responses.unauthorizedResponse(res, "Invalid user");
//     }
//     if (
//       await Blog.findOne({ title: req.body.title, content: req.body.content })
//     ) 
//     {
//       return responses.alreadyExist(res, "blog Already exist");
//     }
//     let is_category = await Category.findOne({ name: req.body.categories });
//     console.log(req.body.categories);
//     console.log(is_category);
//     if (!is_category) {
//       return responses.badRequestResponse(res, { err: "Category not exist " });
//     } else {
//       const { title, content,imagePath } = req.body;
//       console.log(req.body);
//       console.log(
//         "filesc : ", req.files
//       );
      
//       //const blogPath = await manageDirectory(req, res);
//       //console.log("blogpath:",blogPath);
//       const newBlog = new Blog({
//         title,
//         content,
//         categories: is_category.id,
//         user: userId,
//         images:imagePath 
//       });
//       console.log("title:",title);

//       const savedBlog = await newBlog.save();
//       return responses.successResponse(res, savedBlog);
//     }
//   } catch (error) {
//     console.log(error);
//     return responses.serverErrorResponse(res);
//   }
// };
// //list of blog published by specific user
// export const list = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     // Check if the user is valid
//     const user = await User.findById(userId);
//     // console.log('database source',user);
//     if (!user) {
//       return responses.unauthorizedResponse(res, "Invalid user");
//     }
//     let blogs = await Blog.findOne({blog_status:"publish"});
//     if (!blogs) {
//       return responses.notFoundResponse(res);
//     }
//     return responses.successResponse(res, blogs);
//   } catch (error) {
//     console.log(error);
//     return responses.serverErrorResponse(res);
//   }
// };

// // export const getSingleBlog = async (req: Request, res: Response) => {
// //   try {
// //     if (!req.params.id)
// //       return responses.badRequestResponse(res, { error: "Provid Blog ID" });
// //     let blog = await Blog.findById(req.params.id);
// //     if (!blog) return responses.notFoundResponse(res, "Blog Not Found..");
// //     return responses.successResponse(res, blog, "Blog Found..");
// //   } catch (error) {
// //     console.log('-------------------------',error);
// //     return responses.serverErrorResponse(res);
// //   }
// // };

// export const delete_blog = async (req: Request, res: Response) => {
//   try {
//     let blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) {
//       return responses.badRequestResponse(
//         res,
//         {},
//         "Error while deleting blog.."
//       );
//     }
//     return responses.successResponse(res, blog, "deleted succesfully.");
//   } catch (error) {
//     return responses.serverErrorResponse(res);
//   }
// };
// export const readAllBlogs = async (req: Request, res: Response) => {
//   try {
//     const blogs = await Blog.find(); // Find all blogs
//     console.log('---------------',blogs);
//     if (blogs.length === 0) {
//       return responses.badRequestResponse(
//         res,
//         {},
//         "No blogs exist"
//       );
//     }
//     return responses.successResponse(res, blogs);
//   } catch (error) {
//     return responses.serverErrorResponse(res);
//   }
// };
// export const getBlogStataus=async (req:Request,res:Response)=>{
//   const status = req.body.status;
//   const user = await User.findById(req.params.id);
//   if (!user) {
//       return responses.unauthorizedResponse(res, "Invalid user");
//   }
//   try{
//     const update_blog_status = await Blog.findByIdAndUpdate(req.params.id, {
//           blog_status:status});
//         return responses.successResponse(res, update_blog_status);
//       } catch (error) {
//         return responses.serverErrorResponse(res);
//       };
// }





// // export const readPublishBlog=async(req:Request,res:Response){
// //   const blogStatus
// // }