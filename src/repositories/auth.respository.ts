import { IUser, UserModel } from "../models/user.models";


export interface IUserRepository{
    createUser(data: Partial<IUser>): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    getUserById(id: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>;
    updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null>;
    deleteUserById(id: string): Promise<boolean | null>;
}

export class UserRepository implements IUserRepository{
    async createUser(data: Partial<IUser>){
        const newUser = new UserModel(data);
        await newUser.save(); // same as db.users.insertOne()
        return newUser;
    }
    async getUserByEmail(email: string){
        const user = await UserModel.findOne({ "email": email });
        return user;
    }
    async getUserByUsername(username: string){
        const user = await UserModel.findOne({ "username": username });
        return user;
    }

    async getUserById(id: string) {
        const user = await UserModel.findById(id);
        return user;
    }
    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }
    async updateUserById(id: string, data: Partial<IUser>){

        const updatedUser = 
            await UserModel.findByIdAndUpdate(id, data, { new: true });
        return updatedUser;
    }
    async deleteUserById(id: string){
        
        const result = await UserModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}