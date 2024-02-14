import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { Config } from "../config";

class TokenService {
  public static async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    if (!Config.JWT_SECRET) throw new Error("Jwt secret not found");

    const token = sign(payload, Config.JWT_SECRET);
    return token;
  }
}

export default TokenService;
