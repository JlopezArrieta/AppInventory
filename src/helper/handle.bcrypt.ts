import bcrypt from 'bcryptjs';

//Criptarcion de contraseña.
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

//Comparar contraseña.
export const comparePassword = async (inputPassword: string, hashPassword: string): Promise<boolean> => {
    const passComp = await bcrypt.compare(inputPassword, hashPassword);
    return passComp;
};
