import bcrypt from "bcrypt";

export const hashPassword = async(password: string) => {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound);
    return hashedPassword;
}