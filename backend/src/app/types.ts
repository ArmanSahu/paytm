import { z } from  'zod';



export const signupType = z.object({
    email: z.email(),
    username: z.string().min(3,"Username should have minimum of 3 characters").max(50, "Username cannot exceed 50 characters"),
    password: z.string().min(8, "password should be minimum of 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain one lowercase one uppercase one special case and one number")
});