import nodemailer from 'nodemailer';
import otpSchemaModel from '../models/otp.model';
import Blog from "../models/blog.model";
import user from "../models/user.model";
import {Request, Response} from "express";
import BlogFeedback from "../models/blogFeedback.model";

export const likeBlog = async (req:Request, res:Response) => {
  // let isAction:boolean =false;
  try {
    const { blogId, userId } = req.body;
    // Check if the blog feedback already exists
    let count ;
    let blogFeedback = await BlogFeedback.findOne({ blog_id: blogId, user_id: userId });
    if (blogFeedback) {
      if(blogFeedback.like)
        blogFeedback.like = false;  
      else
        blogFeedback.like = true;
      // Update the existing blog feedback with the new like value
    } else {
      // Create a new blog feedback entry with the like value
      blogFeedback = new BlogFeedback({
        blog_id: blogId,
        user_id: userId,
        like: true,
      }); 
    }
    // Save the updated or new blog feedback entry
    await blogFeedback.save();
    count = await BlogFeedback.countDocuments({ blog_id: blogId, like: true });
    res.status(200).json({ success: true, message: "Blog liked successfully",count });
    // sendEmail 
    const blogDetails=await Blog.findById(blogId);
    console.log('*************Blog details',blogDetails);
    let author_id = await Blog.findOne({user_id: userId });
    console.log("===========",author_id);
    // const author=await blog.find(userId);
    // const mailOptions = {
    //   from: '2021mca27@cuk.ac.in',
    //   to: email,
    //   subject: 'Verify your mail',
    //   text: `Your email verification otp is: ${otp}`,
    // };

    // // Send the email
    // await transporter.sendMail(mailOptions);

    // Return success response
    //return res.status(200).json({ message: 'OTP sent successfully ',otp});
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
export const disLikeBlog = async (req:Request, res:Response) => {
  try {
    const { blogId, userId } = req.body;

    // Check if the blog feedback already exists
    let blogFeedback = await BlogFeedback.findOne({ blog_id: blogId, user_id: userId });

    if (blogFeedback) {
      // Update the existing blog feedback with the new like value
      if(blogFeedback.dislike)
        blogFeedback.dislike = false;  
      else
        blogFeedback.dislike = true;
    } else {
      // Create a new blog feedback entry with the like value
      blogFeedback = new BlogFeedback({
        blog_id: blogId,
        user_id: userId,
        dislike: true,
      });
    }
    // Save the updated or new blog feedback entry
    await blogFeedback.save();
    const count = await BlogFeedback.countDocuments({ blog_id: blogId, dislike: true });
    res.status(200).json({ success: true, message: "Blog disliked successfully" ,count});
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
//save Blog
export const saveBlog = async (req:Request, res:Response) => {
  // let isAction:boolean =false;
  try {
    const { blogId, userId } = req.body;
    // Check if the blog feedback already exists
    let blogFeedback = await BlogFeedback.findOne({ blog_id: blogId, user_id: userId });
    if (blogFeedback) {
      if(blogFeedback.saveBlog)
        blogFeedback.saveBlog = false;  
      else
        blogFeedback.saveBlog = true;
    } else {
      blogFeedback = new BlogFeedback({
        blog_id: blogId,
        user_id: userId,
        saveBlog: true,
      });
    }
    await blogFeedback.save();
    res.status(200).json({ success: true, message: "activity done successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};


// Controller function to handle the comment operation
export const commentOnBlog = async (req:Request, res:Response) => {
  try {
    const { blogId, userId,comment } = req.body;
    // Check if the blog feedback already exists
    let blogFeedback = await BlogFeedback.findOne({ blog_id: blogId, user_id: userId });

    if (blogFeedback) {
      // Update the existing blog feedback with the new comment
      blogFeedback.comment = comment;
    } else {
      // Create a new blog feedback entry with the comment
      blogFeedback = new BlogFeedback({
        blog_id: blogId,
        user_id: userId,
        comment,
      });
    }

    // Save the updated or new blog feedback entry
    await blogFeedback.save();

    res.status(200).json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error});
  }
};
// Controller function to handle deleting a comment
export const deleteComment = async (req:Request, res:Response) => {
  try {
    const { feedbackId } = req.params;
    // Find the blog feedback entry by its ID
    const blogFeedback = await BlogFeedback.findById(feedbackId);

    if (!blogFeedback) {
      return res.status(404).json({ success: false, message: "Blog feedback not found" });
    }
    // Delete the comment from the blog feedback entry
    blogFeedback.comment = "";
    // Save the updated blog feedback entry 
    await blogFeedback.save();
    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error});
  }
};
// Controller function to read all comments for a blog
export const readFeedbackByBlogId = async (req:Request, res:Response) => {
  try {
    const { blogId } = req.params;

    // Find all blog feedback entries with the given blog ID
    const blogFeedbacks = await BlogFeedback.find({ blog_id: blogId });

    res.status(200).json({ success: true, data: blogFeedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error});
  } 
};

export const reportBlog = async (req:Request,res:Response) => {
  try {
    const { blogId, userId } = req.body;

    // Check if the blog feedback already exists
    let blogFeedback = await BlogFeedback.findOne({ blog_id: blogId, user_id: userId });

    if (blogFeedback) {
      // Update the existing blog feedback with the new like value
      if(blogFeedback.report)
        {
          blogFeedback.report = true;  
        }
      else
      {
        blogFeedback.report = true;
      }
      } 
      else {
      // Create a new blog feedback entry with the like value
        blogFeedback = new BlogFeedback({
        blog_id: blogId,
        user_id: userId,
        report: true,
      });
    }
    // Save the updated or new blog feedback entry
    await blogFeedback.save();

    res.status(200).json({ success: true, message: "Blog reports successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Controller function to handle reporting a blog
// Generate a random OTP
// const reportSummary = () => {
//   const otpLength =  6;
//   const digits = '0123456789';
//   let otp = '';
//   for (let i =  0; i < otpLength; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }
//   return otp;
// };

// // Send OTP via email
// export const sendOtpByEmail = async (req: Request, res: Response) => {
//   try {
//     // Get the recipient's email address from the request body
//     const { email } = req.body;

//     // Generate an OTP
//     const otp = generateOTP();

//     // Save OTP in the database
//     const otpData = {
//       email: email,
//       otp: otp,
//     };
//     await otpSchemaModel.create(otpData);

//     // Configure nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: '2021mca27@cuk.ac.in',
//         pass: 'rAvI890@',
//       },
//     });

//     // Create the mail options
//     const mailOptions = {
//       from: '2021mca27@cuk.ac.in',
//       to: email,
//       subject: 'Your mail is verified',
//       text: `Now mail service is working ${otp}`,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Return success response
//     return res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.log(error);
//     // Return error response
//     return res.status(500).json({ error: 'Failed to send OTP' });
//   }
// };
// export const verifyOtp = async (req: Request, res: Response) => {
//   try {
//     // Get the recipient's email address from the request body
//     console.log('*******************');
//     const { newEmail,newOtp } = req.body;
//     let isOtpFound=await otpSchemaModel.findOne({ email: newEmail, otp:newOtp })
//     if(isOtpFound)
//       return res.status(200).json('Otp Verified');
//     else
//       return res.status(500).json({error:'Wrong Otp'});
//   } catch (error) {
//     console.log(error);
//     // Return error response
//     return res.status(500).json({ error: 'Server Error' });
//   }
// };
