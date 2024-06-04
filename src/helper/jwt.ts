import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

interface interUsuario {
  id: number;
  nombres: string;
  rol: string;
}

const palabraSecreta: any = process.env.JWT_SECRET_KEY;

export const generarToken = (usuario: interUsuario) => {
  try {
    return jwt.sign(usuario, palabraSecreta, { expiresIn: "2h" });
  } catch (error: any) {
    return error.message;
  }
}

export const verificarToken = (token: string): any | null => {
  try {
    const decoded = jwt.verify(token, palabraSecreta);
    return decoded;
  } catch (error: any) {
    switch (error.name) {
      case "TokenExpiredError":
        console.error("El Token ha Expirado");
        break;
      case "JsonWebTokenError":
        console.error("El Token es Inválido");
        break;
      default:
        console.error("Error al verificar el token:", error.message);
        break;
    }
    return null;
  }
}




