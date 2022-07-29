import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client';

// Types
import { IUserMe } from '~/types/api';

const prisma = new PrismaClient();

export const post = async ({ request }: { request: Request }) => {
	const body: IUserMe = await request.json();

    // Get the session from the access token
	const session = await prisma.session.findFirst({
		where: {
			access_token: {
				equals: body.access_token,
			},
		},
	});

    // If the session isnt found then send an error
	if (!session) {
		return json({ error: 'Invalid access token' });
	}

    // Get the user from the userId in the session
	const user = await prisma.user.findFirst({
		where: {
			id: {
				equals: session.userId,
			},
		},
	});

    // If the user isnt found then send an error
	if (!user) {
		return json({ error: 'User not found' });
	}

    // Delete the authentication for security
	delete user.authentication;

    // Send the user back to the client
	return json(user);
};
