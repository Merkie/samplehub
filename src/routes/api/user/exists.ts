import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client';

// Types
import { IUserExists } from '~/types/api';

const prisma = new PrismaClient();

export const post = async ({ request }: { request: Request }) => {
	const body: IUserExists = await request.json();

    // Get the user from the provided email
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: body.email,
            }
        }
    });

    // If the user exists return true
    if(user) {
        return json(true);
    }

    // Else return false
    return json(false);
};