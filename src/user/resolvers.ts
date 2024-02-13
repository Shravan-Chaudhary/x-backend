const queries = {
    verifyGoogleToken: async (
        parent: unknown,
        { token }: { token: string },
    ) => {
        return token;
    },
};

export const resolvers = { queries };
