import axios from "axios";
import { GoogleTokenResult } from "../types";
import { prismaClient } from "../config/db";
import TokenService from "../services/tokenService";

const queries = {
  verifyGoogleToken: async (parent: unknown, { token }: { token: string }) => {
    const googleToken = token;
    const googleOAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOAuthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOAuthURL.toString(),
      {
        responseType: "json",
      },
    );

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImage: data.picture,
        },
      });
    }

    // generate JWT token
    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!userInDb) throw new Error("User not found");

    const jwtToken = await TokenService.generateToken(userInDb);

    return jwtToken;
  },
};

export const resolvers = { queries };
