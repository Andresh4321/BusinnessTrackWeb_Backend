
import { RegisterDTO, LoginDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { HttpError } from "../errors/http_error";
import { UserRepository } from "../repositories/auth.respository";

let userRepository = new UserRepository();
export class AuthService{
    async registerUser(data: RegisterDTO){

        const emailExists = await userRepository.getUserByEmail(data.email);
        if(emailExists){ 
            throw new HttpError(409, "Email already exists");
        }
        const usernameExists = await userRepository.getUserByUsername(data.username);
        if(usernameExists){
            throw new HttpError(400, "Username already exists");
        }
    
        const hashedPassword = await bcryptjs.hash(data.password, 10); 
        data.password = hashedPassword; 
        const newUser = await userRepository.createUser(data);
        

    const payload = {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });


    return { user: newUser, token };  
        
    }

    async loginUser(data: LoginDto){
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        const validPassowrd = await bcryptjs.compare(data.password, user.password);
      
        if(!validPassowrd){
            throw new HttpError(401, "Invalid credentials");
        }
    
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        } 
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d'});
        return { user,token }
    }
}