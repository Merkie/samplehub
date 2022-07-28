import { json } from 'solid-start/server';
import { PrismaClient } from '@prisma/client';

// Types
import { ISessionCreate } from '~/types/api';

const prisma = new PrismaClient();

export const post = async ({ request }: { request: Request }) => {
	const body: ISessionCreate = await request.json();

    const session = await prisma.session.create({
        data: {
            userId: body.userId
        },
    });

    return json(session);
};