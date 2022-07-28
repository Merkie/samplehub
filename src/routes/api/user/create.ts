import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client';

// Types
import { IUserCreate } from '~/types/api';

import passwordHash from 'password-hash';

const prisma = new PrismaClient();

export const post = async ({ request }: { request: Request }) => {
	const body: IUserCreate = await request.json();

    // Hash the user password
    const hashedPassword = passwordHash.generate(body.password);

    // Make the user object
    const user = await prisma.user.create({
        data: {
            email: body.email,
            authentication: hashedPassword
        },
    });

    // Delete the authentication for security
    delete user.authentication;
    
    // return the user
    return json(user);
};