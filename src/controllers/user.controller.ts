import { Request, Response } from "express";
import responses from "../utils/responses";
import User from "../models/user.model";
import UserRole from "../models/role_user.model";
import { log } from "console";
import { json } from "body-parser";

export const get = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return responses.badRequestResponse(res, { error: "User ID required" });
    let user = await User.findById(req.params.id);
    if (!user) return responses.notFoundResponse(res, "User Not Found..");
    let user_role = await UserRole.find({ user_id: req.params.id }).populate(
      "role_id"
    );
    let response = { user, user_role };
    return responses.successResponse(res, response, "User Found..");
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};
export const changeStatus= async (req:Request,res:Response)=>{
try{  
  const user_id=req.body;
  const filter={_id:req.body.user_id};
  if(user_id.status==="blocked")
    {
    const update={status:"unblocked"};
    const userUnblocked=await User.findOneAndUpdate(filter,update);
    return responses.successResponse(res, userUnblocked);
    }
  else
    {
      const update={status:"blocked"};
      const userBlocked=await User.findOneAndUpdate(filter,update);
      console.log('-----------',userBlocked);
      return responses.successResponse(res,userBlocked);
    }
  }
  catch(error)
  {
    console.log(error);
     return responses.serverErrorResponse(res);
  }
}
export const blockedUserList = async (req: Request, res: Response) => {
  console.log("________________________");
  try {
    const blockedUsers = await User.aggregate([
      { $match: { status: "blocked" } },
    ]);

    if (blockedUsers.length === 0) {
      return responses.successResponse(res, 'No one is a blocked user');
    } else {
      return responses.successResponse(res, blockedUsers);
    }
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};

// export const blockedUserList = async (req: Request, res: Response) => {
//   console.log("________________________");
//   try {
//     const blockedUsers = await User.aggregate([
//       { $match: { status: "blocked" } },
//     ]);

//     if (blockedUsers.length === 0) {
//       return responses.successResponse(res, 'No one is a blocked user');
//     } else {
//       return responses.successResponse(res, blockedUsers);
//     }
//   } catch (error) {
//     console.log(error);
//     return responses.serverErrorResponse(res);
//   }
// };
