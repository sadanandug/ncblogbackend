import express from "express";

import * as controllers from "../controllers/user.controller";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/:id", controllers.get);//-------------------executed
//router.get("/Users",controllers.userList);
router.post("/changeStatus",controllers.changeStatus);  //---------------------executed
router.get("/blockedUserList",controllers.blockedUserList);
export default router;
