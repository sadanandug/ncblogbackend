//Imports
import * as dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app: Application = express();
import { default as BlogRoutes } from "./routes/blog.routes";
import { default as CategoryRoutes } from "./routes/category.routes";
import {default as blogFeedbackRoutes} from "./routes/blogFeedback.routes";
import { default as otpRoutes } from "./routes/otp.routes";
import cors from "cors";
import { default as ContactRoutes } from "./routes/contact.routes";
import { default as AuthRoutes } from "./routes/auth.routes";
import { default as RoleRoutes } from "./routes/role.routes";
import { default as UserRoutes } from "./routes/user.routes";
//import bodyParser from 'body-parser';
//dotenv setup
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  dotenv.config({ path: __dirname + "/.env" });
}

console.log("DB_USER", process.env.DB_USER);
mongoose.set("strictQuery", false);
//Database connection

mongoose
  .connect(
    `mongodb+srv://amanbhardwaj293:develearnAMAN@nextcampus-blog.tcf3c3n.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((error) => {
    console.log(error);
  });

//middlewares
app.use("/public", express.static("./src/public"));

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*"); // dev only
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(200).send();
  } else {
    next();
  }
});

//Route

//Testing route
app.get("/", (req: Request, res: Response) => {
  return res.send("welcome to develearn");
});

app.use("/api/blog", BlogRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/role", RoleRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/otp",otpRoutes);
app.use("/api/blogFeedback",blogFeedbackRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});





























































// Imports
// import * as dotenv from "dotenv";
// import express, { Application, NextFunction, Request, Response } from "express";
// import cors from "cors";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import { default as BlogRoutes } from "./routes/blog.routes";
// import { default as CategoryRoutes } from "./routes/category.routes";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// const app:Application= express();   

// // var fileupload=require('express-fileupload');
// // import { default as ContactRoutes } from "./routes/contact.routes";
// import { default as AuthRoutes } from "./routes/auth.routes";
// import {default as blogFeedbackRoutes} from "./routes/blogFeedback.routes";
// import { default as RoleRoutes } from "./routes/role.routes";
// import { default as UserRoutes } from "./routes/user.routes";
// import { default as otpRoutes } from "./routes/otp.routes";
// // import { create } from "domain";


// mongoose.set('strictQuery', false);
// /* CONFIGURATIONS */
// dotenv.config();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb" }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());



// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// const uploadStorage = multer({ storage: storage })

// //Database connection
// mongoose
//   .connect(
//     `mongodb+srv://amanbhardwaj293:develearnAMAN@nextcampus-blog.tcf3c3n.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     console.log("Database Connected...");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// //middlewares
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*"); // dev only
//   res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     res.status(200).send();
//   } else {
//     next();
//   }
// });

// //Route with files;
// app.post("/api/blog/:id/create", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// });



// //Testing route
// app.get("/", (req: Request, res: Response) => {
//   return res.send("welcome to develearn");
// });
// app.use("/api/blog", BlogRoutes);
// app.use("/api/category", CategoryRoutes);
// app.use("/api/auth", AuthRoutes);
// app.use("/api/role", RoleRoutes);
// app.use("/api/user", UserRoutes);
// app.use("/api/otp",otpRoutes);
// app.use("/api/blogFeedback",blogFeedbackRoutes);
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Port listening on ${PORT}`);
// });