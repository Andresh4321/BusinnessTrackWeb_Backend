import z from "zod";
import { userSchema } from "../types/user.type";
export const RegisterDTO = userSchema.pick( 
    {
        firstName: true, 
        lastName: true,
        email: true,
        username: true,
        password: true,
         role: true 
    }
).extend( 
    {
        confirmPassword: z.string().min(6)
    }
).refine( 
    (data) => data.password === data.confirmPassword,
    {
        message: "Password and Confirm Password must match",
        path: ["confirmPassword"] 
    }
)
export type RegisterDTO = z.infer<typeof RegisterDTO>;

export const LoginDto = z.object({
    email: z.email(),
    password: z.string().min(6)
})
export type LoginDto = z.infer<typeof LoginDto>;



