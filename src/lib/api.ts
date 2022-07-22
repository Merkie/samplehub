import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function fetchUser(userEmail: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: userEmail
            }
        }
    });

    console.log(user);

    return user;
};

export async function createUser(userEmail: string, userAuthentication: string) {
    const user = await prisma.user.create({
        data: {
            email: userEmail,
            authentication: userAuthentication
        }
    });

    console.log(user);

    return user;
};