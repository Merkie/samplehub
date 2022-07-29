import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client';

// Types
import { IUserLogin } from '~/types/api';

import passwordHash from 'password-hash';

const prisma = new PrismaClient();

export const post = async ({ request }: { request: Request }) => {
	const body: IUserLogin = await request.json();
    
    // Find user with email
    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        }
    });

    // If user is not found, error
    if(!user)
        return json({error: 'user not found'});

    // Check if the password is correct
    if(passwordHash.verify(body.password, user.authentication)) {
        delete user.authentication;

        // Make the session object
        const session = await prisma.session.create({
            data: {
                userId: user.id
            },
        });

        // return user and session
        return json({user: user, session: session});
    }

    // If password incorrect, error
    return json({error: 'password incorrect'});
};