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

    // Make the session object
    const session = await prisma.session.create({
        data: {
            userId: user.id
        },
    });

    delete user.authentication; // Delete authentication

    // Return the user and session
    return json({user: user, session: session});
};