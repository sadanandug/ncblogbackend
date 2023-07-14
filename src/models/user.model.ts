import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    date: {
      type: Date,
      default: new Date()
    },
    status:{
      type:String,
      default:"unblocked",
      require:true
    },
    profilePic:{
      type:String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
export default User;
