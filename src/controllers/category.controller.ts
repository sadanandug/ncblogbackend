import { error } from "console";
import Category from "../models/category.model";
import resposnes from "../utils/responses";
import { Request,Response  } from "express";

export const list=async(req:Request,res:Response)=>{
    try{
        let category=await Category.find();
        if(!category){
            return resposnes.notFoundResponse(res);
        }
        else
          res.json({ data: category });
    }catch(error)
    {
        console.log(error);
        return resposnes.serverErrorResponse(res);
    }
};
export const create =async (req:Request,res:Response)=>{
    try{
    let is_category = await Category.findOne({name: req.body.name});
    if (is_category) {
      return resposnes.badRequestResponse(res, { err: "Category Already Exist" });
    }
        let add_cateogry=await Category.create(req.body);
         res.send(add_cateogry);
    }
    catch (error) {
      return  resposnes.serverErrorResponse(res);
    }
};
export const remove = async (req: Request, res: Response) => {
    try {
      let delete_category = await Category.findByIdAndDelete(req.params.id);
      if (!delete_category) {
        return resposnes.badRequestResponse(
          res,
          {},
          "Error while deleting Category.."
        ); 
      }
      return resposnes.successResponse(res, delete_category, "deleted succesfully.");
    } catch (error) {
      return  resposnes.serverErrorResponse(res);
    }
  };
  export const update = async (req: Request, res: Response) => {
    try {
      console.log(req.params.id);
      let category_id = await Category.findById(req.params.id);
      console.log(category_id);
      if (!category_id) {
        return resposnes.unauthorizedResponse(res, "Such category not available");
      }
      try {
        await Category.findByIdAndUpdate(category_id, {
            name:req.body.name
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    catch (error) {
        return  resposnes.serverErrorResponse(res);
    }
}