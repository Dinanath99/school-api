import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const assignHouseLeaderRole =async(req:Request,res:Response)=>{
try {
    const {userId} = req.body;

  const user = await User.findByIdAndUpdate({_id:userId},{
    $addToSet:{
        role:['house-leader']
    }
  }, {
    new: true,
    runValidators: true,
  });
console.log(user)
  return res.status(200).send({status:true,message:`user upgraded to house-leader`});

} catch (error:any) {
    return res.status(500).send({status:false,message:error.message})
}
}

export const removeAdminRole =async(req:Request,res:Response)=>{
    try {
    const {normalUserId} = req.body;

  await User.findByIdAndUpdate({_id:normalUserId},{
    $pull:{
        role:{$in:[3210]}
    }
  });

  return res.status(200).send({status:true,message:`user removed from admin`});
  
} catch (error:any) {
    return res.status(500).send({status:false,message:error.message})
}
}