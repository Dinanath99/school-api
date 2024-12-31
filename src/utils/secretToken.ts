require("dotenv").config();
import jwt from "jsonwebtoken";

const createSecretToken= (id : string, role:string[])=>{
    return jwt.sign({id ,role}, process.env.TOKEN_KEY as string,{expiresIn:'20h'});
}
export default createSecretToken;
